import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { canAutoSchedule } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { ok, json } from "@/lib/api/response";
import {
  computeDraftShiftMatchingByRole,
  MATCHING_VARIANTS,
  type MatchingVariantKey,
} from "@/lib/services/planning/matching.service";
import { computePlanningQuality } from "@/lib/services/planning/matching-quality";

const MatchingVariantEnum = z.enum(["VARIANT_1", "VARIANT_2", "VARIANT_3"]);

const BodySchema = z
  .object({
    includeAlreadyAssigned: z.boolean().optional(),
    variant: MatchingVariantEnum.optional(),
  })
  .strict();

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

  let includeAlreadyAssigned = false;
  let variant: MatchingVariantKey = "VARIANT_1";

  try {
    const jsonBody = (await req.json()) as unknown;
    const parsed = BodySchema.safeParse(jsonBody);
    if (!parsed.success) {
      return json(
        { ok: false, error: "INVALID_BODY", details: parsed.error.issues },
        400
      );
    }
    includeAlreadyAssigned = parsed.data.includeAlreadyAssigned ?? false;
    variant = parsed.data.variant ?? "VARIANT_1";
  } catch {
    // body vide accepté => includeAlreadyAssigned = false + variante 1
  }

  const plan = await computeDraftShiftMatchingByRole(prisma, {
    companyId,
    runId,
    includeAlreadyAssigned,
    variant,
  });

  const quality = computePlanningQuality(plan);
  const variantMeta = MATCHING_VARIANTS.find((item) => item.key === variant) ?? MATCHING_VARIANTS[0];

  return ok({ plan, quality, variant: variantMeta }, 200);
}
