import { Prisma, PrismaClient } from "@prisma/client";

type PlanningAuditDb = Prisma.TransactionClient | PrismaClient;

export type PlanningAuditInput = {
  companyId: string;
  actorUserId?: string | null;
  runId?: string | null;
  action: string;
  entityType: string;
  entityId: string;
  summary: string;
  payload?: Prisma.InputJsonValue;
};

export async function writePlanningAudit(db: PlanningAuditDb, input: PlanningAuditInput) {
  return db.planningAuditLog.create({
    data: {
      companyId: input.companyId,
      actorUserId: input.actorUserId ?? null,
      runId: input.runId ?? null,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      summary: input.summary,
      payload: input.payload,
    },
  });
}
