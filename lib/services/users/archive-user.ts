import { PlatformRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { traceSupportAction } from "@/lib/services/audit/support-action-trace";

type ArchivedUser = {
  id: string;
  name: string;
  email: string;
  role: string | null;
  companyId: string | null;
  depotId: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ArchiveUserInput = {
  id: string;
  companyId: string;
  actorUserId?: string;
  actorPlatformRole?: PlatformRole | string | null;
};

const userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  companyId: true,
  depotId: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
} as const;

export async function archiveUser(input: ArchiveUserInput): Promise<ArchivedUser | null> {
  const existing = await prisma.user.findFirst({
    where: {
      id: input.id,
      companyId: input.companyId,
      platformRole: null,
      role: { not: null },
    },
    select: userSelect,
  });

  if (!existing) return null;
  if (!existing.isActive) return existing;

  return prisma.$transaction(async (tx) => {
    const user = await tx.user.update({
      where: { id: existing.id },
      data: { isActive: false },
      select: userSelect,
    });

    await traceSupportAction(tx, {
      companyId: input.companyId,
      actorUserId: input.actorUserId,
      actorPlatformRole: input.actorPlatformRole,
      action: "SUPPORT_ARCHIVE_USER",
      entityType: "USER",
      entityId: user.id,
      summary: `Support archivage utilisateur ${user.email}`,
      payload: {
        module: "users",
        changedFields: ["isActive"],
        previous: { isActive: existing.isActive },
        next: { isActive: user.isActive },
        details: {
          targetType: "user",
          targetEmail: user.email,
          targetName: user.name,
          targetRole: user.role,
        },
      },
    });

    return user;
  });
}
