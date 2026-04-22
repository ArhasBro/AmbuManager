import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { prismaToHttp } from "@/lib/api/prisma-error";
import { AutoScheduleStatus } from "@prisma/client";
import { canCancelAutoSchedule } from "@/lib/permissions";
import { writePlanningAudit } from "@/lib/services/planning/planning-audit";

const ParamsSchema = z.object({
  id: z.string().min(1),
});

function extractRunIdFromPath(pathname: string): string | null {
  // attendu: /api/planning/autoschedule/runs/{id}/cancel
  const parts = pathname.split("/").filter(Boolean);

  const idx = parts.findIndex((p) => p === "runs");
  if (idx === -1) return null;

  const id = parts[idx + 1];
  const maybeCancel = parts[idx + 2];

  if (!id) return null;
  if (maybeCancel !== "cancel") return null;

  return id;
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  const companyId = session?.user?.companyId;
  const userId = session?.user?.id;
  const role = session?.user?.role;
  const platformRole = session?.user?.platformRole;

  if (!companyId || !userId) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  // ✅ RBAC (ADMIN/GERANT) ou permission dédiée
  const permAllowed = await canCancelAutoSchedule(userId, role, platformRole);

  if (!permAllowed) {
    return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  }

  // ✅ id depuis params (Promise), sinon fallback via URL
  let idFromParams: string | null = null;
  try {
    const p = await ctx.params;
    idFromParams = p?.id ? String(p.id) : null;
  } catch {
    idFromParams = null;
  }

  const idFromPath = extractRunIdFromPath(req.nextUrl.pathname);
  const id = idFromParams ?? idFromPath;

  const parsedParams = ParamsSchema.safeParse({ id });
  if (!parsedParams.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "VALIDATION_ERROR",
        details: {
          ...parsedParams.error.flatten(),
          debug: {
            pathname: req.nextUrl.pathname,
            paramsId: idFromParams ?? null,
            pathId: idFromPath ?? null,
          },
        },
      },
      { status: 400 }
    );
  }

  const runId = parsedParams.data.id;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const run = await tx.autoScheduleRun.findFirst({
        where: { id: runId, companyId },
        select: { id: true, status: true },
      });

      if (!run) return { ok: false as const, error: "NOT_FOUND" as const };

      // Idempotent
      if (run.status === AutoScheduleStatus.CANCELLED) {
        return { ok: true as const, data: { id: run.id, status: run.status } };
      }

      // On ne cancel pas un run publié (Alpha)
      if (run.status === AutoScheduleStatus.PUBLISHED) {
        return { ok: false as const, error: "RUN_ALREADY_PUBLISHED" as const };
      }

      const updated = await tx.autoScheduleRun.updateMany({
        where: { id: runId, companyId },
        data: { status: AutoScheduleStatus.CANCELLED },
      });

      if (updated.count === 0) {
        return { ok: false as const, error: "NOT_FOUND" as const };
      }

      await writePlanningAudit(tx, {
        companyId,
        actorUserId: userId,
        runId: run.id,
        action: "AUTOSCHEDULE_RUN_CANCELLED",
        entityType: "AutoScheduleRun",
        entityId: run.id,
        summary: "Brouillon autoschedule annulé",
        payload: {
          previousStatus: run.status,
        },
      });

      return { ok: true as const, data: { id: run.id, status: AutoScheduleStatus.CANCELLED } };
    });

    if (!result.ok) {
      if (result.error === "NOT_FOUND") {
        return NextResponse.json({ ok: false, error: "NOT_FOUND" }, { status: 404 });
      }
      if (result.error === "RUN_ALREADY_PUBLISHED") {
        return NextResponse.json({ ok: false, error: "RUN_ALREADY_PUBLISHED" }, { status: 409 });
      }
      return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data: result.data });
  } catch (e) {
    const mapped = prismaToHttp(e);
    if (mapped) {
      return NextResponse.json({ ok: false, error: mapped.error }, { status: mapped.status });
    }
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}