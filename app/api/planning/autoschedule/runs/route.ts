import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { AutoScheduleScope, AutoScheduleStatus } from "@prisma/client";

const QuerySchema = z.object({
  scope: z.nativeEnum(AutoScheduleScope).optional(),
  status: z.nativeEnum(AutoScheduleStatus).optional(),
  limit: z.coerce.number().int().min(1).max(50).optional().default(20),
  cursor: z.string().optional(), // autoScheduleRun.id
});

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
  const code = getPrismaCode(e);
  if (code === "P2002") return { status: 409, body: { ok: false, error: "CONFLICT" } };
  if (code === "P2025") return { status: 404, body: { ok: false, error: "NOT_FOUND" } };

  const message = e instanceof Error ? e.message : "Unknown error";
  return { status: 500, body: { ok: false, error: "SERVER_ERROR", message } };
}

export async function GET(req: NextRequest) {
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

  const url = new URL(req.url);
  const rawQuery: Record<string, string | undefined> = {
    scope: url.searchParams.get("scope") ?? undefined,
    status: url.searchParams.get("status") ?? undefined,
    limit: url.searchParams.get("limit") ?? undefined,
    cursor: url.searchParams.get("cursor") ?? undefined,
  };

  const parsed = QuerySchema.safeParse(rawQuery);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { scope, status, limit, cursor } = parsed.data;

  try {
    const runs = await prisma.autoScheduleRun.findMany({
      where: {
        companyId,
        ...(scope ? { scope } : {}),
        ...(status ? { status } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: limit + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
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
      },
    });

    const hasMore = runs.length > limit;
    const items = hasMore ? runs.slice(0, limit) : runs;
    const nextCursor = hasMore ? items[items.length - 1]!.id : null;

    return NextResponse.json({
      ok: true,
      data: {
        items: items.map((r) => ({
          id: r.id,
          companyId: r.companyId,
          scope: r.scope,
          status: r.status,
          day: r.day ? r.day.toISOString() : null,
          weekStart: r.weekStart ? r.weekStart.toISOString() : null,
          createdAt: r.createdAt.toISOString(),
          createdBy: r.createdBy,
          counts: { draftShifts: r._count.draftShifts },
        })),
        nextCursor,
      },
    });
  } catch (e) {
    const mapped = prismaToApiError(e);
    return NextResponse.json(mapped.body, { status: mapped.status });
  }
}