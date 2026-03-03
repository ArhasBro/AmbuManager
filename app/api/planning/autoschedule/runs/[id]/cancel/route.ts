import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AutoScheduleStatus } from "@prisma/client";

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

async function canAutoSchedule(userId: string): Promise<boolean> {
  const perms = await prisma.userPermission.findMany({
    where: { userId },
    include: { permission: true },
  });
  return perms.some((p) => p.permission.code === "PLANNING_AUTOSCHEDULE");
}

function prismaToApiError(e: unknown): { status: number; body: { ok: false; error: string; message?: string } } {
  if (typeof e === "object" && e && "code" in e) {
    const maybe = e as { code?: unknown };
    const code = typeof maybe.code === "string" ? maybe.code : null;

    if (code === "P2002") return { status: 409, body: { ok: false, error: "CONFLICT" } };
    if (code === "P2025") return { status: 404, body: { ok: false, error: "NOT_FOUND" } };
  }

  const message = e instanceof Error ? e.message : "Unknown error";
  return { status: 500, body: { ok: false, error: "SERVER_ERROR", message } };
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  const companyId = session?.user?.companyId;
  const userId = session?.user?.id;
  const role = session?.user?.role;

  if (!companyId || !userId) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  // ✅ RBAC (ADMIN/GERANT) ou permission dédiée
  const roleAllowed = role === "ADMIN" || role === "GERANT";
  const permAllowed = roleAllowed ? true : await canAutoSchedule(userId);

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
        details: parsedParams.error.flatten(),
        debug: {
          pathname: req.nextUrl.pathname,
          paramsId: idFromParams ?? null,
          pathId: idFromPath ?? null,
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

      const updated = await tx.autoScheduleRun.update({
        where: { id: runId },
        data: { status: AutoScheduleStatus.CANCELLED },
        select: { id: true, status: true },
      });

      return { ok: true as const, data: updated };
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
    const mapped = prismaToApiError(e);
    return NextResponse.json(mapped.body, { status: mapped.status });
  }
}