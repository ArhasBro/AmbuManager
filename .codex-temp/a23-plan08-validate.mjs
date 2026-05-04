import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;
const base = "http://localhost:3000";
let cookie = "";

function mergeCookie(setCookieHeaders) {
  if (!setCookieHeaders || setCookieHeaders.length === 0) return;
  const next = new Map();
  for (const part of cookie.split("; ")) {
    if (!part) continue;
    const idx = part.indexOf("=");
    if (idx <= 0) continue;
    next.set(part.slice(0, idx), part.slice(idx + 1));
  }
  for (const raw of setCookieHeaders) {
    const first = raw.split(";")[0];
    const idx = first.indexOf("=");
    if (idx <= 0) continue;
    next.set(first.slice(0, idx), first.slice(idx + 1));
  }
  cookie = Array.from(next.entries()).map(([k, v]) => `${k}=${v}`).join("; ");
}

async function request(path, init = {}) {
  const headers = new Headers(init.headers || {});
  if (cookie) headers.set("cookie", cookie);
  const res = await fetch(`${base}${path}`, { ...init, headers, redirect: "manual" });
  const setCookie = typeof res.headers.getSetCookie === "function" ? res.headers.getSetCookie() : [];
  mergeCookie(setCookie);
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch {}
  return { res, text, json };
}

function dayMonthFromNow() {
  const now = new Date();
  return { date: now.toISOString().slice(0, 10), month: now.toISOString().slice(0, 7) };
}

function pickAssignableTemplate(templates, users) {
  const timed = templates.filter((t) => t?.isTimeDefined === true && typeof t?.startTime === "string" && typeof t?.endTime === "string");
  const preferred = timed.find((t) => t?.crossesMidnight === true) ?? timed[0] ?? null;
  if (!preferred) return { template: null, user: null, secondaryUser: null };

  const roleNeeded = typeof preferred.requiredRole === "string" ? preferred.requiredRole : null;
  const user = roleNeeded
    ? users.find((u) => u?.role === roleNeeded) ?? null
    : users[0] ?? null;

  const secondaryRolePool = Array.isArray(preferred.secondaryAllowedRoles) ? preferred.secondaryAllowedRoles : [];
  const secondaryUser = secondaryRolePool.length > 0
    ? users.find((u) => secondaryRolePool.includes(u?.role) && u?.id !== user?.id) ?? null
    : users.find((u) => u?.id !== user?.id) ?? null;

  return { template: preferred, user, secondaryUser };
}

const result = {
  session_id: "SESSION-20260503-08_A23_A23-PLAN-08",
  checks: {}
};

const { date, month } = dayMonthFromNow();

const csrfResp = await request("/api/auth/csrf");
if (!csrfResp.json?.csrfToken) throw new Error("csrf token missing");

const loginBody = new URLSearchParams({
  csrfToken: csrfResp.json.csrfToken,
  email: "admin@ambulance.local",
  password: "admin123",
  callbackUrl: `${base}/planning`,
  json: "true",
});

const loginResp = await request("/api/auth/callback/credentials?json=true", {
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  body: loginBody.toString(),
});

const sessionResp = await request("/api/auth/session");
const planningResp = await request("/planning");
const templatesResp = await request("/api/templates?limit=500");
const usersResp = await request("/api/users?limit=100");

const templates = Array.isArray(templatesResp.json?.data) ? templatesResp.json.data : [];
const users = Array.isArray(usersResp.json?.data?.items) ? usersResp.json.data.items : [];

const selection = pickAssignableTemplate(templates, users);
if (!selection.template) throw new Error("no timed template found");
if (!selection.user) throw new Error("no assignable user found for selected template");

const template = selection.template;
const assignedUser = selection.user;
const assignedUser2 = selection.secondaryUser;

const mismatchPayload = {
  date,
  startTime: template.startTime === "08:00" ? "09:00" : "08:00",
  endTime: template.endTime === "12:00" ? "13:00" : "12:00",
  templateId: template.id,
  depotId: null,
  notes: "A23-PLAN-08 mismatch test",
};

const mismatchCreateResp = await request("/api/planning/shifts", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(mismatchPayload),
});

