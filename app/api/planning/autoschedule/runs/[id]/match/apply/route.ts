import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ok, json } from "@/lib/api/response";
import { autoMatchRunDraftShifts } from "@/lib/services/planning/matching.service";

const BodySchema = z
  .object({
    confirm: z.literal(true),
  })
  .strict();

function hasAutoschedulePermission(session: unknown): boolean {
  if (!session || typeof session !== "object") return false;

  const s = session as {
    user?: {
      role?: unknown;
      permissions?: unknown;
    };
  };

  const role = s.user?.role;
  if (role === "ADMIN" || role === "GERANT") return true;

  const permissions = s.user?.permissions;
  if (Array.isArray(permissions)) {
    return (permissions as unknown[]).includes("PLANNING_AUTOSCHEDULE");
  }

  return false;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const session = await getServerSession(authOptions);

  const companyId =
    session?.user && typeof session.user === "object"
      ? (session.user as { companyId?: unknown }).companyId
      : undefined;

  if (typeof companyId !== "string" || companyId.length === 0) {
    return json(
      { ok: false, error: "UNAUTHORIZED", details: "Session invalide (companyId manquant)" },
      401
    );
  }

  if (!hasAutoschedulePermission(session)) {
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

    return json({ ok: false, error: "MATCH_FAILED", details: message }, 500);
  }
}