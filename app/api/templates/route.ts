import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import { badRequest, conflict, forbidden, ok, serverError, unauthorized } from "@/lib/api/response";
import { prismaToHttp } from "@/lib/api/prisma-error";
import { canManageTemplates } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { serializeDates } from "@/lib/serializers";
import {
  createTemplateBodySchema,
  listTemplateQuerySchema,
  resolveTemplateCreateInput,
  templateSelect,
  validateResolvedTemplateState,
} from "@/lib/templates/template-api";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown error";
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const companyId = session?.user?.companyId;
  const userId = session?.user?.id;
  const role = session?.user?.role;
  const platformRole = session?.user?.platformRole;

  if (!companyId || !userId) return unauthorized();
  if (!(await canManageTemplates(userId, role, platformRole))) return forbidden();

  const url = new URL(req.url);
  const parsed = listTemplateQuerySchema.safeParse({
    limit: url.searchParams.get("limit") ?? undefined,
    isActive: url.searchParams.get("isActive") ?? undefined,
    category: url.searchParams.get("category") ?? undefined,
    includeArchived: url.searchParams.get("includeArchived") ?? undefined,
  });
  if (!parsed.success) return badRequest("VALIDATION_ERROR", parsed.error.flatten());

  const { limit, isActive, category, includeArchived } = parsed.data;

  try {
    const templates = await prisma.shiftTemplate.findMany({
      where: {
        companyId,
        ...(typeof isActive === "boolean" ? { isActive } : {}),
        ...(category ? { category } : {}),
        ...(includeArchived ? {} : { archivedAt: null }),
      },
      orderBy: [
        { archivedAt: "asc" },
        { isActive: "desc" },
        { name: "asc" },
        { id: "asc" },
      ],
      take: limit,
      select: templateSelect,
    });

    return ok(templates.map(serializeDates));
  } catch (error: unknown) {
    return serverError(getErrorMessage(error));
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const companyId = session?.user?.companyId;
  const userId = session?.user?.id;
  const role = session?.user?.role;
  const platformRole = session?.user?.platformRole;

  if (!companyId || !userId) return unauthorized();
  if (!(await canManageTemplates(userId, role, platformRole))) return forbidden();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest("INVALID_JSON");
  }

  const parsed = createTemplateBodySchema.safeParse(body);
  if (!parsed.success) return badRequest("VALIDATION_ERROR", parsed.error.flatten());

  const resolved = resolveTemplateCreateInput(parsed.data);
  const stateIssues = validateResolvedTemplateState(resolved);
  if (stateIssues.length > 0) {
    return badRequest("VALIDATION_ERROR", { fieldErrors: stateIssues });
  }

  try {
    const template = await prisma.shiftTemplate.create({
      data: {
        companyId,
        name: resolved.name,
        category: resolved.category,
        requiredRole: resolved.requiredRole,
        secondaryAllowedRoles: resolved.secondaryAllowedRoles,
        minStaffCount: resolved.minStaffCount,
        requiredVehicleType: resolved.requiredVehicleType,
        isActive: resolved.isActive,
        archivedAt: resolved.archivedAt,
        isTimeDefined: resolved.isTimeDefined,
        startTime: resolved.startTime,
        endTime: resolved.endTime,
        crossesMidnight: resolved.crossesMidnight,
        color: resolved.color,
      },
      select: templateSelect,
    });

    return ok(serializeDates(template), 201);
  } catch (error: unknown) {
    const mapped = prismaToHttp(error);
    if (mapped?.status === 409) {
      return conflict(mapped.error, { message: "Un template portant ce nom existe déjà dans cette société." });
    }

    return serverError(mapped ?? getErrorMessage(error));
  }
}
