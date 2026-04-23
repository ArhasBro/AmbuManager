import { Role } from "@prisma/client";
import { z } from "zod";

import { ALPHA_PERMISSION_CODES } from "@/lib/permission-catalog";
import { passwordPolicySchema } from "@/lib/security/password-policy";

const alphaPermissionCodeSet = new Set<string>(ALPHA_PERMISSION_CODES);

const permissionCodesSchema = z
  .array(z.string())
  .max(ALPHA_PERMISSION_CODES.length, "too many permission codes")
  .transform((codes) => Array.from(new Set(codes)))
  .superRefine((codes, ctx) => {
    for (const code of codes) {
      if (!alphaPermissionCodeSet.has(code)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `invalid permission code: ${code}`,
        });
      }
    }
  });

export const assignUserDepotBodySchema = z
  .object({
    depotId: z.string().uuid().nullable(),
  })
  .strict();

export const createUserBodySchema = z
  .object({
    email: z.string().trim().email("email invalid"),
    password: passwordPolicySchema,
    name: z.string().trim().min(1, "name required").max(160, "name too long"),
    role: z.nativeEnum(Role),
  })
  .strict();

export const updateUserBodySchema = z
  .object({
    email: z.string().trim().email("email invalid").optional(),
    name: z.string().trim().min(1, "name required").max(160, "name too long").optional(),
    role: z.nativeEnum(Role).optional(),
    permissionCodes: permissionCodesSchema.optional(),
  })
  .strict()
  .refine(
    (value) => value.email !== undefined
      || value.name !== undefined
      || value.role !== undefined
      || value.permissionCodes !== undefined,
    {
      message: "At least one editable field is required",
    },
  );
