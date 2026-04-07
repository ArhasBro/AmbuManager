import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { PlanningTemplateCategory, Role } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { badRequest, conflict, forbidden, ok, serverError, unauthorized } from "@/lib/api/response";
import { prismaToHttp } from "@/lib/api/prisma-error";
import { canManageTemplates } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { serializeDates } from "@/lib/serializers";

const timeStringSchema = z
  .string()
  .trim()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format. Expected HH:MM.");

const listQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(500).optional().default(200),
  isActive: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => (value === undefined ? undefined : value === "true")),
  category: z.nativeEnum(PlanningTemplateCategory).optional(),
});

const createTemplateBodySchema = z
  .object({
    name: z.string().trim().min(1, "name required").max(160, "name too long"),
    category: z.nativeEnum(PlanningTemplateCategory),
    requiredRole: z.nativeEnum(Role).nullable().optional(),
    isActive: z.boolean().optional(),
    startTime: timeStringSchema,
    endTime: timeStringSchema,
    crossesMidnight: z.boolean().optional(),
  })
  .strict();

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
  const parsed = listQuerySchema.safeParse({
    limit: url.searchParams.get("limit") ?? undefined,
    isActive: url.searchParams.get("isActive") ?? undefined,
    category: url.searchParams.get("category") ?? undefined,
  });
  if (!parsed.success) return badRequest("VALIDATION_ERROR", parsed.error.flatten());

  const { limit, isActive, category } = parsed.data;

  try {
    const templates = await prisma.shiftTemplate.findMany({
      where: {
        companyId,
        ...(typeof isActive === "boolean" ? { isActive } : {}),
        ...(category ? { category } : {}),
      },
      orderBy: [{ name: "asc" }, { id: "asc" }],
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

  try {
    const template = await prisma.shiftTemplate.create({
      data: {
        companyId,
        name: parsed.data.name,
        category: parsed.data.category,
        requiredRole: parsed.data.requiredRole ?? null,
        isActive: parsed.data.isActive ?? true,
        startTime: parsed.data.startTime,
        endTime: parsed.data.endTime,
        crossesMidnight: parsed.data.crossesMidnight ?? false,
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
