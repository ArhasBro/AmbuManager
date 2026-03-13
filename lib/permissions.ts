import { prisma } from "@/lib/prisma";
import type { AlphaPermissionCode } from "@/lib/permission-catalog";

function hasNativeAccess(role?: string): boolean {
  return role === "ADMIN" || role === "GERANT";
}

export async function hasPermission(userId: string, code: AlphaPermissionCode): Promise<boolean> {
  const permission = await prisma.userPermission.findFirst({
    where: {
      userId,
      permission: { code },
    },
    select: { id: true },
  });

  return Boolean(permission);
}

export async function hasAnyPermission(userId: string, codes: readonly AlphaPermissionCode[]): Promise<boolean> {
  if (codes.length === 0) return false;

  const permission = await prisma.userPermission.findFirst({
    where: {
      userId,
      permission: { code: { in: [...codes] } },
    },
    select: { id: true },
  });

  return Boolean(permission);
}

async function hasPermissionAccess(params: {
  userId: string;
  role?: string;
  codes: readonly AlphaPermissionCode[];
}): Promise<boolean> {
  if (hasNativeAccess(params.role)) return true;
  return hasAnyPermission(params.userId, params.codes);
}

export async function canAutoSchedule(userId: string, role?: string): Promise<boolean> {
  return hasPermissionAccess({ userId, role, codes: ["PLANNING_AUTOSCHEDULE"] });
}

export async function canPublishAutoSchedule(userId: string, role?: string): Promise<boolean> {
  return hasPermissionAccess({ userId, role, codes: ["PLANNING_AUTOSCHEDULE_PUBLISH"] });
}

export async function canCancelAutoSchedule(userId: string, role?: string): Promise<boolean> {
  return hasPermissionAccess({
    userId,
    role,
    codes: ["PLANNING_AUTOSCHEDULE_CANCEL", "PLANNING_AUTOSCHEDULE"],
  });
}

export async function canManageUsers(userId: string, role?: string): Promise<boolean> {
  return hasPermissionAccess({ userId, role, codes: ["USERS_MANAGE"] });
}

export async function canManageVehicles(userId: string, role?: string): Promise<boolean> {
  return hasPermissionAccess({ userId, role, codes: ["VEHICLES_MANAGE"] });
}

export async function canManageCompanyRules(userId: string, role?: string): Promise<boolean> {
  return hasPermissionAccess({ userId, role, codes: ["COMPANY_RULES_MANAGE"] });
}

export async function canViewAudit(userId: string, role?: string): Promise<boolean> {
  return hasPermissionAccess({ userId, role, codes: ["AUDIT_VIEW"] });
}

export async function canEditPlanning(userId: string, role?: string): Promise<boolean> {
  return hasPermissionAccess({ userId, role, codes: ["PLANNING_EDIT"] });
}

export async function canAccessAdminDashboard(userId: string, role?: string): Promise<boolean> {
  return hasPermissionAccess({ userId, role, codes: ["DASHBOARD_ADMIN_ACCESS"] });
}
