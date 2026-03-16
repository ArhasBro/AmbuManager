import { z } from "zod";

export const createDepotBodySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "name required")
      .max(160, "name too long"),
    address: z
      .string()
      .trim()
      .max(255, "address too long")
      .optional()
      .nullable()
      .transform((value) => {
        if (typeof value !== "string") return null;
        return value.length > 0 ? value : null;
      }),
  })
  .strict();
