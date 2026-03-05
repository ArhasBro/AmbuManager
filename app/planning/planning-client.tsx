"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Shift = {
  id: string;
  startAt: string;
  endAt: string;
  date: string;

  user?: { id: string; name: string; email: string } | null;
  user2?: { id: string; name: string; email: string } | null;

  vehicle?: { id: string; immatriculation: string; type: string } | null;
  template?: { id: string; name: string; category: string } | null;
};

type UserLite = { id: string; name: string; email?: string };
type VehicleLite = { id: string; immatriculation: string; type: string };

type ViewMode = "SIMPLE" | "AMBULANCE";
type Role = "ADMIN" | "GERANT" | "BUREAU" | "DEA" | "AA" | "TAXI" | "REGULATEUR" | string;

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

type PublishConflict =
  | {
      kind: "CONFLICT_USER";
      userId: string;
      draft: { startAt: string; endAt: string };
      existingShiftId: string;
      existing: { startAt: string; endAt: string };
    }
  | {
      kind: "CONFLICT_VEHICLE";
      vehicleId: string;
      draft: { startAt: string; endAt: string };
      existingShiftId: string;
      existing: { startAt: string; endAt: string };
    };

type JsonRecord = Record<string, unknown>;

function isRecord(v: unknown): v is JsonRecord {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

// 4.6 matching types (UI) — alignés service/API
type MatchingReason =
  | "MATCHED"
  | "ALREADY_ASSIGNED"
  | "NO_REQUIRED_ROLE"
  | "NO_USER_WITH_REQUIRED_ROLE"
  | "USER_CONFLICT";

type MatchingPlanItem = {
  shiftId: string;

  // ✅ renvoyés par le service (ISO)
  startAt: string;
  endAt: string;

  requiredRole: string | null;
  currentUserId: string | null;
  proposedUserId: string | null;
  reason: MatchingReason;
};

type MatchingApplyItem = MatchingPlanItem & { applied: boolean };

function isMatchingPlanItem(v: unknown): v is MatchingPlanItem {
  if (!isRecord(v)) return false;

  const shiftIdOk = typeof v.shiftId === "string";
  const startAtOk = typeof v.startAt === "string";
  const endAtOk = typeof v.endAt === "string";

  const requiredRoleOk = v.requiredRole === null || typeof v.requiredRole === "string";
  const currentUserIdOk = v.currentUserId === null || typeof v.currentUserId === "string";
  const proposedUserIdOk = v.proposedUserId === null || typeof v.proposedUserId === "string";

  const reasonOk =
    v.reason === "MATCHED" ||
    v.reason === "ALREADY_ASSIGNED" ||
    v.reason === "NO_REQUIRED_ROLE" ||
    v.reason === "NO_USER_WITH_REQUIRED_ROLE" ||
    v.reason === "USER_CONFLICT";

  return (
    shiftIdOk &&
    startAtOk &&
    endAtOk &&
    requiredRoleOk &&
    currentUserIdOk &&
    proposedUserIdOk &&
    reasonOk
  );
}

function isMatchingApplyItem(v: unknown): v is MatchingApplyItem {
  if (!isRecord(v)) return false;
  return typeof v.applied === "boolean";


type PlanningQuality = {
  overall: number;
  coverage: { score: number; covered: number; total: number; pct: number };
  stability: { score: number; conflicts: number; total: number; pct: number };
  equity: {
    score: number;
    users: number;
    totalAssigned: number;
    mean: number;
    stdev: number;
    cv: number;
    min: number;
    max: number;
  };
  countsByReason: Record<MatchingReason, number>;
  explanations: string[];
};

function isNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

function isCountsByReason(v: unknown): v is Record<MatchingReason, number> {
  if (!isRecord(v)) return false;
  const keys: MatchingReason[] = [
    "MATCHED",
    "ALREADY_ASSIGNED",
    "NO_REQUIRED_ROLE",
    "NO_USER_WITH_REQUIRED_ROLE",
    "USER_CONFLICT",
  ];
  return keys.every((k) => isNumber(v[k]));
}

function isPlanningQuality(v: unknown): v is PlanningQuality {
  if (!isRecord(v)) return false;
  if (!isNumber(v.overall)) return false;
  if (!isRecord(v.coverage) || !isNumber(v.coverage.score)) return false;
  if (!isRecord(v.stability) || !isNumber(v.stability.score)) return false;
  if (!isRecord(v.equity) || !isNumber(v.equity.score)) return false;
  if (!isCountsByReason(v.countsByReason)) return false;
  if (!Array.isArray(v.explanations) || !v.explanations.every((x) => typeof x === "string")) return false;
  return true;
}
}

function formatDate(d: Date) {
  const Y = d.getFullYear();
  const M = String(d.getMonth() + 1).padStart(2, "0");
  const D = String(d.getDate()).padStart(2, "0");
  return `${Y}-${M}-${D}`;
}

function startOfWeekMonday(d: Date) {
  const day = d.getDay();
  const diffToMonday = (day + 6) % 7;
  const monday = new Date(d);
  monday.setDate(d.getDate() - diffToMonday);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function addDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

function dayKeyFromISO(iso: string) {
  return iso.slice(0, 10);
}

function dayLabelFR(d: Date) {
  return d.toLocaleDateString("fr-FR", { weekday: "long" });
}

function timeHM(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function canAdminSave(role: Role | null) {
  return role === "ADMIN" || role === "GERANT";
}

function requiresTwoEmployees(category: string | null | undefined) {
  const c = String(category ?? "").toUpperCase();
  return c === "AMBULANCE" || c === "GARDE";
}

type FetchJsonResult = { res: Response; json: unknown; text: string };

async function fetchJson(url: string, init?: RequestInit): Promise<FetchJsonResult> {
  const res = await fetch(url, init);
  const text = await res.text();

  let json: unknown = null;
  try {
    json = text ? (JSON.parse(text) as unknown) : null;
  } catch {
    json = null;
  }

  return { res, json, text };
}

function safeArray<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

function getString(v: unknown): string {
  return typeof v === "string" ? v : String(v ?? "");
}

function getOptionalString(v: unknown): string | undefined {
  return typeof v === "string" ? v : undefined;
}

function jsonOkPayload(json: unknown): json is { ok: true; data?: unknown } {
  return isRecord(json) && json.ok === true;
}

function jsonErrPayload(json: unknown): json is { ok: false; error?: unknown; details?: unknown } {
  return isRecord(json) && json.ok === false;
}

function countByReason(items: MatchingPlanItem[]) {
  const out: Record<MatchingReason, number> = {
    MATCHED: 0,
    ALREADY_ASSIGNED: 0,
    NO_REQUIRED_ROLE: 0,
    NO_USER_WITH_REQUIRED_ROLE: 0,
    USER_CONFLICT: 0,
  };
  for (const it of items) out[it.reason] += 1;
  return out;
}

function countApplied(items: MatchingApplyItem[]) {
  let applied = 0;
  let notApplied = 0;
  for (const it of items) {
    if (it.applied) applied += 1;
    else notApplied += 1;
  }
  return { applied, notApplied };
}

export default function PlanningClient() {
  const [weekStart, setWeekStart] = useState<Date>(() => startOfWeekMonday(new Date()));
  const [mode, setMode] = useState<ViewMode>("SIMPLE");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Shift[]>([]);

  const [role, setRole] = useState<Role | null>(null);

  const [companyRuleLoaded, setCompanyRuleLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  const [genLoading, setGenLoading] = useState(false);
  const [genMsg, setGenMsg] = useState<string | null>(null);
  const [lastRunId, setLastRunId] = useState<string | null>(null);

  const [pubLoading, setPubLoading] = useState(false);
  const [pubMsg, setPubMsg] = useState<string | null>(null);

  const [pubWarnings, setPubWarnings] = useState<RestWarning[]>([]);
  const [pubConflict, setPubConflict] = useState<PublishConflict | null>(null);

  const [lastRunStatus, setLastRunStatus] = useState<string | null>(null);
  const [lastRunDraftCount, setLastRunDraftCount] = useState<number | null>(null);
  const [runInfoLoading, setRunInfoLoading] = useState(false);

  const [dayGenLoadingKey, setDayGenLoadingKey] = useState<string | null>(null);
  const [dayGenMsg, setDayGenMsg] = useState<string | null>(null);

  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelMsg, setCancelMsg] = useState<string | null>(null);

  const [assignLoadingId, setAssignLoadingId] = useState<string | null>(null);
  const [assignMsgById, setAssignMsgById] = useState<Record<string, string | null>>({});

  const [usersAll, setUsersAll] = useState<UserLite[]>([]);
  const [vehiclesAll, setVehiclesAll] = useState<VehicleLite[]>([]);
  const [listsLoaded, setListsLoaded] = useState(false);
  const [listsError, setListsError] = useState<string | null>(null);

  const [matchPreviewLoading, setMatchPreviewLoading] = useState(false);
  const [matchApplyLoading, setMatchApplyLoading] = useState(false);
  const [matchMsg, setMatchMsg] = useState<string | null>(null);
  const [matchPreview, setMatchPreview] = useState<MatchingPlanItem[] | null>(null);
  const [matchApplied, setMatchApplied] = useState<MatchingApplyItem[] | null>(null);
  const [matchQuality, setMatchQuality] = useState<PlanningQuality | null>(null);

  // ✅ verrou : le preview est lié à un runId précis
  const [matchPreviewRunId, setMatchPreviewRunId] = useState<string | null>(null);

  const weekStartStr = useMemo(() => formatDate(weekStart), [weekStart]);

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  const grouped = useMemo(() => {
    const map: Record<string, Shift[]> = {};
    for (const d of weekDays) map[formatDate(d)] = [];
    for (const s of items) {
      const k = dayKeyFromISO(s.startAt);
      (map[k] ??= []).push(s);
    }
    for (const k of Object.keys(map)) {
      map[k].sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
    }
    return map;
  }, [items, weekDays]);

  const userOptionsFromItems = useMemo<UserLite[]>(() => {
    const map = new Map<string, UserLite>();
    for (const s of items) {
      if (s.user?.id) map.set(s.user.id, { id: s.user.id, name: s.user.name, email: s.user.email });
      if (s.user2?.id) map.set(s.user2.id, { id: s.user2.id, name: s.user2.name, email: s.user2.email });
    }
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name, "fr"));
  }, [items]);

  const vehicleOptionsFromItems = useMemo<VehicleLite[]>(() => {
    const map = new Map<string, VehicleLite>();
    for (const s of items) {
      if (s.vehicle?.id) {
        map.set(s.vehicle.id, { id: s.vehicle.id, immatriculation: s.vehicle.immatriculation, type: s.vehicle.type });
      }
    }
    return Array.from(map.values()).sort((a, b) => a.immatriculation.localeCompare(b.immatriculation, "fr"));
  }, [items]);

  const userOptions = useMemo<UserLite[]>(
    () => (usersAll.length > 0 ? usersAll : userOptionsFromItems),
    [usersAll, userOptionsFromItems]
  );

  const vehicleOptions = useMemo<VehicleLite[]>(
    () => (vehiclesAll.length > 0 ? vehiclesAll : vehicleOptionsFromItems),
    [vehiclesAll, vehicleOptionsFromItems]
  );

  const loadShiftsForWeek = useCallback(async (weekStartISO: string) => {
    setLoading(true);
    setError(null);
    try {
      const { res, json } = await fetchJson(`/api/planning/shifts?weekStart=${weekStartISO}`);
      if (!res.ok || !jsonOkPayload(json)) {
        const err = jsonErrPayload(json) ? getString(json.error) : `HTTP_${res.status}`;
        throw new Error(err);
      }
      const data = isRecord(json) ? json.data : null;
      setItems(Array.isArray(data) ? (data as Shift[]) : []);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadRunInfo = useCallback(async (runId: string) => {
    setRunInfoLoading(true);
    try {
      const { res, json } = await fetchJson(`/api/planning/autoschedule/runs/${runId}`);
      if (!res.ok || !jsonOkPayload(json)) throw new Error("RUN_INFO_ERROR");

      const data = isRecord(json) ? json.data : null;
      const run = isRecord(data) ? data : null;

      const status = run && "status" in run ? run.status : null;

      const draftShifts = run && "draftShifts" in run ? run.draftShifts : null;
      const countFromArray = Array.isArray(draftShifts) ? draftShifts.length : null;

      const _count = run && "_count" in run ? run._count : null;
      const countObj = isRecord(_count) ? _count : null;
      const draftCount = countObj && typeof countObj.draftShifts === "number" ? countObj.draftShifts : null;

      const count = draftCount ?? countFromArray ?? 0;

      setLastRunStatus(typeof status === "string" ? status : null);
      setLastRunDraftCount(count);
    } catch {
      setLastRunStatus(null);
      setLastRunDraftCount(null);
    } finally {
      setRunInfoLoading(false);
    }
  }, []);

  const loadCompanyLists = useCallback(async () => {
    setListsError(null);
    try {
      const [u, v] = await Promise.all([fetchJson("/api/users?limit=500"), fetchJson("/api/vehicles?limit=500")]);

      if (u.res.ok && jsonOkPayload(u.json)) {
        const data = isRecord(u.json) ? u.json.data : null;
        const arr = Array.isArray(data) ? data : [];

        const mapped: UserLite[] = arr
          .map((x): UserLite | null => {
            if (!isRecord(x)) return null;
            const id = getString(x.id);
            const name = getString(x.name);
            const email = getOptionalString(x.email);
            if (!id || !name) return null;
            return { id, name, email };
          })
          .filter((x): x is UserLite => Boolean(x));

        setUsersAll(mapped);
      } else {
        const err = jsonErrPayload(u.json) ? getString(u.json.error) : `HTTP_${u.res.status}`;
        throw new Error(`users: ${err}`);
      }

      if (v.res.ok && jsonOkPayload(v.json)) {
        const data = isRecord(v.json) ? v.json.data : null;
        const arr = Array.isArray(data) ? data : [];

        const mapped: VehicleLite[] = arr
          .map((x): VehicleLite | null => {
            if (!isRecord(x)) return null;
            const id = getString(x.id);
            const immatriculation = getString(x.immatriculation);
            const type = getString(x.type);
            if (!id || !immatriculation) return null;
            return { id, immatriculation, type };
          })
          .filter((x): x is VehicleLite => Boolean(x));

        setVehiclesAll(mapped);
      } else {
        const err = jsonErrPayload(v.json) ? getString(v.json.error) : `HTTP_${v.res.status}`;
        throw new Error(`vehicles: ${err}`);
      }

      setListsLoaded(true);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setListsError(msg);
      setListsLoaded(true);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadRole() {
      try {
        const { res, json } = await fetchJson("/api/auth/session");
        if (!res.ok) return;

        if (!isRecord(json)) return;
        const u = isRecord(json.user) ? json.user : null;
        const r = u && typeof u.role === "string" ? (u.role as Role) : null;

        if (!cancelled) setRole(r);
      } catch {
        // ignore
      }
    }

    void loadRole();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!canAdminSave(role)) return;
    if (listsLoaded) return;
    void loadCompanyLists();
  }, [role, listsLoaded, loadCompanyLists]);

  useEffect(() => {
    let cancelled = false;

    async function loadRule() {
      try {
        const { res, json } = await fetchJson("/api/company/rules?keys=PLANNING_VIEW_MODE");
        if (!res.ok || !jsonOkPayload(json)) {
          if (!cancelled) setCompanyRuleLoaded(true);
          return;
        }

        const data = isRecord(json) ? json.data : null;
        const rulesArr = Array.isArray(data) ? data : [];

        const rule = rulesArr.find((r) => isRecord(r) && r.key === "PLANNING_VIEW_MODE");
        const value = isRecord(rule) ? getString(rule.value).toUpperCase() : "";

        if (!cancelled) {
          if (value === "AMBULANCE") setMode("AMBULANCE");
          else if (value === "SIMPLE") setMode("SIMPLE");
          setCompanyRuleLoaded(true);
        }
      } catch {
        if (!cancelled) setCompanyRuleLoaded(true);
      }
    }

    void loadRule();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (cancelled) return;
      await loadShiftsForWeek(weekStartStr);
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [weekStartStr, loadShiftsForWeek]);

  const title = useMemo(() => {
    const end = addDays(weekStart, 6);
    return `Semaine du ${weekStartStr} au ${formatDate(end)}`;
  }, [weekStart, weekStartStr]);

  const saveCompanyMode = useCallback(async () => {
    setSaving(true);
    setSaveMsg(null);

    try {
      const value = mode === "AMBULANCE" ? "AMBULANCE" : "SIMPLE";
      const { res, json, text } = await fetchJson("/api/company/rules", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "PLANNING_VIEW_MODE", value }),
      });

      if (!res.ok || !jsonOkPayload(json)) {
        const err = jsonErrPayload(json) ? getString(json.error) : `HTTP_${res.status}`;
        throw new Error(`${err}${text ? ` - ${text}` : ""}`);
      }

      setSaveMsg("Préférence enregistrée pour l’entreprise ✅");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setSaveMsg(`Erreur: ${msg}`);
    } finally {
      setSaving(false);
    }
  }, [mode]);

  const clearMatchUi = useCallback(() => {
    setMatchMsg(null);
    setMatchPreview(null);
    setMatchApplied(null);
    setMatchQuality(null);
    setMatchPreviewRunId(null);
  }, []);

  // ✅ dès qu’on change de run, on invalide toute simulation précédente
  useEffect(() => {
    clearMatchUi();
  }, [lastRunId, clearMatchUi]);

  const generateWeek = useCallback(async () => {
    setGenLoading(true);
    setGenMsg(null);
    setPubMsg(null);
    setDayGenMsg(null);
    setCancelMsg(null);

    clearMatchUi();

    setPubWarnings([]);
    setPubConflict(null);

    setLastRunStatus(null);
    setLastRunDraftCount(null);

    try {
      const { res, json, text } = await fetchJson("/api/planning/autoschedule/week", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weekStart: weekStartStr }),
      });

      if (
        (!res.ok || !jsonOkPayload(json)) &&
        isRecord(json) &&
        json.error === "DRAFT_ALREADY_EXISTS" &&
        "runId" in json
      ) {
        const existingRunId = getString(json.runId);
        setLastRunId(existingRunId);
        setGenMsg(`Brouillon déjà existant ↩️ (runId: ${existingRunId})`);
        await loadRunInfo(existingRunId);
        return;
      }

      if (!res.ok || !jsonOkPayload(json)) {
        const err = jsonErrPayload(json) ? getString(json.error) : `HTTP_${res.status}`;
        throw new Error(`${err}${text ? ` - ${text}` : ""}`);
      }

      const data = isRecord(json) ? json.data : null;
      const runId = isRecord(data) && typeof data.id === "string" ? data.id : null;

      setLastRunId(runId);

      if (runId) {
        setGenMsg(`Brouillon généré ✅ (runId: ${runId})`);
        await loadRunInfo(runId);
      } else {
        setGenMsg("Brouillon généré ✅");
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setGenMsg(`Erreur génération: ${msg}`);
    } finally {
      setGenLoading(false);
    }
  }, [weekStartStr, loadRunInfo, clearMatchUi]);

  const generateDay = useCallback(
    async (dayStr: string) => {
      setDayGenLoadingKey(dayStr);
      setDayGenMsg(null);
      setGenMsg(null);
      setPubMsg(null);
      setCancelMsg(null);

      clearMatchUi();

      setPubWarnings([]);
      setPubConflict(null);

      setLastRunStatus(null);
      setLastRunDraftCount(null);

      try {
        const { res, json, text } = await fetchJson("/api/planning/autoschedule/day", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ day: dayStr }),
        });

        if (
          (!res.ok || !jsonOkPayload(json)) &&
          isRecord(json) &&
          json.error === "DRAFT_ALREADY_EXISTS" &&
          "runId" in json
        ) {
          const existingRunId = getString(json.runId);
          setLastRunId(existingRunId);
          setDayGenMsg(`Brouillon déjà existant ↩️ (day: ${dayStr}, runId: ${existingRunId})`);
          await loadRunInfo(existingRunId);
          return;
        }

        if (!res.ok || !jsonOkPayload(json)) {
          const err = jsonErrPayload(json) ? getString(json.error) : `HTTP_${res.status}`;
          throw new Error(`${err}${text ? ` - ${text}` : ""}`);
        }

        const data = isRecord(json) ? json.data : null;
        const runId = isRecord(data) && typeof data.id === "string" ? data.id : null;

        setLastRunId(runId);

        if (runId) {
          setDayGenMsg(`Jour généré ✅ (day: ${dayStr}, runId: ${runId})`);
          await loadRunInfo(runId);
        } else {
          setDayGenMsg(`Jour généré ✅ (day: ${dayStr})`);
        }
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        setDayGenMsg(`Erreur génération jour: ${msg}`);
      } finally {
        setDayGenLoadingKey(null);
      }
    },
    [loadRunInfo, clearMatchUi]
  );

  const previewMatch = useCallback(async () => {
    if (!lastRunId) return;

    setMatchPreviewLoading(true);
    setMatchApplyLoading(false);
    setMatchMsg(null);
    setMatchApplied(null);
    setMatchQuality(null);
    setPubMsg(null);

    try {
      await loadRunInfo(lastRunId);

      if (lastRunStatus && lastRunStatus !== "DRAFT") {
        setMatchMsg(`Impossible : run.status=${lastRunStatus}`);
        setMatchPreviewRunId(null);
        setMatchPreview(null);
        setMatchQuality(null);
        return;
      }

      if (typeof lastRunDraftCount === "number" && lastRunDraftCount <= 0) {
        setMatchMsg("Impossible : aucun DraftShift (NO_DRAFTS).");
        setMatchPreviewRunId(null);
        setMatchPreview(null);
        setMatchQuality(null);
        return;
      }

      // ✅ appel direct API (standard { ok, data })
      const { res, json, text } = await fetchJson(
        `/api/planning/autoschedule/runs/${lastRunId}/match/preview`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // on veut voir aussi ALREADY_ASSIGNED dans le tableau/compteurs
          body: JSON.stringify({ includeAlreadyAssigned: true }),
        }
      );

      if (!res.ok || !jsonOkPayload(json)) {
        const err = jsonErrPayload(json) ? getString(json.error) : `HTTP_${res.status}`;
        throw new Error(`${err}${text ? ` - ${text}` : ""}`);
      }

      const data = isRecord(json) ? json.data : null;

      let planRaw: unknown = data;
      let qualityRaw: unknown = null;

      if (isRecord(data) && "plan" in data) {
        planRaw = (data as Record<string, unknown>).plan;
        qualityRaw = (data as Record<string, unknown>).quality;
      }

      const arr = Array.isArray(planRaw) ? planRaw : [];
      const parsed: MatchingPlanItem[] = arr.filter(isMatchingPlanItem);

      setMatchPreview(parsed);
      setMatchPreviewRunId(lastRunId);
      setMatchQuality(isPlanningQuality(qualityRaw) ? qualityRaw : null);

      const c = countByReason(parsed);
      const q = isPlanningQuality(qualityRaw) ? qualityRaw : null;

      setMatchMsg(
        q
          ? `Simulation OK ✅ — Score:${q.overall}/100 (Couv:${q.coverage.score}, Stab:${q.stability.score}, Eq:${q.equity.score}) — MATCHED:${c.MATCHED}, ALREADY_ASSIGNED:${c.ALREADY_ASSIGNED}, NO_REQUIRED_ROLE:${c.NO_REQUIRED_ROLE}, NO_USER_WITH_REQUIRED_ROLE:${c.NO_USER_WITH_REQUIRED_ROLE}, USER_CONFLICT:${c.USER_CONFLICT}`
          : `Simulation OK ✅ — MATCHED:${c.MATCHED}, ALREADY_ASSIGNED:${c.ALREADY_ASSIGNED}, NO_REQUIRED_ROLE:${c.NO_REQUIRED_ROLE}, NO_USER_WITH_REQUIRED_ROLE:${c.NO_USER_WITH_REQUIRED_ROLE}, USER_CONFLICT:${c.USER_CONFLICT}`
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setMatchMsg(`Erreur simulation: ${msg}`);
      setMatchPreview(null);
      setMatchQuality(null);
      setMatchPreviewRunId(null);
    } finally {
      setMatchPreviewLoading(false);
    }
  }, [lastRunId, loadRunInfo, lastRunStatus, lastRunDraftCount]);

  const applyMatch = useCallback(async () => {
    if (!lastRunId) return;

    // ✅ guard : preview obligatoire et doit correspondre au run courant
    if (matchPreview === null || matchPreviewRunId !== lastRunId) {
      setMatchMsg("⛔ Fais d’abord une simulation (Simuler auto-assign) sur le run courant avant d’appliquer.");
      return;
    }

    await loadRunInfo(lastRunId);

    if (lastRunStatus && lastRunStatus !== "DRAFT") {
      setMatchMsg(`Impossible : run.status=${lastRunStatus}`);
      return;
    }

    if (typeof lastRunDraftCount === "number" && lastRunDraftCount <= 0) {
      setMatchMsg("Impossible : aucun DraftShift (NO_DRAFTS).");
      return;
    }

    const confirmed = window.confirm(
      "Appliquer l’auto-assign ?\n\nCela va modifier les DraftShifts du run (userId) selon le matching."
    );
    if (!confirmed) return;

    setMatchApplyLoading(true);
    setMatchPreviewLoading(false);
    setMatchMsg(null);
    setPubMsg(null);

    try {
      // ✅ apply exige { confirm:true }
      const { res, json, text } = await fetchJson(
        `/api/planning/autoschedule/runs/${lastRunId}/match/apply`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ confirm: true }),
        }
      );

      if (!res.ok || !jsonOkPayload(json)) {
        const err = jsonErrPayload(json) ? getString(json.error) : `HTTP_${res.status}`;

        if (err === "MATCH_STALE_STATE") {
          setMatchApplied(null);
          setMatchMsg("⛔ Le brouillon a changé depuis la simulation. Relance 'Simuler auto-assign' puis ré-applique.");
          return;
        }

        if (err === "RUN_NOT_DRAFT") {
          setMatchApplied(null);
          setMatchMsg("⛔ Impossible : le run n’est plus en DRAFT.");
          return;
        }

        throw new Error(`${err}${text ? ` - ${text}` : ""}`);
      }

      const data = isRecord(json) ? json.data : null;
      const arr = Array.isArray(data) ? data : [];
      const applied: MatchingApplyItem[] = arr.filter(isMatchingApplyItem);

      setMatchApplied(applied);
      setMatchPreview(applied);
      setMatchPreviewRunId(lastRunId);

      const { applied: appliedCount, notApplied } = countApplied(applied);
      setMatchMsg(`Application OK ✅ — applied:${appliedCount}, skipped:${notApplied}`);

      await loadShiftsForWeek(weekStartStr);
      await loadRunInfo(lastRunId);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setMatchMsg(`Erreur apply: ${msg}`);
      setMatchApplied(null);
    } finally {
      setMatchApplyLoading(false);
    }
  }, [
    lastRunId,
    matchPreview,
    matchPreviewRunId,
    loadRunInfo,
    lastRunStatus,
    lastRunDraftCount,
    loadShiftsForWeek,
    weekStartStr,
  ]);

  const publishLastRun = useCallback(async () => {
    if (!lastRunId) return;

    setPubWarnings([]);
    setPubConflict(null);

    await loadRunInfo(lastRunId);

    if (lastRunStatus && lastRunStatus !== "DRAFT") {
      setPubMsg(`Impossible de publier : run.status=${lastRunStatus}`);
      return;
    }

    if (typeof lastRunDraftCount === "number" && lastRunDraftCount <= 0) {
      setPubMsg("Impossible de publier : aucun DraftShift (NO_DRAFTS). Vérifie tes ShiftTemplates actifs / génération.");
      return;
    }

    const confirmed = window.confirm(
      "Publier ce brouillon ?\n\nCela va copier les DraftShifts vers les Shifts réels et passer le run en PUBLISHED."
    );
    if (!confirmed) return;

    setPubLoading(true);
    setPubMsg(null);

    try {
      const { res, json, text } = await fetchJson(`/api/planning/autoschedule/runs/${lastRunId}/publish`, {
        method: "POST",
      });

      if (!res.ok || !jsonOkPayload(json)) {
        const err = jsonErrPayload(json) ? getString(json.error) : `HTTP_${res.status}`;

        if (err === "MIN_REST_BLOCKED" && isRecord(json) && isRecord(json.details)) {
          const warnings = safeArray<RestWarning>((json.details as JsonRecord).warnings);
          setPubWarnings(warnings);
          setPubMsg(`Publication bloquée ⛔ (repos minimum) — ${warnings.length} alerte(s).`);
          return;
        }

        if (err === "CONFLICT_USER" && isRecord(json) && isRecord(json.details)) {
          const d = json.details as JsonRecord;
          const conflict: PublishConflict = {
            kind: "CONFLICT_USER",
            userId: getString(d.userId),
            draft: {
              startAt: isRecord(d.draft) ? getString(d.draft.startAt) : "",
              endAt: isRecord(d.draft) ? getString(d.draft.endAt) : "",
            },
            existingShiftId: getString(d.existingShiftId),
            existing: {
              startAt: isRecord(d.existing) ? getString(d.existing.startAt) : "",
              endAt: isRecord(d.existing) ? getString(d.existing.endAt) : "",
            },
          };
          setPubConflict(conflict);
          setPubMsg("Publication bloquée ⛔ (conflit employé).");
          return;
        }

        if (err === "CONFLICT_VEHICLE" && isRecord(json) && isRecord(json.details)) {
          const d = json.details as JsonRecord;
          const conflict: PublishConflict = {
            kind: "CONFLICT_VEHICLE",
            vehicleId: getString(d.vehicleId),
            draft: {
              startAt: isRecord(d.draft) ? getString(d.draft.startAt) : "",
              endAt: isRecord(d.draft) ? getString(d.draft.endAt) : "",
            },
            existingShiftId: getString(d.existingShiftId),
            existing: {
              startAt: isRecord(d.existing) ? getString(d.existing.startAt) : "",
              endAt: isRecord(d.existing) ? getString(d.existing.endAt) : "",
            },
          };
          setPubConflict(conflict);
          setPubMsg("Publication bloquée ⛔ (conflit véhicule).");
          return;
        }

        throw new Error(`${err}${text ? ` - ${text}` : ""}`);
      }

      const data = isRecord(json) ? json.data : null;
      const warnings = isRecord(data) ? safeArray<RestWarning>(data.warnings) : [];
      setPubWarnings(warnings);

      if (warnings.length > 0) setPubMsg(`Brouillon publié ✅ avec ${warnings.length} avertissement(s).`);
      else setPubMsg("Brouillon publié ✅ (run: PUBLISHED)");

      await loadShiftsForWeek(weekStartStr);
      await loadRunInfo(lastRunId);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setPubMsg(`Erreur publish: ${msg}`);
    } finally {
      setPubLoading(false);
    }
  }, [lastRunId, lastRunStatus, lastRunDraftCount, loadRunInfo, loadShiftsForWeek, weekStartStr]);

  const cancelLastRun = useCallback(async () => {
    if (!lastRunId) return;

    setPubWarnings([]);
    setPubConflict(null);

    await loadRunInfo(lastRunId);
    if (lastRunStatus && lastRunStatus !== "DRAFT") {
      setCancelMsg(`Impossible d’annuler : run.status=${lastRunStatus}`);
      return;
    }

    const confirmed = window.confirm("Annuler ce brouillon ?\n\nLe run passera en CANCELLED.");
    if (!confirmed) return;

    setCancelLoading(true);
    setCancelMsg(null);

    try {
      const { res, json, text } = await fetchJson(`/api/planning/autoschedule/runs/${lastRunId}/cancel`, {
        method: "POST",
      });

      if (!res.ok || !jsonOkPayload(json)) {
        const err = jsonErrPayload(json) ? getString(json.error) : `HTTP_${res.status}`;
        throw new Error(`${err}${text ? ` - ${text}` : ""}`);
      }

      setCancelMsg("Run annulé ✅ (status: CANCELLED)");
      await loadRunInfo(lastRunId);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setCancelMsg(`Erreur cancel: ${msg}`);
    } finally {
      setCancelLoading(false);
    }
  }, [lastRunId, lastRunStatus, loadRunInfo]);

  const assignOnDraftShift = useCallback(
    async (shiftId: string, patch: { userId?: string | null; user2Id?: string | null; vehicleId?: string | null }) => {
      setAssignLoadingId(shiftId);
      setAssignMsgById((m) => ({ ...m, [shiftId]: null }));
      setPubMsg(null);
      setGenMsg(null);
      setDayGenMsg(null);
      setCancelMsg(null);

      try {
        const { res, json, text } = await fetchJson(`/api/planning/shifts/${shiftId}/assign`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        });

        if (!res.ok || !jsonOkPayload(json)) {
          const err = jsonErrPayload(json) ? getString(json.error) : `HTTP_${res.status}`;

          if (err === "USER_CONFLICT") {
            setAssignMsgById((m) => ({
              ...m,
              [shiftId]: "⛔ Conflit employé : déjà affecté sur un autre DraftShift (chevauchement).",
            }));
            return;
          }

          if (err === "VEHICLE_CONFLICT") {
            setAssignMsgById((m) => ({
              ...m,
              [shiftId]: "⛔ Conflit véhicule : déjà affecté sur un autre DraftShift (chevauchement).",
            }));
            return;
          }

          if (err === "RUN_NOT_DRAFT") {
            setAssignMsgById((m) => ({ ...m, [shiftId]: "⛔ Impossible : le run n’est pas en DRAFT." }));
            return;
          }

          setAssignMsgById((m) => ({
            ...m,
            [shiftId]: `Erreur: ${err}${text ? ` - ${text}` : ""}`,
          }));
          return;
        }

        setAssignMsgById((m) => ({ ...m, [shiftId]: "Affectation enregistrée ✅" }));

        await loadShiftsForWeek(weekStartStr);
        if (lastRunId) await loadRunInfo(lastRunId);
      } finally {
        setAssignLoadingId(null);
      }
    },
    [lastRunId, loadRunInfo, loadShiftsForWeek, weekStartStr]
  );

  const publishDisabled =
    pubLoading ||
    genLoading ||
    runInfoLoading ||
    cancelLoading ||
    !lastRunId ||
    (lastRunStatus !== null && lastRunStatus !== "DRAFT") ||
    (typeof lastRunDraftCount === "number" && lastRunDraftCount <= 0);

  const matchDisabled =
    matchPreviewLoading ||
    matchApplyLoading ||
    pubLoading ||
    genLoading ||
    runInfoLoading ||
    cancelLoading ||
    !lastRunId ||
    (lastRunStatus !== null && lastRunStatus !== "DRAFT") ||
    (typeof lastRunDraftCount === "number" && lastRunDraftCount <= 0);

  const previewSummary = useMemo(() => {
    if (!matchPreview) return null;
    return countByReason(matchPreview);
  }, [matchPreview]);

  const appliedSummary = useMemo(() => {
    if (!matchApplied) return null;
    return countApplied(matchApplied);
  }, [matchApplied]);

  const applyBlocked = matchPreview === null || matchPreviewRunId !== lastRunId;

  return (
    <section style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={() => setWeekStart(addDays(weekStart, -7))}>← Semaine -1</button>
        <button onClick={() => setWeekStart(startOfWeekMonday(new Date()))}>Aujourd’hui</button>
        <button onClick={() => setWeekStart(addDays(weekStart, 7))}>Semaine +1 →</button>

        <div style={{ marginLeft: 8, fontWeight: 700 }}>{title}</div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ opacity: 0.85 }}>Vue :</span>

          <button
            onClick={() => setMode("SIMPLE")}
            style={{
              fontWeight: mode === "SIMPLE" ? 700 : 400,
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "6px 10px",
              borderRadius: 8,
            }}
          >
            Simple
          </button>

          <button
            onClick={() => setMode("AMBULANCE")}
            style={{
              fontWeight: mode === "AMBULANCE" ? 700 : 400,
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "6px 10px",
              borderRadius: 8,
            }}
          >
            Ambulance
          </button>

          {canAdminSave(role) && (
            <>
              <button
                onClick={saveCompanyMode}
                disabled={saving || !companyRuleLoaded}
                style={{
                  marginLeft: 8,
                  border: "1px solid rgba(255,255,255,0.25)",
                  padding: "6px 10px",
                  borderRadius: 8,
                  opacity: saving ? 0.7 : 1,
                }}
                title={!companyRuleLoaded ? "Chargement du réglage entreprise…" : "Sauvegarder pour l’entreprise"}
              >
                {saving ? "Sauvegarde…" : "Sauvegarder (entreprise)"}
              </button>

              <button
                onClick={previewMatch}
                disabled={matchDisabled}
                style={{
                  border: "1px solid rgba(255,255,255,0.25)",
                  padding: "6px 10px",
                  borderRadius: 8,
                  opacity: matchDisabled ? 0.6 : 1,
                }}
                title="Simule l’auto-assign (sans écriture DB) sur le dernier run DRAFT"
              >
                {matchPreviewLoading ? "Simulation…" : "Simuler auto-assign"}
              </button>

              <button
                onClick={applyMatch}
                disabled={matchDisabled || applyBlocked}
                style={{
                  border: "1px solid rgba(255,255,255,0.25)",
                  padding: "6px 10px",
                  borderRadius: 8,
                  opacity: matchDisabled || applyBlocked ? 0.6 : 1,
                }}
                title={applyBlocked ? "Simulation requise sur le run courant" : "Applique l’auto-assign sur le dernier run DRAFT"}
              >
                {matchApplyLoading ? "Application…" : "Appliquer auto-assign"}
              </button>

              {listsError && <span style={{ fontSize: 12, opacity: 0.8 }}>Listes: erreur ({listsError})</span>}
            </>
          )}

          <button
            onClick={generateWeek}
            disabled={genLoading}
            style={{
              border: "1px solid rgba(255,255,255,0.25)",
              padding: "6px 10px",
              borderRadius: 8,
              opacity: genLoading ? 0.7 : 1,
            }}
            title="Génère un brouillon (DraftShifts) pour la semaine affichée"
          >
            {genLoading ? "Génération…" : "Générer cette semaine"}
          </button>

          <button
            onClick={publishLastRun}
            disabled={publishDisabled}
            style={{
              border: "1px solid rgba(255,255,255,0.25)",
              padding: "6px 10px",
              borderRadius: 8,
              opacity: publishDisabled ? 0.6 : 1,
            }}
            title="Publie le dernier run DRAFT"
          >
            {pubLoading ? "Publication…" : "Publier le brouillon"}
          </button>

          <button
            onClick={cancelLastRun}
            disabled={cancelLoading || !lastRunId || (lastRunStatus !== null && lastRunStatus !== "DRAFT")}
            style={{
              border: "1px solid rgba(255,255,255,0.25)",
              padding: "6px 10px",
              borderRadius: 8,
              opacity: cancelLoading ? 0.7 : 1,
            }}
            title="Annule le dernier run DRAFT"
          >
            {cancelLoading ? "Annulation…" : "Annuler le brouillon"}
          </button>
        </div>
      </div>

      {saveMsg && <div style={{ opacity: 0.9 }}>{saveMsg}</div>}
      {genMsg && <div style={{ opacity: 0.9 }}>{genMsg}</div>}
      {dayGenMsg && <div style={{ opacity: 0.9 }}>{dayGenMsg}</div>}
      {matchMsg && <div style={{ opacity: 0.9 }}>{matchMsg}</div>}
      {matchQuality && (
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 10,
            padding: 10,
            marginTop: 8,
          }}
        >
          <div style={{ fontWeight: 900 }}>Score qualité planning : {matchQuality.overall}/100</div>
          <div style={{ fontSize: 12, opacity: 0.9, marginTop: 6 }}>
            Couverture {matchQuality.coverage.score}/100 — Stabilité {matchQuality.stability.score}/100 — Équité {matchQuality.equity.score}/100
          </div>
          <ul style={{ marginTop: 8, paddingLeft: 18, opacity: 0.95 }}>
            {matchQuality.explanations.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      )}
      {pubMsg && <div style={{ opacity: 0.9 }}>{pubMsg}</div>}
      {cancelMsg && <div style={{ opacity: 0.9 }}>{cancelMsg}</div>}

      {(matchPreview || matchApplied) && (
        <div style={{ border: "1px solid rgba(255,255,255,0.18)", borderRadius: 10, padding: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
            <div style={{ fontWeight: 900 }}>Auto-assign (4.6)</div>
            <button
              onClick={() => {
                setMatchMsg(null);
                setMatchPreview(null);
                setMatchApplied(null);
                setMatchPreviewRunId(null);
              }}
              style={{
                border: "1px solid rgba(255,255,255,0.25)",
                padding: "4px 8px",
                borderRadius: 8,
                fontSize: 12,
                opacity: 0.9,
              }}
            >
              Fermer
            </button>
          </div>

          {previewSummary && (
            <div style={{ marginTop: 6, fontSize: 12, opacity: 0.9 }}>
              Simulation — MATCHED:{previewSummary.MATCHED}, ALREADY_ASSIGNED:{previewSummary.ALREADY_ASSIGNED}, NO_REQUIRED_ROLE:
              {previewSummary.NO_REQUIRED_ROLE}, NO_USER_WITH_REQUIRED_ROLE:{previewSummary.NO_USER_WITH_REQUIRED_ROLE}, USER_CONFLICT:{previewSummary.USER_CONFLICT}
            </div>
          )}

          {appliedSummary && (
            <div style={{ marginTop: 6, fontSize: 12, opacity: 0.9 }}>
              Application — applied:{appliedSummary.applied}, skipped:{appliedSummary.notApplied}
            </div>
          )}

          <div style={{ marginTop: 8, maxHeight: 220, overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ textAlign: "left", opacity: 0.85 }}>
                  <th style={{ padding: "6px 6px" }}>shiftId</th>
                  <th style={{ padding: "6px 6px" }}>start</th>
                  <th style={{ padding: "6px 6px" }}>end</th>
                  <th style={{ padding: "6px 6px" }}>requiredRole</th>
                  <th style={{ padding: "6px 6px" }}>proposedUserId</th>
                  <th style={{ padding: "6px 6px" }}>reason</th>
                  <th style={{ padding: "6px 6px" }}>applied</th>
                </tr>
              </thead>
              <tbody>
                {(matchApplied ?? matchPreview ?? []).slice(0, 200).map((it) => (
                  <tr key={it.shiftId} style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <td style={{ padding: "6px 6px", opacity: 0.9 }}>{it.shiftId}</td>
                    <td style={{ padding: "6px 6px", opacity: 0.9 }}>{timeHM(it.startAt)}</td>
                    <td style={{ padding: "6px 6px", opacity: 0.9 }}>{timeHM(it.endAt)}</td>
                    <td style={{ padding: "6px 6px", opacity: 0.9 }}>{it.requiredRole ?? "—"}</td>
                    <td style={{ padding: "6px 6px", opacity: 0.9 }}>{it.proposedUserId ?? "—"}</td>
                    <td style={{ padding: "6px 6px", opacity: 0.9 }}>{it.reason}</td>
                    <td style={{ padding: "6px 6px", opacity: 0.9 }}>{isMatchingApplyItem(it) ? (it.applied ? "✅" : "—") : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75 }}>(Affichage limité à 200 lignes)</div>
        </div>
      )}

      {pubWarnings.length > 0 && (
        <div style={{ border: "1px solid rgba(255,255,255,0.18)", borderRadius: 10, padding: 10 }}>
          <div style={{ fontWeight: 800, marginBottom: 6 }}>Avertissements (repos minimum)</div>
          <div style={{ display: "grid", gap: 6 }}>
            {pubWarnings.map((w, i) => (
              <div key={`${w.userId}-${i}`} style={{ fontSize: 12, opacity: 0.9 }}>
                • userId={w.userId} — requis {w.requiredHours}h, réel {Math.round(w.actualHours * 10) / 10}h
              </div>
            ))}
          </div>
        </div>
      )}

      {pubConflict && (
        <div style={{ border: "1px solid rgba(255,80,80,0.35)", borderRadius: 10, padding: 10 }}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Conflit de publication</div>
          <pre style={{ margin: 0, fontSize: 12, whiteSpace: "pre-wrap" }}>{JSON.stringify(pubConflict, null, 2)}</pre>
        </div>
      )}

      {loading && <div>Chargement…</div>}
      {error && <div style={{ color: "crimson" }}>Erreur : {error}</div>}

      {!loading && !error && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(160px, 1fr))", gap: 10 }}>
          {weekDays.map((d) => {
            const key = formatDate(d);
            const dayShifts = grouped[key] ?? [];
            const isDayGenerating = dayGenLoadingKey === key;

            return (
              <div
                key={key}
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 10,
                  padding: 10,
                  minHeight: 220,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                  <div style={{ fontWeight: 800, textTransform: "capitalize" }}>{dayLabelFR(d)}</div>

                  <button
                    onClick={() => generateDay(key)}
                    disabled={isDayGenerating || genLoading || pubLoading || cancelLoading}
                    style={{
                      border: "1px solid rgba(255,255,255,0.25)",
                      padding: "4px 8px",
                      borderRadius: 8,
                      opacity: isDayGenerating ? 0.7 : 1,
                      fontSize: 12,
                      whiteSpace: "nowrap",
                    }}
                    title="Génère un brouillon (DraftShifts) pour ce jour"
                  >
                    {isDayGenerating ? "Génération…" : "Générer ce jour"}
                  </button>
                </div>

                <div style={{ opacity: 0.75, marginBottom: 8 }}>{key}</div>

                {dayShifts.length === 0 ? (
                  <div style={{ opacity: 0.6 }}>Aucun shift</div>
                ) : (
                  <div style={{ display: "grid", gap: 8 }}>
                    {dayShifts.map((s) =>
                      mode === "SIMPLE" ? (
                        <ShiftCardSimple
                          key={s.id}
                          s={s}
                          editable={canAdminSave(role)}
                          users={userOptions}
                          vehicles={vehicleOptions}
                          loading={assignLoadingId === s.id}
                          msg={assignMsgById[s.id] ?? null}
                          onAssign={assignOnDraftShift}
                        />
                      ) : (
                        <ShiftCardAmbulance
                          key={s.id}
                          s={s}
                          editable={canAdminSave(role)}
                          users={userOptions}
                          vehicles={vehicleOptions}
                          loading={assignLoadingId === s.id}
                          msg={assignMsgById[s.id] ?? null}
                          onAssign={assignOnDraftShift}
                        />
                      )
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function ShiftCardSimple({
  s,
  editable,
  users,
  vehicles,
  loading,
  msg,
  onAssign,
}: {
  s: Shift;
  editable: boolean;
  users: UserLite[];
  vehicles: VehicleLite[];
  loading: boolean;
  msg: string | null;
  onAssign: (id: string, patch: { userId?: string | null; user2Id?: string | null; vehicleId?: string | null }) => Promise<void>;
}) {
  const cat = String(s.template?.category ?? "").toUpperCase();
  const two = requiresTwoEmployees(cat);

  const usersSummary = two ? `${s.user?.name ?? "—"} / ${s.user2?.name ?? "—"}` : `${s.user?.name ?? "—"}`;

  return (
    <div style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: 10, display: "grid", gap: 8 }}>
      <div style={{ fontWeight: 800 }}>
        {timeHM(s.startAt)} → {timeHM(s.endAt)}
      </div>

      <div style={{ opacity: 0.9 }}>
        {usersSummary} • {s.vehicle?.immatriculation ?? "—"}
      </div>

      <div style={{ opacity: 0.7 }}>{s.template?.name ?? "—"}</div>

      {editable && (
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ display: "grid", gap: 4 }}>
            <label style={{ fontSize: 12, opacity: 0.75 }}>{two ? "Employé 1" : "Employé"}</label>
            <select
              value={s.user?.id ?? ""}
              disabled={loading}
              onChange={(e) => {
                const v = e.target.value;
                onAssign(s.id, { userId: v === "" ? null : v });
              }}
            >
              <option value="">— Désaffecter —</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {two && (
            <div style={{ display: "grid", gap: 4 }}>
              <label style={{ fontSize: 12, opacity: 0.75 }}>Employé 2</label>
              <select
                value={s.user2?.id ?? ""}
                disabled={loading}
                onChange={(e) => {
                  const v = e.target.value;
                  onAssign(s.id, { user2Id: v === "" ? null : v });
                }}
              >
                <option value="">— Désaffecter —</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div style={{ display: "grid", gap: 4 }}>
            <label style={{ fontSize: 12, opacity: 0.75 }}>Véhicule</label>
            <select
              value={s.vehicle?.id ?? ""}
              disabled={loading}
              onChange={(e) => {
                const v = e.target.value;
                onAssign(s.id, { vehicleId: v === "" ? null : v });
              }}
            >
              <option value="">— Désaffecter —</option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.immatriculation} ({v.type})
                </option>
              ))}
            </select>
          </div>

          {msg && <div style={{ fontSize: 12, opacity: 0.9 }}>{msg}</div>}
        </div>
      )}
    </div>
  );
}

function ShiftCardAmbulance({
  s,
  editable,
  users,
  vehicles,
  loading,
  msg,
  onAssign,
}: {
  s: Shift;
  editable: boolean;
  users: UserLite[];
  vehicles: VehicleLite[];
  loading: boolean;
  msg: string | null;
  onAssign: (id: string, patch: { userId?: string | null; user2Id?: string | null; vehicleId?: string | null }) => Promise<void>;
}) {
  const cat = String(s.template?.category ?? "—").toUpperCase();
  const two = requiresTwoEmployees(cat);

  const borderStyle =
    cat === "GARDE"
      ? "2px dashed rgba(255,255,255,0.35)"
      : cat === "AMBULANCE"
        ? "2px solid rgba(255,255,255,0.35)"
        : "1px solid rgba(255,255,255,0.2)";

  return (
    <div style={{ border: borderStyle, borderRadius: 12, padding: 10, display: "grid", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <div style={{ fontWeight: 900 }}>
          {timeHM(s.startAt)} → {timeHM(s.endAt)}
        </div>
        <span
          style={{
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 999,
            padding: "2px 8px",
            fontSize: 12,
            opacity: 0.9,
            whiteSpace: "nowrap",
          }}
        >
          {cat}
        </span>
      </div>

      <div style={{ display: "grid", gap: 4 }}>
        {two ? (
          <>
            <Row label="Employé 1" value={s.user?.name ?? "—"} />
            <Row label="Employé 2" value={s.user2?.name ?? "—"} />
          </>
        ) : (
          <Row label="Employé" value={s.user?.name ?? "—"} />
        )}
        <Row label="Véhicule" value={s.vehicle?.immatriculation ?? "—"} />
        <Row label="Mission" value={s.template?.name ?? "—"} />
      </div>

      {editable && (
        <div style={{ display: "grid", gap: 6, marginTop: 4 }}>
          <div style={{ display: "grid", gap: 4 }}>
            <label style={{ fontSize: 12, opacity: 0.75 }}>{two ? "Employé 1" : "Employé"}</label>
            <select
              value={s.user?.id ?? ""}
              disabled={loading}
              onChange={(e) => {
                const v = e.target.value;
                onAssign(s.id, { userId: v === "" ? null : v });
              }}
            >
              <option value="">— Désaffecter —</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {two && (
            <div style={{ display: "grid", gap: 4 }}>
              <label style={{ fontSize: 12, opacity: 0.75 }}>Employé 2</label>
              <select
                value={s.user2?.id ?? ""}
                disabled={loading}
                onChange={(e) => {
                  const v = e.target.value;
                  onAssign(s.id, { user2Id: v === "" ? null : v });
                }}
              >
                <option value="">— Désaffecter —</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div style={{ display: "grid", gap: 4 }}>
            <label style={{ fontSize: 12, opacity: 0.75 }}>Véhicule</label>
            <select
              value={s.vehicle?.id ?? ""}
              disabled={loading}
              onChange={(e) => {
                const v = e.target.value;
                onAssign(s.id, { vehicleId: v === "" ? null : v });
              }}
            >
              <option value="">— Désaffecter —</option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.immatriculation} ({v.type})
                </option>
              ))}
            </select>
          </div>

          {msg && <div style={{ fontSize: 12, opacity: 0.9 }}>{msg}</div>}
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, opacity: 0.95 }}>
      <span style={{ opacity: 0.75 }}>{label}</span>
      <span style={{ fontWeight: 700 }}>{value}</span>
    </div>
  );
}