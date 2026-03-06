import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { AutoScheduleStatus, Prisma, RuleMode } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canPublishAutoSchedule } from "@/lib/permissions";

const ParamsSchema = z.object({
  id: z.string().min(1),
});

const MIN_REST_RULE_KEY = "PLANNING_MIN_REST_HOURS";

function extractRunIdFromPath(pathname: string): string | null {
  // attendu: /api/planning/autoschedule/runs/{id}/publish
  const parts = pathname.split("/").filter(Boolean);

  const idx = parts.findIndex((p) => p === "runs");
  if (idx === -1) return null;

  const id = parts[idx + 1];
  const maybePublish = parts[idx + 2];

  if (!id) return null;
  if (maybePublish !== "publish") return null;

  return id;
}

function prismaToApiError(
  e: unknown
): { status: number; body: { ok: false; error: string } } {
  if (typeof e === "object" && e && "code" in e) {
    const maybe = e as { code?: unknown };
    const code = typeof maybe.code === "string" ? maybe.code : null;

    if (code === "P2002") return { status: 409, body: { ok: false, error: "CONFLICT" } };
    if (code === "P2025") return { status: 404, body: { ok: false, error: "NOT_FOUND" } };
  }
  return { status: 500, body: { ok: false, error: "SERVER_ERROR" } };
}

type DraftForPublish = {
  companyId: string;
  runId: string;
  templateId: string | null;
  date: Date;
  startAt: Date;
  endAt: Date;
  userId: string | null;
  user2Id: string | null;
  vehicleId: string | null;
  notes: string | null;
};

function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
  return aStart < bEnd && aEnd > bStart;
}

/**
 * ✅ Conflits "chevauchement"
 */
async function checkConflicts(
  tx: Prisma.TransactionClient,
  companyId: string,
  drafts: DraftForPublish[]
): Promise<
  | { kind: "OK" }
  | {
      kind: "CONFLICT_USER";
      conflict: {
        userId: string;
        draft: { startAt: string; endAt: string };
        existingShiftId: string;
        existing: { startAt: string; endAt: string };
      };
    }
  | {
      kind: "CONFLICT_VEHICLE";
      conflict: {
        vehicleId: string;
        draft: { startAt: string; endAt: string };
        existingShiftId: string;
        existing: { startAt: string; endAt: string };
      };
    }
> {
  if (drafts.length === 0) return { kind: "OK" };

  const userIds = Array.from(
    new Set(drafts.flatMap((d) => [d.userId, d.user2Id]).filter(Boolean))
  ) as string[];
  const vehicleIds = Array.from(new Set(drafts.map((d) => d.vehicleId).filter(Boolean))) as string[];

  const minStart = drafts.reduce((min, d) => (d.startAt < min ? d.startAt : min), drafts[0]!.startAt);
  const maxEnd = drafts.reduce((max, d) => (d.endAt > max ? d.endAt : max), drafts[0]!.endAt);

  // 1) Conflits USER
  if (userIds.length > 0) {
    const existingUserShifts = await tx.shift.findMany({
      where: {
        companyId,
        OR: [{ userId: { in: userIds } }, { user2Id: { in: userIds } }],
        startAt: { lt: maxEnd },
        endAt: { gt: minStart },
      },
      select: { id: true, userId: true, user2Id: true, startAt: true, endAt: true },
      orderBy: { startAt: "asc" },
    });

    for (const d of drafts) {
      const assignedUsers = Array.from(new Set([d.userId, d.user2Id].filter(Boolean))) as string[];
      if (assignedUsers.length === 0) continue;

      for (const assignedUserId of assignedUsers) {
        const c = existingUserShifts.find(
          (s) =>
            (s.userId === assignedUserId || s.user2Id === assignedUserId) &&
            overlaps(s.startAt, s.endAt, d.startAt, d.endAt)
        );
        if (c) {
          return {
            kind: "CONFLICT_USER",
            conflict: {
              userId: assignedUserId,
              draft: { startAt: d.startAt.toISOString(), endAt: d.endAt.toISOString() },
              existingShiftId: c.id,
              existing: { startAt: c.startAt.toISOString(), endAt: c.endAt.toISOString() },
            },
          };
        }
      }
    }
  }

  // 2) Conflits VEHICLE
  if (vehicleIds.length > 0) {
    const existingVehicleShifts = await tx.shift.findMany({
      where: {
        companyId,
        vehicleId: { in: vehicleIds },
        startAt: { lt: maxEnd },
        endAt: { gt: minStart },
      },
      select: { id: true, vehicleId: true, startAt: true, endAt: true },
      orderBy: { startAt: "asc" },
    });

    for (const d of drafts) {
      if (!d.vehicleId) continue;
      const c = existingVehicleShifts.find(
        (s) => s.vehicleId === d.vehicleId && overlaps(s.startAt, s.endAt, d.startAt, d.endAt)
      );
      if (c) {
        return {
          kind: "CONFLICT_VEHICLE",
          conflict: {
            vehicleId: d.vehicleId,
            draft: { startAt: d.startAt.toISOString(), endAt: d.endAt.toISOString() },
            existingShiftId: c.id,
            existing: { startAt: c.startAt.toISOString(), endAt: c.endAt.toISOString() },
          },
        };
      }
    }
  }

  return { kind: "OK" };
}

