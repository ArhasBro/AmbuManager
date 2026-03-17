import { z } from "zod";

const depotNameSchema = z
  .string()
  .trim()
  .min(1, "name required")
  .max(160, "name too long");

const createDepotAddressSchema = z
  .string()
  .trim()
  .max(255, "address too long")
  .optional()
  .nullable()
  .transform((value) => {
    if (typeof value !== "string") return null;
    return value.length > 0 ? value : null;
  });

const updateDepotAddressSchema = z
  .union([
    z
      .string()
      .trim()
      .max(255, "address too long")
      .transform((value) => (value.length > 0 ? value : null)),
    z.null(),
  ])
  .optional();

export const createDepotBodySchema = z
  .object({
    name: depotNameSchema,
    address: createDepotAddressSchema,
  })
  .strict();

export const updateDepotBodySchema = z
  .object({
    name: depotNameSchema.optional(),
    address: updateDepotAddressSchema,
  })
  .strict()
  .refine((value) => value.name !== undefined || value.address !== undefined, {
    message: "At least one field must be provided",
  });
