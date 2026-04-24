import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { writePersonalDataAudit } from "@/lib/services/audit/personal-data-audit";

const userAbsenceSelect = Prisma.validator<Prisma.UserAbsenceSelect>()({
  id: true,
  companyId: true,
  userId: true,
  reason: true,
  startAt: true,
  endAt: true,
  createdAt: true,
  updatedAt: true,
});

const overlapSelect = Prisma.validator<Prisma.UserAbsenceSelect>()({
  id: true,
  startAt: true,
  endAt: true,
});

type UserAbsenceRecord = Prisma.UserAbsenceGetPayload<{ select: typeof userAbsenceSelect }>;
type OverlapRecord = Prisma.UserAbsenceGetPayload<{ select: typeof overlapSelect }>;

export type ListUserAbsencesInput = {
  companyId: string;
  userId: string;
  from?: Date;
  to?: Date;
  limit?: number;
};

export type ListUserAbsencesResult =
  | { status: "USER_NOT_FOUND" }
  | { status: "OK"; items: UserAbsenceRecord[] };

export type CreateUserAbsenceInput = {
  companyId: string;
  userId: string;
  actorUserId?: string | null;
  reason?: string | null;
  startAt: Date;
  endAt: Date;
};

export type CreateUserAbsenceResult =
  | { status: "USER_NOT_FOUND" }
  | { status: "INVALID_INTERVAL" }
  | { status: "OVERLAP"; conflict: OverlapRecord }
  | { status: "OK"; absence: UserAbsenceRecord };

export type UpdateUserAbsenceInput = {
  companyId: string;
  userId: string;
  absenceId: string;
  actorUserId?: string | null;
  reason?: string | null;
  startAt?: Date;
  endAt?: Date;
};

export type UpdateUserAbsenceResult =
  | { status: "USER_NOT_FOUND" }
  | { status: "ABSENCE_NOT_FOUND" }
  | { status: "INVALID_INTERVAL" }
  | { status: "OVERLAP"; conflict: OverlapRecord }
  | { status: "OK"; absence: UserAbsenceRecord };

export type DeleteUserAbsenceInput = {
  companyId: string;
  userId: string;
  absenceId: string;
  actorUserId?: string | null;
};

export type DeleteUserAbsenceResult =
  | { status: "USER_NOT_FOUND" }
  | { status: "ABSENCE_NOT_FOUND" }
  | { status: "OK"; absence: UserAbsenceRecord };