/**
 * ✅ Repos minimum (CompanyRule + RuleMode)
 */
type MinRestRule =
  | { enabled: false }
  | { enabled: true; hours: number; mode: RuleMode };

async function loadMinRestRule(
  tx: Prisma.TransactionClient,
  companyId: string
): Promise<{ kind: "OK"; rule: MinRestRule } | { kind: "CONFIG_ERROR"; message: string }> {
  const r = await tx.companyRule.findFirst({
    where: { companyId, key: MIN_REST_RULE_KEY },
    select: { value: true, mode: true },
  });

  if (!r) return { kind: "OK", rule: { enabled: false } };
  if (r.mode === RuleMode.OFF) return { kind: "OK", rule: { enabled: false } };

  const raw = String(r.value ?? "").trim();
  const hours = Number(raw);

  if (!Number.isFinite(hours) || hours <= 0) {
    return {
      kind: "CONFIG_ERROR",
      message: `CompanyRule ${MIN_REST_RULE_KEY} has invalid value "${r.value}" (expected positive number)`,
    };
  }

  return { kind: "OK", rule: { enabled: true, hours, mode: r.mode } };
}

type RestWarning = {
  code: "MIN_REST_VIOLATION";
  userId: string;
  requiredHours: number;
  actualHours: number;
  between: {
    prev: { kind: "EXISTING" | "DRAFT"; id: string | null; endAt: string };
    next: { kind: "EXISTING" | "DRAFT"; id: string | null; startAt: string };
  };
};

type TimelineItem =
  | { kind: "EXISTING"; id: string; userId: string; startAt: Date; endAt: Date }
  | { kind: "DRAFT"; id: null; userId: string; startAt: Date; endAt: Date };

function diffHours(a: Date, b: Date): number {
  return (b.getTime() - a.getTime()) / (1000 * 60 * 60);
}

