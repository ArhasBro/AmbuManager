import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { badRequest, conflict, forbidden, notFound, ok, serverError, unauthorized } from "@/lib/api/response";
import { prismaToHttp } from "@/lib/api/prisma-error";
import { authOptions } from "@/lib/auth";
import { ALPHA_PERMISSION_CODES, type AlphaPermissionCode } from "@/lib/permission-catalog";
import { canManageUsers } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { serializeDates } from "@/lib/serializers";
import { updateUserBodySchema } from "@/lib/validators/user";

const paramsSchema = z
  .object({
    id: z.string().uuid(),
  })
  .strict();

const alphaPermissionOrder = new Map(ALPHA_PERMISSION_CODES.map((code, index) => [code, index]));

const userSelect = Prisma.validator<Prisma.UserSelect>()({
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
  userPermissions: {
    where: {
      permission: {
        code: { in: [...ALPHA_PERMISSION_CODES] },
      },
    },
    select: {
      permission: {
        select: {
          code: true,
        },
      },
    },
  },
});

type EditableUserRecord = Prisma.UserGetPayload<{ select: typeof userSelect }>;

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  try {
    return JSON.stringify(e);
  } catch {
    return "Unknown error";
  }
}

function normalizePermissionCodes(codes: readonly string[]): AlphaPermissionCode[] {
  return [...codes]
    .filter((code): code is AlphaPermissionCode => alphaPermissionOrder.has(code as AlphaPermissionCode))
    .sort((a, b) => (alphaPermissionOrder.get(a) ?? Number.MAX_SAFE_INTEGER) - (alphaPermissionOrder.get(b) ?? Number.MAX_SAFE_INTEGER));
}

function serializeEditableUser(user: EditableUserRecord) {
  const permissionCodes = normalizePermissionCodes(user.userPermissions.map((item) => item.permission.code));

  return serializeDates({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    companyId: user.companyId,
    depotId: user.depotId,
    depot: user.depot,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    permissionCodes,
  });
}

async function findEditableUser(id: string, companyId: string) {
  return prisma.user.findFirst({
    where: {
      id,
      companyId,
      isActive: true,
      platformRole: null,
      role: { not: null },
    },
    select: userSelect,
  });
}

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const actorUserId = session?.user?.id;
  const companyId = session?.user?.companyId;
  const role = session?.user?.role;
  const platformRole = session?.user?.platformRole;

  if (!actorUserId || !companyId) return unauthorized();
  if (!(await canManageUsers(actorUserId, role, platformRole))) return forbidden();

  const rawParams = await ctx.params.catch(() => null);
  const parsedParams = paramsSchema.safeParse(rawParams);
  if (!parsedParams.success) return badRequest("VALIDATION_ERROR", parsedParams.error.flatten());

  try {
    const user = await findEditableUser(parsedParams.data.id, companyId);
    if (!user) return notFound();

    return ok(serializeEditableUser(user));
  } catch (e: unknown) {
    return serverError(getErrorMessage(e));
  }
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const actorUserId = session?.user?.id;
  const companyId = session?.user?.companyId;
  const role = session?.user?.role;
  const platformRole = session?.user?.platformRole;

  if (!actorUserId || !companyId) return unauthorized();
  if (!(await canManageUsers(actorUserId, role, platformRole))) return forbidden();

  const rawParams = await ctx.params.catch(() => null);
  const parsedParams = paramsSchema.safeParse(rawParams);
  if (!parsedParams.success) return badRequest("VALIDATION_ERROR", parsedParams.error.flatten());

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest("INVALID_JSON");
  }

  const parsedBody = updateUserBodySchema.safeParse(body);
  if (!parsedBody.success) return badRequest("VALIDATION_ERROR", parsedBody.error.flatten());

  try {
    const existingUser = await findEditableUser(parsedParams.data.id, companyId);
    if (!existingUser) return notFound();

    const nextPermissionCodes = parsedBody.data.permissionCodes;
    const alphaPermissions = nextPermissionCodes !== undefined
      ? await prisma.permission.findMany({
          where: { code: { in: [...ALPHA_PERMISSION_CODES] } },
          select: { id: true, code: true },
        })
      : [];

    const alphaPermissionIds = alphaPermissions.map((permission) => permission.id);
    const resolvedPermissionIds = nextPermissionCodes !== undefined
      ? alphaPermissions
          .filter((permission) => nextPermissionCodes.includes(permission.code as AlphaPermissionCode))
          .map((permission) => permission.id)
      : [];

    if (nextPermissionCodes !== undefined && resolvedPermissionIds.length !== nextPermissionCodes.length) {
      return badRequest("VALIDATION_ERROR", {
        message: "Certaines permissions demandées ne sont pas disponibles dans le catalogue ALPHA réel.",
      });
    }

    const updatedUser = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: existingUser.id },
        data: {
          ...(parsedBody.data.name !== undefined ? { name: parsedBody.data.name } : {}),
          ...(parsedBody.data.email !== undefined ? { email: parsedBody.data.email } : {}),
          ...(parsedBody.data.role !== undefined ? { role: parsedBody.data.role } : {}),
        },
      });

      if (nextPermissionCodes !== undefined) {
        if (alphaPermissionIds.length > 0) {
          await tx.userPermission.deleteMany({
            where: {
              userId: existingUser.id,
              permissionId: { in: alphaPermissionIds },
            },
          });
        }

        if (resolvedPermissionIds.length > 0) {
          await tx.userPermission.createMany({
            data: resolvedPermissionIds.map((permissionId) => ({
              userId: existingUser.id,
              permissionId,
            })),
            skipDuplicates: true,
          });
        }
      }

      return tx.user.findFirst({
        where: {
          id: existingUser.id,
          companyId,
          isActive: true,
          platformRole: null,
          role: { not: null },
        },
        select: userSelect,
      });
    });

    if (!updatedUser) return notFound();

    return ok(serializeEditableUser(updatedUser));
  } catch (e: unknown) {
    const mapped = prismaToHttp(e);
    if (mapped?.status === 404) return notFound();
    if (mapped?.status === 409) {
      return conflict(mapped.error, { message: "Un utilisateur avec cet email existe déjà." });
    }

    return serverError(mapped ?? getErrorMessage(e));
  }
}
