import { PrismaClient, Role } from "@prisma/client";

import { buildUserAbsenceMap, isUserAbsent, listUserAbsenceWindows } from "@/lib/services/planning/user-absence";
import {
  getAllowedRolesForFirstSlot,
  getAllowedRolesForSecondSlot,
  resolveTemplateMinStaffCount,
} from "@/lib/templates/template-rules";

export type MatchingReason =
  | "MATCHED"
  | "ALREADY_ASSIGNED"
  | "NO_REQUIRED_ROLE"
  | "NO_USER_WITH_REQUIRED_ROLE"
  | "USER_CONFLICT";

export type MatchingPlanItem = {
  shiftId: string;

  startAt: string; // ISO
  endAt: string; // ISO

  requiredRole: string | null;
  currentUserId: string | null;
  proposedUserId: string | null;
  reason: MatchingReason;
};

export type MatchingApplyItem = MatchingPlanItem & {
  applied: boolean;
};

type ComputeOptions = {
  companyId: string;
  runId: string;
  includeAlreadyAssigned?: boolean;
};

type ApplyOptions = {
  companyId: string;
  runId: string;
  plan: MatchingPlanItem[];
};

type AutoMatchOptions = {
  companyId: string;
  runId: string;
  dryRun?: boolean;
};

function toIso(d: Date): string {
  return d.toISOString();
}

function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
  return aStart < bEnd && aEnd > bStart;
}

function toRoleEnum(value: unknown): Role | null {
  if (typeof value !== "string") return null;
  const roles = Object.values(Role) as string[];
  return roles.includes(value) ? (value as Role) : null;
}

type BusyWindow = { startAt: Date; endAt: Date };

function addBusyWindow(busy: Map<string, BusyWindow[]>, userId: string, startAt: Date, endAt: Date) {
  const arr = busy.get(userId) ?? [];
  arr.push({ startAt, endAt });
  busy.set(userId, arr);
}

function isUserFree(busy: Map<string, BusyWindow[]>, userId: string, startAt: Date, endAt: Date): boolean {
  const arr = busy.get(userId);
  if (!arr || arr.length === 0) return true;
  for (const w of arr) {
    if (overlaps(startAt, endAt, w.startAt, w.endAt)) return false;
  }
  return true;
}

type DraftShiftRow = {
  id: string;
  startAt: Date;
  endAt: Date;
  userId: string | null;
  user2Id: string | null;
  template: {
    category: string | null;
    requiredRole: Role | null;
    secondaryAllowedRoles: Role[];
    minStaffCount: number | null;
  } | null;
};

type RunDraftForApply = {
  id: string;
  startAt: Date;
  endAt: Date;
  userId: string | null;
  user2Id: string | null;
  template: {
    category: string | null;
    minStaffCount: number | null;
  } | null;
};

function getTemplateRuleInput(shift: DraftShiftRow | RunDraftForApply) {
  const template = (shift.template ?? null) as {
    category?: string | null;
    requiredRole?: Role | null;
    secondaryAllowedRoles?: Role[];
    minStaffCount?: number | null;
  } | null;

  return {
    category: template?.category ?? null,
    requiredRole: template?.requiredRole ?? null,
    secondaryAllowedRoles: template?.secondaryAllowedRoles ?? [],
    minStaffCount: template?.minStaffCount ?? null,
  };
}

function getRequiredSlots(shift: DraftShiftRow | RunDraftForApply): 1 | 2 {
  return resolveTemplateMinStaffCount(shift.template?.minStaffCount ?? null, shift.template?.category ?? null);
}

function getRolePoolForSlot(shift: DraftShiftRow | RunDraftForApply, slot: 1 | 2): Role[] {
  const templateInput = getTemplateRuleInput(shift);
  const roles = slot === 1 ? getAllowedRolesForFirstSlot(templateInput) : getAllowedRolesForSecondSlot(templateInput);
  return roles.map((role) => role as Role);
}

function getMissingSlots(shift: DraftShiftRow | RunDraftForApply): Array<1 | 2> {
  const slots: Array<1 | 2> = [];
  const requiredSlots = getRequiredSlots(shift);

  if (!shift.userId) slots.push(1);
  if (requiredSlots === 2 && !shift.user2Id) slots.push(2);

  return slots;
}

