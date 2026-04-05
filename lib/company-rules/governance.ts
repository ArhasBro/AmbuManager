export const COMPANY_RULES_MANAGE_PERMISSION = "COMPANY_RULES_MANAGE" as const;

export function isCompanyRulesGovernorRole(role?: string | null): boolean {
  return role === "ADMIN" || role === "GERANT";
}

export function canGovernCompanyRulesDelegation(role?: string | null, platformRole?: string | null): boolean {
  if (platformRole === "SUPPORT") return false;
  return isCompanyRulesGovernorRole(role);
}

export function roleChangeTouchesCompanyRulesGovernance(
  currentRole?: string | null,
  nextRole?: string | null,
): boolean {
  if (!nextRole || currentRole === nextRole) return false;
  return isCompanyRulesGovernorRole(currentRole) || isCompanyRulesGovernorRole(nextRole);
}

export function permissionSetTouchesCompanyRulesGovernance(
  currentCodes: readonly string[],
  nextCodes: readonly string[],
): boolean {
  return currentCodes.includes(COMPANY_RULES_MANAGE_PERMISSION)
    !== nextCodes.includes(COMPANY_RULES_MANAGE_PERMISSION);
}
