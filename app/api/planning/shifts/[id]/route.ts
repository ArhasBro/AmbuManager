import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { COMPANY_PARAMETER_KEYS } from "@/lib/company-rules/catalog";
import { loadMinRestCompanyRule } from "@/lib/company-rules/runtime";
import { canEditPlanning } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { writePlanningAudit } from "@/lib/services/planning/planning-audit";
import { findFirstUserAbsenceConflict } from "@/lib/services/planning/user-absence";
import { isRoleAllowedForSlot, resolveTemplateMinStaffCount } from "@/lib/templates/template-rules";

const UpdateShiftSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  startTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  endTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  templateId: z.string().cuid().nullable().optional(),
  depotId: z.string().uuid().nullable().optional(),
  notes: z.string().max(2000).nullable().optional(),
});

function parseTimeToHoursMinutes(time: string): { h: number; m: number } {
  const [hStr, mStr] = time.split(":");
  const h = Number(hStr);
  const m = Number(mStr);
  if (!Number.isFinite(h) || !Number.isFinite(m)) throw new Error("Invalid time");
  if (h < 0 || h > 23 || m < 0 || m > 59) throw new Error("Invalid time");
  return { h, m };
}

function buildDateTimeLocal(dayStr: string, timeStr: string): Date {
  const { h, m } = parseTimeToHoursMinutes(timeStr);
  const [Y, M, D] = dayStr.split("-").map((x) => Number(x));
  return new Date(Y, M - 1, D, h, m, 0, 0);
}

function addDays(d: Date, days: number): Date {
  return new Date(d.getTime() + days * 24 * 60 * 60 * 1000);
}

