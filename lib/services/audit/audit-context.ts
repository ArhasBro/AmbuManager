import { PlatformRole } from "@prisma/client";

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isSupportActor(platformRole?: PlatformRole | string | null): boolean {
  return platformRole === PlatformRole.SUPPORT;
}

export function trimOptionalString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

export function requestedCompanyIdFromUrl(req: Request | URL | string): string | null {
  const url = typeof req === "string" ? new URL(req) : req instanceof URL ? req : new URL(req.url);
  return trimOptionalString(url.searchParams.get("companyId"));
}

export function resolveAuditCompanyId(input: {
  sessionCompanyId?: string | null;
  actorPlatformRole?: PlatformRole | string | null;
  requestedCompanyId?: string | null;
  fallbackCompanyId?: string | null;
}): string | null {
  if (trimOptionalString(input.sessionCompanyId)) return trimOptionalString(input.sessionCompanyId);
  if (!isSupportActor(input.actorPlatformRole)) return null;
  return trimOptionalString(input.requestedCompanyId) ?? trimOptionalString(input.fallbackCompanyId);
}
