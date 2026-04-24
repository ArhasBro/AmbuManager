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

const optionalTextSchema = (max: number) => z
  .string()
  .trim()
  .max(max)
  .transform((value) => value || null);

const optionalDailyTimeSchema = z
  .string()
  .trim()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "time must use HH:mm format")
  .nullable();

function hasIdentity(value: { name?: string | null; firstName?: string | null; lastName?: string | null }) {
  const displayName = value.name?.trim();
  const firstName = value.firstName?.trim();
  const lastName = value.lastName?.trim();
  return Boolean(displayName || firstName || lastName);
}

export const assignUserDepotBodySchema = z
  .object({
    depotId: z.string().uuid().nullable(),
  })
  .strict();

export const createUserBodySchema = z
  .object({
    email: z.string().trim().email("email invalid"),
    password: passwordPolicySchema,
    name: z.string().trim().min(1, "name required").max(160, "name too long").optional(),
    firstName: optionalTextSchema(80).optional(),
    lastName: optionalTextSchema(80).optional(),
    initials: optionalTextSchema(12).optional(),
    phone: optionalTextSchema(50).optional(),
    role: z.nativeEnum(Role),
    permissionCodes: permissionCodesSchema.optional(),
    depotId: z.string().uuid().nullable().optional(),
    isActive: z.boolean().optional(),
    isTrainee: z.boolean().optional(),
    dailyWorkStartTime: optionalDailyTimeSchema.optional(),
    dailyWorkEndTime: optionalDailyTimeSchema.optional(),
  })
  .strict()
  .refine(hasIdentity, {
    message: "At least name, firstName or lastName is required",
  })
  .superRefine((value, ctx) => {
    const hasStart = value.dailyWorkStartTime !== undefined && value.dailyWorkStartTime !== null;
    const hasEnd = value.dailyWorkEndTime !== undefined && value.dailyWorkEndTime !== null;
    if (hasStart !== hasEnd) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: hasStart ? ["dailyWorkEndTime"] : ["dailyWorkStartTime"],
        message: "daily work start and end times must be provided together",
      });
    }
  });

export const updateUserBodySchema = z
  .object({
    email: z.string().trim().email("email invalid").optional(),
    name: z.string().trim().min(1, "name required").max(160, "name too long").optional(),
    firstName: optionalTextSchema(80).optional(),
    lastName: optionalTextSchema(80).optional(),
    initials: optionalTextSchema(12).optional(),
    phone: optionalTextSchema(50).optional(),
    role: z.nativeEnum(Role).optional(),
    permissionCodes: permissionCodesSchema.optional(),
    isTrainee: z.boolean().optional(),
    dailyWorkStartTime: optionalDailyTimeSchema.optional(),
    dailyWorkEndTime: optionalDailyTimeSchema.optional(),
  })
  .strict()
  .refine(
    (value) => value.email !== undefined
      || value.name !== undefined
      || value.firstName !== undefined
      || value.lastName !== undefined
      || value.initials !== undefined
      || value.phone !== undefined
      || value.role !== undefined
      || value.permissionCodes !== undefined
      || value.isTrainee !== undefined
      || value.dailyWorkStartTime !== undefined
      || value.dailyWorkEndTime !== undefined,
    {
      message: "At least one editable field is required",
    },
  )
  .superRefine((value, ctx) => {
    const hasStart = value.dailyWorkStartTime !== undefined && value.dailyWorkStartTime !== null;
    const hasEnd = value.dailyWorkEndTime !== undefined && value.dailyWorkEndTime !== null;
    if (hasStart !== hasEnd) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: hasStart ? ["dailyWorkEndTime"] : ["dailyWorkStartTime"],
        message: "daily work start and end times must be provided together",
      });
    }
  });
