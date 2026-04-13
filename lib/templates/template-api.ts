import { PlanningTemplateCategory, Role, VehicleType } from "@prisma/client";
import { z } from "zod";

import { defaultMinStaffCountFromCategory, normalizeTemplateColor } from "@/lib/templates/template-rules";

export const timeStringSchema = z
  .string()
  .trim()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format. Expected HH:MM.");

export const templateColorSchema = z
  .string()
  .trim()
  .regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Invalid color. Expected #RGB or #RRGGBB.");

const secondaryAllowedRolesSchema = z.array(z.nativeEnum(Role)).max(7, "too many secondary roles");
const minStaffCountSchema = z.number().int().min(1).max(2);

export const listTemplateQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(500).optional().default(200),
  isActive: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => (value === undefined ? undefined : value === "true")),
  category: z.nativeEnum(PlanningTemplateCategory).optional(),
  includeArchived: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => value === "true"),
});

export const createTemplateBodySchema = z
  .object({
    name: z.string().trim().min(1, "name required").max(160, "name too long"),
    category: z.nativeEnum(PlanningTemplateCategory),
    requiredRole: z.nativeEnum(Role).nullable().optional(),
    secondaryAllowedRoles: secondaryAllowedRolesSchema.optional(),
    minStaffCount: minStaffCountSchema.optional(),
    requiredVehicleType: z.nativeEnum(VehicleType).nullable().optional(),
    isActive: z.boolean().optional(),
    isTimeDefined: z.boolean().optional(),
    startTime: timeStringSchema.nullable().optional(),
    endTime: timeStringSchema.nullable().optional(),
    crossesMidnight: z.boolean().optional(),
    color: templateColorSchema.nullable().optional(),
  })
  .strict();

export const updateTemplateBodySchema = z
  .object({
    name: z.string().trim().min(1, "name required").max(160, "name too long").optional(),
    category: z.nativeEnum(PlanningTemplateCategory).optional(),
    requiredRole: z.nativeEnum(Role).nullable().optional(),
    secondaryAllowedRoles: secondaryAllowedRolesSchema.optional(),
    minStaffCount: minStaffCountSchema.nullable().optional(),
    requiredVehicleType: z.nativeEnum(VehicleType).nullable().optional(),
    isActive: z.boolean().optional(),
    isTimeDefined: z.boolean().optional(),
    startTime: timeStringSchema.nullable().optional(),
    endTime: timeStringSchema.nullable().optional(),
    crossesMidnight: z.boolean().optional(),
    color: templateColorSchema.nullable().optional(),
  })
  .strict()
  .refine(
    (value) =>
      value.name !== undefined ||
      value.category !== undefined ||
      value.requiredRole !== undefined ||
      value.secondaryAllowedRoles !== undefined ||
      value.minStaffCount !== undefined ||
      value.requiredVehicleType !== undefined ||
      value.isActive !== undefined ||
      value.isTimeDefined !== undefined ||
      value.startTime !== undefined ||
      value.endTime !== undefined ||
      value.crossesMidnight !== undefined ||
      value.color !== undefined,
    {
      message: "At least one editable field is required",
    }
  );

export const templateSelect = {
  id: true,
  name: true,
  category: true,
  requiredRole: true,
  secondaryAllowedRoles: true,
  minStaffCount: true,
  requiredVehicleType: true,
  isActive: true,
  archivedAt: true,
  isTimeDefined: true,
  startTime: true,
  endTime: true,
  crossesMidnight: true,
  color: true,
  createdAt: true,
  updatedAt: true,
} as const;

export type TemplateCreateBody = z.infer<typeof createTemplateBodySchema>;
export type TemplateUpdateBody = z.infer<typeof updateTemplateBodySchema>;

export type TemplateResolvedState = {
  name: string;
  category: PlanningTemplateCategory;
  requiredRole: Role | null;
  secondaryAllowedRoles: Role[];
  minStaffCount: number | null;
  requiredVehicleType: VehicleType | null;
  isActive: boolean;
  archivedAt: Date | null;
  isTimeDefined: boolean;
  startTime: string | null;
  endTime: string | null;
  crossesMidnight: boolean;
  color: string | null;
};

function dedupeRoles(values: Role[] | undefined): Role[] {
  return Array.from(new Set(values ?? []));
}

export function resolveTemplateCreateInput(input: TemplateCreateBody): TemplateResolvedState {
  const isTimeDefined = input.isTimeDefined ?? true;
  const startTime = isTimeDefined ? (input.startTime ?? null) : null;
  const endTime = isTimeDefined ? (input.endTime ?? null) : null;

  return {
    name: input.name,
    category: input.category,
    requiredRole: input.requiredRole ?? null,
    secondaryAllowedRoles: dedupeRoles(input.secondaryAllowedRoles),
    minStaffCount: input.minStaffCount ?? defaultMinStaffCountFromCategory(input.category),
    requiredVehicleType: input.requiredVehicleType ?? null,
    isActive: input.isActive ?? true,
    archivedAt: null,
    isTimeDefined,
    startTime,
    endTime,
    crossesMidnight: isTimeDefined ? input.crossesMidnight ?? false : false,
    color: input.color === undefined ? null : normalizeTemplateColor(input.color),
  };
}

export function validateResolvedTemplateState(input: TemplateResolvedState) {
  const issues: Array<{ path: string[]; message: string }> = [];

  if (input.isTimeDefined) {
    if (!input.startTime) issues.push({ path: ["startTime"], message: "startTime required when isTimeDefined=true" });
    if (!input.endTime) issues.push({ path: ["endTime"], message: "endTime required when isTimeDefined=true" });
  } else {
    if (input.startTime !== null) issues.push({ path: ["startTime"], message: "startTime must be null when isTimeDefined=false" });
    if (input.endTime !== null) issues.push({ path: ["endTime"], message: "endTime must be null when isTimeDefined=false" });
    if (input.crossesMidnight) {
      issues.push({ path: ["crossesMidnight"], message: "crossesMidnight must be false when isTimeDefined=false" });
    }
  }

  if (input.minStaffCount !== null && input.minStaffCount !== 1 && input.minStaffCount !== 2) {
    issues.push({ path: ["minStaffCount"], message: "minStaffCount must be 1 or 2 in current scope" });
  }

  if (input.color !== null && normalizeTemplateColor(input.color) === null) {
    issues.push({ path: ["color"], message: "Invalid color" });
  }

  return issues;
}
