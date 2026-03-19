import { Prisma, PrismaClient, PlatformRole } from "@prisma/client";

import { writePlanningAudit } from "@/lib/services/planning/planning-audit";

type AuditDb = Prisma.TransactionClient | PrismaClient;

export type SupportActionTraceInput = {
  companyId: string;
  actorUserId?: string | null;
  actorPlatformRole?: PlatformRole | string | null;
  action: string;
  entityType: string;
  entityId: string;
  summary: string;
  payload?: Prisma.InputJsonValue;
};

export async function traceSupportAction(db: AuditDb, input: SupportActionTraceInput) {
  if (!input.actorUserId) return null;
  if (input.actorPlatformRole !== PlatformRole.SUPPORT) return null;

  return writePlanningAudit(db, {
    companyId: input.companyId,
    actorUserId: input.actorUserId,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId,
    summary: input.summary,
    payload: input.payload,
  });
}
