import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { badRequest, forbidden, ok, unauthorized } from "@/lib/api/response";
import { canViewAudit } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { requestedCompanyIdFromUrl, resolveAuditCompanyId } from "@/lib/services/audit/audit-context";

const actorUserInclude = { actorUser: { select: { id: true, name: true, email: true } } } as const;

type PlanningAuditLogWithActor = Prisma.PlanningAuditLogGetPayload<{ include: typeof actorUserInclude }>;
type LoginAuditLogWithActor = Prisma.LoginAuditLogGetPayload<{ include: typeof actorUserInclude }>;

const querySchema = z.object({
  companyId: z.string().uuid().optional(),
  entityType: z.string().trim().min(1).max(64).optional(),
  entityId: z.string().trim().min(1).max(191).optional(),
  limit: z.coerce.number().int().min(1).max(500).default(100),
});

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const actorUserId = session?.user?.id;
  const role = session?.user?.role;
  const platformRole = session?.user?.platformRole;
  if (!actorUserId) return unauthorized();
  if (!(await canViewAudit(actorUserId, role, platformRole))) return forbidden();
  const url = new URL(req.url);
  const parsed = querySchema.safeParse({
    companyId: requestedCompanyIdFromUrl(url) ?? undefined,
    entityType: url.searchParams.get("entityType") ?? undefined,
    entityId: url.searchParams.get("entityId") ?? undefined,
    limit: url.searchParams.get("limit") ?? undefined,
  });
  if (!parsed.success) return badRequest("VALIDATION_ERROR", parsed.error.flatten());
  const companyId = resolveAuditCompanyId({ sessionCompanyId: session?.user?.companyId, actorPlatformRole: platformRole, requestedCompanyId: parsed.data.companyId ?? null });
  if (!companyId) return unauthorized();
  const [planningLogs, loginLogs] = await Promise.all([
    prisma.planningAuditLog.findMany({ where: { companyId, ...(parsed.data.entityType ? { entityType: parsed.data.entityType } : {}), ...(parsed.data.entityId ? { entityId: parsed.data.entityId } : {}) }, include: actorUserInclude, orderBy: { createdAt: "desc" }, take: parsed.data.limit }),
    prisma.loginAuditLog.findMany({ where: { companyId }, include: actorUserInclude, orderBy: { createdAt: "desc" }, take: parsed.data.limit }),
  ]);
  const entries = [
    ...planningLogs.map((log: PlanningAuditLogWithActor) => ({ id: log.id, source: "PLANNING_AUDIT", createdAt: log.createdAt.toISOString(), action: log.action, entityType: log.entityType, entityId: log.entityId, summary: log.summary, payload: log.payload, actorUser: log.actorUser })),
    ...loginLogs.map((log: LoginAuditLogWithActor) => ({ id: log.id, source: "LOGIN_AUDIT", createdAt: log.createdAt.toISOString(), action: log.success ? "LOGIN_SUCCESS" : "LOGIN_FAILURE", entityType: "LOGIN", entityId: log.actorUserId ?? log.email, summary: log.success ? `Connexion réussie ${log.email}` : `Échec de connexion ${log.email}`, payload: { email: log.email, success: log.success, reason: log.reason }, actorUser: log.actorUser })),
  ].sort((a,b)=>a.createdAt < b.createdAt ? 1 : -1).slice(0, parsed.data.limit);
  return ok({ companyId, entries });
}
