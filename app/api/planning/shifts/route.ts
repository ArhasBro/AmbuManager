import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { canViewGlobalPlanning, canViewSelfPlanning } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

const QuerySchema = z.object({
  day: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "day must be YYYY-MM-DD").optional(),
  weekStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "weekStart must be YYYY-MM-DD").optional(),
  userId: z.string().uuid().optional(),
  limit: z.coerce.number().int().min(1).max(200).optional().default(200),
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
    userId: url.searchParams.get("userId") ?? undefined,
    limit: url.searchParams.get("limit") ?? undefined,
  };

  const parsed = QuerySchema.safeParse(rawQuery);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() }, { status: 400 });
  }

  const { day, weekStart, userId: requestedUserId, limit } = parsed.data;

  if (day && weekStart) {
    return NextResponse.json(
      { ok: false, error: "VALIDATION_ERROR", details: { message: "Use day OR weekStart, not both." } },
      { status: 400 }
    );
  }

  if (!canViewGlobal && requestedUserId && requestedUserId !== userId) {
    return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  }

  const targetUserId = canViewGlobal ? requestedUserId ?? userId : userId;

  try {
    const targetUser = await prisma.user.findFirst({
      where: {
        id: targetUserId,
        companyId,
      },
      select: { id: true },
    });

    if (!targetUser) {
      return NextResponse.json({ ok: false, error: "USER_NOT_FOUND" }, { status: 404 });
    }

    let where: Prisma.ShiftWhereInput = {
      companyId,
      OR: [{ userId: targetUserId }, { user2Id: targetUserId }],
    };

    if (day) {
      const start = buildDateTimeLocal(day, "00:00");
      const end = addDays(start, 1);
      where = { ...where, startAt: { gte: start, lt: end } };
    } else if (weekStart) {
      const monday = toMondayLocal(weekStart);
      const end = addDays(monday, 7);
      where = { ...where, startAt: { gte: monday, lt: end } };
    }

    const shifts = await prisma.shift.findMany({
      where,
      orderBy: { startAt: "asc" },
      take: limit,
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
        user2: { select: { id: true, name: true, email: true, role: true } },
        vehicle: { select: { id: true, immatriculation: true, type: true, status: true } },
        depot: { select: { id: true, name: true, isActive: true } },
        template: { select: { id: true, name: true, category: true } },
        run: { select: { id: true, scope: true, status: true, day: true, weekStart: true, createdAt: true } },
      },
    });

    return NextResponse.json({
      ok: true,
      data: shifts.map((s) => ({
        ...s,
        date: s.date.toISOString(),
        startAt: s.startAt.toISOString(),
        endAt: s.endAt.toISOString(),
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