function toDayString(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function toTimeString(d: Date) {
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  const companyId = session?.user?.companyId;
  const actorUserId = session?.user?.id;
  const role = session?.user?.role;
  const platformRole = session?.user?.platformRole;

  if (!companyId || !actorUserId) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const canManagePlanning = await canEditPlanning(actorUserId, role, platformRole);
  if (!canManagePlanning) {
    return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  }

  const { id } = await context.params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  }

  const parsed = UpdateShiftSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() }, { status: 400 });
  }

  const current = await prisma.shift.findFirst({
    where: { id, companyId, isCancelled: false },
    include: {
      template: { select: { id: true, category: true, minStaffCount: true, requiredRole: true, secondaryAllowedRoles: true, requiredVehicleType: true } },
    },
  });

  if (!current) {
    return NextResponse.json({ ok: false, error: "NOT_FOUND" }, { status: 404 });
  }

  try {
    const nextDay = parsed.data.date ?? toDayString(current.startAt);
    const nextStartTime = parsed.data.startTime ?? toTimeString(current.startAt);
    const nextEndTime = parsed.data.endTime ?? toTimeString(current.endAt);

    const startAt = buildDateTimeLocal(nextDay, nextStartTime);
    let endAt = buildDateTimeLocal(nextDay, nextEndTime);
    if (!(startAt < endAt)) endAt = addDays(endAt, 1);

    const nextTemplateId = parsed.data.templateId === undefined ? current.templateId : parsed.data.templateId;
    const nextDepotId = parsed.data.depotId === undefined ? current.depotId : parsed.data.depotId;
    const nextNotes = parsed.data.notes === undefined ? current.notes : parsed.data.notes;

    const nextTemplate = nextTemplateId
      ? await prisma.shiftTemplate.findFirst({
          where: { id: nextTemplateId, companyId },
          select: { id: true, category: true, minStaffCount: true, requiredRole: true, secondaryAllowedRoles: true, requiredVehicleType: true },
        })
      : null;

    if (nextTemplateId && !nextTemplate) {
      return NextResponse.json({ ok: false, error: "TEMPLATE_NOT_FOUND" }, { status: 404 });
    }

    if (nextDepotId) {
      const depot = await prisma.depot.findFirst({ where: { id: nextDepotId, companyId }, select: { id: true } });
      if (!depot) return NextResponse.json({ ok: false, error: "DEPOT_NOT_FOUND" }, { status: 404 });
    }

    const assignedUsers = [current.userId, current.user2Id].filter((x): x is string => Boolean(x));
    const requiredSlots = resolveTemplateMinStaffCount(nextTemplate?.minStaffCount ?? current.template?.minStaffCount ?? null, nextTemplate?.category ?? current.template?.category ?? null);
    if (requiredSlots === 1 && current.user2Id) {
      return NextResponse.json({ ok: false, error: "INVALID_SLOT_COUNT" }, { status: 409 });
    }

    if (assignedUsers.length > 0) {
      const selectedUsers = await prisma.user.findMany({ where: { id: { in: assignedUsers }, companyId }, select: { id: true, role: true } });
      const user1Role = selectedUsers.find((user) => user.id === current.userId)?.role ?? null;
      const user2Role = selectedUsers.find((user) => user.id === current.user2Id)?.role ?? null;

      if (current.userId && !isRoleAllowedForSlot(nextTemplate ?? { category: current.template?.category ?? null }, 1, user1Role)) {
        return NextResponse.json({ ok: false, error: "TEMPLATE_ROLE_MISMATCH", meta: { slot: 1, userId: current.userId, role: user1Role } }, { status: 409 });
      }

      if (current.user2Id && !isRoleAllowedForSlot(nextTemplate ?? { category: current.template?.category ?? null }, 2, user2Role)) {
        return NextResponse.json({ ok: false, error: "TEMPLATE_ROLE_MISMATCH", meta: { slot: 2, userId: current.user2Id, role: user2Role } }, { status: 409 });
      }

      const absenceConflict = await findFirstUserAbsenceConflict(prisma, { companyId, userIds: assignedUsers, startAt, endAt });
      if (absenceConflict) {
        return NextResponse.json({ ok: false, error: "USER_ABSENCE_CONFLICT", meta: { userId: absenceConflict.userId, absenceId: absenceConflict.id } }, { status: 409 });
      }

      const overlap = await prisma.shift.findFirst({
        where: {
          companyId,
          id: { not: id },
          isCancelled: false,
          startAt: { lt: endAt },
          endAt: { gt: startAt },
          OR: [{ userId: { in: assignedUsers } }, { user2Id: { in: assignedUsers } }],
        },
        select: { id: true },
      });
      if (overlap) {
        return NextResponse.json({ ok: false, error: "USER_OVERLAP_CONFLICT", meta: { conflictingShiftId: overlap.id } }, { status: 409 });
      }

      const minRest = await loadMinRestCompanyRule(prisma, companyId);
      if (minRest.kind === "CONFIG_ERROR") {
        return NextResponse.json({ ok: false, error: "RULE_CONFIG_ERROR", meta: { key: COMPANY_PARAMETER_KEYS.PLANNING_MIN_REST_HOURS } }, { status: 409 });
      }

      if (minRest.kind === "OK") {
        const minRestMs = minRest.rule.hours * 60 * 60 * 1000;
        for (const u of assignedUsers) {
          const prevShift = await prisma.shift.findFirst({
            where: { companyId, id: { not: id }, isCancelled: false, OR: [{ userId: u }, { user2Id: u }], endAt: { lte: startAt } },
            orderBy: { endAt: "desc" },
            select: { endAt: true },
          });
          if (prevShift) {
            const restMs = startAt.getTime() - prevShift.endAt.getTime();
            if (restMs < minRestMs && (minRest.rule.mode === "BLOCK" || minRest.rule.mode === "BOTH")) {
              return NextResponse.json({ ok: false, error: "RULE_BLOCKED", meta: { userId: u, requiredHours: minRest.rule.hours } }, { status: 409 });
            }
          }
        }
      }
    }

    if (current.vehicleId) {
      const nextVehicleTypeRequired = nextTemplate?.requiredVehicleType ?? current.template?.requiredVehicleType ?? null;
      if (nextVehicleTypeRequired) {
        const vehicle = await prisma.vehicle.findFirst({ where: { id: current.vehicleId, companyId }, select: { type: true } });
        if (vehicle && vehicle.type !== nextVehicleTypeRequired) {
          return NextResponse.json({ ok: false, error: "TEMPLATE_VEHICLE_TYPE_MISMATCH", meta: { requiredVehicleType: nextVehicleTypeRequired, actualVehicleType: vehicle.type } }, { status: 409 });
        }
      }

      const vehicleOverlap = await prisma.shift.findFirst({
        where: {
          companyId,
          id: { not: id },
          isCancelled: false,
          vehicleId: current.vehicleId,
          startAt: { lt: endAt },
          endAt: { gt: startAt },
        },
        select: { id: true },
      });
      if (vehicleOverlap) {
        return NextResponse.json({ ok: false, error: "VEHICLE_OVERLAP_CONFLICT", meta: { conflictingShiftId: vehicleOverlap.id } }, { status: 409 });
      }
    }

    const changes = {
      previous: {
        date: current.date.toISOString(),
        startAt: current.startAt.toISOString(),
        endAt: current.endAt.toISOString(),
        templateId: current.templateId,
        depotId: current.depotId,
        notes: current.notes,
      },
      next: {
        date: buildDateTimeLocal(nextDay, "00:00").toISOString(),
        startAt: startAt.toISOString(),
        endAt: endAt.toISOString(),
        templateId: nextTemplateId,
        depotId: nextDepotId,
        notes: nextNotes,
      },
    };

    await prisma.shift.update({
      where: { id },
      data: {
        date: buildDateTimeLocal(nextDay, "00:00"),
        startAt,
        endAt,
        templateId: nextTemplateId ?? null,
        depotId: nextDepotId ?? null,
        notes: nextNotes ?? null,
      },
    });

    await writePlanningAudit(prisma, {
      companyId,
      actorUserId,
      runId: current.runId,
      action: "SHIFT_UPDATED_MANUALLY",
      entityType: "Shift",
      entityId: id,
      summary: "Shift publié modifié manuellement",
      payload: changes,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}
