import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { RuleMode } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { COMPANY_PARAMETER_KEYS, parsePlanningViewModeValue, serializePlanningViewModeValue } from "@/lib/company-rules/catalog";
import { canManageCompanyRules } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

// GET: /api/company/rules?keys=PLANNING_VIEW_MODE,OTHER_KEY
// - Tous les rôles connectés peuvent lire (multi-tenant via companyId)
const GetQuerySchema = z.object({
  keys: z.string().optional(), // "A,B,C"
});

// PATCH minimal préparatoire: body { key, value, mode? }
const PatchBodySchema = z.object({
  key: z.string().min(1),
  value: z.string().min(1),
  mode: z.nativeEnum(RuleMode).optional(),
});

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const companyId = session?.user?.companyId as string | undefined;
  const userId = session?.user?.id as string | undefined;

  if (!companyId || !userId) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const url = new URL(req.url);
  const parsed = GetQuerySchema.safeParse({
    keys: url.searchParams.get("keys") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const keys = parsed.data.keys
    ? parsed.data.keys.split(",").map((k) => k.trim()).filter(Boolean)
    : null;

  try {
    const rules = await prisma.companyRule.findMany({
      where: {
        companyId,
        ...(keys ? { key: { in: keys } } : {}),
      },
      orderBy: { key: "asc" },
      select: {
        id: true,
        key: true,
        value: true,
        mode: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      ok: true,
      data: rules.map((r) => ({
        ...r,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
      })),
    });
  } catch {
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const companyId = session?.user?.companyId as string | undefined;
  const userId = session?.user?.id as string | undefined;
  const role = session?.user?.role as string | undefined;

  if (!companyId || !userId) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  if (!(await canManageCompanyRules(userId, role))) {
    return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  }

  const parsed = PatchBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { key, mode } = parsed.data;

  let value = parsed.data.value.trim();
  if (!value) {
    return NextResponse.json(
      { ok: false, error: "VALIDATION_ERROR", details: { key, message: "Valeur vide interdite." } },
      { status: 400 }
    );
  }
  if (key === COMPANY_PARAMETER_KEYS.PLANNING_VIEW_MODE) {
    const parsedMode = parsePlanningViewModeValue(value);
    if (!parsedMode) {
      return NextResponse.json(
        {
          ok: false,
          error: "VALIDATION_ERROR",
          details: { key, message: "Valeur invalide pour PLANNING_VIEW_MODE." },
        },
        { status: 400 }
      );
    }

    value = serializePlanningViewModeValue(parsedMode);
  }

  try {
    const existing = await prisma.companyRule.findUnique({
      where: { companyId_key: { companyId, key } },
      select: { mode: true },
    });

    const nextMode = key === COMPANY_PARAMETER_KEYS.PLANNING_VIEW_MODE
      ? RuleMode.OFF
      : mode ?? existing?.mode ?? RuleMode.OFF;

    const rule = await prisma.companyRule.upsert({
      where: { companyId_key: { companyId, key } },
      update: { value, mode: nextMode },
      create: {
        companyId,
        key,
        value,
        mode: nextMode,
      },
      select: { id: true, key: true, value: true, mode: true, createdAt: true, updatedAt: true },
    });

    return NextResponse.json({
      ok: true,
      data: {
        ...rule,
        createdAt: rule.createdAt.toISOString(),
        updatedAt: rule.updatedAt.toISOString(),
      },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}
