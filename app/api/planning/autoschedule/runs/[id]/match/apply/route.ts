import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { canAutoSchedule } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { ok, json } from "@/lib/api/response";
import { autoMatchRunDraftShifts } from "@/lib/services/planning/matching.service";
import { writePlanningAudit } from "@/lib/services/planning/planning-audit";

const BodySchema = z
  .object({
    confirm: z.literal(true),
  })
  .strict();


type MatchingApplyAuditItem = {
  applied?: boolean;
  reason?: string;
};

function toMatchingAuditMetrics(result: unknown): {
  planCount: number;
  appliedCount: number;
  conflictCount: number;
} {
  if (!Array.isArray(result)) {
    return { planCount: 0, appliedCount: 0, conflictCount: 0 };
  }

  let appliedCount = 0;
  let conflictCount = 0;

  for (const item of result as MatchingApplyAuditItem[]) {
    if (item.applied === true) appliedCount += 1;
    if (item.reason === "USER_CONFLICT") conflictCount += 1;
  }

  return {
    planCount: result.length,
    appliedCount,
    conflictCount,
  };
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  const companyId = session?.user?.companyId;

  if (!session?.user?.id || typeof companyId !== "string" || companyId.length === 0) {
    return json(
      { ok: false, error: "UNAUTHORIZED", details: "Session invalide (companyId manquant)" },
      401
    );
  }

  if (!(await canAutoSchedule(session.user.id, session.user.role))) {
    return json(
      { ok: false, error: "FORBIDDEN", details: "Accès refusé (PLANNING_AUTOSCHEDULE requis)" },
      403
    );
  }

  const runId = typeof id === "string" && id.length > 0 ? id : null;
  if (!runId) {
    return json(
      { ok: false, error: "BAD_REQUEST", details: "runId introuvable dans l'URL" },
      400
    );
  }

  // ✅ Apply => on exige une confirmation explicite
  const jsonBody = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(jsonBody);
  if (!parsed.success) {
    return json(
      { ok: false, error: "INVALID_BODY", details: parsed.error.issues },
      400
    );
  }

  try {
    const result = await autoMatchRunDraftShifts(prisma, {
      companyId,
      runId,
      dryRun: false,
    });

    const metrics = toMatchingAuditMetrics(result);

    await writePlanningAudit(prisma, {
      companyId,
      actorUserId: session.user.id,
      runId,
      action: "AUTOSCHEDULE_MATCH_APPLIED",
      entityType: "AutoScheduleRun",
      entityId: runId,
      summary: `Autoschedule matching applied (${metrics.appliedCount}/${metrics.planCount})`,
      payload: {
        planCount: metrics.planCount,
        appliedCount: metrics.appliedCount,
        conflictCount: metrics.conflictCount,
      },
    });

    return ok(result, 200);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "UNKNOWN_ERROR";

    if (message === "RUN_NOT_FOUND") {
      return json({ ok: false, error: "RUN_NOT_FOUND" }, 404);
    }

    if (message === "RUN_NOT_DRAFT") {
      return json({ ok: false, error: "RUN_NOT_DRAFT" }, 409);
    }

    if (message === "MATCH_STALE_STATE") {
      return json({ ok: false, error: "MATCH_STALE_STATE" }, 409);
    }

    return json({ ok: false, error: "MATCH_FAILED" }, 500);
  }
}