async function computeMinRestWarnings(
  tx: Prisma.TransactionClient,
  companyId: string,
  drafts: DraftForPublish[],
  requiredHours: number
): Promise<RestWarning[]> {
  const userIds = Array.from(
    new Set(drafts.flatMap((d) => [d.userId, d.user2Id]).filter(Boolean))
  ) as string[];
  if (userIds.length === 0) return [];
  if (drafts.length === 0) return [];

  const minStart = drafts.reduce((min, d) => (d.startAt < min ? d.startAt : min), drafts[0]!.startAt);
  const maxEnd = drafts.reduce((max, d) => (d.endAt > max ? d.endAt : max), drafts[0]!.endAt);

  const padMs = requiredHours * 60 * 60 * 1000;
  const windowStart = new Date(minStart.getTime() - padMs);
  const windowEnd = new Date(maxEnd.getTime() + padMs);

  const existing = await tx.shift.findMany({
    where: {
      companyId,
      OR: [{ userId: { in: userIds } }, { user2Id: { in: userIds } }],
      startAt: { lt: windowEnd },
      endAt: { gt: windowStart },
    },
    select: { id: true, userId: true, user2Id: true, startAt: true, endAt: true },
    orderBy: { startAt: "asc" },
  });

  const warnings: RestWarning[] = [];

  for (const uid of userIds) {
    const items: TimelineItem[] = [];

    for (const s of existing) {
      if (s.userId !== uid && s.user2Id !== uid) continue;
      items.push({ kind: "EXISTING", id: s.id, userId: uid, startAt: s.startAt, endAt: s.endAt });
    }

    for (const d of drafts) {
      if (d.userId !== uid && d.user2Id !== uid) continue;
      items.push({ kind: "DRAFT", id: null, userId: uid, startAt: d.startAt, endAt: d.endAt });
    }

    items.sort((a, b) => a.startAt.getTime() - b.startAt.getTime());

    for (let i = 0; i < items.length - 1; i++) {
      const prev = items[i]!;
      const next = items[i + 1]!;

      if (overlaps(prev.startAt, prev.endAt, next.startAt, next.endAt)) continue;

      const gap = diffHours(prev.endAt, next.startAt);
      if (gap < requiredHours) {
        if (prev.kind === "DRAFT" || next.kind === "DRAFT") {
          warnings.push({
            code: "MIN_REST_VIOLATION",
            userId: uid,
            requiredHours,
            actualHours: Math.max(0, gap),
            between: {
              prev: {
                kind: prev.kind,
                id: prev.kind === "EXISTING" ? prev.id : null,
                endAt: prev.endAt.toISOString(),
              },
              next: {
                kind: next.kind,
                id: next.kind === "EXISTING" ? next.id : null,
                startAt: next.startAt.toISOString(),
              },
            },
          });
        }
      }
    }
  }

  return warnings;
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  const companyId = session?.user?.companyId;
  const userId = session?.user?.id;
  const role = session?.user?.role;

  if (!companyId || !userId) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const permAllowed = await canPublishAutoSchedule(userId, role);

  if (!permAllowed) {
    return NextResponse.json(
      { ok: false, error: "FORBIDDEN" },
      { status: 403 }
    );
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
    const result = await prisma.$transaction(async (tx) => {
      const run = await tx.autoScheduleRun.findFirst({
        where: { id: runId, companyId },
        select: { id: true, status: true },
      });

      if (!run) return { kind: "NOT_FOUND" as const };

      if (run.status !== AutoScheduleStatus.DRAFT) {
        return { kind: "BAD_STATUS" as const, status: run.status };
      }

      const drafts = await tx.draftShift.findMany({
        where: { runId: run.id, companyId },
        select: {
          companyId: true,
          runId: true,
          templateId: true,
          date: true,
          startAt: true,
          endAt: true,
          userId: true,
          user2Id: true,
          vehicleId: true,
          notes: true,
        },
        orderBy: { startAt: "asc" },
      });

      if (drafts.length === 0) return { kind: "NO_DRAFTS" as const };

      // ✅ 1) Chevauchements (user/vehicle)
      const conflictCheck = await checkConflicts(tx, companyId, drafts as DraftForPublish[]);
      if (conflictCheck.kind === "CONFLICT_USER") {
        return { kind: "CONFLICT_USER" as const, conflict: conflictCheck.conflict };
      }
      if (conflictCheck.kind === "CONFLICT_VEHICLE") {
        return { kind: "CONFLICT_VEHICLE" as const, conflict: conflictCheck.conflict };
      }

      // ✅ 2) Repos minimum (CompanyRule)
      const ruleRes = await loadMinRestRule(tx, companyId);
      if (ruleRes.kind === "CONFIG_ERROR") {
        return { kind: "RULE_CONFIG_ERROR" as const, message: ruleRes.message };
      }

      let warnings: RestWarning[] = [];
      if (ruleRes.rule.enabled) {
        warnings = await computeMinRestWarnings(tx, companyId, drafts as DraftForPublish[], ruleRes.rule.hours);

        const mustBlock = ruleRes.rule.mode === RuleMode.BLOCK || ruleRes.rule.mode === RuleMode.BOTH;
        if (mustBlock && warnings.length > 0) {
          return {
            kind: "MIN_REST_BLOCKED" as const,
            warnings,
            requiredHours: ruleRes.rule.hours,
            mode: ruleRes.rule.mode,
          };
        }
      }

      // ✅ 3) Publication
      await tx.shift.createMany({
        data: drafts.map((d) => ({
          companyId: d.companyId,
          date: d.date,
          startAt: d.startAt,
          endAt: d.endAt,
          userId: d.userId,
          user2Id: d.user2Id,
          vehicleId: d.vehicleId,
          runId: d.runId,
          templateId: d.templateId,
          notes: d.notes,
        })),
      });

      await tx.autoScheduleRun.updateMany({
        where: { id: run.id, companyId },
        data: { status: AutoScheduleStatus.PUBLISHED },
      });

      return { kind: "OK" as const, publishedCount: drafts.length, warnings };
    });

    if (result.kind === "NOT_FOUND") {
      return NextResponse.json({ ok: false, error: "NOT_FOUND" }, { status: 404 });
    }
    if (result.kind === "BAD_STATUS") {
      return NextResponse.json(
        { ok: false, error: "RUN_NOT_DRAFT", details: { status: result.status } },
        { status: 409 }
      );
    }
    if (result.kind === "NO_DRAFTS") {
      return NextResponse.json({ ok: false, error: "NO_DRAFTS" }, { status: 409 });
    }
    if (result.kind === "CONFLICT_USER") {
      return NextResponse.json({ ok: false, error: "CONFLICT_USER", details: result.conflict }, { status: 409 });
    }
    if (result.kind === "CONFLICT_VEHICLE") {
      return NextResponse.json(
        { ok: false, error: "CONFLICT_VEHICLE", details: result.conflict },
        { status: 409 }
      );
    }
    if (result.kind === "RULE_CONFIG_ERROR") {
      return NextResponse.json(
        { ok: false, error: "RULE_CONFIG_ERROR", message: result.message },
        { status: 400 }
      );
    }
    if (result.kind === "MIN_REST_BLOCKED") {
      return NextResponse.json(
        {
          ok: false,
          error: "MIN_REST_BLOCKED",
          details: {
            ruleKey: MIN_REST_RULE_KEY,
            mode: result.mode,
            requiredHours: result.requiredHours,
            warnings: result.warnings,
          },
        },
        { status: 409 }
      );
    }

    return NextResponse.json({
      ok: true,
      data: {
        runId,
        status: "PUBLISHED",
        publishedCount: result.publishedCount,
        warnings: result.warnings ?? [],
      },
    });
  } catch (e) {
    const mapped = prismaToApiError(e);
    return NextResponse.json(mapped.body, { status: mapped.status });
  }
}