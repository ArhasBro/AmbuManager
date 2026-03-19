import { PlatformRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { traceSupportAction } from "@/lib/services/audit/support-action-trace";

export type CreateDepotInput = {
  companyId: string;
  name: string;
  address: string | null;
  actorUserId?: string;
  actorPlatformRole?: PlatformRole | string | null;
};

export async function createDepot(input: CreateDepotInput) {
  return prisma.$transaction(async (tx) => {
    const depot = await tx.depot.create({
      data: {
        companyId: input.companyId,
        name: input.name,
        address: input.address,
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

    await traceSupportAction(tx, {
      companyId: input.companyId,
      actorUserId: input.actorUserId,
      actorPlatformRole: input.actorPlatformRole,
      action: "SUPPORT_CREATE_DEPOT",
      entityType: "DEPOT",
      entityId: depot.id,
      summary: `Support création du dépôt ${depot.name}`,
      payload: {
        module: "depots",
        changedFields: ["name", "address", "isActive"],
        previous: null,
        next: {
          name: depot.name,
          address: depot.address,
          isActive: depot.isActive,
        },
        details: {
          targetType: "depot",
        },
      },
    });

    return depot;
  });
}