function getFilledSlots(shift: DraftShiftRow | RunDraftForApply): Array<1 | 2> {
  const slots: Array<1 | 2> = [];
  const requiredSlots = getRequiredSlots(shift);

  if (shift.userId) slots.push(1);
  if (requiredSlots === 2 && shift.user2Id) slots.push(2);

  return slots;
}

function rolePoolLabel(roles: readonly Role[]): string | null {
  if (roles.length === 0) return null;
  return Array.from(new Set(roles)).join("|");
}

function getNextAssignableField(shift: RunDraftForApply): "userId" | "user2Id" | null {
  if (!shift.userId) return "userId";
  if (getRequiredSlots(shift) === 2 && !shift.user2Id) return "user2Id";
  return null;
}

/**
 * 4.6 — Compute only (aucune écriture DB)
 * Matching amélioré :
 * - remplit le prochain slot libre du DraftShift (userId puis user2Id si requis)
 * - utilise la composition minimale d’équipe du template
 * - évite conflits internes run (userId OU user2Id)
 * - équité simple : choisit le user le moins assigné (userId+user2Id) dans le run
 * - stabilité : itère par startAt asc (tie-break id) et met à jour un "busy map" local
 *
 * includeAlreadyAssigned:
 * - false (défaut) => exclut les items ALREADY_ASSIGNED du résultat (UI plus lisible)
 * - true => inclut tout
 */
