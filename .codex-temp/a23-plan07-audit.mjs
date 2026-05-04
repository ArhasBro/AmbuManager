import { PrismaClient } from "@prisma/client";

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

function pick(arr, predicate) {
  for (const item of arr) if (predicate(item)) return item;
  return null;
}

const csrfResp = await request("/api/auth/csrf");
if (!csrfResp.json?.csrfToken) throw new Error("csrf token missing");
const csrfToken = csrfResp.json.csrfToken;

const body = new URLSearchParams({
  csrfToken,
  email: "admin@ambulance.local",
  password: "admin123",
  callbackUrl: `${base}/planning`,
  json: "true",
});

const loginResp = await request("/api/auth/callback/credentials?json=true", {
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  body: body.toString(),
});

const sessionResp = await request("/api/auth/session");
const planningResp = await request("/planning");

const templatesResp = await request("/api/templates?limit=500");
const usersResp = await request("/api/users?page=1&pageSize=100");
const depotsResp = await request("/api/depots?limit=100");

if (!templatesResp.json?.ok) throw new Error(`templates not ok: ${templatesResp.text}`);
if (!usersResp.json?.ok) throw new Error(`users not ok: ${usersResp.text}`);

const templates = Array.isArray(templatesResp.json.data) ? templatesResp.json.data : [];
const users = Array.isArray(usersResp.json.data) ? usersResp.json.data : [];
const depots = depotsResp.json?.ok && Array.isArray(depotsResp.json.data) ? depotsResp.json.data : [];

const nightTemplate = pick(templates, (t) => t?.crossesMidnight === true) || templates[0];
if (!nightTemplate) throw new Error("no template found");

const user1 = pick(users, (u) => u?.email === "planner@ambulance.local") || users[0] || null;
const user2 = pick(users, (u) => u?.email === "viewer@ambulance.local") || users[1] || null;
const depot = pick(depots, (d) => d?.isActive === true) || null;

const now = new Date();
const date = now.toISOString().slice(0, 10);
const month = now.toISOString().slice(0, 7);

const createPayload = {
  date,
  startTime: "08:00",
  endTime: "12:00",
  templateId: nightTemplate.id,
  depotId: depot?.id ?? null,
  notes: "A23-PLAN-07 audit shift create",
};

const createResp = await request("/api/planning/shifts", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(createPayload),
});
if (!createResp.json?.ok) throw new Error(`create shift failed: ${createResp.text}`);
const shiftId = createResp.json.data?.id;
if (!shiftId) throw new Error("shift id missing");

const assignPayload = {
  ...(user1?.id ? { userId: user1.id } : {}),
  ...(user2?.id ? { user2Id: user2.id } : {}),
  ...(depot?.id ? { depotId: depot.id } : {}),
};

const assignResp = await request(`/api/planning/shifts/${shiftId}/assign`, {
  method: "PATCH",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(assignPayload),
});

const editPayload = {
  date,
  startTime: "16:00",
  endTime: "00:00",
  templateId: nightTemplate.id,
  depotId: depot?.id ?? null,
  notes: "A23-PLAN-07 audit shift edited",
};

const editResp = await request(`/api/planning/shifts/${shiftId}`, {
  method: "PATCH",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(editPayload),
});

const shiftsBeforeResp = await request(`/api/planning/shifts?month=${month}&limit=500&includeHistory=1`);
const beforeItems = Array.isArray(shiftsBeforeResp.json?.data) ? shiftsBeforeResp.json.data : [];
const shiftBefore = beforeItems.find((s) => s.id === shiftId) || null;

const cancelResp = await request(`/api/planning/shifts/${shiftId}/cancel`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ reason: "A23-PLAN-07 cancel test" }),
});

const shiftsAfterResp = await request(`/api/planning/shifts?month=${month}&limit=500&includeHistory=1`);
const afterItems = Array.isArray(shiftsAfterResp.json?.data) ? shiftsAfterResp.json.data : [];
const shiftAfter = afterItems.find((s) => s.id === shiftId) || null;
const historyAfter = shiftsAfterResp.json?.historyByShiftId?.[shiftId] ?? [];

const prisma = new PrismaClient();
const dbShift = await prisma.shift.findUnique({
  where: { id: shiftId },
  select: { id: true, isCancelled: true, cancelledAt: true, cancellationReason: true, templateId: true, startAt: true, endAt: true },
});
await prisma.$disconnect();

const result = {
  login_status: loginResp.res.status,
  login_location: loginResp.res.headers.get("location"),
  session_status: sessionResp.res.status,
  session_user: sessionResp.json?.user ?? null,
  planning_status: planningResp.res.status,
  planning_has_title: /Planning/.test(planningResp.text),
  planning_has_manual_label: /Planning manuel/.test(planningResp.text),
  templates_count: templates.length,
  template_cross_midnight: {
    id: nightTemplate.id,
    name: nightTemplate.name,
    category: nightTemplate.category,
    startTime: nightTemplate.startTime,
    endTime: nightTemplate.endTime,
    crossesMidnight: nightTemplate.crossesMidnight,
  },
  create_payload: createPayload,
  created_shift_id: shiftId,
  create_status: createResp.res.status,
  assign_status: assignResp.res.status,
  assign_ok: assignResp.json?.ok ?? false,
  assign_payload: assignPayload,
  edit_status: editResp.res.status,
  edit_ok: editResp.json?.ok ?? false,
  edit_payload: editPayload,
  shift_before_cancel: shiftBefore,
  cancel_status: cancelResp.res.status,
  cancel_ok: cancelResp.json?.ok ?? false,
  shift_after_cancel: shiftAfter,
  history_after_count: Array.isArray(historyAfter) ? historyAfter.length : 0,
  db_shift_record: dbShift,
};

console.log(JSON.stringify(result, null, 2));
