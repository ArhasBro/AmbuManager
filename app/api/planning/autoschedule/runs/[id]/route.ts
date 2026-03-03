import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ParamsSchema = z.object({
  id: z.string().min(1),
});

function extractRunIdFromPath(pathname: string): string | null {
  // attendu: /api/planning/autoschedule/runs/{id}
  const parts = pathname.split("/").filter(Boolean);

  const idx = parts.findIndex((p) => p === "runs");
  if (idx === -1) return null;

  const id = parts[idx + 1];
  if (!id) return null;

  // si jamais on est sur /runs/{id}/publish ou /cancel, on ne veut pas tomber ici
  const next = parts[idx + 2];
  if (next) return null;

  return id;
}

type PrismaKnownCode = "P2025";

function getPrismaCode(e: unknown): PrismaKnownCode | null {
  if (typeof e !== "object" || e === null) return null;
  if (!("code" in e)) return null;

  const code = (e as { code?: unknown }).code;
  if (code === "P2025") return code;

  return null;
}

function prismaToApiError(e: unknown): { status: number; body: { ok: false; error: string; message?: string } } {
  const code = getPrismaCode(e);
  if (code === "P2025") return { status: 404, body: { ok: false, error: "NOT_FOUND" } };

  const message = e instanceof Error ? e.message : "Unknown error";
  return { status: 500, body: { ok: false, error: "SERVER_ERROR", message } };
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  const companyId = session?.user?.companyId;
  const userId = session?.user?.id;
  const role = session?.user?.role;

  if (!companyId || !userId) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  // ✅ Décision validée : ADMIN + GERANT uniquement
  const roleAllowed = role === "ADMIN" || role === "GERANT";
  if (!roleAllowed) {
    return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  }

  // ✅ id depuis params (Promise), sinon fallback via l’URL
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
    const run = await prisma.autoScheduleRun.findFirst({
      where: { id: runId, companyId },
      select: {
        id: true,
        companyId: true,
        scope: true,
        status: true,
        day: true,
        weekStart: true,
        createdAt: true,
        createdBy: { select: { id: true, name: true, email: true } },
        _count: { select: { draftShifts: true } },
        draftShifts: {
          orderBy: { startAt: "asc" },
          include: { template: true, user: true, vehicle: true },
        },
      },
    });

    if (!run) {
      return NextResponse.json({ ok: false, error: "NOT_FOUND" }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      data: {
        ...run,
        day: run.day ? run.day.toISOString() : null,
        weekStart: run.weekStart ? run.weekStart.toISOString() : null,
        createdAt: run.createdAt.toISOString(),
        draftShifts: run.draftShifts.map((s) => ({
          ...s,
          date: s.date.toISOString(),
          startAt: s.startAt.toISOString(),
          endAt: s.endAt.toISOString(),
          createdAt: s.createdAt.toISOString(),
        })),
      },
    });
  } catch (e) {
    const mapped = prismaToApiError(e);
    return NextResponse.json(mapped.body, { status: mapped.status });
  }
}