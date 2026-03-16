import { z } from "zod";

export const assignUserDepotBodySchema = z
  .object({
    depotId: z.string().uuid().nullable(),
  })
  .strict();
