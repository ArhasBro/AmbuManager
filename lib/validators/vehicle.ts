import { z } from "zod";
import { VehicleStatus, VehicleType } from "@prisma/client";

export const createVehicleBodySchema = z.object({
  immatriculation: z
    .string()
    .trim()
    .min(1, "Immatriculation required")
    .transform((v) => v.toUpperCase()),
  type: z.nativeEnum(VehicleType),
  status: z.nativeEnum(VehicleStatus),
});

export const assignVehicleDepotBodySchema = z
  .object({
    depotId: z.string().uuid().nullable(),
  })
  .strict();

export const deleteVehicleQuerySchema = z.object({
  id: z.string().min(1, "id required"),
});
