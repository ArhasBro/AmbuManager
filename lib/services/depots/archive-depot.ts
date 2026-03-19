import { PlatformRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { traceSupportAction } from "@/lib/services/audit/support-action-trace";

type ArchivedDepot = {
  id: string;
  companyId: string;
  name: string;
  address: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ArchiveDepotInput = {
  id: string;
  companyId: string;
  actorUserId?: string;
  actorPlatformRole?: PlatformRole | string | null;
};

const depotSelect = {
  id: true,
  companyId: true,
  name: true,
  address: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} as const;

export async function archiveDepot(input: ArchiveDepotInput): Promise<ArchivedDepot | null> {
  const existing = await prisma.depot.findFirst({
    where: {
      id: input.id,
      companyId: input.companyId,
    },
    select: depotSelect,
  });

  if (!existing) return null;
  if (!existing.isActive) return existing;

  return prisma.$transaction(async (tx) => {
    const depot = await tx.depot.update({
      where: { id: existing.id },
      data: { isActive: false },
      select: depotSelect,
    });

    await traceSupportAction(tx, {
      companyId: input.companyId,
      actorUserId: input.actorUserId,
      actorPlatformRole: input.actorPlatformRole,
      action: "SUPPORT_ARCHIVE_DEPOT",
      entityType: "DEPOT",
      entityId: depot.id,
      summary: `Support archivage du dépôt ${depot.name}`,
      payload: {
        module: "depots",
        changedFields: ["isActive"],
        previous: {
          isActive: existing.isActive,
        },
        next: {
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
