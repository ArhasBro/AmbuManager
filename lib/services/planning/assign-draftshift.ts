// lib/services/planning/assign-draftshift.ts
import { prisma } from "@/lib/prisma";
import { writePlanningAudit } from "@/lib/services/planning/planning-audit";
import { findFirstUserAbsenceConflict } from "@/lib/services/planning/user-absence";
import type { PlanningIssue, PlanningIssueCode } from "@/lib/types/planning";
import { COMPANY_PARAMETER_KEYS } from "@/lib/company-rules/catalog";
import { loadMinRestCompanyRule } from "@/lib/company-rules/runtime";
import { isRoleAllowedForSlot, resolveTemplateMinStaffCount } from "@/lib/templates/template-rules";

export type AssignDraftShiftInput = {
  companyId: string;
  draftShiftId: string;
  actorUserId: string;

  userId: string | null;
  user2Id: string | null;
  vehicleId: string | null;
};

export type AssignDraftShiftResult =
  | { ok: true; data: { draftShiftId: string; issues: PlanningIssue[] } }
  | { ok: false; error: PlanningIssue };

type Category = "VSL" | "TAXI" | "AMBULANCE" | "GARDE" | string;

function normalizePair(userId: string | null, user2Id: string | null): { userId: string | null; user2Id: string | null } {
  if (!userId && user2Id) return { userId: user2Id, user2Id: null };
  return { userId, user2Id };
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
      runId: true,
      run: { select: { status: true } },
      template: { select: { category: true, requiredRole: true, secondaryAllowedRoles: true, minStaffCount: true, requiredVehicleType: true } },
    },
  });

  if (!draft) return { ok: false, error: err("NOT_FOUND", "DraftShift introuvable.") };
  if (draft.companyId !== companyId) return { ok: false, error: err("FORBIDDEN_COMPANY", "Accès interdit (multi-tenant).") };

  if (draft.run.status !== "DRAFT") {
    return { ok: false, error: err("RUN_NOT_DRAFT", "Ce run n’est pas en statut DRAFT.") };
  }

  const category = (draft.template?.category ?? null) as Category | null;
  const requiredSlots = resolveTemplateMinStaffCount(draft.template?.minStaffCount ?? null, category);

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

  const selectedUsers = assignedUsers.length > 0
    ? await prisma.user.findMany({
        where: { id: { in: assignedUsers }, companyId },
        select: { id: true, role: true },
      })
    : [];

  if (selectedUsers.length !== assignedUsers.length) {
    return { ok: false, error: err("VALIDATION_ERROR", "Employé invalide pour la société courante.") };
  }

  const user1Role = selectedUsers.find((user) => user.id === userId)?.role ?? null;
  const user2Role = selectedUsers.find((user) => user.id === user2Id)?.role ?? null;

  if (userId && !isRoleAllowedForSlot(draft.template ?? { category }, 1, user1Role)) {
    return {
      ok: false,
      error: err("TEMPLATE_ROLE_MISMATCH", "Le rôle du slot 1 ne respecte pas la composition minimale du template.", {
        slot: 1,
        userId,
        role: user1Role,
      }),
    };
  }

  if (user2Id && !isRoleAllowedForSlot(draft.template ?? { category }, 2, user2Role)) {
    return {
      ok: false,
      error: err("TEMPLATE_ROLE_MISMATCH", "Le rôle du slot 2 ne respecte pas la composition minimale du template.", {
        slot: 2,
        userId: user2Id,
        role: user2Role,
      }),
    };
  }

  if (vehicleId && draft.template?.requiredVehicleType) {
    const selectedVehicle = await prisma.vehicle.findFirst({
      where: { id: vehicleId, companyId },
      select: { id: true, type: true },
    });

    if (!selectedVehicle) {
      return { ok: false, error: err("VALIDATION_ERROR", "Véhicule invalide pour la société courante.") };
    }

    if (selectedVehicle.type !== draft.template.requiredVehicleType) {
      return {
        ok: false,
        error: err("TEMPLATE_VEHICLE_TYPE_MISMATCH", "Le véhicule choisi ne correspond pas au type requis par le template.", {
          requiredVehicleType: draft.template.requiredVehicleType,
          actualVehicleType: selectedVehicle.type,
          vehicleId,
        }),
      };
    }
  }

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
        isCancelled: false,
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
      where: { companyId, isCancelled: false, vehicleId, startAt: { lt: endAt }, endAt: { gt: startAt } },
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
  const minRest = await loadMinRestCompanyRule(prisma, companyId);
  if (minRest.kind === "CONFIG_ERROR") {
    return { ok: false, error: err("RULE_CONFIG_ERROR", minRest.message, { key: COMPANY_PARAMETER_KEYS.PLANNING_MIN_REST_HOURS }) };
  }

  if (minRest.kind === "OK" && assignedUsers.length > 0) {
    const minRestMs = minRest.rule.hours * 60 * 60 * 1000;

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
        where: { companyId, isCancelled: false, OR: [{ userId: u }, { user2Id: u }], endAt: { lte: startAt } },
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

  // 7) Update DraftShift + audit minimal si changement réel
  const changedFields = [
    draft.userId !== userId ? "userId" : null,
    draft.user2Id !== user2Id ? "user2Id" : null,
    draft.vehicleId !== vehicleId ? "vehicleId" : null,
  ].filter((field): field is string => field !== null);

  await prisma.$transaction(async (tx) => {
    await tx.draftShift.update({
      where: { id: draftShiftId },
      data: { userId, user2Id, vehicleId },
    });

    if (changedFields.length > 0) {
      await writePlanningAudit(tx, {
        companyId,
        actorUserId: input.actorUserId,
        runId: draft.runId,
        action: "DRAFT_SHIFT_ASSIGNED_MANUALLY",
        entityType: "DraftShift",
        entityId: draftShiftId,
        summary: `DraftShift manually assigned (${changedFields.join(", ")})`,
        payload: {
          changedFields,
          previous: {
            userId: draft.userId,
            user2Id: draft.user2Id,
            vehicleId: draft.vehicleId,
          },
          next: {
            userId,
            user2Id,
            vehicleId,
          },
        },
      });
    }
  });

  return { ok: true, data: { draftShiftId, issues } };
}
