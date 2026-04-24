import { Prisma, PrismaClient } from "@prisma/client";

import { writePlanningAudit } from "@/lib/services/planning/planning-audit";

type AuditDb = Prisma.TransactionClient | PrismaClient;

export type PersonalDataAuditInput = {
  companyId: string;
  actorUserId?: string | null;
  action: string;
  entityType: "USER" | "USER_ABSENCE";
  entityId: string;
  summary: string;
  changedFields: string[];
  previous: Prisma.InputJsonValue | null;
  next: Prisma.InputJsonValue | null;
  details?: Prisma.InputJsonValue;
};

export async function writePersonalDataAudit(db: AuditDb, input: PersonalDataAuditInput) {
  return writePlanningAudit(db, {
    companyId: input.companyId,
    actorUserId: input.actorUserId,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId,
    summary: input.summary,
    payload: {
      module: "users",
      personalData: true,
      changedFields: input.changedFields,
      previous: input.previous,
      next: input.next,
      details: input.details ?? null,
    },
  });
}
