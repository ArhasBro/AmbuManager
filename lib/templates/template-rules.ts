export type TemplateCategoryValue = "VSL" | "AMBULANCE" | "TAXI" | "GARDE" | string | null | undefined;
export type TemplateRoleValue = "ADMIN" | "GERANT" | "BUREAU" | "ADE" | "AA" | "TAXI" | "REGULATEUR" | string | null | undefined;
export type TemplateVehicleTypeValue = "AMBULANCE" | "VSL" | "TAXI" | string | null | undefined;

export type TemplateStaffingRuleInput = {
  category?: TemplateCategoryValue;
  requiredRole?: TemplateRoleValue;
  secondaryAllowedRoles?: readonly TemplateRoleValue[] | null;
  minStaffCount?: number | null;
};

const KNOWN_ROLE_VALUES = ["ADMIN", "GERANT", "BUREAU", "ADE", "AA", "TAXI", "REGULATEUR"] as const;

type KnownRoleValue = (typeof KNOWN_ROLE_VALUES)[number];

export function defaultMinStaffCountFromCategory(category: TemplateCategoryValue): 1 | 2 {
  return category === "AMBULANCE" || category === "GARDE" ? 2 : 1;
}

export function resolveTemplateMinStaffCount(minStaffCount: number | null | undefined, category: TemplateCategoryValue): 1 | 2 {
  if (minStaffCount === 2) return 2;
  if (minStaffCount === 1) return 1;
  return defaultMinStaffCountFromCategory(category);
}

export function normalizeTemplateColor(value: string | null | undefined): string | null {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  if (!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(trimmed)) return null;

  return trimmed.toUpperCase();
}

export function toKnownRoleValues(values: readonly TemplateRoleValue[] | null | undefined): KnownRoleValue[] {
  if (!Array.isArray(values)) return [];

  const unique = new Set<KnownRoleValue>();
  for (const value of values) {
    if (typeof value !== "string") continue;
    if ((KNOWN_ROLE_VALUES as readonly string[]).includes(value)) {
      unique.add(value as KnownRoleValue);
    }
  }

  return Array.from(unique);
}

export function getAllowedRolesForFirstSlot(template: TemplateStaffingRuleInput): KnownRoleValue[] {
  if (typeof template.requiredRole === "string" && (KNOWN_ROLE_VALUES as readonly string[]).includes(template.requiredRole)) {
    return [template.requiredRole as KnownRoleValue];
  }

  if (resolveTemplateMinStaffCount(template.minStaffCount, template.category) === 1) {
    return toKnownRoleValues(template.secondaryAllowedRoles);
  }

  return [];
}

export function getAllowedRolesForSecondSlot(template: TemplateStaffingRuleInput): KnownRoleValue[] {
  if (resolveTemplateMinStaffCount(template.minStaffCount, template.category) < 2) return [];
  return toKnownRoleValues(template.secondaryAllowedRoles);
}

export function getAllowedRolesForVehicleType(vehicleType: TemplateVehicleTypeValue): KnownRoleValue[] {
  switch (vehicleType) {
    case "AMBULANCE":
      return Array.from(new Set(["ADE", "AA"] as const));
    case "VSL":
      return Array.from(new Set(["AA", "ADE", "TAXI"] as const));
    case "TAXI":
      return ["TAXI"];
    default:
      return [];
  }
}

export function isRoleAllowedForVehicleType(
  vehicleType: TemplateVehicleTypeValue,
  role: TemplateRoleValue
): boolean {
  if (typeof role !== "string") return false;

  const allowed = getAllowedRolesForVehicleType(vehicleType);
  if (allowed.length === 0) return true;

  return allowed.includes(role as KnownRoleValue);
}

export function isRoleAllowedForSlot(
  template: TemplateStaffingRuleInput,
  slot: 1 | 2,
  role: TemplateRoleValue
): boolean {
  if (typeof role !== "string") return false;

  const allowed = slot === 1 ? getAllowedRolesForFirstSlot(template) : getAllowedRolesForSecondSlot(template);
  if (allowed.length === 0) return true;

  return allowed.includes(role as KnownRoleValue);
}

export function getCategoryTemplatePreset(category: TemplateCategoryValue) {
  switch (category) {
    case "AMBULANCE":
    case "GARDE":
      return {
        minStaffCount: 2 as const,
        requiredRole: "ADE",
        secondaryAllowedRoles: ["ADE", "AA"] as const,
        requiredVehicleType: "AMBULANCE",
      };
    case "TAXI":
      return {
        minStaffCount: 1 as const,
        requiredRole: "TAXI",
        secondaryAllowedRoles: ["TAXI"] as const,
        requiredVehicleType: "TAXI",
      };
    case "VSL":
      return {
        minStaffCount: 1 as const,
        requiredRole: null,
        secondaryAllowedRoles: ["AA", "ADE", "TAXI"] as const,
        requiredVehicleType: "VSL",
      };
    default:
      return {
        minStaffCount: defaultMinStaffCountFromCategory(category),
        requiredRole: null,
        secondaryAllowedRoles: [] as const,
        requiredVehicleType: null,
      };
  }
}
