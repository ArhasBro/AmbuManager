import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { canEditPlanning, canViewGlobalPlanning, canViewSelfPlanning } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { writePlanningAudit } from "@/lib/services/planning/planning-audit";

const QuerySchema = z.object({
  day: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  weekStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  month: z.string().regex(/^\d{4}-\d{2}$/).optional(),
  userId: z.string().uuid().optional(),
  includeHistory: z.enum(["0", "1"]).optional().default("0"),
  limit: z.coerce.number().int().min(1).max(500).optional().default(500),
});

const CreateShiftSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  endTime: z.string().regex(/^\d{2}:\d{2}$/),
  templateId: z.string().cuid(),
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

function toMondayLocal(dayStr: string): Date {
  const base = buildDateTimeLocal(dayStr, "00:00");
  const jsDay = base.getDay();
  const diffToMonday = (jsDay + 6) % 7;
  return addDays(base, -diffToMonday);
}

function startOfMonthLocal(monthStr: string): Date {
  const [Y, M] = monthStr.split("-").map((x) => Number(x));
  return new Date(Y, M - 1, 1, 0, 0, 0, 0);
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const companyId = session?.user?.companyId;
  const userId = session?.user?.id;
  const role = session?.user?.role;
  const platformRole = session?.user?.platformRole;

  if (!companyId || !userId) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const [canViewSelf, canViewGlobal] = await Promise.all([
    canViewSelfPlanning(userId, role, platformRole),
    canViewGlobalPlanning(userId, role, platformRole),
  ]);

  if (!canViewSelf && !canViewGlobal) {
    return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  }

  const url = new URL(req.url);
  const rawQuery: Record<string, string | undefined> = {
    day: url.searchParams.get("day") ?? undefined,
    weekStart: url.searchParams.get("weekStart") ?? undefined,
    month: url.searchParams.get("month") ?? undefined,
    userId: url.searchParams.get("userId") ?? undefined,
    includeHistory: url.searchParams.get("includeHistory") ?? undefined,
    limit: url.searchParams.get("limit") ?? undefined,
  };

  const parsed = QuerySchema.safeParse(rawQuery);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() }, { status: 400 });
  }

  const { day, weekStart, month, userId: requestedUserId, includeHistory, limit } = parsed.data;
  const scopes = [day, weekStart, month].filter(Boolean);
  if (scopes.length > 1) {
    return NextResponse.json({ ok: false, error: "VALIDATION_ERROR", details: { message: "Use only one scope: day, weekStart or month." } }, { status: 400 });
  }

  if (!canViewGlobal && requestedUserId && requestedUserId !== userId) {
    return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  }

  const targetUserId = canViewGlobal ? requestedUserId ?? null : userId;

  try {
    if (targetUserId) {
      const targetUser = await prisma.user.findFirst({ where: { id: targetUserId, companyId }, select: { id: true } });
      if (!targetUser) {
        return NextResponse.json({ ok: false, error: "USER_NOT_FOUND" }, { status: 404 });
      }
    }

    let where: Prisma.ShiftWhereInput = { companyId };

    if (targetUserId) {
      where = { ...where, OR: [{ userId: targetUserId }, { user2Id: targetUserId }] };
    }

    if (day) {
      const start = buildDateTimeLocal(day, "00:00");
      const end = addDays(start, 1);
      where = { ...where, startAt: { gte: start, lt: end } };
    } else if (weekStart) {
      const monday = toMondayLocal(weekStart);
      const end = addDays(monday, 7);
      where = { ...where, startAt: { gte: monday, lt: end } };
    } else if (month) {
      const start = startOfMonthLocal(month);
      const end = new Date(start.getFullYear(), start.getMonth() + 1, 1, 0, 0, 0, 0);
      where = { ...where, startAt: { gte: start, lt: end } };
    }

    const shifts = await prisma.shift.findMany({
      where,
      orderBy: [{ startAt: "asc" }, { createdAt: "asc" }],
      take: limit,
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
        user2: { select: { id: true, name: true, email: true, role: true } },
        vehicle: { select: { id: true, immatriculation: true, type: true, status: true } },
        depot: { select: { id: true, name: true, isActive: true } },
        template: { select: { id: true, name: true, category: true, minStaffCount: true, requiredVehicleType: true, color: true } },
        run: { select: { id: true, scope: true, status: true, day: true, weekStart: true, createdAt: true } },
      },
    });

    const shiftIds = shifts.map((shift) => shift.id);
    const auditLogs = includeHistory === "1" && shiftIds.length > 0
      ? await prisma.planningAuditLog.findMany({
          where: { companyId, entityType: "Shift", entityId: { in: shiftIds } },
          orderBy: [{ createdAt: "desc" }],
          include: { actorUser: { select: { id: true, name: true, email: true } } },
          take: 500,
        })
      : [];

    const historyByShiftId = Object.fromEntries(shiftIds.map((id) => [id, [] as unknown[]]));
    for (const log of auditLogs) {
      (historyByShiftId[log.entityId] ??= []).push({
        id: log.id,
        createdAt: log.createdAt.toISOString(),
        action: log.action,
        summary: log.summary,
        payload: log.payload,
        actorUser: log.actorUser,
      });
    }

    return NextResponse.json({
      ok: true,
      data: shifts.map((s) => ({
        ...s,
        date: s.date.toISOString(),
        startAt: s.startAt.toISOString(),
        endAt: s.endAt.toISOString(),
        cancelledAt: s.cancelledAt?.toISOString() ?? null,
        createdAt: s.createdAt.toISOString(),
        updatedAt: s.updatedAt.toISOString(),
        run: s.run
          ? {
              ...s.run,
              day: s.run.day ? s.run.day.toISOString() : null,
              weekStart: s.run.weekStart ? s.run.weekStart.toISOString() : null,
              createdAt: s.run.createdAt.toISOString(),
            }
          : null,
      })),
      historyByShiftId,
      access: {
        canViewSelf,
        canViewGlobal,
        targetUserId,
      },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
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

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  }

  const parsed = CreateShiftSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() }, { status: 400 });
  }

  const { date, startTime, endTime, templateId, depotId, notes } = parsed.data;

  try {
    const [template, depot] = await Promise.all([
      prisma.shiftTemplate.findFirst({
        where: { id: templateId, companyId, isActive: true },
        select: { id: true },
      }),
      depotId
        ? prisma.depot.findFirst({ where: { id: depotId, companyId }, select: { id: true } })
        : Promise.resolve(null),
    ]);

    if (!template) {
      return NextResponse.json({ ok: false, error: "TEMPLATE_NOT_FOUND" }, { status: 404 });
    }

    if (depotId && !depot) {
      return NextResponse.json({ ok: false, error: "DEPOT_NOT_FOUND" }, { status: 404 });
    }

    const startAt = buildDateTimeLocal(date, startTime);
    let endAt = buildDateTimeLocal(date, endTime);
    if (!(startAt < endAt)) {
      endAt = addDays(endAt, 1);
    }

    const shift = await prisma.shift.create({
      data: {
        companyId,
        date: buildDateTimeLocal(date, "00:00"),
        startAt,
        endAt,
        templateId,
        depotId: depotId ?? null,
        notes: notes ?? null,
      },
    });

    await writePlanningAudit(prisma, {
      companyId,
      actorUserId,
      runId: null,
      action: "SHIFT_CREATED_MANUALLY",
      entityType: "Shift",
      entityId: shift.id,
      summary: "Shift publié créé manuellement",
      payload: {
        date,
        startTime,
        endTime,
        templateId,
        depotId: depotId ?? null,
      },
    });

    return NextResponse.json({ ok: true, data: { id: shift.id } }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}
