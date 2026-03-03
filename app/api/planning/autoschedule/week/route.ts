import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const BodySchema = z.object({
  // "YYYY-MM-DD" (idéalement lundi; on accepte autre et on ramène au lundi)
  weekStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "weekStart must be YYYY-MM-DD"),
  category: z.enum(["VSL", "AMBULANCE", "TAXI", "GARDE"]).optional(),
});

type Category = z.infer<typeof BodySchema>["category"];

type AutoscheduleSentinel =
  | { ok: false; error: "DRAFT_ALREADY_EXISTS"; runId: string }
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

async function canAutoSchedule(userId: string): Promise<boolean> {
  const perms = await prisma.userPermission.findMany({
    where: { userId },
    include: { permission: true },
  });
  return perms.some((p) => p.permission.code === "PLANNING_AUTOSCHEDULE");
}

type PrismaKnownCode = "P2002" | "P2025";

function getPrismaCode(e: unknown): PrismaKnownCode | null {
  if (typeof e !== "object" || e === null) return null;
  if (!("code" in e)) return null;

  const code = (e as { code?: unknown }).code;
  if (code === "P2002" || code === "P2025") return code;

  return null;
}

function prismaToApiError(e: unknown): { status: number; body: { ok: false; error: string; message?: string } } {
  // mapping minimal et safe
  const code = getPrismaCode(e);

  if (code === "P2002") return { status: 409, body: { ok: false, error: "CONFLICT" } };
  if (code === "P2025") return { status: 404, body: { ok: false, error: "NOT_FOUND" } };

  const message = e instanceof Error ? e.message : "Unknown error";
  return { status: 500, body: { ok: false, error: "SERVER_ERROR", message } };
}

function isAutoscheduleSentinel(v: unknown): v is AutoscheduleSentinel {
  if (typeof v !== "object" || v === null) return false;
  if (!("ok" in v) || !("error" in v)) return false;

  const obj = v as { ok?: unknown; error?: unknown; runId?: unknown };
  if (obj.ok !== false) return false;

  if (obj.error === "NO_TEMPLATES") return true;
  if (obj.error === "DRAFT_ALREADY_EXISTS" && typeof obj.runId === "string") return true;

  return false;
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const companyId = session?.user?.companyId;
  const userId = session?.user?.id;
  const role = session?.user?.role;

  if (!companyId || !userId) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const roleAllowed = role === "ADMIN" || role === "GERANT";
  const permAllowed = roleAllowed ? true : await canAutoSchedule(userId);

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

  const { weekStart, category } = parsed.data;

  try {
    const monday = toMondayLocal(weekStart);

    const result = await prisma.$transaction(async (tx) => {
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
        return { ok: false, error: "DRAFT_ALREADY_EXISTS", runId: existingDraft.id } satisfies AutoscheduleSentinel;
      }

      const templateWhere: { companyId: string; isActive: boolean; category?: Category } = {
        companyId,
        isActive: true,
      };
      if (category) templateWhere.category = category;

      const templates = await tx.shiftTemplate.findMany({
        where: templateWhere,
        orderBy: { startTime: "asc" },
      });

      // ✅ IMPORTANT: on évite de créer un run vide qui donnera NO_DRAFTS au publish
      if (templates.length === 0) {
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

        for (const t of templates) {
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

      // IMPORTANT: sécurité multi-tenant sur le read final
      const full = await tx.autoScheduleRun.findFirst({
        where: { id: run.id, companyId },
        include: {
          draftShifts: {
            orderBy: { startAt: "asc" },
            include: { template: true, user: true, vehicle: true },
          },
        },
      });

      return full;
    });

    // ✅ sentinel NO_TEMPLATES / DRAFT_ALREADY_EXISTS depuis la transaction
    if (isAutoscheduleSentinel(result)) {
      if (result.error === "NO_TEMPLATES") {
        return NextResponse.json({ ok: false, error: "NO_TEMPLATES" }, { status: 409 });
      }

      if (result.error === "DRAFT_ALREADY_EXISTS") {
        return NextResponse.json({ ok: false, error: "DRAFT_ALREADY_EXISTS", runId: result.runId }, { status: 409 });
      }
    }

    return NextResponse.json({ ok: true, data: result });
  } catch (e) {
    const mapped = prismaToApiError(e);
    return NextResponse.json(mapped.body, { status: mapped.status });
  }
}