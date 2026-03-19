import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { ok, badRequest, unauthorized, forbidden, serverError } from "@/lib/api/response";
import { canManageUsers } from "@/lib/permissions";
import { serializeDates } from "@/lib/serializers";
import { z } from "zod";

const USER_ROLES = ["ADMIN", "GERANT", "BUREAU", "ADE", "AA", "TAXI", "REGULATEUR"] as const;

const listQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(500).optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(100).optional().default(20),
  q: z.string().trim().max(200).optional().transform((value) => value || undefined),
  role: z.enum(USER_ROLES).optional(),
});

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  try {
    return JSON.stringify(e);
  } catch {
    return "Unknown error";
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const companyId = session?.user?.companyId;
  const userId = session?.user?.id;
  const platformRole = session?.user?.platformRole;

  if (!companyId || !userId) return unauthorized();

  const allowed = await canManageUsers(userId, session.user.role, platformRole);
  if (!allowed) return forbidden();

  const url = new URL(req.url);
  const parsed = listQuerySchema.safeParse({
    limit: url.searchParams.get("limit") ?? undefined,
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    q: url.searchParams.get("q") ?? undefined,
    role: url.searchParams.get("role") ?? undefined,
  });
  if (!parsed.success) return badRequest("VALIDATION_ERROR", parsed.error.flatten());

  const { limit, page, pageSize, q, role } = parsed.data;
  const effectivePage = limit ? 1 : page;
  const effectivePageSize = limit ?? pageSize;
  const skip = (effectivePage - 1) * effectivePageSize;

  try {
    const where = {
      companyId,
      platformRole: null,
      role: { not: null, ...(role ? { equals: role } : {}) },
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" as const } },
              { email: { contains: q, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        orderBy: [{ name: "asc" }, { email: "asc" }],
        skip,
        take: effectivePageSize,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          companyId: true,
          depotId: true,
          depot: {
            select: {
              id: true,
              name: true,
              isActive: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      }),
    ]);

    const totalPages = total === 0 ? 1 : Math.ceil(total / effectivePageSize);

    return ok({
      items: users.map(serializeDates),
      pagination: {
        page: effectivePage,
        pageSize: effectivePageSize,
        total,
        totalPages,
        hasPreviousPage: effectivePage > 1,
        hasNextPage: effectivePage < totalPages,
      },
      filters: {
        q: q ?? "",
        role: role ?? null,
      },
    });
  } catch (e: unknown) {
    return serverError(getErrorMessage(e));
  }
}
