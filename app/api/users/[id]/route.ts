import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { badRequest, conflict, forbidden, json, notFound, ok, serverError, unauthorized } from "@/lib/api/response";
import { prismaToHttp } from "@/lib/api/prisma-error";
import { authOptions } from "@/lib/auth";
import {
  canGovernCompanyRulesDelegation,
  permissionSetTouchesCompanyRulesGovernance,
  roleChangeTouchesCompanyRulesGovernance,
} from "@/lib/company-rules/governance";
import { ALPHA_PERMISSION_CODES, type AlphaPermissionCode } from "@/lib/permission-catalog";
import { canManageUsers } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { serializeDates } from "@/lib/serializers";
import { writePersonalDataAudit } from "@/lib/services/audit/personal-data-audit";
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
  firstName: true,
  lastName: true,
  initials: true,
  phone: true,
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
  isTrainee: true,
  dailyWorkStartTime: true,
  dailyWorkEndTime: true,
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

function samePermissionCodes(left: readonly AlphaPermissionCode[], right: readonly AlphaPermissionCode[]) {
  return left.length === right.length && left.every((code, index) => code === right[index]);
}

function buildDisplayName(input: {
  name?: string;
  firstName?: string | null;
  lastName?: string | null;
}, fallback: string) {
  const explicitName = input.name?.trim();
  if (explicitName) return explicitName;

  const parts = [input.firstName, input.lastName]
    .map((part) => part?.trim())
    .filter((part): part is string => Boolean(part));

  return parts.length > 0 ? parts.join(" ") : fallback;
}

