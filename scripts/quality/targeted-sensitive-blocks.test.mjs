import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { badRequest, conflict, forbidden, notFound, ok, serverError, unauthorized } from "../../lib/api/response.ts";
import { serializeDates } from "../../lib/serializers.ts";
import {
  defaultMinStaffCountFromCategory,
  getAllowedRolesForVehicleType,
  getCategoryTemplatePreset,
  isRoleAllowedForSlot,
  normalizeTemplateColor,
  resolveTemplateMinStaffCount,
} from "../../lib/templates/template-rules.ts";
import { passwordPolicySchema } from "../../lib/security/password-policy.ts";
import { computePlanningQuality } from "../../lib/services/planning/matching-quality.ts";

async function readJson(response) {
  return JSON.parse(await response.text());
}

test("API response helpers return the expected status codes and shapes", async () => {
  const responses = [
    [ok({ created: true }, 201), 201, true],
    [badRequest("VALIDATION_ERROR"), 400, false],
    [unauthorized(), 401, false],
    [forbidden(), 403, false],
    [notFound(), 404, false],
    [conflict("CONFLICT"), 409, false],
    [serverError("debug"), 500, false],
  ];

  for (const [response, expectedStatus, expectedOk] of responses) {
    assert.equal(response.status, expectedStatus);
    const payload = await readJson(response);
    assert.equal(payload.ok, expectedOk);
  }
});

test("serializeDates converts nested Date values into ISO strings", () => {
  const createdAt = new Date("2026-04-16T10:11:12.000Z");
  const updatedAt = new Date("2026-04-17T08:09:10.000Z");

  const serialized = serializeDates({
    id: "u1",
    createdAt,
    nested: {
      updatedAt,
      items: [createdAt],
    },
  });

  assert.equal(serialized.createdAt, createdAt.toISOString());
  assert.equal(serialized.nested.updatedAt, updatedAt.toISOString());
  assert.deepEqual(serialized.nested.items, [createdAt.toISOString()]);
});

test("template rules keep ALPHA defaults and normalize colors", () => {
  assert.equal(defaultMinStaffCountFromCategory("AMBULANCE"), 2);
  assert.equal(defaultMinStaffCountFromCategory("VSL"), 1);
  assert.equal(resolveTemplateMinStaffCount(null, "GARDE"), 2);
  assert.equal(resolveTemplateMinStaffCount(undefined, "TAXI"), 1);
  assert.equal(normalizeTemplateColor(" #abc "), "#ABC");
  assert.equal(normalizeTemplateColor("bleu"), null);

  const ambulancePreset = getCategoryTemplatePreset("AMBULANCE");
  assert.equal(ambulancePreset.minStaffCount, 2);
  assert.equal(ambulancePreset.requiredRole, "ADE");
  assert.equal(ambulancePreset.requiredVehicleType, "AMBULANCE");
});

test("template slot and vehicle role compatibility stays coherent", () => {
  assert.deepEqual(getAllowedRolesForVehicleType("AMBULANCE"), ["ADE", "AA"]);
  assert.deepEqual(getAllowedRolesForVehicleType("TAXI"), ["TAXI"]);

  const template = {
    category: "AMBULANCE",
    requiredRole: "ADE",
    secondaryAllowedRoles: ["ADE", "AA"],
    minStaffCount: 2,
  };

  assert.equal(isRoleAllowedForSlot(template, 1, "ADE"), true);
  assert.equal(isRoleAllowedForSlot(template, 1, "AA"), false);
  assert.equal(isRoleAllowedForSlot(template, 2, "AA"), true);
});

test("planning quality calculation keeps a meaningful quality score and explanations", () => {
  const plan = [
    {
      shiftId: "shift-1",
      startAt: "2026-04-16T08:00:00.000Z",
      endAt: "2026-04-16T12:00:00.000Z",
      target: "USER_1",
      requiredRole: "ADE",
      requiredVehicleType: "AMBULANCE",
      currentUserId: null,
      proposedUserId: "user-1",
      currentVehicleId: null,
      proposedVehicleId: null,
      reason: "MATCHED",
      message: "ok",
    },
    {
      shiftId: "shift-1",
      startAt: "2026-04-16T08:00:00.000Z",
      endAt: "2026-04-16T12:00:00.000Z",
      target: "VEHICLE",
      requiredRole: null,
      requiredVehicleType: "AMBULANCE",
      currentUserId: null,
      proposedUserId: null,
      currentVehicleId: null,
      proposedVehicleId: "vehicle-1",
      reason: "MATCHED",
      message: "ok",
    },
    {
      shiftId: "shift-2",
      startAt: "2026-04-16T13:00:00.000Z",
      endAt: "2026-04-16T18:00:00.000Z",
      target: "USER_1",
      requiredRole: "ADE",
      requiredVehicleType: "VSL",
      currentUserId: null,
      proposedUserId: null,
      currentVehicleId: null,
      proposedVehicleId: null,
      reason: "NO_USER_WITH_REQUIRED_ROLE",
      message: "missing user",
    },
    {
      shiftId: "shift-2",
      startAt: "2026-04-16T13:00:00.000Z",
      endAt: "2026-04-16T18:00:00.000Z",
      target: "VEHICLE",
      requiredRole: null,
      requiredVehicleType: "VSL",
      currentUserId: null,
      proposedUserId: null,
      currentVehicleId: null,
      proposedVehicleId: null,
      reason: "NO_VEHICLE_WITH_REQUIRED_TYPE",
      message: "missing vehicle",
    },
  ];

  const quality = computePlanningQuality(plan);

  assert.equal(quality.coverage.score, 50);
  assert.equal(quality.vehicleCoverage.score, 50);
  assert.equal(quality.stability.score, 100);
  assert.equal(quality.equity.score, 100);
  assert.equal(quality.overall, 70);
  assert.equal(quality.shiftScores.length, 2);
  assert.ok(quality.explanations.some((line) => line.includes("Ressources humaines")));
  assert.ok(quality.explanations.some((line) => line.includes("Flotte")));
});

test("password policy rejects weak passwords and accepts hardened ones", () => {
  assert.equal(passwordPolicySchema.safeParse("short").success, false);
  assert.equal(passwordPolicySchema.safeParse("lowercase-password-2026!").success, false);
  assert.equal(passwordPolicySchema.safeParse("UPPERCASE-PASSWORD-2026!").success, false);
  assert.equal(passwordPolicySchema.safeParse("NoDigitsPassword!").success, false);
  assert.equal(passwordPolicySchema.safeParse("NoSpecialPassword2026").success, false);
  assert.equal(passwordPolicySchema.safeParse(" StrongPass2026!").success, false);
  assert.equal(passwordPolicySchema.safeParse("StrongPass2026!").success, true);
});

test("proxy covers sensitive authenticated application pages", () => {
  const source = readFileSync(join(process.cwd(), "proxy.ts"), "utf8");

  for (const matcher of [
    "/audit/:path*",
    "/company/:path*",
    "/dashboard/:path*",
    "/depots/:path*",
    "/onboarding/:path*",
    "/planning/:path*",
    "/templates/:path*",
    "/users/:path*",
    "/vehicles/:path*",
  ]) {
    assert.match(source, new RegExp(matcher.replace(/[/*]/g, "\\$&")));
  }
});
