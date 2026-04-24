import { getServerSession } from "next-auth/next";
import bcrypt from "bcrypt";
import { z } from "zod";

import { json, ok, badRequest, unauthorized, forbidden, conflict, serverError } from "@/lib/api/response";
import { prismaToHttp } from "@/lib/api/prisma-error";
import { authOptions } from "@/lib/auth";
import {
  canGovernCompanyRulesDelegation,
  isCompanyRulesGovernorRole,
} from "@/lib/company-rules/governance";
import { canManageUsers } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { serializeDates } from "@/lib/serializers";
import { writePersonalDataAudit } from "@/lib/services/audit/personal-data-audit";
import { createUserBodySchema } from "@/lib/validators/user";

const USER_ROLES = ["ADMIN", "GERANT", "BUREAU", "ADE", "AA", "TAXI", "REGULATEUR"] as const;

const userSelect = {
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
} as const;

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
      isActive: true,
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

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const actorUserId = session?.user?.id;
  const companyId = session?.user?.companyId;
  const role = session?.user?.role;
  const platformRole = session?.user?.platformRole;

  if (!actorUserId || !companyId) return unauthorized();
  if (!(await canManageUsers(actorUserId, role, platformRole))) return forbidden();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest("INVALID_JSON");
  }

  const parsed = createUserBodySchema.safeParse(body);
  if (!parsed.success) return badRequest("VALIDATION_ERROR", parsed.error.flatten());

  const actorCanGovernCompanyRules = canGovernCompanyRulesDelegation(role, platformRole);
  if (!actorCanGovernCompanyRules && isCompanyRulesGovernorRole(parsed.data.role)) {
    return json(
      {
        ok: false,
        error: "FORBIDDEN",
        details: {
          message: "Seul un compte ADMIN ou GERANT peut créer un utilisateur avec un rôle donnant nativement accès à la modification des règles métier.",
        },
      },
      403,
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(parsed.data.password, 10);

    const user = await prisma.$transaction(async (tx) => {
      const createdUser = await tx.user.create({
        data: {
          email: parsed.data.email,
          password: hashedPassword,
          name: parsed.data.name,
          role: parsed.data.role,
          companyId,
        },
        select: userSelect,
      });

      await writePersonalDataAudit(tx, {
        companyId,
        actorUserId,
        action: "USER_CREATE",
        entityType: "USER",
        entityId: createdUser.id,
        summary: `Creation utilisateur ${createdUser.email}`,
        changedFields: ["email", "password", "name", "role", "companyId"],
        previous: null,
        next: {
          email: createdUser.email,
          password: "REDACTED",
          name: createdUser.name,
          role: createdUser.role,
          companyId: createdUser.companyId,
          depotId: createdUser.depotId,
        },
        details: {
          targetType: "user",
        },
      });

      return createdUser;
    });

    return ok(serializeDates(user), 201);
  } catch (e: unknown) {
    const mapped = prismaToHttp(e);
    if (mapped?.status === 409) {
      return conflict(mapped.error, { message: "Un utilisateur avec cet email existe déjà." });
    }

    return serverError(mapped ?? getErrorMessage(e));
  }
}
