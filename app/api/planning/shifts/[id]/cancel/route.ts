import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { canEditPlanning } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { writePlanningAudit } from "@/lib/services/planning/planning-audit";

const CancelSchema = z.object({
  reason: z.string().trim().max(500).optional().default("Annulation manuelle"),
});

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
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

  let body: unknown = {};
  try {
    const raw = await req.text();
    body = raw ? JSON.parse(raw) : {};
  } catch {
    body = {};
  }

  const parsed = CancelSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() }, { status: 400 });
  }

  const shift = (await (prisma.shift as unknown as {
    findFirst: (args: unknown) => Promise<{ id: string; runId: string | null; isCancelled?: boolean | null } | null>;
    update: (args: unknown) => Promise<unknown>;
  }).findFirst({
    where: { id, companyId },
    select: { id: true, runId: true, isCancelled: true, cancelledAt: true, cancellationReason: true },
  })) as { id: string; runId: string | null; isCancelled?: boolean | null; cancelledAt?: Date | null; cancellationReason?: string | null } | null;
  if (!shift) {
    return NextResponse.json({ ok: false, error: "NOT_FOUND" }, { status: 404 });
  }

  if (shift.isCancelled === true) {
    return NextResponse.json({ ok: false, error: "SHIFT_ALREADY_CANCELLED" }, { status: 409 });
  }

  const now = new Date();
  await (prisma.shift as unknown as {
    update: (args: unknown) => Promise<unknown>;
  }).update({
    where: { id },
    data: {
      isCancelled: true,
      cancelledAt: now,
      cancellationReason: parsed.data.reason,
    },
  });

  await writePlanningAudit(prisma, {
    companyId,
    actorUserId,
    runId: shift.runId,
    action: "SHIFT_CANCELLED_MANUALLY",
    entityType: "Shift",
    entityId: id,
    summary: "Shift publié annulé logiquement",
    payload: { changedFields: ["isCancelled", "cancelledAt", "cancellationReason"], previous: { isCancelled: shift.isCancelled ?? false, cancelledAt: shift.cancelledAt ?? null, cancellationReason: shift.cancellationReason ?? null }, next: { isCancelled: true, cancelledAt: now, cancellationReason: parsed.data.reason } },
  });

  return NextResponse.json({ ok: true });
}
