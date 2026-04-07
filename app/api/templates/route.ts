import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { PlanningTemplateCategory } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { badRequest, forbidden, ok, serverError, unauthorized } from "@/lib/api/response";
import { canManageTemplates } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { serializeDates } from "@/lib/serializers";

const listQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(500).optional().default(200),
  isActive: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => (value === undefined ? undefined : value === "true")),
  category: z.nativeEnum(PlanningTemplateCategory).optional(),
});

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
