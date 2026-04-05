import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { RuleMode } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import {
  buildCompanyParameterView,
  listCompanyParameterDefinitions,
  resolveCompanyParameterWrite,
  type StoredCompanyRuleApiRecord,
} from "@/lib/company-rules/api";
import { canManageCompanyRules } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

const GetQuerySchema = z.object({
  keys: z.string().optional(),
});

const PatchBodySchema = z
  .object({
    parameterId: z.string().min(1).optional(),
    key: z.string().min(1).optional(),
    value: z.string(),
    mode: z.nativeEnum(RuleMode).optional(),
  })
  .refine((data: { parameterId?: string; key?: string }) => Boolean(data.parameterId || data.key), {
    message: "parameterId ou key est obligatoire.",
    path: ["parameterId"],
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
    ? parsed.data.keys.split(",").map((key: string) => key.trim()).filter(Boolean)
    : null;

  const definitions = listCompanyParameterDefinitions(keys);
  const storageKeys = definitions
    .map((definition) => definition.storage.key)
    .filter((key): key is string => Boolean(key));

  try {
    const storedRules: StoredCompanyRuleApiRecord[] = storageKeys.length === 0
      ? []
      : await prisma.companyRule.findMany({
          where: {
            companyId,
            key: { in: storageKeys },
          },
          select: {
            id: true,
            key: true,
            value: true,
            mode: true,
            createdAt: true,
            updatedAt: true,
          },
        });

    const storedRulesByKey = new Map(storedRules.map((rule: StoredCompanyRuleApiRecord) => [rule.key, rule]));
    const parameters = definitions.map((definition) => buildCompanyParameterView(definition, definition.storage.key ? storedRulesByKey.get(definition.storage.key) : null));

    return NextResponse.json({
      ok: true,
      data: parameters,
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
  const platformRole = session?.user?.platformRole as string | undefined;

  if (!companyId || !userId) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  if (!(await canManageCompanyRules(userId, role, platformRole))) {
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

  try {
    const existing = parsed.data.key
      ? await prisma.companyRule.findUnique({
          where: { companyId_key: { companyId, key: parsed.data.key } },
          select: { mode: true },
        })
      : null;

    const resolved = resolveCompanyParameterWrite({
      parameterId: parsed.data.parameterId,
      key: parsed.data.key,
      value: parsed.data.value,
      mode: parsed.data.mode,
      existingMode: existing?.mode,
    });

    if (!resolved.ok) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", details: { message: resolved.message } },
        { status: 400 }
      );
    }

    const rule = await prisma.companyRule.upsert({
      where: { companyId_key: { companyId, key: resolved.storageKey } },
      update: { value: resolved.normalizedValue, mode: resolved.mode },
      create: {
        companyId,
        key: resolved.storageKey,
        value: resolved.normalizedValue,
        mode: resolved.mode,
      },
      select: { id: true, key: true, value: true, mode: true, createdAt: true, updatedAt: true },
    });

    return NextResponse.json({
      ok: true,
      data: buildCompanyParameterView(resolved.definition, rule),
    });
  } catch {
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}
