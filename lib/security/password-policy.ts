import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_MAX_LENGTH = 128;

export const PASSWORD_POLICY_MESSAGE =
  "Password must contain at least 12 characters, one lowercase letter, one uppercase letter, one digit and one special character.";

export const passwordPolicySchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, PASSWORD_POLICY_MESSAGE)
  .max(PASSWORD_MAX_LENGTH, `Password must contain at most ${PASSWORD_MAX_LENGTH} characters.`)
  .regex(/[a-z]/, PASSWORD_POLICY_MESSAGE)
  .regex(/[A-Z]/, PASSWORD_POLICY_MESSAGE)
  .regex(/[0-9]/, PASSWORD_POLICY_MESSAGE)
  .regex(/[^A-Za-z0-9]/, PASSWORD_POLICY_MESSAGE)
  .refine((value) => value.trim() === value, {
    message: "Password must not start or end with whitespace.",
  })
  .refine((value) => !/\s{2,}/.test(value), {
    message: "Password must not contain repeated whitespace.",
  });

export function isPasswordPolicyCompliant(value: string) {
  return passwordPolicySchema.safeParse(value).success;
}
