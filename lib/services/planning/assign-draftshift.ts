// lib/services/planning/assign-draftshift.ts
import { prisma } from "@/lib/prisma";
import type { PlanningIssue, PlanningIssueCode } from "@/lib/types/planning";
import { RuleMode } from "@prisma/client";

export type AssignDraftShiftInput = {
  companyId: string;
  draftShiftId: string;
  actorUserId: string; // réservé audit futur (pas utilisé tant que champ non confirmé)

  userId: string | null;
  user2Id: string | null;
  vehicleId: string | null;
};

export type AssignDraftShiftResult =
  | { ok: true; data: { draftShiftId: string; issues: PlanningIssue[] } }
  | { ok: false; error: PlanningIssue };

type Category = "VSL" | "TAXI" | "AMBULANCE" | "GARDE" | string;

function requiredSlotsFromCategory(category: Category | null | undefined): 1 | 2 {
  return category === "AMBULANCE" || category === "GARDE" ? 2 : 1;
}

function normalizePair(userId: string | null, user2Id: string | null): { userId: string | null; user2Id: string | null } {
  if (!userId && user2Id) return { userId: user2Id, user2Id: null };
  return { userId, user2Id };
}

async function loadMinRestRule(companyId: string): Promise<{ mode: RuleMode; hours: number } | null> {
  // INFORMATION NON FOURNIE — VALIDATION NÉCESSAIRE :
  // Clé exacte de la règle repos minimum.
  const rule = await prisma.companyRule.findUnique({
    where: { companyId_key: { companyId, key: "PLANNING_MIN_REST_HOURS" } },
    select: { mode: true, value: true },
  });

  if (!rule) return null;

  const hours = Number(rule.value);
  if (!Number.isFinite(hours) || hours <= 0) return null;

  return { mode: rule.mode, hours };
}

function err(code: PlanningIssueCode, message: string, meta?: Record<string, unknown>): PlanningIssue {
  return meta ? { code, message, meta } : { code, message };
}

