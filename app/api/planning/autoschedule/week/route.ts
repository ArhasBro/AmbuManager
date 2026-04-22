import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { prismaToHttp } from "@/lib/api/prisma-error";
import { z } from "zod";
import { canAutoSchedule } from "@/lib/permissions";
import { writePlanningAudit } from "@/lib/services/planning/planning-audit";
import { autoMatchRunDraftShifts } from "@/lib/services/planning/matching.service";

const BodySchema = z.object({
  // "YYYY-MM-DD" (idéalement lundi; on accepte autre et on ramène au lundi)
  weekStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "weekStart must be YYYY-MM-DD"),
  category: z.enum(["VSL", "AMBULANCE", "TAXI", "GARDE"]).optional(),
  assignmentMode: z.enum(["SHIFTS_ONLY", "AUTO_ASSIGN"]).optional().default("SHIFTS_ONLY"),
});

type Category = z.infer<typeof BodySchema>["category"];

type AutoscheduleSentinel =
  | { ok: false; error: "DRAFT_ALREADY_EXISTS"; details: { runId: string } }
  | { ok: false; error: "NO_TEMPLATES" };

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
  // Date locale (comme ton script actuel)
  return new Date(Y, M - 1, D, h, m, 0, 0);
}

function addDays(d: Date, days: number): Date {
  return new Date(d.getTime() + days * 24 * 60 * 60 * 1000);
}

function formatDay(d: Date): string {
  const Y = d.getFullYear();
  const M = String(d.getMonth() + 1).padStart(2, "0");
  const D = String(d.getDate()).padStart(2, "0");
  return `${Y}-${M}-${D}`;
}

// Ramène weekStart au lundi (si l'utilisateur envoie un autre jour)
function toMondayLocal(dayStr: string): Date {
  const base = buildDateTimeLocal(dayStr, "00:00");
  const jsDay = base.getDay(); // 0=dim,1=lun,...6=sam
  const diffToMonday = (jsDay + 6) % 7; // lun->0, mar->1, ... dim->6
  return addDays(base, -diffToMonday);
}

function isAutoscheduleSentinel(v: unknown): v is AutoscheduleSentinel {
  if (typeof v !== "object" || v === null) return false;
  if (!("ok" in v) || !("error" in v)) return false;

  const obj = v as { ok?: unknown; error?: unknown; details?: unknown };
  if (obj.ok !== false) return false;

  if (obj.error === "NO_TEMPLATES") return true;
  if (
    obj.error === "DRAFT_ALREADY_EXISTS" &&
    typeof obj.details === "object" &&
    obj.details !== null &&
    "runId" in obj.details &&
    typeof (obj.details as { runId?: unknown }).runId === "string"
  ) {
    return true;
  }

  return false;
}

