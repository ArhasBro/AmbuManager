import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

function read(relativePath) {
  return readFileSync(join(ROOT, relativePath), "utf8");
}

function expectPattern(source, pattern, message) {
  assert.match(source, pattern, message);
}

function expectNoPattern(source, pattern, message) {
  assert.doesNotMatch(source, pattern, message);
}

test("users API keeps auth, tenant scoping and support exclusion", () => {
  const source = read("app/api/users/route.ts");

  expectPattern(source, /if \(!companyId \|\| !userId\) return unauthorized\(\);/, "users GET must reject missing session context");
  expectPattern(source, /canManageUsers\(userId, session\.user\.role, platformRole\)/, "users GET must require users management permission");
  expectPattern(source, /companyId,\s*isActive: true,\s*platformRole: null,\s*role: \{ not: null/s, "users list must stay scoped to active non-support company users");
  expectPattern(source, /data:\s*\{\s*email: parsed\.data\.email,[\s\S]*companyId,/s, "users POST must inject companyId from session server-side");
  expectNoPattern(source, /parsed\.data\.companyId|body\.companyId/, "users POST must not trust a client companyId");
});

test("users personal-data mutations keep an audit trail", () => {
  const createSource = read("app/api/users/route.ts");
  const updateSource = read("app/api/users/[id]/route.ts");
  const archiveSource = read("lib/services/users/archive-user.ts");
  const depotSource = read("lib/services/users/assign-user-depot.ts");
  const resetPasswordSource = read("app/api/users/[id]/reset-password/route.ts");
  const absenceSource = read("lib/services/users/user-absence.ts");

  expectPattern(createSource, /writePersonalDataAudit\(/, "users POST must write a personal-data audit entry");
  expectPattern(updateSource, /writePersonalDataAudit\(/, "users PATCH must write a personal-data audit entry");
  expectPattern(archiveSource, /writePersonalDataAudit\(/, "user archive must write a personal-data audit entry");
  expectPattern(depotSource, /writePersonalDataAudit\(/, "user depot assignment must write a personal-data audit entry");
  expectPattern(resetPasswordSource, /writePersonalDataAudit\(/, "user password reset must write a personal-data audit entry");
  expectPattern(absenceSource, /USER_ABSENCE_CREATE/, "absence creation audit action must exist");
  expectPattern(absenceSource, /USER_ABSENCE_UPDATE/, "absence update audit action must exist");
  expectPattern(absenceSource, /USER_ABSENCE_DELETE/, "absence delete audit action must exist");
});

test("privacy mentions stay reachable from login", () => {
  const loginSource = read("app/login/page.tsx");
  const privacySource = read("app/privacy/page.tsx");

  expectPattern(loginSource, /Link href=\"\/privacy\"/, "login page must link to privacy mentions");
  expectPattern(privacySource, /Mentions d'information - Donnees personnelles/, "privacy page must expose RGPD information");
});

test("templates API keeps auth, permission gate and company-scoped persistence", () => {
  const source = read("app/api/templates/route.ts");

  expectPattern(source, /if \(!companyId \|\| !userId\) return unauthorized\(\);/, "templates route must require session context");
  expectPattern(source, /canManageTemplates\(userId, role, platformRole\)/, "templates route must require templates management permission");
  expectPattern(source, /findMany\([\s\S]*where:\s*\{[\s\S]*companyId,[\s\S]*archivedAt: null/s, "templates GET must stay company-scoped and exclude archived by default");
  expectPattern(source, /shiftTemplate\.create\([\s\S]*data:\s*\{[\s\S]*companyId,/s, "templates POST must persist companyId from session");
});

test("planning shifts API keeps scope validation and company-scoped dependencies", () => {
  const source = read("app/api/planning/shifts/route.ts");

  expectPattern(source, /if \(!companyId \|\| !userId\)[\s\S]*UNAUTHORIZED/s, "planning GET must reject missing session context");
  expectPattern(source, /canViewSelfPlanning\([\s\S]*canViewGlobalPlanning\([\s\S]*canViewAudit\(/s, "planning GET must compute access from real permissions");
  expectPattern(source, /Use only one scope: day, weekStart or month\./, "planning GET must forbid multiple concurrent scopes");
  expectPattern(source, /if \(!canViewGlobal && requestedUserId && requestedUserId !== userId\)[\s\S]*FORBIDDEN/s, "planning GET must prevent cross-user access without global permission");
  expectPattern(source, /shiftTemplate\.findFirst\([\s\S]*where: \{ id: templateId, companyId, isActive: true \}/, "planning POST must resolve template inside current company");
  expectPattern(source, /depot\.findFirst\([\s\S]*where: \{ id: depotId, companyId \}/, "planning POST must resolve depot inside current company");
});

test("planning exports API keeps export permission and single-scope rule", () => {
  const source = read("app/api/planning/exports/route.ts");

  expectPattern(source, /canExportPlanning\(actorUserId, role, platformRole\)/, "planning exports must require export permission");
  expectPattern(source, /Utiliser un seul scope : day, weekStart ou month\./, "planning exports must forbid multiple scopes");
  expectPattern(source, /prisma\.user\.findFirst\(\{ where: \{ id: targetUserId, companyId \}/, "planning exports must resolve target user in current company");
});

test("autoschedule runs API keeps cursor validation and company scoping", () => {
  const source = read("app/api/planning/autoschedule/runs/route.ts");

  expectPattern(source, /if \(cursor && !cursorData\)[\s\S]*INVALID_CURSOR/s, "autoschedule runs must reject invalid cursors");
  expectPattern(source, /const where:[\s\S]*companyId,/s, "autoschedule runs query must stay scoped to current company");
  expectPattern(source, /canAutoSchedule\(userId, role\)/, "autoschedule runs must require autoschedule permission");
});

test("vehicles flow now exposes archive-only standard lifecycle", () => {
  const apiSource = read("app/api/vehicles/route.ts");
  const uiSource = read("app/vehicles/vehicles-client.tsx");

  expectPattern(apiSource, /findMany\([\s\S]*where: \{ companyId, isActive: true \}/, "vehicles GET must stay company-scoped and list only active vehicles");
  expectPattern(apiSource, /vehicle\.create\([\s\S]*data:\s*\{[\s\S]*companyId,/s, "vehicles POST must persist companyId from session");
  expectNoPattern(apiSource, /export async function DELETE\(/, "standard vehicles API flow must no longer expose destructive delete");
  expectPattern(uiSource, /fetch\(`\/api\/vehicles\/\$\{encodeURIComponent\(vehicle\.id\)\}\/archive`/, "vehicles UI must keep archive action");
  expectNoPattern(uiSource, /\/api\/vehicles\?id=\$\{encodeURIComponent\(id\)\}/, "vehicles UI must not call destructive delete route anymore");
  expectNoPattern(uiSource, /Suppression\.\.\.|Véhicule supprimé\.|handleDeleteVehicle|Supprimer/, "vehicles UI must not expose destructive delete action in standard flow");
});
