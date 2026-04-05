// lib/services/planning/assign-shift.ts
import { prisma } from "@/lib/prisma";
import { writePlanningAudit } from "@/lib/services/planning/planning-audit";
import { findFirstUserAbsenceConflict } from "@/lib/services/planning/user-absence";
import type { PlanningIssue, PlanningIssueCode } from "@/lib/types/planning";
import { RuleMode } from "@prisma/client";

export type AssignShiftInput = {
  companyId: string;
  shiftId: string;
  actorUserId: string;

  userId: string | null;
  user2Id: string | null;
  vehicleId: string | null;
  depotId: string | null;
};

export type AssignShiftResult =
  | { ok: true; data: { shiftId: string; issues: PlanningIssue[] } }
  | { ok: false; error: PlanningIssue };

type Category = "VSL" | "TAXI" | "AMBULANCE" | "GARDE" | string;

function requiredSlotsFromCategory(category: Category | null | undefined): 1 | 2 {
  return category === "AMBULANCE" || category === "GARDE" ? 2 : 1;
}

function normalizePair(userId: string | null, user2Id: string | null): { userId: string | null; user2Id: string | null } {
  if (!userId && user2Id) return { userId: user2Id, user2Id: null };
  return { userId, user2Id };
}

type MinRestRuleResult =
  | { kind: "DISABLED" }
  | { kind: "OK"; rule: { mode: RuleMode; hours: number } }
  | { kind: "CONFIG_ERROR"; message: string };

async function loadMinRestRule(companyId: string): Promise<MinRestRuleResult> {
  const rule = await prisma.companyRule.findUnique({
    where: { companyId_key: { companyId, key: "PLANNING_MIN_REST_HOURS" } },
    select: { mode: true, value: true },
  });

  if (!rule) return { kind: "DISABLED" };
  if (rule.mode === RuleMode.OFF) return { kind: "DISABLED" };

  const raw = String(rule.value ?? "").trim();
  const hours = Number(raw);
  if (!Number.isFinite(hours) || hours <= 0) {
    return {
      kind: "CONFIG_ERROR",
      message: `CompanyRule PLANNING_MIN_REST_HOURS has invalid value "${rule.value}" (expected positive number)`,
    };
  }

  return { kind: "OK", rule: { mode: rule.mode, hours } };
}

function err(code: PlanningIssueCode, message: string, meta?: Record<string, unknown>): PlanningIssue {
  return meta ? { code, message, meta } : { code, message };
}

