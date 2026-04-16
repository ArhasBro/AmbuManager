import { Prisma, PrismaClient, PlatformRole } from "@prisma/client";
import { writePlanningAudit } from "@/lib/services/planning/planning-audit";
import { isRecord, trimOptionalString } from "@/lib/services/audit/audit-context";

type AuditDb = Prisma.TransactionClient | PrismaClient;

export type SupportActionTraceInput = {
  companyId: string;
  actorUserId?: string | null;
  actorPlatformRole?: PlatformRole | string | null;
  action: string;
  entityType: string;
  entityId: string;
  summary: string;
  supportReason?: string | null;
  payload?: Prisma.InputJsonValue;
};

function mergeSupportReason(payload: Prisma.InputJsonValue | undefined, supportReason: string): Prisma.InputJsonValue {
  if (isRecord(payload)) return { ...payload, supportReason };
  return { supportReason, data: payload ?? null };
}

export async function traceSupportAction(db: AuditDb, input: SupportActionTraceInput) {
  if (!input.actorUserId) return null;
  if (input.actorPlatformRole !== PlatformRole.SUPPORT) return null;
  const supportReason = trimOptionalString(input.supportReason);
  if (!supportReason) throw new Error("SUPPORT_REASON_REQUIRED");
  return writePlanningAudit(db, {
    companyId: input.companyId,
    actorUserId: input.actorUserId,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId,
    summary: input.summary,
    payload: mergeSupportReason(input.payload, supportReason),
  });
}
