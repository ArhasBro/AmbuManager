import { RuleMode } from "@prisma/client";

import { COMPANY_PARAMETER_KEYS, parsePositiveNumberCompanyValue } from "@/lib/company-rules/catalog";

export type StoredCompanyRuleReader = {
  companyRule: {
    findUnique(args: {
      where: { companyId_key: { companyId: string; key: string } };
      select: { value: true; mode: true };
    }): Promise<{ value: string; mode: RuleMode } | null>;
  };
};

export type LoadedMinRestRule =
  | { kind: "DISABLED" }
  | { kind: "OK"; rule: { mode: RuleMode; hours: number } }
  | { kind: "CONFIG_ERROR"; message: string };

export function parseMinRestRuleRecord(
  record: { value: string; mode: RuleMode } | null | undefined
): LoadedMinRestRule {
  if (!record) return { kind: "DISABLED" };
  if (record.mode === RuleMode.OFF) return { kind: "DISABLED" };

  const hours = parsePositiveNumberCompanyValue(record.value);
  if (hours === null) {
    return {
      kind: "CONFIG_ERROR",
      message: `CompanyRule ${COMPANY_PARAMETER_KEYS.PLANNING_MIN_REST_HOURS} has invalid value "${record.value}" (expected positive number)`,
    };
  }

  return {
    kind: "OK",
    rule: {
      mode: record.mode,
      hours,
    },
  };
}

export async function loadMinRestCompanyRule(
  db: StoredCompanyRuleReader,
  companyId: string
): Promise<LoadedMinRestRule> {
  const rule = await db.companyRule.findUnique({
    where: {
      companyId_key: {
        companyId,
        key: COMPANY_PARAMETER_KEYS.PLANNING_MIN_REST_HOURS,
      },
    },
    select: {
      value: true,
      mode: true,
    },
  });

  return parseMinRestRuleRecord(rule);
}