export async function computeDraftShiftMatchingByRole(
  prisma: PrismaClient,
  options: ComputeOptions
): Promise<MatchingPlanItem[]> {
  const { companyId, runId, includeAlreadyAssigned = false } = options;

  const draftShiftsRaw = await prisma.draftShift.findMany({
    where: { runId, run: { companyId } },
    include: {
      template: {
        select: {
          category: true,
          requiredRole: true,
          secondaryAllowedRoles: true,
          minStaffCount: true,
        },
      },
    },
  });

  const draftShifts: DraftShiftRow[] = draftShiftsRaw.map((s) => ({
    id: s.id,
    startAt: s.startAt,
    endAt: s.endAt,
    userId: s.userId ?? null,
    user2Id: s.user2Id ?? null,
    template: s.template
      ? {
          category: s.template.category,
          requiredRole: toRoleEnum(s.template.requiredRole),
          secondaryAllowedRoles: s.template.secondaryAllowedRoles.map((role) => toRoleEnum(role)).filter((role): role is Role => role !== null),
          minStaffCount: s.template.minStaffCount ?? null,
        }
      : null,
  }));

  if (draftShifts.length === 0) return [];

  draftShifts.sort((a, b) => {
    const da = a.startAt.getTime();
    const db = b.startAt.getTime();
    if (da !== db) return da - db;
    return a.id.localeCompare(b.id);
  });

  const requiredRoles = Array.from(
    new Set(
      draftShifts
        .flatMap((shift) => getMissingSlots(shift).flatMap((slot) => getRolePoolForSlot(shift, slot)))
        .filter((role): role is Role => role !== null)
    )
  );

  const users =
    requiredRoles.length > 0
      ? await prisma.user.findMany({
          where: { companyId, role: { in: requiredRoles } },
          orderBy: { createdAt: "asc" },
          select: { id: true, role: true },
        })
      : [];

  const candidateUserIds = users.map((u) => u.id);
  const minStart = draftShifts.reduce((min, s) => (s.startAt < min ? s.startAt : min), draftShifts[0]!.startAt);
  const maxEnd = draftShifts.reduce((max, s) => (s.endAt > max ? s.endAt : max), draftShifts[0]!.endAt);
  const absencesByUser = buildUserAbsenceMap(
    await listUserAbsenceWindows(prisma, {
      companyId,
      userIds: candidateUserIds,
      startAt: minStart,
      endAt: maxEnd,
    })
  );

  const usersByRole = new Map<Role, Array<{ id: string }>>();
  for (const u of users) {
    const userRole = toRoleEnum(u.role);
    if (!userRole) continue;

    const arr = usersByRole.get(userRole) ?? [];
    arr.push({ id: u.id });
    usersByRole.set(userRole, arr);
  }

  const busy = new Map<string, BusyWindow[]>();
  for (const s of draftShifts) {
    if (s.userId) addBusyWindow(busy, s.userId, s.startAt, s.endAt);
    if (s.user2Id) addBusyWindow(busy, s.user2Id, s.startAt, s.endAt);
  }

  const counts = new Map<string, number>();
  for (const s of draftShifts) {
    if (s.userId) counts.set(s.userId, (counts.get(s.userId) ?? 0) + 1);
    if (s.user2Id) counts.set(s.user2Id, (counts.get(s.user2Id) ?? 0) + 1);
  }

  const plan: MatchingPlanItem[] = [];

  for (const shift of draftShifts) {
    const missingSlots = getMissingSlots(shift);

    if (missingSlots.length === 0) {
      if (includeAlreadyAssigned) {
        for (const slot of getFilledSlots(shift)) {
          const currentUserId = slot === 1 ? shift.userId ?? null : shift.user2Id ?? null;
          plan.push({
            shiftId: shift.id,
            startAt: toIso(shift.startAt),
            endAt: toIso(shift.endAt),
            requiredRole: rolePoolLabel(getRolePoolForSlot(shift, slot)),
            currentUserId,
            proposedUserId: currentUserId,
            reason: "ALREADY_ASSIGNED",
          });
        }
      }
      continue;
    }

    for (const slot of missingSlots) {
      const requiredRolePool = getRolePoolForSlot(shift, slot);
      const requiredRole = rolePoolLabel(requiredRolePool);
      const currentUserId = slot === 1 ? shift.userId ?? null : shift.user2Id ?? null;

      if (requiredRolePool.length === 0) {
        plan.push({
          shiftId: shift.id,
          startAt: toIso(shift.startAt),
          endAt: toIso(shift.endAt),
          requiredRole: null,
          currentUserId,
          proposedUserId: null,
          reason: "NO_REQUIRED_ROLE",
        });
        continue;
      }

      const seenCandidateIds = new Set<string>();
      const candidates = requiredRolePool.flatMap((role) => usersByRole.get(role) ?? []).filter((candidate) => {
        if (seenCandidateIds.has(candidate.id)) return false;
        seenCandidateIds.add(candidate.id);
        return true;
      });

      if (candidates.length === 0) {
        plan.push({
          shiftId: shift.id,
          startAt: toIso(shift.startAt),
          endAt: toIso(shift.endAt),
          requiredRole,
          currentUserId,
          proposedUserId: null,
          reason: "NO_USER_WITH_REQUIRED_ROLE",
        });
        continue;
      }

      const occupiedUserIds = new Set([shift.userId, shift.user2Id].filter((value): value is string => Boolean(value)));
      const free = candidates.filter(
        (candidate) =>
          !occupiedUserIds.has(candidate.id) &&
          isUserFree(busy, candidate.id, shift.startAt, shift.endAt) &&
          !isUserAbsent(absencesByUser, candidate.id, shift.startAt, shift.endAt)
      );

      if (free.length === 0) {
        plan.push({
          shiftId: shift.id,
          startAt: toIso(shift.startAt),
          endAt: toIso(shift.endAt),
          requiredRole,
          currentUserId,
          proposedUserId: null,
          reason: "USER_CONFLICT",
        });
        continue;
      }

      free.sort((a, b) => {
        const ca = counts.get(a.id) ?? 0;
        const cb = counts.get(b.id) ?? 0;
        if (ca !== cb) return ca - cb;
        return a.id.localeCompare(b.id);
      });

      const chosen = free[0]!;

      addBusyWindow(busy, chosen.id, shift.startAt, shift.endAt);
      counts.set(chosen.id, (counts.get(chosen.id) ?? 0) + 1);

      plan.push({
        shiftId: shift.id,
        startAt: toIso(shift.startAt),
        endAt: toIso(shift.endAt),
        requiredRole,
        currentUserId,
        proposedUserId: chosen.id,
        reason: "MATCHED",
      });
    }
  }

  return plan;
}

