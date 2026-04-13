import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { badRequest, conflict, forbidden, notFound, ok, serverError, unauthorized } from "@/lib/api/response";
import { prismaToHttp } from "@/lib/api/prisma-error";
import { authOptions } from "@/lib/auth";
import { canManageTemplates } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { serializeDates } from "@/lib/serializers";
import {
  templateSelect,
  updateTemplateBodySchema,
  validateResolvedTemplateState,
  type TemplateResolvedState,
  type TemplateUpdateBody,
} from "@/lib/templates/template-api";
import { normalizeTemplateColor } from "@/lib/templates/template-rules";

const paramsSchema = z
  .object({
    id: z.string().trim().min(1, "id required"),
  })
  .strict();

type EditableTemplateRecord = Awaited<ReturnType<typeof findEditableTemplate>>;

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown error";
  }
}

async function findEditableTemplate(id: string, companyId: string) {
  return prisma.shiftTemplate.findFirst({
    where: {
      id,
      companyId,
    },
    select: templateSelect,
  });
}

function resolveMergedTemplateState(existingTemplate: NonNullable<EditableTemplateRecord>, patch: TemplateUpdateBody): TemplateResolvedState {
  const isTimeDefined = patch.isTimeDefined ?? existingTemplate.isTimeDefined;
  const startTime = patch.startTime !== undefined ? patch.startTime : existingTemplate.startTime;
  const endTime = patch.endTime !== undefined ? patch.endTime : existingTemplate.endTime;

  return {
    name: patch.name ?? existingTemplate.name,
    category: patch.category ?? existingTemplate.category,
    requiredRole: patch.requiredRole !== undefined ? patch.requiredRole : existingTemplate.requiredRole,
    secondaryAllowedRoles: patch.secondaryAllowedRoles ?? existingTemplate.secondaryAllowedRoles,
    minStaffCount: patch.minStaffCount !== undefined ? patch.minStaffCount : existingTemplate.minStaffCount,
    requiredVehicleType:
      patch.requiredVehicleType !== undefined ? patch.requiredVehicleType : existingTemplate.requiredVehicleType,
    isActive: patch.isActive ?? existingTemplate.isActive,
    archivedAt: existingTemplate.archivedAt,
    isTimeDefined,
    startTime: isTimeDefined ? startTime : null,
    endTime: isTimeDefined ? endTime : null,
    crossesMidnight: isTimeDefined ? (patch.crossesMidnight ?? existingTemplate.crossesMidnight) : false,
    color:
      patch.color === undefined
        ? existingTemplate.color
        : patch.color === null
          ? null
          : normalizeTemplateColor(patch.color),
  };
}

function sameStringArray(a: readonly string[], b: readonly string[]) {
  if (a.length !== b.length) return false;
  return a.every((value, index) => value === b[index]);
}

function getChangedFields(existingTemplate: NonNullable<EditableTemplateRecord>, nextState: TemplateResolvedState) {
  const changedFields: string[] = [];

  if (nextState.name !== existingTemplate.name) changedFields.push("name");
  if (nextState.category !== existingTemplate.category) changedFields.push("category");
  if (nextState.requiredRole !== existingTemplate.requiredRole) changedFields.push("requiredRole");
  if (!sameStringArray(nextState.secondaryAllowedRoles, existingTemplate.secondaryAllowedRoles)) {
    changedFields.push("secondaryAllowedRoles");
  }
  if (nextState.minStaffCount !== existingTemplate.minStaffCount) changedFields.push("minStaffCount");
  if (nextState.requiredVehicleType !== existingTemplate.requiredVehicleType) changedFields.push("requiredVehicleType");
  if (nextState.isActive !== existingTemplate.isActive) changedFields.push("isActive");
  if (nextState.isTimeDefined !== existingTemplate.isTimeDefined) changedFields.push("isTimeDefined");
  if (nextState.startTime !== existingTemplate.startTime) changedFields.push("startTime");
  if (nextState.endTime !== existingTemplate.endTime) changedFields.push("endTime");
  if (nextState.crossesMidnight !== existingTemplate.crossesMidnight) changedFields.push("crossesMidnight");
  if (nextState.color !== existingTemplate.color) changedFields.push("color");

  return changedFields;
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const actorUserId = session?.user?.id;
  const companyId = session?.user?.companyId;
  const role = session?.user?.role;
  const platformRole = session?.user?.platformRole;

  if (!actorUserId || !companyId) return unauthorized();
  if (!(await canManageTemplates(actorUserId, role, platformRole))) return forbidden();

  const rawParams = await ctx.params.catch(() => null);
  const parsedParams = paramsSchema.safeParse(rawParams);
  if (!parsedParams.success) return badRequest("VALIDATION_ERROR", parsedParams.error.flatten());

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest("INVALID_JSON");
  }

  const parsedBody = updateTemplateBodySchema.safeParse(body);
  if (!parsedBody.success) return badRequest("VALIDATION_ERROR", parsedBody.error.flatten());

  try {
    const existingTemplate = await findEditableTemplate(parsedParams.data.id, companyId);
    if (!existingTemplate) return notFound();

    const nextState = resolveMergedTemplateState(existingTemplate, parsedBody.data);
    const stateIssues = validateResolvedTemplateState(nextState);
    if (stateIssues.length > 0) {
      return badRequest("VALIDATION_ERROR", { fieldErrors: stateIssues });
    }

    const changedFields = getChangedFields(existingTemplate, nextState);
    if (changedFields.length === 0) {
      return ok(serializeDates(existingTemplate));
    }

    const updatedTemplate = await prisma.shiftTemplate.update({
      where: { id: existingTemplate.id },
      data: {
        name: nextState.name,
        category: nextState.category,
        requiredRole: nextState.requiredRole,
        secondaryAllowedRoles: nextState.secondaryAllowedRoles,
        minStaffCount: nextState.minStaffCount,
        requiredVehicleType: nextState.requiredVehicleType,
        isActive: nextState.isActive,
        isTimeDefined: nextState.isTimeDefined,
        startTime: nextState.startTime,
        endTime: nextState.endTime,
        crossesMidnight: nextState.crossesMidnight,
        color: nextState.color,
      },
      select: templateSelect,
    });

    return ok(serializeDates(updatedTemplate));
  } catch (error: unknown) {
    const mapped = prismaToHttp(error);
    if (mapped?.status === 404) return notFound();
    if (mapped?.status === 409) {
      return conflict(mapped.error, { message: "Un template portant ce nom existe déjà dans cette société." });
    }

    return serverError(mapped ?? getErrorMessage(error));
  }
}
