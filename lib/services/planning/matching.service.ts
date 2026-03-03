import { PrismaClient, Role } from "@prisma/client";

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
  template: { requiredRole: Role | null } | null;
};

/**
 * 4.6 — Compute only (aucune écriture DB)
 * Matching amélioré :
 * - requiredRole → user(s) de la company avec ce role
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
    include: { template: { select: { requiredRole: true } } },
  });

  const draftShifts: DraftShiftRow[] = draftShiftsRaw.map((s) => ({
    id: s.id,
    startAt: s.startAt,
    endAt: s.endAt,
    userId: s.userId ?? null,
    user2Id: s.user2Id ?? null,
    template: s.template ? { requiredRole: toRoleEnum(s.template.requiredRole) } : null,
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
        .map((s) => s.template?.requiredRole ?? null)
        .filter((r): r is Role => r !== null)
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

  const usersByRole = new Map<Role, Array<{ id: string }>>();
  for (const u of users) {
    const arr = usersByRole.get(u.role) ?? [];
    arr.push({ id: u.id });
    usersByRole.set(u.role, arr);
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
    const requiredRoleEnum = shift.template?.requiredRole ?? null;
    const requiredRole = requiredRoleEnum ? String(requiredRoleEnum) : null;

    const currentUserId = shift.userId ?? null;

    if (!requiredRoleEnum) {
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

    if (currentUserId) {
      if (includeAlreadyAssigned) {
        plan.push({
          shiftId: shift.id,
          startAt: toIso(shift.startAt),
          endAt: toIso(shift.endAt),
          requiredRole,
          currentUserId,
          proposedUserId: currentUserId,
          reason: "ALREADY_ASSIGNED",
        });
      }
      continue;
    }

    const candidates = usersByRole.get(requiredRoleEnum) ?? [];
    if (candidates.length === 0) {
      plan.push({
        shiftId: shift.id,
        startAt: toIso(shift.startAt),
        endAt: toIso(shift.endAt),
        requiredRole,
        currentUserId: null,
        proposedUserId: null,
        reason: "NO_USER_WITH_REQUIRED_ROLE",
      });
      continue;
    }

    const free = candidates.filter((c) => isUserFree(busy, c.id, shift.startAt, shift.endAt));

    if (free.length === 0) {
      plan.push({
        shiftId: shift.id,
        startAt: toIso(shift.startAt),
        endAt: toIso(shift.endAt),
        requiredRole,
        currentUserId: null,
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

    const chosen = free[0];

    addBusyWindow(busy, chosen.id, shift.startAt, shift.endAt);
    counts.set(chosen.id, (counts.get(chosen.id) ?? 0) + 1);

    plan.push({
      shiftId: shift.id,
      startAt: toIso(shift.startAt),
      endAt: toIso(shift.endAt),
      requiredRole,
      currentUserId: null,
      proposedUserId: chosen.id,
      reason: "MATCHED",
    });
  }

  return plan;
}

/**
 * 4.6 — Apply (écritures DB) à partir d’un plan
 * - Ne jamais assigner un user si ça chevauche déjà un autre DraftShift du run (userId OU user2Id)
 * - Multi-tenant strict via run.companyId
 * - Ne jamais écraser userId si déjà assigné
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
      select: { id: true, startAt: true, endAt: true, userId: true, user2Id: true },
    });

    const byId = new Map(runDrafts.map((d) => [d.id, d]));

    for (const item of plan) {
      if (item.currentUserId !== null || item.proposedUserId === null || item.reason !== "MATCHED") {
        appliedResults.push({ ...item, applied: false });
        continue;
      }

      const proposedId: string = item.proposedUserId;

      const me = byId.get(item.shiftId);
      if (!me) {
        appliedResults.push({ ...item, applied: false });
        continue;
      }

      const conflict = runDrafts.find((d) => {
        if (d.id === me.id) return false;
        if (d.userId !== proposedId && d.user2Id !== proposedId) return false;
        return overlaps(me.startAt, me.endAt, d.startAt, d.endAt);
      });

      if (conflict) {
        appliedResults.push({
          ...item,
          reason: "USER_CONFLICT",
          applied: false,
        });
        continue;
      }

      const res = await tx.draftShift.updateMany({
        where: {
          id: item.shiftId,
          userId: null,
          runId,
          run: { companyId },
        },
        data: { userId: proposedId },
      });

      appliedResults.push({
        ...item,
        applied: res.count === 1,
      });

      if (res.count === 1) {
        const updated = byId.get(item.shiftId);
        if (updated) updated.userId = proposedId;
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