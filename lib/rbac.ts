import { PlatformRole } from "@prisma/client";

export function isGlobalSupport(platformRole?: PlatformRole | string | null) {
  return platformRole === PlatformRole.SUPPORT;
}

export function requireRole(
  userRole: string | null | undefined,
  allowed: readonly string[],
  options?: {
    platformRole?: PlatformRole | string | null;
    allowGlobalSupport?: boolean;
  }
) {
  if (options?.allowGlobalSupport && isGlobalSupport(options.platformRole)) return true;
  if (!userRole) return false;
  return allowed.includes(userRole);
}
