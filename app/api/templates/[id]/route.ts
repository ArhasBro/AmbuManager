import { PlanningTemplateCategory, Role } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { badRequest, conflict, forbidden, notFound, ok, serverError, unauthorized } from "@/lib/api/response";
import { prismaToHttp } from "@/lib/api/prisma-error";
import { authOptions } from "@/lib/auth";
import { canManageTemplates } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { serializeDates } from "@/lib/serializers";

const timeStringSchema = z
  .string()
  .trim()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format. Expected HH:MM.");

const paramsSchema = z
  .object({
    id: z.string().trim().min(1, "id required"),
  })
  .strict();

const updateTemplateBodySchema = z
  .object({
    name: z.string().trim().min(1, "name required").max(160, "name too long").optional(),
    category: z.nativeEnum(PlanningTemplateCategory).optional(),
    requiredRole: z.nativeEnum(Role).nullable().optional(),
    isActive: z.boolean().optional(),
    startTime: timeStringSchema.optional(),
    endTime: timeStringSchema.optional(),
    crossesMidnight: z.boolean().optional(),
  })
  .strict()
  .refine(
    (value) =>
      value.name !== undefined ||
      value.category !== undefined ||
      value.requiredRole !== undefined ||
      value.isActive !== undefined ||
      value.startTime !== undefined ||
      value.endTime !== undefined ||
      value.crossesMidnight !== undefined,
    {
      message: "At least one editable field is required",
    }
  );

const templateSelect = {
  id: true,
  name: true,
  category: true,
  requiredRole: true,
  isActive: true,
  startTime: true,
  endTime: true,
  crossesMidnight: true,
  createdAt: true,
  updatedAt: true,
} as const;

type EditableTemplateRecord = Awaited<ReturnType<typeof findEditableTemplate>>;

type UpdateTemplateData = z.infer<typeof updateTemplateBodySchema>;

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

function getChangedFields(existingTemplate: NonNullable<EditableTemplateRecord>, nextData: UpdateTemplateData) {
  const changedFields: string[] = [];

  if (nextData.name !== undefined && nextData.name !== existingTemplate.name) {
    changedFields.push("name");
  }

  if (nextData.category !== undefined && nextData.category !== existingTemplate.category) {
    changedFields.push("category");
  }

  if (nextData.requiredRole !== undefined && nextData.requiredRole !== existingTemplate.requiredRole) {
    changedFields.push("requiredRole");
  }

  if (nextData.isActive !== undefined && nextData.isActive !== existingTemplate.isActive) {
    changedFields.push("isActive");
  }

  if (nextData.startTime !== undefined && nextData.startTime !== existingTemplate.startTime) {
    changedFields.push("startTime");
  }

  if (nextData.endTime !== undefined && nextData.endTime !== existingTemplate.endTime) {
    changedFields.push("endTime");
  }

  if (nextData.crossesMidnight !== undefined && nextData.crossesMidnight !== existingTemplate.crossesMidnight) {
    changedFields.push("crossesMidnight");
  }

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

    const changedFields = getChangedFields(existingTemplate, parsedBody.data);
    if (changedFields.length === 0) {
      return ok(serializeDates(existingTemplate));
    }

    const updatedTemplate = await prisma.shiftTemplate.update({
      where: { id: existingTemplate.id },
      data: {
        ...(parsedBody.data.name !== undefined ? { name: parsedBody.data.name } : {}),
        ...(parsedBody.data.category !== undefined ? { category: parsedBody.data.category } : {}),
        ...(parsedBody.data.requiredRole !== undefined ? { requiredRole: parsedBody.data.requiredRole } : {}),
        ...(parsedBody.data.isActive !== undefined ? { isActive: parsedBody.data.isActive } : {}),
        ...(parsedBody.data.startTime !== undefined ? { startTime: parsedBody.data.startTime } : {}),
        ...(parsedBody.data.endTime !== undefined ? { endTime: parsedBody.data.endTime } : {}),
        ...(parsedBody.data.crossesMidnight !== undefined ? { crossesMidnight: parsedBody.data.crossesMidnight } : {}),
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