const createPayload = {
  date,
  startTime: template.startTime,
  endTime: template.endTime,
  templateId: template.id,
  depotId: null,
  notes: "A23-PLAN-08 create aligned",
};

const createResp = await request("/api/planning/shifts", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(createPayload),
});

if (!createResp.json?.ok) throw new Error(`aligned create failed: ${createResp.text}`);
const shiftId = createResp.json?.data?.id;
if (!shiftId) throw new Error("created shift id missing");

const assignPayload = {
  userId: assignedUser.id,
  ...(template.minStaffCount === 2 && assignedUser2 ? { user2Id: assignedUser2.id } : {}),
};

const assignResp = await request(`/api/planning/shifts/${shiftId}/assign`, {
  method: "PATCH",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(assignPayload),
});

const editPayload = {
  date,
  startTime: template.startTime,
  endTime: template.endTime,
  templateId: template.id,
  depotId: null,
  notes: "A23-PLAN-08 edited aligned",
};

const editResp = await request(`/api/planning/shifts/${shiftId}`, {
  method: "PATCH",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(editPayload),
});

const beforeCancelResp = await request(`/api/planning/shifts?month=${month}&limit=500&includeHistory=1`);
const beforeItems = Array.isArray(beforeCancelResp.json?.data) ? beforeCancelResp.json.data : [];
const shiftBeforeCancel = beforeItems.find((s) => s.id === shiftId) ?? null;

const cancelResp = await request(`/api/planning/shifts/${shiftId}/cancel`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ reason: "A23-PLAN-08 cancel logical" }),
});

const afterCancelResp = await request(`/api/planning/shifts?month=${month}&limit=500&includeHistory=1`);
const afterItems = Array.isArray(afterCancelResp.json?.data) ? afterCancelResp.json.data : [];
const shiftAfterCancel = afterItems.find((s) => s.id === shiftId) ?? null;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const dbShift = await prisma.shift.findUnique({
  where: { id: shiftId },
  select: {
    id: true,
    userId: true,
    user2Id: true,
    startAt: true,
    endAt: true,
    templateId: true,
    isCancelled: true,
    cancelledAt: true,
    cancellationReason: true,
  },
});
await prisma.$disconnect();
await pool.end();

result.checks = {
  login_status: loginResp.res.status,
  session_status: sessionResp.res.status,
  session_user: sessionResp.json?.user ?? null,
  planning_status: planningResp.res.status,
  planning_has_manual: /Planning manuel/.test(planningResp.text),
  templates_count: templates.length,
  selected_template: {
    id: template.id,
    name: template.name,
    category: template.category,
    requiredRole: template.requiredRole ?? null,
    minStaffCount: template.minStaffCount ?? null,
    isTimeDefined: template.isTimeDefined ?? null,
    startTime: template.startTime ?? null,
    endTime: template.endTime ?? null,
    crossesMidnight: template.crossesMidnight ?? null,
  },
  users_count: users.length,
  selected_user: {
    id: assignedUser.id,
    name: assignedUser.name,
    role: assignedUser.role ?? null,
  },
  selected_user2: assignedUser2 ? { id: assignedUser2.id, name: assignedUser2.name, role: assignedUser2.role ?? null } : null,
  mismatch_create_status: mismatchCreateResp.res.status,
  mismatch_create_ok: mismatchCreateResp.json?.ok ?? false,
  mismatch_create_error: mismatchCreateResp.json?.error ?? null,
  mismatch_create_details: mismatchCreateResp.json?.details ?? null,
  create_status: createResp.res.status,
  create_ok: createResp.json?.ok ?? false,
  create_payload: createPayload,
  shift_id: shiftId,
  assign_status: assignResp.res.status,
  assign_ok: assignResp.json?.ok ?? false,
  assign_error: assignResp.json?.error ?? null,
  assign_payload: assignPayload,
  edit_status: editResp.res.status,
  edit_ok: editResp.json?.ok ?? false,
  edit_payload: editPayload,
  shift_before_cancel: shiftBeforeCancel,
  cancel_status: cancelResp.res.status,
  cancel_ok: cancelResp.json?.ok ?? false,
  shift_after_cancel: shiftAfterCancel,
  db_shift: dbShift,
};

console.log(JSON.stringify(result, null, 2));
