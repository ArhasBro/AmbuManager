import { PlatformRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { traceSupportAction } from "@/lib/services/audit/support-action-trace";

export type UpdateDepotInput = {
  id: string;
  companyId: string;
  name?: string;
  address?: string | null;
  actorUserId?: string;
  actorPlatformRole?: PlatformRole | string | null;
};

export async function updateDepot(input: UpdateDepotInput) {
  const existing = await prisma.depot.findFirst({
    where: {
      id: input.id,
      companyId: input.companyId,
    },
    select: {
      id: true,
      name: true,
      address: true,
      isActive: true,
    },
  });

  if (!existing) return null;

  return prisma.$transaction(async (tx) => {
    const depot = await tx.depot.update({
      where: { id: existing.id },
      data: {
        ...(input.name !== undefined ? { name: input.name } : {}),
        ...(input.address !== undefined ? { address: input.address } : {}),
      },
      select: {
        id: true,
        companyId: true,
        name: true,
        address: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const changedFields = [
      ...(input.name !== undefined && input.name !== existing.name ? ["name"] : []),
      ...(input.address !== undefined && input.address !== existing.address ? ["address"] : []),
    ];

    await traceSupportAction(tx, {
      companyId: input.companyId,
      actorUserId: input.actorUserId,
      actorPlatformRole: input.actorPlatformRole,
      action: "SUPPORT_UPDATE_DEPOT",
      entityType: "DEPOT",
      entityId: depot.id,
      summary: `Support mise à jour du dépôt ${depot.name}`,
      payload: {
        module: "depots",
        changedFields,
        previous: {
          name: existing.name,
          address: existing.address,
        },
        next: {
          name: depot.name,
          address: depot.address,
        },
        details: {
          targetType: "depot",
        },
      },
    });

    return depot;
  });
}
