import { z } from "zod";

const reasonSchema = z
  .string()
  .trim()
  .max(160, "reason too long")
  .transform((value) => value || null);

export const listUserAbsencesQuerySchema = z
  .object({
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
    limit: z.coerce.number().int().min(1).max(500).optional().default(100),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (value.from && value.to && value.from >= value.to) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["to"],
        message: "to must be greater than from",
      });
    }
  });

export const createUserAbsenceBodySchema = z
  .object({
    reason: reasonSchema.optional(),
    startAt: z.coerce.date(),
    endAt: z.coerce.date(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (value.startAt >= value.endAt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endAt"],
        message: "endAt must be greater than startAt",
      });
    }
  });

export const updateUserAbsenceBodySchema = z
  .object({
    reason: reasonSchema.nullable().optional(),
    startAt: z.coerce.date().optional(),
    endAt: z.coerce.date().optional(),
  })
  .strict()
  .refine(
    (value) => value.reason !== undefined || value.startAt !== undefined || value.endAt !== undefined,
    {
      message: "At least one editable field is required",
    }
  );
