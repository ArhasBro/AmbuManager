import { PlatformRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { traceSupportAction } from "@/lib/services/audit/support-action-trace";

type ArchivedVehicle = {
  id: string;
  immatriculation: string;
  type: string;
  status: string;
  depotId: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  depot: {
    id: string;
    name: string;
    isActive: boolean;
  } | null;
};

export type ArchiveVehicleInput = {
  id: string;
  companyId: string;
  actorUserId?: string;
  actorPlatformRole?: PlatformRole | string | null;
};

const archivedVehicleSelect = {
  id: true,
  immatriculation: true,
  type: true,
  status: true,
  depotId: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  depot: {
    select: {
      id: true,
      name: true,
      isActive: true,
    },
  },
} as const;

export async function archiveVehicle(input: ArchiveVehicleInput): Promise<ArchivedVehicle | null> {
  const existing = await prisma.vehicle.findFirst({
    where: {
      id: input.id,
      companyId: input.companyId,
    },
    select: archivedVehicleSelect,
  });

  if (!existing) return null;
  if (!existing.isActive) return existing;

  return prisma.$transaction(async (tx) => {
    const vehicle = await tx.vehicle.update({
      where: { id: existing.id },
      data: { isActive: false },
      select: archivedVehicleSelect,
    });

    await traceSupportAction(tx, {
      companyId: input.companyId,
      actorUserId: input.actorUserId,
      actorPlatformRole: input.actorPlatformRole,
      action: "SUPPORT_ARCHIVE_VEHICLE",
      entityType: "VEHICLE",
      entityId: vehicle.id,
      summary: `Support archivage véhicule ${vehicle.immatriculation}`,
      payload: {
        module: "vehicles",
        changedFields: ["isActive"],
        previous: {
          isActive: existing.isActive,
        },
        next: {
          isActive: vehicle.isActive,
        },
        details: {
          targetType: "vehicle",
          immatriculation: vehicle.immatriculation,
        },
      },
    });

    return vehicle;
  });
}
