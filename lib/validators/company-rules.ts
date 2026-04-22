import { RuleMode } from "@prisma/client";
import { z } from "zod";

export const companyRulesGetQuerySchema = z
  .object({
    keys: z.string().optional(),
  })
  .strict();

export const companyRulesPatchBodySchema = z
  .object({
    parameterId: z.string().min(1).optional(),
    key: z.string().min(1).optional(),
    value: z.string(),
    mode: z.nativeEnum(RuleMode).optional(),
  })
  .strict()
  .refine((data) => Boolean(data.parameterId || data.key), {
    message: "parameterId ou key est obligatoire.",
    path: ["parameterId"],
  });

export type CompanyRulesGetQuery = z.infer<typeof companyRulesGetQuerySchema>;
export type CompanyRulesPatchBody = z.infer<typeof companyRulesPatchBodySchema>;
