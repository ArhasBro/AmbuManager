import { z } from "zod";
import { VehicleType } from "@prisma/client";

export const createVehicleBodySchema = z.object({
  immatriculation: z
    .string()
    .trim()
    .min(1, "Immatriculation required")
    .transform((v) => v.toUpperCase()),
  type: z.nativeEnum(VehicleType),
});

export const deleteVehicleQuerySchema = z.object({
  id: z.string().min(1, "id required"),
});