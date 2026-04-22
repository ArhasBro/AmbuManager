import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import { badRequest, forbidden, ok, serverError, unauthorized } from "@/lib/api/response";
import {
  buildCompanyParameterView,
  listCompanyParameterDefinitions,
  resolveCompanyParameterWrite,
  type StoredCompanyRuleApiRecord,
} from "@/lib/company-rules/api";
import { canManageCompanyRules } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import {
  companyRulesGetQuerySchema,
  companyRulesPatchBodySchema,
} from "@/lib/validators/company-rules";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const companyId = session?.user?.companyId as string | undefined;
  const userId = session?.user?.id as string | undefined;

  if (!companyId || !userId) {
    return unauthorized();
  }

  const url = new URL(req.url);
  const parsed = companyRulesGetQuerySchema.safeParse({
    keys: url.searchParams.get("keys") ?? undefined,
  });

  if (!parsed.success) {
    return badRequest("VALIDATION_ERROR", parsed.error.flatten());
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

    const storedRulesByKey = new Map(
      storedRules.map((rule: StoredCompanyRuleApiRecord) => [rule.key, rule])
    );
    const parameters = definitions.map((definition) =>
      buildCompanyParameterView(
        definition,
        definition.storage.key ? storedRulesByKey.get(definition.storage.key) : null
      )
    );

    return ok(parameters);
  } catch {
    return serverError();
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  const companyId = session?.user?.companyId as string | undefined;
  const userId = session?.user?.id as string | undefined;
  const role = session?.user?.role as string | undefined;
  const platformRole = session?.user?.platformRole as string | undefined;

  if (!companyId || !userId) {
    return unauthorized();
  }

  if (!(await canManageCompanyRules(userId, role, platformRole))) {
    return forbidden();
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest("INVALID_JSON");
  }

  const parsed = companyRulesPatchBodySchema.safeParse(body);
  if (!parsed.success) {
    return badRequest("VALIDATION_ERROR", parsed.error.flatten());
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
      return badRequest("VALIDATION_ERROR", { message: resolved.message });
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

    return ok(buildCompanyParameterView(resolved.definition, rule));
  } catch {
    return serverError();
  }
}
