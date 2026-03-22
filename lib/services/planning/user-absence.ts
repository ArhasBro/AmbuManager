import { Prisma, PrismaClient } from "@prisma/client";

const planningUserAbsenceSelect = Prisma.validator<Prisma.UserAbsenceSelect>()({
  id: true,
  userId: true,
  reason: true,
  startAt: true,
  endAt: true,
});

export type PlanningUserAbsence = Prisma.UserAbsenceGetPayload<{
  select: typeof planningUserAbsenceSelect;
}>;

type DbClient = PrismaClient | Prisma.TransactionClient;

type ListUserAbsenceWindowsInput = {
  companyId: string;
  userIds: string[];
  startAt: Date;
  endAt: Date;
};

function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
  return aStart < bEnd && aEnd > bStart;
}

export async function listUserAbsenceWindows(
  db: DbClient,
  input: ListUserAbsenceWindowsInput
): Promise<PlanningUserAbsence[]> {
  if (input.userIds.length === 0) return [];

  return db.userAbsence.findMany({
    where: {
      companyId: input.companyId,
      userId: { in: input.userIds },
      startAt: { lt: input.endAt },
      endAt: { gt: input.startAt },
    },
    orderBy: [{ startAt: "asc" }, { endAt: "asc" }, { id: "asc" }],
    select: planningUserAbsenceSelect,
  });
}

export function buildUserAbsenceMap(absences: PlanningUserAbsence[]): Map<string, PlanningUserAbsence[]> {
  const map = new Map<string, PlanningUserAbsence[]>();

  for (const absence of absences) {
    const arr = map.get(absence.userId) ?? [];
    arr.push(absence);
    map.set(absence.userId, arr);
  }

  return map;
}

export function findOverlappingUserAbsence(
  absencesByUser: Map<string, PlanningUserAbsence[]>,
  userId: string,
  startAt: Date,
  endAt: Date
): PlanningUserAbsence | null {
  const arr = absencesByUser.get(userId);
  if (!arr || arr.length === 0) return null;

  for (const absence of arr) {
    if (overlaps(startAt, endAt, absence.startAt, absence.endAt)) return absence;
  }

  return null;
}

export function isUserAbsent(
  absencesByUser: Map<string, PlanningUserAbsence[]>,
  userId: string,
  startAt: Date,
  endAt: Date
): boolean {
  return findOverlappingUserAbsence(absencesByUser, userId, startAt, endAt) !== null;
}

export async function findFirstUserAbsenceConflict(
  db: DbClient,
  input: ListUserAbsenceWindowsInput
): Promise<PlanningUserAbsence | null> {
  const absences = await listUserAbsenceWindows(db, input);
  const absencesByUser = buildUserAbsenceMap(absences);

  for (const userId of input.userIds) {
    const conflict = findOverlappingUserAbsence(absencesByUser, userId, input.startAt, input.endAt);
    if (conflict) return conflict;
  }

  return null;
}