export async function assignShift(input: AssignShiftInput): Promise<AssignShiftResult> {
  const { companyId, shiftId } = input;

  const normalized = normalizePair(input.userId, input.user2Id);
  const userId = normalized.userId;
  const user2Id = normalized.user2Id;
  const vehicleId = input.vehicleId;
  const depotId = input.depotId;

  if (userId && user2Id && userId === user2Id) {
    return { ok: false, error: err("DUPLICATE_USER_IN_SAME_SHIFT", "Le même employé ne peut pas être affecté aux deux slots.") };
  }

  // 1) Charger Shift + template.category
  const shift = await prisma.shift.findFirst({
    where: { id: shiftId, companyId },
    select: {
      id: true,
      companyId: true,
      startAt: true,
      endAt: true,
      userId: true,
      user2Id: true,
      vehicleId: true,
      depotId: true,
      runId: true,
      template: { select: { category: true } },
    },
  });

  if (!shift) return { ok: false, error: err("NOT_FOUND", "Shift introuvable.") };
  if (shift.companyId !== companyId) return { ok: false, error: err("FORBIDDEN_COMPANY", "Accès interdit (multi-tenant).") };

  const category = (shift.template?.category ?? null) as Category | null;
  const requiredSlots = requiredSlotsFromCategory(category);

  // 2) Validation slots
  const countAssigned = (userId ? 1 : 0) + (user2Id ? 1 : 0);
  if (requiredSlots === 1 && countAssigned > 1) {
    return { ok: false, error: err("INVALID_SLOT_COUNT", "Ce shift n’accepte qu’un seul employé.", { category, requiredSlots }) };
  }

  const startAt = shift.startAt;
  const endAt = shift.endAt;

  if (!(startAt instanceof Date) || !(endAt instanceof Date) || !(startAt < endAt)) {
    return { ok: false, error: err("VALIDATION_ERROR", "Dates invalides sur le Shift (startAt/endAt).") };
  }

  const issues: PlanningIssue[] = [];
  const assignedUsers = [userId, user2Id].filter((x): x is string => Boolean(x));

  const absenceConflict =
    assignedUsers.length > 0
      ? await findFirstUserAbsenceConflict(prisma, {
          companyId,
          userIds: assignedUsers,
          startAt,
          endAt,
        })
      : null;

  if (absenceConflict) {
    return {
      ok: false,
      error: err("USER_ABSENCE_CONFLICT", "Conflit absence : employé indisponible sur ce créneau.", {
        userId: absenceConflict.userId,
        absenceId: absenceConflict.id,
        absenceStartAt: absenceConflict.startAt.toISOString(),
        absenceEndAt: absenceConflict.endAt.toISOString(),
        reason: absenceConflict.reason ?? null,
      }),
    };
  }

  // 3) Conflits users — autres Shifts + DraftShifts DRAFT
  if (assignedUsers.length > 0) {
    const otherShifts = await prisma.shift.findMany({
      where: {
        companyId,
        id: { not: shiftId },
        startAt: { lt: endAt },
        endAt: { gt: startAt },
        OR: [{ userId: { in: assignedUsers } }, { user2Id: { in: assignedUsers } }],
      },
      select: { id: true },
    });

    if (otherShifts.length > 0) {
      issues.push(
        err("USER_OVERLAP_CONFLICT", "Conflit horaire : employé déjà affecté sur un autre shift publié.", {
          conflictingShiftId: otherShifts[0]?.id,
        })
      );
    }

    const otherDrafts = await prisma.draftShift.findMany({
      where: {
        companyId,
        run: { status: "DRAFT" },
        startAt: { lt: endAt },
        endAt: { gt: startAt },
        OR: [{ userId: { in: assignedUsers } }, { user2Id: { in: assignedUsers } }],
      },
      select: { id: true },
    });

    if (otherDrafts.length > 0) {
      issues.push(
        err("USER_OVERLAP_CONFLICT", "Conflit horaire : employé affecté sur un shift brouillon (run DRAFT).", {
          conflictingDraftShiftId: otherDrafts[0]?.id,
        })
      );
    }
  }

  // 4) Conflits véhicule — autres Shifts + DraftShifts DRAFT
  if (vehicleId) {
    const otherVehicles = await prisma.shift.findMany({
      where: { companyId, id: { not: shiftId }, vehicleId, startAt: { lt: endAt }, endAt: { gt: startAt } },
      select: { id: true },
    });

    if (otherVehicles.length > 0) {
      issues.push(
        err("VEHICLE_OVERLAP_CONFLICT", "Conflit horaire : véhicule déjà affecté sur un autre shift publié.", {
          conflictingShiftId: otherVehicles[0]?.id,
        })
      );
    }

    const otherDraftVehicles = await prisma.draftShift.findMany({
      where: { companyId, run: { status: "DRAFT" }, vehicleId, startAt: { lt: endAt }, endAt: { gt: startAt } },
      select: { id: true },
    });

    if (otherDraftVehicles.length > 0) {
      issues.push(
        err("VEHICLE_OVERLAP_CONFLICT", "Conflit horaire : véhicule affecté sur un shift brouillon (run DRAFT).", {
          conflictingDraftShiftId: otherDraftVehicles[0]?.id,
        })
      );
    }
  }

  // 5) Règle entreprise — repos minimum
  const minRest = await loadMinRestRule(companyId);
  if (minRest.kind === "CONFIG_ERROR") {
    return { ok: false, error: err("RULE_CONFIG_ERROR", minRest.message, { key: "PLANNING_MIN_REST_HOURS" }) };
  }

  if (minRest.kind === "OK" && assignedUsers.length > 0) {
    const minRestMs = minRest.rule.hours * 60 * 60 * 1000;

    for (const u of assignedUsers) {
      const prevShift = await prisma.shift.findFirst({
        where: { companyId, id: { not: shiftId }, OR: [{ userId: u }, { user2Id: u }], endAt: { lte: startAt } },
        orderBy: { endAt: "desc" },
        select: { endAt: true },
      });

      const prevDraft = await prisma.draftShift.findFirst({
        where: { companyId, run: { status: "DRAFT" }, OR: [{ userId: u }, { user2Id: u }], endAt: { lte: startAt } },
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
          const issue = err("MIN_REST_VIOLATION", `Repos minimum non respecté (${minRest.rule.hours}h).`, {
            userId: u,
            requiredHours: minRest.rule.hours,
          });

          if (minRest.rule.mode === "ALERT" || minRest.rule.mode === "BOTH") issues.push(issue);

          if (minRest.rule.mode === "BLOCK" || minRest.rule.mode === "BOTH") {
            return { ok: false, error: err("RULE_BLOCKED", issue.message, issue.meta) };
          }
        }
      }
    }
  }

  // 6) Blocage double affectation : conflits bloquants
  const blockingConflict = issues.find((i) => i.code === "USER_OVERLAP_CONFLICT" || i.code === "VEHICLE_OVERLAP_CONFLICT");
  if (blockingConflict) return { ok: false, error: blockingConflict };

  // 7) Update Shift + audit minimal si changement réel
  const changedFields = [
    shift.userId !== userId ? "userId" : null,
    shift.user2Id !== user2Id ? "user2Id" : null,
    shift.vehicleId !== vehicleId ? "vehicleId" : null,
    shift.depotId !== depotId ? "depotId" : null,
  ].filter((field): field is string => field !== null);

  await prisma.$transaction(async (tx) => {
    await tx.shift.update({
      where: { id: shiftId },
      data: { userId, user2Id, vehicleId, depotId },
    });

    if (changedFields.length > 0) {
      await writePlanningAudit(tx, {
        companyId,
        actorUserId: input.actorUserId,
        runId: shift.runId,
        action: "SHIFT_ASSIGNED_MANUALLY",
        entityType: "Shift",
        entityId: shiftId,
        summary: `Shift manually assigned (${changedFields.join(", ")})`,
        payload: {
          changedFields,
          previous: {
            userId: shift.userId,
            user2Id: shift.user2Id,
            vehicleId: shift.vehicleId,
            depotId: shift.depotId,
          },
          next: {
            userId,
            user2Id,
            vehicleId,
            depotId,
          },
        },
      });
    }
  });

  return { ok: true, data: { shiftId, issues } };
}
