import { z } from "zod";
import { VehicleStatus, VehicleType } from "@prisma/client";

const optionalDocumentDateSchema = z.union([z.coerce.date(), z.null()]).optional();

export const createVehicleBodySchema = z.object({
  immatriculation: z
    .string()
    .trim()
    .min(1, "Immatriculation required")
    .transform((v) => v.toUpperCase()),
  type: z.nativeEnum(VehicleType),
  status: z.nativeEnum(VehicleStatus),
  insuranceExpiresAt: optionalDocumentDateSchema,
  technicalInspectionExpiresAt: optionalDocumentDateSchema,
  registrationDocumentPresent: z.boolean().optional(),
  sanitaryApprovalExpiresAt: optionalDocumentDateSchema,
});

export const updateVehicleBodySchema = z
  .object({
    immatriculation: z
      .string()
      .trim()
      .min(1, "Immatriculation required")
      .transform((v) => v.toUpperCase())
      .optional(),
    type: z.nativeEnum(VehicleType).optional(),
    status: z.nativeEnum(VehicleStatus).optional(),
    insuranceExpiresAt: optionalDocumentDateSchema,
    technicalInspectionExpiresAt: optionalDocumentDateSchema,
    registrationDocumentPresent: z.boolean().optional(),
    sanitaryApprovalExpiresAt: optionalDocumentDateSchema,
  })
  .strict()
  .refine(
    (value) =>
      value.immatriculation !== undefined ||
      value.type !== undefined ||
      value.status !== undefined ||
      value.insuranceExpiresAt !== undefined ||
      value.technicalInspectionExpiresAt !== undefined ||
      value.registrationDocumentPresent !== undefined ||
      value.sanitaryApprovalExpiresAt !== undefined,
    {
      message: "At least one editable field is required",
    }
  );

export const assignVehicleDepotBodySchema = z
  .object({
    depotId: z.string().uuid().nullable(),
  })
  .strict();

export const deleteVehicleQuerySchema = z.object({
  id: z.string().min(1, "id required"),
});