export async function assignDraftShift(input: AssignDraftShiftInput): Promise<AssignDraftShiftResult> {
  const { companyId, draftShiftId } = input;

  const normalized = normalizePair(input.userId, input.user2Id);
  const userId = normalized.userId;
  const user2Id = normalized.user2Id;
  const vehicleId = input.vehicleId;

  if (userId && user2Id && userId === user2Id) {
    return { ok: false, error: err("DUPLICATE_USER_IN_SAME_SHIFT", "Le même employé ne peut pas être affecté aux deux slots.") };
  }

  // 1) Charger DraftShift + run.status + template.category
  const draft = await prisma.draftShift.findFirst({
    where: { id: draftShiftId, companyId },
    select: {
      id: true,
      companyId: true,
      startAt: true,
      endAt: true,
      userId: true,
      user2Id: true,
      vehicleId: true,
      run: { select: { status: true } },
      template: { select: { category: true } },
    },
  });

  if (!draft) return { ok: false, error: err("NOT_FOUND", "DraftShift introuvable.") };
  if (draft.companyId !== companyId) return { ok: false, error: err("FORBIDDEN_COMPANY", "Accès interdit (multi-tenant).") };

  if (draft.run.status !== "DRAFT") {
    return { ok: false, error: err("RUN_NOT_DRAFT", "Ce run n’est pas en statut DRAFT.") };
  }

  const category = (draft.template?.category ?? null) as Category | null;
  const requiredSlots = requiredSlotsFromCategory(category);

  // 2) Validation slots
  const countAssigned = (userId ? 1 : 0) + (user2Id ? 1 : 0);
  if (requiredSlots === 1 && countAssigned > 1) {
    return { ok: false, error: err("INVALID_SLOT_COUNT", "Ce shift n’accepte qu’un seul employé.", { category, requiredSlots }) };
  }

  const startAt = draft.startAt;
  const endAt = draft.endAt;

  if (!(startAt instanceof Date) || !(endAt instanceof Date) || !(startAt < endAt)) {
    return { ok: false, error: err("VALIDATION_ERROR", "Dates invalides sur le DraftShift (startAt/endAt).") };
  }

  const issues: PlanningIssue[] = [];
  const assignedUsers = [userId, user2Id].filter((x): x is string => Boolean(x));

  // 3) Conflits users — autres DraftShifts DRAFT + shifts publiés
  if (assignedUsers.length > 0) {
    const otherDrafts = await prisma.draftShift.findMany({
      where: {
        companyId,
        id: { not: draftShiftId },
        run: { status: "DRAFT" },
        startAt: { lt: endAt },
        endAt: { gt: startAt },
        OR: [{ userId: { in: assignedUsers } }, { user2Id: { in: assignedUsers } }],
      },
      select: { id: true },
    });

    if (otherDrafts.length > 0) {
      issues.push(
        err("USER_OVERLAP_CONFLICT", "Conflit horaire : employé déjà affecté sur un autre shift (brouillon).", {
          conflictingDraftShiftId: otherDrafts[0]?.id,
        })
      );
    }

    const otherShifts = await prisma.shift.findMany({
      where: {
        companyId,
        startAt: { lt: endAt },
        endAt: { gt: startAt },
        OR: [{ userId: { in: assignedUsers } }, { user2Id: { in: assignedUsers } }],
      },
      select: { id: true },
    });

    if (otherShifts.length > 0) {
      issues.push(
        err("USER_OVERLAP_CONFLICT", "Conflit horaire : employé déjà affecté sur un shift publié.", {
          conflictingShiftId: otherShifts[0]?.id,
        })
      );
    }
  }

  // 4) Conflits véhicule — autres DraftShifts DRAFT + shifts publiés
  if (vehicleId) {
    const otherDraftsVehicle = await prisma.draftShift.findMany({
      where: {
        companyId,
        id: { not: draftShiftId },
        run: { status: "DRAFT" },
        vehicleId,
        startAt: { lt: endAt },
        endAt: { gt: startAt },
      },
      select: { id: true },
    });

    if (otherDraftsVehicle.length > 0) {
      issues.push(
        err("VEHICLE_OVERLAP_CONFLICT", "Conflit horaire : véhicule déjà affecté sur un autre shift (brouillon).", {
          conflictingDraftShiftId: otherDraftsVehicle[0]?.id,
        })
      );
    }

    const otherShiftsVehicle = await prisma.shift.findMany({
      where: { companyId, vehicleId, startAt: { lt: endAt }, endAt: { gt: startAt } },
      select: { id: true },
    });

    if (otherShiftsVehicle.length > 0) {
      issues.push(
        err("VEHICLE_OVERLAP_CONFLICT", "Conflit horaire : véhicule déjà affecté sur un shift publié.", {
          conflictingShiftId: otherShiftsVehicle[0]?.id,
        })
      );
    }
  }

  // 5) Règle entreprise — repos minimum
  const minRest = await loadMinRestRule(companyId);
  if (minRest && assignedUsers.length > 0) {
    const minRestMs = minRest.hours * 60 * 60 * 1000;

    for (const u of assignedUsers) {
      const prevDraft = await prisma.draftShift.findFirst({
        where: {
          companyId,
          run: { status: "DRAFT" },
          id: { not: draftShiftId },
          OR: [{ userId: u }, { user2Id: u }],
          endAt: { lte: startAt },
        },
        orderBy: { endAt: "desc" },
        select: { endAt: true },
      });

      const prevShift = await prisma.shift.findFirst({
        where: { companyId, OR: [{ userId: u }, { user2Id: u }], endAt: { lte: startAt } },
        orderBy: { endAt: "desc" },
        select: { endAt: true },
      });

      const prevEnd =
        prevShift && prevDraft
          ? prevShift.endAt > prevDraft.endAt
            ? prevShift.endAt
            : prevDraft.endAt
          : prevShift
            ? prevShift.endAt
            : prevDraft
              ? prevDraft.endAt
              : null;

      if (prevEnd) {
        const restMs = startAt.getTime() - prevEnd.getTime();
        if (restMs < minRestMs) {
          const issue = err("MIN_REST_VIOLATION", `Repos minimum non respecté (${minRest.hours}h).`, {
            userId: u,
            requiredHours: minRest.hours,
          });

          if (minRest.mode === "ALERT" || minRest.mode === "BOTH") issues.push(issue);

          if (minRest.mode === "BLOCK" || minRest.mode === "BOTH") {
            return { ok: false, error: err("RULE_BLOCKED", issue.message, issue.meta) };
          }
        }
      }
    }
  }

  // 6) Blocage double affectation : conflits bloquants
  const blockingConflict = issues.find((i) => i.code === "USER_OVERLAP_CONFLICT" || i.code === "VEHICLE_OVERLAP_CONFLICT");
  if (blockingConflict) return { ok: false, error: blockingConflict };

  // 7) Update DraftShift
  await prisma.draftShift.update({
    where: { id: draftShiftId },
    data: { userId, user2Id, vehicleId },
  });

  return { ok: true, data: { draftShiftId, issues } };
}