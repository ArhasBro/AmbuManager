import { prisma } from "@/lib/prisma";

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
    },
  });
}

export async function assignVehicleDepot(input: AssignVehicleDepotInput): Promise<AssignVehicleDepotResult> {
  const existingVehicle = await findVehicleByTenant(input.vehicleId, input.companyId);
  if (!existingVehicle) return { status: "VEHICLE_NOT_FOUND" };

  if (input.depotId !== null) {
    const depot = await prisma.depot.findFirst({
      where: {
        id: input.depotId,
        companyId: input.companyId,
        isActive: true,
      },
      select: {
        id: true,
        companyId: true,
      },
    });

    if (!depot) return { status: "DEPOT_NOT_FOUND" };
  }

  const vehicle = await prisma.vehicle.update({
    where: { id: existingVehicle.id },
    data: { depotId: input.depotId },
    select: vehicleDepotSelect,
  });

  return { status: "OK", vehicle };
}
