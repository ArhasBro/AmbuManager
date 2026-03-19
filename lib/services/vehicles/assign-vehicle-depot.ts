import { PlatformRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { traceSupportAction } from "@/lib/services/audit/support-action-trace";

type AssignedVehicle = {
  id: string;
  immatriculation: string;
  type: string;
  status: string;
  companyId: string;
  depotId: string | null;
  depot: {
    id: string;
    name: string;
    isActive: boolean;
  } | null;
  createdAt: Date;
  updatedAt: Date;
};

const vehicleDepotSelect = {
  id: true,
  immatriculation: true,
  type: true,
  status: true,
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

export type AssignVehicleDepotInput = {
  vehicleId: string;
  companyId: string;
  depotId: string | null;
  actorUserId?: string;
  actorPlatformRole?: PlatformRole | string | null;
};

export type AssignVehicleDepotResult =
  | { status: "VEHICLE_NOT_FOUND" }
  | { status: "DEPOT_NOT_FOUND" }
  | { status: "OK"; vehicle: AssignedVehicle };

async function findVehicleByTenant(vehicleId: string, companyId: string) {
  return prisma.vehicle.findFirst({
    where: {
      id: vehicleId,
      companyId,
    },
    select: {
      id: true,
      companyId: true,
      depotId: true,
      immatriculation: true,
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

export async function assignVehicleDepot(input: AssignVehicleDepotInput): Promise<AssignVehicleDepotResult> {
  const existingVehicle = await findVehicleByTenant(input.vehicleId, input.companyId);
  if (!existingVehicle) return { status: "VEHICLE_NOT_FOUND" };

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

  const vehicle = await prisma.$transaction(async (tx) => {
    const updatedVehicle = await tx.vehicle.update({
      where: { id: existingVehicle.id },
      data: { depotId: input.depotId },
      select: vehicleDepotSelect,
    });

    await traceSupportAction(tx, {
      companyId: input.companyId,
      actorUserId: input.actorUserId,
      actorPlatformRole: input.actorPlatformRole,
      action: "SUPPORT_ASSIGN_VEHICLE_DEPOT",
      entityType: "VEHICLE",
      entityId: updatedVehicle.id,
      summary: `Support assignment du dépôt véhicule ${updatedVehicle.immatriculation}`,
      payload: {
        module: "vehicles",
        changedFields: ["depotId"],
        previous: {
          depotId: existingVehicle.depotId,
          depot: existingVehicle.depot
            ? {
                id: existingVehicle.depot.id,
                name: existingVehicle.depot.name,
                isActive: existingVehicle.depot.isActive,
              }
            : null,
        },
        next: {
          depotId: updatedVehicle.depotId,
          depot: updatedVehicle.depot
            ? {
                id: updatedVehicle.depot.id,
                name: updatedVehicle.depot.name,
                isActive: updatedVehicle.depot.isActive,
              }
            : null,
        },
        details: {
          targetType: "vehicle",
          immatriculation: existingVehicle.immatriculation,
          requestedDepotId: input.depotId,
          resolvedDepotId: nextDepot?.id ?? null,
          resolvedDepotName: nextDepot?.name ?? null,
        },
      },
    });

    return updatedVehicle;
  });

  return { status: "OK", vehicle };
}