function serializeEditableUser(user: EditableUserRecord) {
  const permissionCodes = normalizePermissionCodes(user.userPermissions.map((item) => item.permission.code));

  return serializeDates({
    id: user.id,
    name: user.name,
    firstName: user.firstName,
    lastName: user.lastName,
    initials: user.initials,
    phone: user.phone,
    email: user.email,
    role: user.role,
    companyId: user.companyId,
    depotId: user.depotId,
    depot: user.depot,
    isTrainee: user.isTrainee,
    dailyWorkStartTime: user.dailyWorkStartTime,
    dailyWorkEndTime: user.dailyWorkEndTime,
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

    const existingPermissionCodes = normalizePermissionCodes(existingUser.userPermissions.map((item) => item.permission.code));
    const nextPermissionCodes = parsedBody.data.permissionCodes;
    const nextNormalizedPermissionCodes = nextPermissionCodes !== undefined
      ? normalizePermissionCodes(nextPermissionCodes)
      : existingPermissionCodes;
    const nextRole = parsedBody.data.role ?? existingUser.role;
    const actorCanGovernCompanyRules = canGovernCompanyRulesDelegation(role, platformRole);

    if (!actorCanGovernCompanyRules) {
      const roleChangeTouchesGovernance = roleChangeTouchesCompanyRulesGovernance(existingUser.role, nextRole);
      const permissionChangeTouchesGovernance = nextPermissionCodes !== undefined
        && permissionSetTouchesCompanyRulesGovernance(existingPermissionCodes, nextNormalizedPermissionCodes);

      if (roleChangeTouchesGovernance || permissionChangeTouchesGovernance) {
        return json(
          {
            ok: false,
            error: "FORBIDDEN",
            details: {
              message: "Seuls les comptes ADMIN ou GERANT peuvent attribuer, retirer ou conferer le droit de modification des regles metier.",
            },
          },
          403,
        );
      }
    }

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
        message: "Certaines permissions demandees ne sont pas disponibles dans le catalogue ALPHA reel.",
      });
    }

    const changedFields = [
      ...(
        (
          parsedBody.data.name !== undefined
          || parsedBody.data.firstName !== undefined
          || parsedBody.data.lastName !== undefined
        )
        && buildDisplayName(
          {
            name: parsedBody.data.name,
            firstName: parsedBody.data.firstName === undefined ? existingUser.firstName : parsedBody.data.firstName,
            lastName: parsedBody.data.lastName === undefined ? existingUser.lastName : parsedBody.data.lastName,
          },
          existingUser.name,
        ) !== existingUser.name
          ? ["name"]
          : []
      ),
      ...(parsedBody.data.firstName !== undefined && parsedBody.data.firstName !== existingUser.firstName ? ["firstName"] : []),
      ...(parsedBody.data.lastName !== undefined && parsedBody.data.lastName !== existingUser.lastName ? ["lastName"] : []),
      ...(parsedBody.data.initials !== undefined && parsedBody.data.initials !== existingUser.initials ? ["initials"] : []),
      ...(parsedBody.data.phone !== undefined && parsedBody.data.phone !== existingUser.phone ? ["phone"] : []),
      ...(parsedBody.data.email !== undefined && parsedBody.data.email !== existingUser.email ? ["email"] : []),
      ...(parsedBody.data.role !== undefined && parsedBody.data.role !== existingUser.role ? ["role"] : []),
      ...(parsedBody.data.isTrainee !== undefined && parsedBody.data.isTrainee !== existingUser.isTrainee ? ["isTrainee"] : []),
      ...(parsedBody.data.dailyWorkStartTime !== undefined && parsedBody.data.dailyWorkStartTime !== existingUser.dailyWorkStartTime ? ["dailyWorkStartTime"] : []),
      ...(parsedBody.data.dailyWorkEndTime !== undefined && parsedBody.data.dailyWorkEndTime !== existingUser.dailyWorkEndTime ? ["dailyWorkEndTime"] : []),
      ...(nextPermissionCodes !== undefined && !samePermissionCodes(existingPermissionCodes, nextNormalizedPermissionCodes)
        ? ["permissionCodes"]
        : []),
    ];

    if (changedFields.length === 0) {
      return ok(serializeEditableUser(existingUser));
    }

    const updatedUser = await prisma.$transaction(async (tx) => {
      const nextName = buildDisplayName(
        {
          name: parsedBody.data.name,
          firstName: parsedBody.data.firstName === undefined ? existingUser.firstName : parsedBody.data.firstName,
          lastName: parsedBody.data.lastName === undefined ? existingUser.lastName : parsedBody.data.lastName,
        },
        existingUser.name,
      );

      await tx.user.update({
        where: { id: existingUser.id },
        data: {
          ...(changedFields.includes("name") ? { name: nextName } : {}),
          ...(parsedBody.data.firstName !== undefined ? { firstName: parsedBody.data.firstName } : {}),
          ...(parsedBody.data.lastName !== undefined ? { lastName: parsedBody.data.lastName } : {}),
          ...(parsedBody.data.initials !== undefined ? { initials: parsedBody.data.initials } : {}),
          ...(parsedBody.data.phone !== undefined ? { phone: parsedBody.data.phone } : {}),
          ...(parsedBody.data.email !== undefined ? { email: parsedBody.data.email } : {}),
          ...(parsedBody.data.role !== undefined ? { role: parsedBody.data.role } : {}),
          ...(parsedBody.data.isTrainee !== undefined ? { isTrainee: parsedBody.data.isTrainee } : {}),
          ...(parsedBody.data.dailyWorkStartTime !== undefined ? { dailyWorkStartTime: parsedBody.data.dailyWorkStartTime } : {}),
          ...(parsedBody.data.dailyWorkEndTime !== undefined ? { dailyWorkEndTime: parsedBody.data.dailyWorkEndTime } : {}),
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

      const nextUser = await tx.user.findFirst({
        where: {
          id: existingUser.id,
          companyId,
          isActive: true,
          platformRole: null,
          role: { not: null },
        },
        select: userSelect,
      });

      if (!nextUser) return null;

      await writePersonalDataAudit(tx, {
        companyId,
        actorUserId,
        action: "USER_UPDATE",
        entityType: "USER",
        entityId: nextUser.id,
        summary: `Modification utilisateur ${nextUser.email}`,
        changedFields,
        previous: {
          name: existingUser.name,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          initials: existingUser.initials,
          phone: existingUser.phone,
          email: existingUser.email,
          role: existingUser.role,
          isTrainee: existingUser.isTrainee,
          dailyWorkStartTime: existingUser.dailyWorkStartTime,
          dailyWorkEndTime: existingUser.dailyWorkEndTime,
          permissionCodes: existingPermissionCodes,
        },
        next: {
          name: nextUser.name,
          firstName: nextUser.firstName,
          lastName: nextUser.lastName,
          initials: nextUser.initials,
          phone: nextUser.phone,
          email: nextUser.email,
          role: nextUser.role,
          isTrainee: nextUser.isTrainee,
          dailyWorkStartTime: nextUser.dailyWorkStartTime,
          dailyWorkEndTime: nextUser.dailyWorkEndTime,
          permissionCodes: nextNormalizedPermissionCodes,
        },
        details: {
          targetType: "user",
        },
      });

      return nextUser;
    });

    if (!updatedUser) return notFound();

    return ok(serializeEditableUser(updatedUser));
  } catch (e: unknown) {
    const mapped = prismaToHttp(e);
    if (mapped?.status === 404) return notFound();
    if (mapped?.status === 409) {
      return conflict(mapped.error, { message: "Un utilisateur avec cet email existe deja." });
    }

    return serverError(mapped ?? getErrorMessage(e));
  }
}
