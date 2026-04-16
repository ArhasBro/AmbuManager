import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function writeLoginAudit(input: {
  companyId: string;
  actorUserId?: string | null;
  email: string;
  success: boolean;
  reason?: string | null;
  payload?: Prisma.InputJsonValue;
}) {
  return prisma.loginAuditLog.create({
    data: {
      companyId: input.companyId,
      actorUserId: input.actorUserId ?? null,
      email: input.email,
      success: input.success,
      reason: input.reason ?? null,
      payload: input.payload,
    },
  });
}
