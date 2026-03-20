import { PlatformRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { traceSupportAction } from "@/lib/services/audit/support-action-trace";

type AssignedUser = {
  id: string;
  name: string;
  email: string;
  role: string | null;
  companyId: string | null;
  depotId: string | null;
  depot: {
    id: string;
    name: string;
    isActive: boolean;
  } | null;
  createdAt: Date;
  updatedAt: Date;
};

const userDepotSelect = {
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

export type AssignUserDepotInput = {
  userId: string;
  companyId: string;
  depotId: string | null;
  actorUserId?: string;
  actorPlatformRole?: PlatformRole | string | null;
};

export type AssignUserDepotResult =
  | { status: "USER_NOT_FOUND" }
  | { status: "DEPOT_NOT_FOUND" }
  | { status: "OK"; user: AssignedUser };

async function findUserByTenant(userId: string, companyId: string) {
  return prisma.user.findFirst({
    where: {
      id: userId,
      companyId,
      isActive: true,
      platformRole: null,
      role: { not: null },
    },
    select: {
      id: true,
      companyId: true,
      depotId: true,
      depot: {
        select: {
          id: true,
          name: true,
          isActive: true,
        },
      },
    },
  });
}

export async function assignUserDepot(input: AssignUserDepotInput): Promise<AssignUserDepotResult> {
  const existingUser = await findUserByTenant(input.userId, input.companyId);
  if (!existingUser) return { status: "USER_NOT_FOUND" };

  let nextDepot: { id: string; companyId: string; name: string; isActive: boolean } | null = null;

  if (input.depotId !== null) {
    nextDepot = await prisma.depot.findFirst({
      where: {
        id: input.depotId,
        companyId: input.companyId,
        isActive: true,
      },
      select: {
        id: true,
        companyId: true,
        name: true,
        isActive: true,
      },
    });

    if (!nextDepot) return { status: "DEPOT_NOT_FOUND" };
  }

  const user = await prisma.$transaction(async (tx) => {
    const updatedUser = await tx.user.update({
      where: { id: existingUser.id },
      data: { depotId: input.depotId },
      select: userDepotSelect,
    });

    await traceSupportAction(tx, {
      companyId: input.companyId,
      actorUserId: input.actorUserId,
      actorPlatformRole: input.actorPlatformRole,
      action: "SUPPORT_ASSIGN_USER_DEPOT",
      entityType: "USER",
      entityId: updatedUser.id,
      summary: `Support assignment du dépôt utilisateur ${updatedUser.id}`,
      payload: {
        module: "users",
        changedFields: ["depotId"],
        previous: {
          depotId: existingUser.depotId,
          depot: existingUser.depot
            ? {
                id: existingUser.depot.id,
                name: existingUser.depot.name,
                isActive: existingUser.depot.isActive,
              }
            : null,
        },
        next: {
          depotId: updatedUser.depotId,
          depot: updatedUser.depot
            ? {
                id: updatedUser.depot.id,
                name: updatedUser.depot.name,
                isActive: updatedUser.depot.isActive,
              }
            : null,
        },
        details: {
          targetType: "user",
          requestedDepotId: input.depotId,
          resolvedDepotId: nextDepot?.id ?? null,
          resolvedDepotName: nextDepot?.name ?? null,
        },
      },
    });

    return updatedUser;
  });

  return { status: "OK", user };
}
