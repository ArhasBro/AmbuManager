import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { canAutoSchedule } from "@/lib/permissions";
import { writePlanningAudit } from "@/lib/services/planning/planning-audit";

const BodySchema = z.object({
  day: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "day must be YYYY-MM-DD"),
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
  return new Date(Y, M - 1, D, h, m, 0, 0);
}

type PrismaKnownCode = "P2002" | "P2025";

function getPrismaCode(e: unknown): PrismaKnownCode | null {
  if (typeof e !== "object" || e === null) return null;
  if (!("code" in e)) return null;
  const code = (e as { code?: unknown }).code;
  if (code === "P2002" || code === "P2025") return code;
  return null;
}

function prismaToApiError(e: unknown): { status: number; body: { ok: false; error: string } } {
  const code = getPrismaCode(e);
  if (code === "P2002") return { status: 409, body: { ok: false, error: "CONFLICT" } };
  if (code === "P2025") return { status: 404, body: { ok: false, error: "NOT_FOUND" } };

  return { status: 500, body: { ok: false, error: "SERVER_ERROR" } };
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

  // ✅ RBAC (ADMIN/GERANT) ou permission dédiée
  const permAllowed = await canAutoSchedule(userId, role);

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

  const { day, category } = parsed.data;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const dayDate = buildDateTimeLocal(day, "00:00");

      // ✅ empêche double génération DRAFT sur le même jour
      const existingDraft = await tx.autoScheduleRun.findFirst({
        where: {
          companyId,
          scope: "DAY",
          status: "DRAFT",
          day: dayDate,
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
          scope: "DAY",
          status: "DRAFT",
          day: dayDate,
          createdById: userId,
        },
      });

      const draftsData = templates.map((t) => {
        const startAt = buildDateTimeLocal(day, t.startTime);
        let endAt = buildDateTimeLocal(day, t.endTime);

        if (t.crossesMidnight || endAt.getTime() <= startAt.getTime()) {
          endAt = new Date(endAt.getTime() + 24 * 60 * 60 * 1000);
        }

        return {
          companyId,
          runId: run.id,
          templateId: t.id,
          date: dayDate,
          startAt,
          endAt,
          notes: null as string | null,
        };
      });

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
        summary: `Autoschedule DAY created for ${day}${category ? ` (${category})` : ""}`,
        payload: {
          scope: "DAY",
          day,
          draftCount: draftsData.length,
          category: category ?? null,
        },
      });

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