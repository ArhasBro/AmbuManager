import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { RuleMode } from "@prisma/client";

// GET: /api/company/rules?keys=PLANNING_VIEW_MODE,OTHER_KEY
// - Tous les rôles connectés peuvent lire (multi-tenant via companyId)
const GetQuerySchema = z.object({
  keys: z.string().optional(), // "A,B,C"
});

// PATCH: body { key, value }
const PatchBodySchema = z.object({
  key: z.string().min(1),
  value: z.string().min(1),
});

// Simple helper : seuls ADMIN/GERANT peuvent modifier un réglage entreprise
function canWriteRules(role?: string) {
  return role === "ADMIN" || role === "GERANT";
}

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
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: "SERVER_ERROR", message }, { status: 500 });
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

  if (!canWriteRules(role)) {
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

  const { key, value } = parsed.data;

  try {
    const rule = await prisma.companyRule.upsert({
      where: { companyId_key: { companyId, key } },
      update: { value },
      create: {
        companyId,
        key,
        value,
        mode: RuleMode.OFF, // pour un “setting UI”, mode OFF suffit
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
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: "SERVER_ERROR", message }, { status: 500 });
  }
}