function toMatchingAuditMetrics(result: unknown): {
  planCount: number;
  appliedCount: number;
  vehicleAppliedCount: number;
} {
  if (!Array.isArray(result)) {
    return { planCount: 0, appliedCount: 0, vehicleAppliedCount: 0 };
  }

  let appliedCount = 0;
  let vehicleAppliedCount = 0;

  for (const item of result as Array<{ applied?: boolean; target?: string }>) {
    if (item.applied === true) {
      appliedCount += 1;
      if (item.target === "VEHICLE") vehicleAppliedCount += 1;
    }
  }

  return {
    planCount: result.length,
    appliedCount,
    vehicleAppliedCount,
  };
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const companyId = session?.user?.companyId;
  const userId = session?.user?.id;
  const role = session?.user?.role;
  const platformRole = session?.user?.platformRole;

  if (!companyId || !userId) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const permAllowed = await canAutoSchedule(userId, role, platformRole);

  if (!permAllowed) {
    return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { weekStart, category, assignmentMode } = parsed.data;

  try {
    const monday = toMondayLocal(weekStart);
    const normalizedWeekStart = formatDay(monday);

    const createdRun = await prisma.$transaction(async (tx) => {
      // ✅ empêche double génération DRAFT sur la même semaine
      const existingDraft = await tx.autoScheduleRun.findFirst({
        where: {
          companyId,
          scope: "WEEK",
          status: "DRAFT",
          weekStart: monday,
        },
        select: { id: true },
      });

      if (existingDraft) {
        return { ok: false, error: "DRAFT_ALREADY_EXISTS", details: { runId: existingDraft.id } } satisfies AutoscheduleSentinel;
      }

      const templateWhere: {
        companyId: string;
        isActive: boolean;
        archivedAt: null;
        isTimeDefined: boolean;
        category?: Category;
      } = {
        companyId,
        isActive: true,
        archivedAt: null,
        isTimeDefined: true,
      };
      if (category) templateWhere.category = category;

      const templates = await tx.shiftTemplate.findMany({
        where: templateWhere,
        orderBy: { startTime: "asc" },
      });

      const timedTemplates = templates.filter(
        (t): t is typeof t & { startTime: string; endTime: string } =>
          typeof t.startTime === "string" && typeof t.endTime === "string"
      );

      // ✅ IMPORTANT: on évite de créer un run vide qui donnera NO_DRAFTS au publish
      if (timedTemplates.length === 0) {
        return { ok: false, error: "NO_TEMPLATES" } satisfies AutoscheduleSentinel;
      }

      const run = await tx.autoScheduleRun.create({
        data: {
          companyId,
          scope: "WEEK",
          status: "DRAFT",
          weekStart: monday,
          createdById: userId,
        },
      });

      const draftsData: Array<{
        companyId: string;
        runId: string;
        templateId: string;
        date: Date;
        startAt: Date;
        endAt: Date;
        notes: string | null;
      }> = [];

      // 7 jours : lundi -> dimanche
      for (let i = 0; i < 7; i++) {
        const dayDate = addDays(monday, i);
        const dayStr = formatDay(dayDate);

        for (const t of timedTemplates) {
          const startAt = buildDateTimeLocal(dayStr, t.startTime);
          let endAt = buildDateTimeLocal(dayStr, t.endTime);

          // Sécurité: si crossesMidnight OU end <= start, on pousse au lendemain
          if (t.crossesMidnight || endAt.getTime() <= startAt.getTime()) {
            endAt = new Date(endAt.getTime() + 24 * 60 * 60 * 1000);
          }

          draftsData.push({
            companyId,
            runId: run.id,
            templateId: t.id,
            date: buildDateTimeLocal(dayStr, "00:00"),
            startAt,
            endAt,
            notes: null,
          });
        }
      }

      if (draftsData.length > 0) {
        await tx.draftShift.createMany({ data: draftsData });
      }

      await writePlanningAudit(tx, {
        companyId,
        actorUserId: userId,
        runId: run.id,
        action: "AUTOSCHEDULE_RUN_CREATED",
        entityType: "AutoScheduleRun",
        entityId: run.id,
        summary: `Brouillon autoschedule SEMAINE créé pour ${normalizedWeekStart}${category ? ` (${category})` : ""}`,
        payload: {
          scope: "WEEK",
          weekStart: normalizedWeekStart,
          draftCount: draftsData.length,
          category: category ?? null,
          assignmentMode,
        },
      });

      return { id: run.id };
    });

    // ✅ sentinel NO_TEMPLATES / DRAFT_ALREADY_EXISTS depuis la transaction
    if (isAutoscheduleSentinel(createdRun)) {
      if (createdRun.error === "NO_TEMPLATES") {
        return NextResponse.json({ ok: false, error: "NO_TEMPLATES" }, { status: 409 });
      }

      if (createdRun.error === "DRAFT_ALREADY_EXISTS") {
        return NextResponse.json({ ok: false, error: "DRAFT_ALREADY_EXISTS", details: createdRun.details }, { status: 409 });
      }
    }

    if (assignmentMode === "AUTO_ASSIGN") {
      const applied = await autoMatchRunDraftShifts(prisma, {
        companyId,
        runId: createdRun.id,
        dryRun: false,
      });

      const metrics = toMatchingAuditMetrics(applied);
      await writePlanningAudit(prisma, {
        companyId,
        actorUserId: userId,
        runId: createdRun.id,
        action: "AUTOSCHEDULE_MATCH_APPLIED",
        entityType: "AutoScheduleRun",
        entityId: createdRun.id,
        summary: `Auto-affectation autoschedule appliquée (${metrics.appliedCount}/${metrics.planCount})`,
        payload: {
          assignmentMode,
          planCount: metrics.planCount,
          appliedCount: metrics.appliedCount,
          vehicleAppliedCount: metrics.vehicleAppliedCount,
        },
      });
    }

    const full = await prisma.autoScheduleRun.findFirst({
      where: { id: createdRun.id, companyId },
      include: {
        draftShifts: {
          orderBy: { startAt: "asc" },
          include: { template: true, user: true, user2: true, vehicle: true },
        },
      },
    });

    return NextResponse.json({ ok: true, data: full });
  } catch (e) {
    const mapped = prismaToHttp(e);
    if (mapped) {
      return NextResponse.json({ ok: false, error: mapped.error }, { status: mapped.status });
    }
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}