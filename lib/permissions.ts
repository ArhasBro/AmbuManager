import { prisma } from "@/lib/prisma";
import type { AlphaPermissionCode } from "@/lib/permission-catalog";
import type { PlatformRole } from "@prisma/client";
import { isGlobalSupport } from "@/lib/rbac";

function hasNativeAccess(role?: string | null): boolean {
  return role === "ADMIN" || role === "GERANT";
}

export async function hasPermission(userId: string, code: AlphaPermissionCode): Promise<boolean> {
  const permission = await prisma.userPermission.findFirst({
    where: { userId, permission: { code } },
    select: { id: true },
  });
  return Boolean(permission);
}

export async function hasAnyPermission(userId: string, codes: readonly AlphaPermissionCode[]): Promise<boolean> {
  if (codes.length === 0) return false;
  const permission = await prisma.userPermission.findFirst({
    where: { userId, permission: { code: { in: [...codes] } } },
    select: { id: true },
  });
  return Boolean(permission);
}

async function hasPermissionAccess(params: {
  userId: string;
  role?: string | null;
  platformRole?: PlatformRole | string | null;
  codes: readonly AlphaPermissionCode[];
  allowSupport?: boolean;
}): Promise<boolean> {
  if (isGlobalSupport(params.platformRole)) return Boolean(params.allowSupport);
  if (hasNativeAccess(params.role)) return true;
  return hasAnyPermission(params.userId, params.codes);
}

export async function canViewSelfPlanning(userId: string, role?: string | null, platformRole?: PlatformRole | string | null): Promise<boolean> {
  return hasPermissionAccess({ userId, role, platformRole, codes: ["PLANNING_VIEW_SELF", "PLANNING_VIEW_GLOBAL"] });
}
export async function canViewGlobalPlanning(userId: string, role?: string | null, platformRole?: PlatformRole | string | null): Promise<boolean> {
  return hasPermissionAccess({ userId, role, platformRole, codes: ["PLANNING_VIEW_GLOBAL"] });
}
export async function canAutoSchedule(userId: string, role?: string | null, platformRole?: PlatformRole | string | null): Promise<boolean> {
  return hasPermissionAccess({ userId, role, platformRole, codes: ["PLANNING_AUTOSCHEDULE"] });
}
export async function canPublishAutoSchedule(userId: string, role?: string | null, platformRole?: PlatformRole | string | null): Promise<boolean> {
  return hasPermissionAccess({ userId, role, platformRole, codes: ["PLANNING_AUTOSCHEDULE_PUBLISH"] });
}
export async function canCancelAutoSchedule(userId: string, role?: string | null, platformRole?: PlatformRole | string | null): Promise<boolean> {
  return hasPermissionAccess({ userId, role, platformRole, codes: ["PLANNING_AUTOSCHEDULE_CANCEL", "PLANNING_AUTOSCHEDULE"] });
}
export async function canManageUsers(userId: string, role?: string | null, platformRole?: PlatformRole | string | null): Promise<boolean> {
  return hasPermissionAccess({ userId, role, platformRole, codes: ["USERS_MANAGE"] });
}
export async function canManageDepots(userId: string, role?: string | null, platformRole?: PlatformRole | string | null): Promise<boolean> {
  return hasPermissionAccess({ userId, role, platformRole, codes: ["DEPOTS_MANAGE"] });
}
export async function canManageVehicles(userId: string, role?: string | null, platformRole?: PlatformRole | string | null): Promise<boolean> {
  return hasPermissionAccess({ userId, role, platformRole, codes: ["VEHICLES_MANAGE"] });
}
export async function canManageTemplates(userId: string, role?: string | null, platformRole?: PlatformRole | string | null): Promise<boolean> {
  return hasPermissionAccess({ userId, role, platformRole, codes: ["TEMPLATES_MANAGE"] });
}
export async function canManageCompanyRules(userId: string, role?: string | null, platformRole?: PlatformRole | string | null): Promise<boolean> {
  return hasPermissionAccess({ userId, role, platformRole, codes: ["COMPANY_RULES_MANAGE"] });
}
export async function canViewAudit(userId: string, role?: string | null, platformRole?: PlatformRole | string | null): Promise<boolean> {
  return hasPermissionAccess({ userId, role, platformRole, codes: ["AUDIT_VIEW"], allowSupport: true });
}
export async function canExportPlanning(userId: string, role?: string | null, platformRole?: PlatformRole | string | null): Promise<boolean> {
  return hasPermissionAccess({ userId, role, platformRole, codes: ["PLANNING_EXPORT"] });
}
export async function canEditPlanning(userId: string, role?: string | null, platformRole?: PlatformRole | string | null): Promise<boolean> {
  return hasPermissionAccess({ userId, role, platformRole, codes: ["PLANNING_EDIT"] });
}
export async function canAccessAdminDashboard(userId: string, role?: string | null, platformRole?: PlatformRole | string | null): Promise<boolean> {
  return hasPermissionAccess({ userId, role, platformRole, codes: ["DASHBOARD_ADMIN_ACCESS"] });
}
export async function canAccessTerrainDashboard(userId: string, role?: string | null, platformRole?: PlatformRole | string | null): Promise<boolean> {
  return hasPermissionAccess({ userId, role, platformRole, codes: ["DASHBOARD_TERRAIN_ACCESS"] });
}