/**
 * 4.6 — Apply (écritures DB) à partir d’un plan
 * - Ne jamais assigner un user si ça chevauche déjà un autre DraftShift du run (userId OU user2Id)
 * - Multi-tenant strict via run.companyId
 * - Remplit uniquement le prochain slot libre (userId puis user2Id si requis)
 */
export async function applyDraftShiftMatchingPlan(
  prisma: PrismaClient,
  options: ApplyOptions
): Promise<MatchingApplyItem[]> {
  const { companyId, runId, plan } = options;

  if (plan.length === 0) return [];

  return prisma.$transaction(async (tx) => {
    const appliedResults: MatchingApplyItem[] = [];

    const runDrafts = await tx.draftShift.findMany({
      where: { runId, run: { companyId } },
      select: {
        id: true,
        startAt: true,
        endAt: true,
        userId: true,
        user2Id: true,
        template: { select: { category: true, minStaffCount: true } },
      },
    });

    const byId = new Map(runDrafts.map((draft) => [draft.id, draft]));

    const proposedUserIds = Array.from(
      new Set(
        plan
          .filter((item) => item.reason === "MATCHED" && item.proposedUserId !== null)
          .map((item) => item.proposedUserId as string)
      )
    );

    const absencesByUser =
      proposedUserIds.length > 0 && runDrafts.length > 0
        ? buildUserAbsenceMap(
            await listUserAbsenceWindows(tx, {
              companyId,
              userIds: proposedUserIds,
              startAt: runDrafts.reduce((min, draft) => (draft.startAt < min ? draft.startAt : min), runDrafts[0]!.startAt),
              endAt: runDrafts.reduce((max, draft) => (draft.endAt > max ? draft.endAt : max), runDrafts[0]!.endAt),
            })
          )
        : new Map();

    for (const item of plan) {
      if (item.proposedUserId === null || item.reason !== "MATCHED") {
        appliedResults.push({ ...item, applied: false });
        continue;
      }

      const proposedId: string = item.proposedUserId;

      const me = byId.get(item.shiftId);
      if (!me) {
        appliedResults.push({ ...item, applied: false });
        continue;
      }

      const targetField = getNextAssignableField(me);
      if (!targetField) {
        appliedResults.push({ ...item, applied: false });
        continue;
      }

      const absenceConflict = isUserAbsent(absencesByUser, proposedId, me.startAt, me.endAt);
      if (absenceConflict) {
        appliedResults.push({
          ...item,
          reason: "USER_CONFLICT",
          applied: false,
        });
        continue;
      }

      const conflict = runDrafts.find((draft) => {
        if (draft.id === me.id) return false;
        if (draft.userId !== proposedId && draft.user2Id !== proposedId) return false;
        return overlaps(me.startAt, me.endAt, draft.startAt, draft.endAt);
      });

      if (conflict) {
        appliedResults.push({
          ...item,
          reason: "USER_CONFLICT",
          applied: false,
        });
        continue;
      }

      const res =
        targetField === "userId"
          ? await tx.draftShift.updateMany({
              where: {
                id: item.shiftId,
                userId: null,
                runId,
                run: { companyId },
              },
              data: { userId: proposedId },
            })
          : await tx.draftShift.updateMany({
              where: {
                id: item.shiftId,
                user2Id: null,
                runId,
                run: { companyId },
              },
              data: { user2Id: proposedId },
            });

      appliedResults.push({
        ...item,
        applied: res.count === 1,
      });

      if (res.count === 1) {
        const updated = byId.get(item.shiftId);
        if (updated) {
          if (targetField === "userId") {
            updated.userId = proposedId;
          } else {
            updated.user2Id = proposedId;
          }
        }
      }
    }

    return appliedResults;
  });
}

/**
 * 4.6 — Entrée unique appelée par l’API
 * - dryRun=true  => compute only
 * - dryRun=false => compute + apply
 */
export async function autoMatchRunDraftShifts(
  prisma: PrismaClient,
  options: AutoMatchOptions
): Promise<MatchingPlanItem[] | MatchingApplyItem[]> {
  const { companyId, runId, dryRun = false } = options;

  const plan = await computeDraftShiftMatchingByRole(prisma, { companyId, runId });

  if (dryRun) return plan;

  return applyDraftShiftMatchingPlan(prisma, { companyId, runId, plan });
}
