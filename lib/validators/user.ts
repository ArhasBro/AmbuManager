import { Role } from "@prisma/client";
import { z } from "zod";

export const assignUserDepotBodySchema = z
  .object({
    depotId: z.string().uuid().nullable(),
  })
  .strict();

export const createUserBodySchema = z
  .object({
    email: z.string().trim().email("email invalid"),
    password: z.string().min(1, "password required"),
    name: z.string().trim().min(1, "name required").max(160, "name too long"),
    role: z.nativeEnum(Role),
  })
  .strict();