async function findManagedUser(userId: string, companyId: string) {
  return prisma.user.findFirst({
    where: {
      id: userId,
      companyId,
      isActive: true,
      platformRole: null,
      role: { not: null },
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}

async function findUserAbsenceByTenant(absenceId: string, userId: string, companyId: string) {
  return prisma.userAbsence.findFirst({
    where: {
      id: absenceId,
      userId,
      companyId,
    },
    select: userAbsenceSelect,
  });
}

async function findOverlappingUserAbsence(input: {
  companyId: string;
  userId: string;
  startAt: Date;
  endAt: Date;
  excludeAbsenceId?: string;
}) {
  return prisma.userAbsence.findFirst({
    where: {
      companyId: input.companyId,
      userId: input.userId,
      ...(input.excludeAbsenceId ? { id: { not: input.excludeAbsenceId } } : {}),
      startAt: { lt: input.endAt },
      endAt: { gt: input.startAt },
    },
    orderBy: { startAt: "asc" },
    select: overlapSelect,
  });
}

export async function listUserAbsences(input: ListUserAbsencesInput): Promise<ListUserAbsencesResult> {
  const user = await findManagedUser(input.userId, input.companyId);
  if (!user) return { status: "USER_NOT_FOUND" };

  const items = await prisma.userAbsence.findMany({
    where: {
      companyId: input.companyId,
      userId: input.userId,
      ...(input.from && input.to
        ? {
            startAt: { lt: input.to },
            endAt: { gt: input.from },
          }
        : input.from
          ? {
              endAt: { gt: input.from },
            }
          : input.to
            ? {
                startAt: { lt: input.to },
              }
            : {}),
    },
    orderBy: [{ startAt: "asc" }, { endAt: "asc" }],
    take: input.limit ?? 100,
    select: userAbsenceSelect,
  });

  return { status: "OK", items };
}

export async function createUserAbsence(input: CreateUserAbsenceInput): Promise<CreateUserAbsenceResult> {
  const user = await findManagedUser(input.userId, input.companyId);
  if (!user) return { status: "USER_NOT_FOUND" };
  if (input.startAt >= input.endAt) return { status: "INVALID_INTERVAL" };

  const overlap = await findOverlappingUserAbsence(input);
  if (overlap) return { status: "OVERLAP", conflict: overlap };

  const absence = await prisma.$transaction(async (tx) => {
    const createdAbsence = await tx.userAbsence.create({
      data: {
        companyId: input.companyId,
        userId: input.userId,
        reason: input.reason ?? null,
        startAt: input.startAt,
        endAt: input.endAt,
      },
      select: userAbsenceSelect,
    });

    await writePersonalDataAudit(tx, {
      companyId: input.companyId,
      actorUserId: input.actorUserId,
      action: "USER_ABSENCE_CREATE",
      entityType: "USER_ABSENCE",
      entityId: createdAbsence.id,
      summary: `Creation absence utilisateur ${user.email}`,
      changedFields: ["reason", "startAt", "endAt"],
      previous: null,
      next: {
        userId: createdAbsence.userId,
        reason: createdAbsence.reason,
        startAt: createdAbsence.startAt,
        endAt: createdAbsence.endAt,
      },
      details: {
        targetType: "user-absence",
        targetUserId: user.id,
        targetUserName: user.name,
        targetUserEmail: user.email,
      },
    });

    return createdAbsence;
  });

  return { status: "OK", absence };
}

export async function updateUserAbsence(input: UpdateUserAbsenceInput): Promise<UpdateUserAbsenceResult> {
  const user = await findManagedUser(input.userId, input.companyId);
  if (!user) return { status: "USER_NOT_FOUND" };

  const existing = await findUserAbsenceByTenant(input.absenceId, input.userId, input.companyId);
  if (!existing) return { status: "ABSENCE_NOT_FOUND" };

  const nextStartAt = input.startAt ?? existing.startAt;
  const nextEndAt = input.endAt ?? existing.endAt;

  if (nextStartAt >= nextEndAt) return { status: "INVALID_INTERVAL" };

  const overlap = await findOverlappingUserAbsence({
    companyId: input.companyId,
    userId: input.userId,
    startAt: nextStartAt,
    endAt: nextEndAt,
    excludeAbsenceId: existing.id,
  });
  if (overlap) return { status: "OVERLAP", conflict: overlap };

  const changedFields = [
    ...(input.reason !== undefined && input.reason !== existing.reason ? ["reason"] : []),
    ...(input.startAt !== undefined && input.startAt.getTime() !== existing.startAt.getTime() ? ["startAt"] : []),
    ...(input.endAt !== undefined && input.endAt.getTime() !== existing.endAt.getTime() ? ["endAt"] : []),
  ];

  if (changedFields.length === 0) return { status: "OK", absence: existing };

  const absence = await prisma.$transaction(async (tx) => {
    const updatedAbsence = await tx.userAbsence.update({
      where: { id: existing.id },
      data: {
        ...(input.reason !== undefined ? { reason: input.reason } : {}),
        ...(input.startAt !== undefined ? { startAt: input.startAt } : {}),
        ...(input.endAt !== undefined ? { endAt: input.endAt } : {}),
      },
      select: userAbsenceSelect,
    });

    await writePersonalDataAudit(tx, {
      companyId: input.companyId,
      actorUserId: input.actorUserId,
      action: "USER_ABSENCE_UPDATE",
      entityType: "USER_ABSENCE",
      entityId: updatedAbsence.id,
      summary: `Modification absence utilisateur ${user.email}`,
      changedFields,
      previous: {
        reason: existing.reason,
        startAt: existing.startAt,
        endAt: existing.endAt,
      },
      next: {
        reason: updatedAbsence.reason,
        startAt: updatedAbsence.startAt,
        endAt: updatedAbsence.endAt,
      },
      details: {
        targetType: "user-absence",
        targetUserId: user.id,
        targetUserName: user.name,
        targetUserEmail: user.email,
      },
    });

    return updatedAbsence;
  });

  return { status: "OK", absence };
}

export async function deleteUserAbsence(input: DeleteUserAbsenceInput): Promise<DeleteUserAbsenceResult> {
  const user = await findManagedUser(input.userId, input.companyId);
  if (!user) return { status: "USER_NOT_FOUND" };

  const existing = await findUserAbsenceByTenant(input.absenceId, input.userId, input.companyId);
  if (!existing) return { status: "ABSENCE_NOT_FOUND" };

  const absence = await prisma.$transaction(async (tx) => {
    const deletedAbsence = await tx.userAbsence.delete({
      where: { id: existing.id },
      select: userAbsenceSelect,
    });

    await writePersonalDataAudit(tx, {
      companyId: input.companyId,
      actorUserId: input.actorUserId,
      action: "USER_ABSENCE_DELETE",
      entityType: "USER_ABSENCE",
      entityId: deletedAbsence.id,
      summary: `Suppression absence utilisateur ${user.email}`,
      changedFields: ["deleted"],
      previous: {
        reason: existing.reason,
        startAt: existing.startAt,
        endAt: existing.endAt,
      },
      next: null,
      details: {
        targetType: "user-absence",
        targetUserId: user.id,
        targetUserName: user.name,
        targetUserEmail: user.email,
      },
    });

    return deletedAbsence;
  });

  return { status: "OK", absence };
}
