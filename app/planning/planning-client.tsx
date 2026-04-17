"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { COMPANY_PARAMETER_KEYS, parsePlanningViewModeValue, serializePlanningViewModeValue, type PlanningViewModeValue } from "@/lib/company-rules/catalog";
import { normalizeTemplateColor, resolveTemplateMinStaffCount } from "@/lib/templates/template-rules";

import ManualPlanningPanel from "./manual-planning-panel";

type Shift = {
  id: string;
  startAt: string;
  endAt: string;
  date: string;

  user?: { id: string; name: string; email: string } | null;
  user2?: { id: string; name: string; email: string } | null;

  vehicle?: { id: string; immatriculation: string; type: string } | null;
  depot?: { id: string; name: string; isActive: boolean } | null;
  template?: {
    id: string;
    name: string;
    category: string;
    minStaffCount?: number | null;
    requiredVehicleType?: string | null;
    color?: string | null;
  } | null;
};

type UserLite = { id: string; name: string; email?: string };
type VehicleLite = { id: string; immatriculation: string; type: string };
type DepotLite = { id: string; name: string; isActive: boolean };

type PlanningClientProps = {
  availableDepots: DepotLite[];
  availableUsers: UserLite[];
  currentUser: UserLite;
  canViewGlobal: boolean;
  canEditPlanning: boolean;
  canAutoSchedule: boolean;
  canManageCompanyMode: boolean;
  canViewAudit: boolean;
  canExportPlanning: boolean;
};

type RunAuditLog = {
  id: string;
  createdAt: string;
  action: string;
  entityType: string;
  entityId: string;
  summary: string;
  payload?: unknown;
  actorUser?: { id: string; name: string; email: string } | null;
};

type ViewMode = PlanningViewModeValue;

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

type ManualAssignIssue = {
  code: string;
  message: string;
  meta?: JsonRecord;
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

function isNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

// 4.6 matching types (UI) — alignés service/API
const MATCHING_REASONS = [
  "MATCHED",
  "ALREADY_ASSIGNED",
  "NO_REQUIRED_ROLE",
  "NO_USER_WITH_REQUIRED_ROLE",
  "USER_UNAVAILABLE",
  "MIN_REST_CONFLICT",
  "NO_VEHICLE_WITH_REQUIRED_TYPE",
  "VEHICLE_UNAVAILABLE",
  "ROLE_VEHICLE_RESTRICTION",
] as const;

type MatchingReason = (typeof MATCHING_REASONS)[number];
type MatchingTarget = "USER_1" | "USER_2" | "VEHICLE";
type AssignmentMode = "SHIFTS_ONLY" | "AUTO_ASSIGN";

const MATCHING_VARIANTS = [
  {
    key: "VARIANT_1",
    label: "Variante 1 — équilibrée",
    description: "Ordre chronologique et priorité à la charge la plus faible.",
  },
  {
    key: "VARIANT_2",
    label: "Variante 2 — stable",
    description: "Ordre chronologique et priorité à l’ordre stable par identifiant des ressources compatibles.",
  },
  {
    key: "VARIANT_3",
    label: "Variante 3 — inverse",
    description: "Ordre chronologique inversé avec maintien de l’équilibre de charge.",
  },
] as const;

type MatchingVariantDefinition = (typeof MATCHING_VARIANTS)[number];
type MatchingVariantKey = MatchingVariantDefinition["key"];

type MatchingPlanItem = {
  shiftId: string;
  startAt: string;
  endAt: string;
  target: MatchingTarget;
  requiredRole: string | null;
  requiredVehicleType: string | null;
  currentUserId: string | null;
  proposedUserId: string | null;
  currentVehicleId: string | null;
  proposedVehicleId: string | null;
  reason: MatchingReason;
  message: string;
};

type MatchingApplyItem = MatchingPlanItem & { applied: boolean };

type ShiftPlanningQuality = {
  shiftId: string;
  startAt: string;
  endAt: string;
  overall: number;
  coverage: { score: number; covered: number; total: number; pct: number };
  vehicleCoverage: { score: number; covered: number; total: number; pct: number };
  stability: { score: number; conflicts: number; total: number; pct: number };
  countsByReason: Partial<Record<MatchingReason, number>>;
  blockingReasons: MatchingReason[];
  explanations: string[];
};

type PlanningQuality = {
  overall: number;
  coverage: { score: number; covered: number; total: number; pct: number };
  vehicleCoverage: { score: number; covered: number; total: number; pct: number };
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
  countsByReason: Partial<Record<MatchingReason, number>>;
  shiftScores?: ShiftPlanningQuality[];
  explanations: string[];
};

function isMatchingReason(v: unknown): v is MatchingReason {
  return typeof v === "string" && MATCHING_REASONS.includes(v as MatchingReason);
}

function isCountsByReason(v: unknown): v is Partial<Record<MatchingReason, number>> {
  if (!isRecord(v)) return false;
  return Object.entries(v).every(([key, value]) => isMatchingReason(key) && isNumber(value));
}

function isShiftPlanningQuality(v: unknown): v is ShiftPlanningQuality {
  if (!isRecord(v)) return false;
  if (typeof v.shiftId !== "string" || typeof v.startAt !== "string" || typeof v.endAt !== "string") return false;
  if (!isNumber(v.overall)) return false;
  if (!isRecord(v.coverage) || !isNumber(v.coverage.score)) return false;
  if (!isRecord(v.vehicleCoverage) || !isNumber(v.vehicleCoverage.score)) return false;
  if (!isRecord(v.stability) || !isNumber(v.stability.score)) return false;
  if (!isCountsByReason(v.countsByReason)) return false;
  if (!Array.isArray(v.blockingReasons) || !v.blockingReasons.every(isMatchingReason)) return false;
  if (!Array.isArray(v.explanations) || !v.explanations.every((x) => typeof x === "string")) return false;
  return true;
}

function isMatchingVariantDefinition(v: unknown): v is MatchingVariantDefinition {
  if (!isRecord(v)) return false;
  if (typeof v.key !== "string" || !MATCHING_VARIANTS.some((item) => item.key === v.key)) return false;
  if (typeof v.label !== "string" || typeof v.description !== "string") return false;
  return true;
}

function isPlanningQuality(v: unknown): v is PlanningQuality {
  if (!isRecord(v)) return false;

  if (!isNumber(v.overall)) return false;
  if (!isRecord(v.coverage) || !isNumber(v.coverage.score)) return false;
  if (!isRecord(v.vehicleCoverage) || !isNumber(v.vehicleCoverage.score)) return false;
  if (!isRecord(v.stability) || !isNumber(v.stability.score)) return false;
  if (!isRecord(v.equity) || !isNumber(v.equity.score)) return false;

  if (!isCountsByReason(v.countsByReason)) return false;
  if ("shiftScores" in v && v.shiftScores !== undefined) {
    if (!Array.isArray(v.shiftScores) || !v.shiftScores.every(isShiftPlanningQuality)) return false;
  }
  if (!Array.isArray(v.explanations) || !v.explanations.every((x) => typeof x === "string")) return false;

  return true;
}

function isMatchingPlanItem(v: unknown): v is MatchingPlanItem {
  if (!isRecord(v)) return false;

  const shiftIdOk = typeof v.shiftId === "string";
  const startAtOk = typeof v.startAt === "string";
  const endAtOk = typeof v.endAt === "string";
  const targetOk = v.target === "USER_1" || v.target === "USER_2" || v.target === "VEHICLE";
  const requiredRoleOk = v.requiredRole === null || typeof v.requiredRole === "string";
  const requiredVehicleTypeOk = v.requiredVehicleType === null || typeof v.requiredVehicleType === "string";
  const currentUserIdOk = v.currentUserId === null || typeof v.currentUserId === "string";
  const proposedUserIdOk = v.proposedUserId === null || typeof v.proposedUserId === "string";
  const currentVehicleIdOk = v.currentVehicleId === null || typeof v.currentVehicleId === "string";
  const proposedVehicleIdOk = v.proposedVehicleId === null || typeof v.proposedVehicleId === "string";
  const reasonOk = isMatchingReason(v.reason);
  const messageOk = typeof v.message === "string";

  return (
    shiftIdOk &&
    startAtOk &&
    endAtOk &&
    targetOk &&
    requiredRoleOk &&
    requiredVehicleTypeOk &&
    currentUserIdOk &&
    proposedUserIdOk &&
    currentVehicleIdOk &&
    proposedVehicleIdOk &&
    reasonOk &&
    messageOk
  );
}

function isMatchingApplyItem(v: unknown): v is MatchingApplyItem {
  if (!isRecord(v)) return false;
  if (!isMatchingPlanItem(v)) return false;
  return "applied" in v && typeof (v as Record<string, unknown>).applied === "boolean";
}

function formatAssignmentModeLabel(mode: AssignmentMode) {
  return mode === "AUTO_ASSIGN" ? "shifts + auto-affectation" : "shifts seuls";
}

function formatRunStatusLabel(status: string | null) {
  if (status === "DRAFT") return "brouillon";
  if (status === "PUBLISHED") return "publié";
  if (status === "CANCELLED") return "annulé";
  return status ?? "inconnu";
}

function formatMatchingReasonLabel(reason: MatchingReason) {
  switch (reason) {
    case "MATCHED":
      return "Affecté automatiquement";
    case "ALREADY_ASSIGNED":
      return "Déjà affecté";
    case "NO_REQUIRED_ROLE":
      return "Rôle non défini";
    case "NO_USER_WITH_REQUIRED_ROLE":
      return "Aucun employé au rôle requis";
    case "USER_UNAVAILABLE":
      return "Employés indisponibles";
    case "MIN_REST_CONFLICT":
      return "Repos minimum bloquant";
    case "NO_VEHICLE_WITH_REQUIRED_TYPE":
      return "Aucun véhicule du type requis";
    case "VEHICLE_UNAVAILABLE":
      return "Véhicules indisponibles";
    case "ROLE_VEHICLE_RESTRICTION":
      return "Rôle incompatible avec le véhicule";
    default:
      return reason;
  }
}

function formatMatchingTargetLabel(target: MatchingTarget) {
  switch (target) {
    case "USER_1":
      return "Employé 1";
    case "USER_2":
      return "Employé 2";
    case "VEHICLE":
      return "Véhicule";
    default:
      return target;
  }
}

function getReasonCount(counts: Partial<Record<MatchingReason, number>>, reason: MatchingReason) {
  return counts[reason] ?? 0;
}

function getDraftAlreadyExistsRunId(json: unknown): string | null {
  if (!isRecord(json) || json.error !== "DRAFT_ALREADY_EXISTS") return null;
  if (typeof json.runId === "string") return json.runId;
  if (isRecord(json.details) && typeof json.details.runId === "string") return json.details.runId;
  return null;
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

function dateTimeFR(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}


function requiresTwoEmployees(category: string | null | undefined, minStaffCount?: number | null) {
  return resolveTemplateMinStaffCount(minStaffCount, category) === 2;
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

function formatManualAssignIssues(issues: ManualAssignIssue[]): string | null {
  if (issues.length === 0) return null;

  const minRestMessages = issues
    .filter((issue) => issue.code === "MIN_REST_VIOLATION")
    .map((issue) => `⚠️ ${issue.message}`);

  if (minRestMessages.length > 0) {
    return ["Affectation enregistrée ✅", ...minRestMessages].join(" ");
  }

  return "Affectation enregistrée ✅";
}

function countByReason(items: MatchingPlanItem[]) {
  const out: Partial<Record<MatchingReason, number>> = Object.fromEntries(
    MATCHING_REASONS.map((reason) => [reason, 0])
  ) as Partial<Record<MatchingReason, number>>;

  for (const it of items) {
    out[it.reason] = (out[it.reason] ?? 0) + 1;
  }

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

function getDepotLabel(depot: DepotLite) {
  return depot.isActive ? depot.name : `${depot.name} (inactive)`;
}

export default function PlanningClient({
  availableDepots,
  availableUsers,
  currentUser,
  canViewGlobal,
  canEditPlanning,
  canAutoSchedule,
  canManageCompanyMode,
  canViewAudit,
  canExportPlanning,
}: PlanningClientProps) {
  const [weekStart, setWeekStart] = useState<Date>(() => startOfWeekMonday(new Date()));
  const [mode, setMode] = useState<ViewMode>("SIMPLE");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Shift[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(currentUser.id);

  const [companyRuleLoaded, setCompanyRuleLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  const [genLoading, setGenLoading] = useState(false);
  const [genMsg, setGenMsg] = useState<string | null>(null);
  const [assignmentMode, setAssignmentMode] = useState<AssignmentMode>("SHIFTS_ONLY");
  const [lastRunId, setLastRunId] = useState<string | null>(null);

  const [pubLoading, setPubLoading] = useState(false);
  const [pubMsg, setPubMsg] = useState<string | null>(null);

  const [pubWarnings, setPubWarnings] = useState<RestWarning[]>([]);
  const [pubConflict, setPubConflict] = useState<PublishConflict | null>(null);

  const [lastRunStatus, setLastRunStatus] = useState<string | null>(null);
  const [lastRunDraftCount, setLastRunDraftCount] = useState<number | null>(null);
  const [runAuditLogs, setRunAuditLogs] = useState<RunAuditLog[]>([]);
  const [runCanViewAudit, setRunCanViewAudit] = useState<boolean | null>(null);
  const [runCanViewRun, setRunCanViewRun] = useState<boolean | null>(null);
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
  const [runMatchQuality, setRunMatchQuality] = useState<PlanningQuality | null>(null);
  const [runMatchingVariant, setRunMatchingVariant] = useState<MatchingVariantDefinition | null>(null);
  const [selectedMatchingVariant, setSelectedMatchingVariant] = useState<MatchingVariantKey>("VARIANT_1");
  const [showLegacyPlanning, setShowLegacyPlanning] = useState(false);

  // ✅ verrou : le preview est lié à un runId précis
  const [matchPreviewRunId, setMatchPreviewRunId] = useState<string | null>(null);
  const [matchPreviewVariant, setMatchPreviewVariant] = useState<MatchingVariantKey | null>(null);

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

  const selectedUser = useMemo(
    () => availableUsers.find((candidate) => candidate.id === selectedUserId) ?? currentUser,
    [availableUsers, currentUser, selectedUserId]
  );

  const vehicleOptions = useMemo<VehicleLite[]>(
    () => (vehiclesAll.length > 0 ? vehiclesAll : vehicleOptionsFromItems),
    [vehiclesAll, vehicleOptionsFromItems]
  );

  const depotOptions = useMemo<DepotLite[]>(() => {
    const map = new Map<string, DepotLite>();
    for (const depot of availableDepots) map.set(depot.id, depot);
    for (const s of items) {
      if (s.depot?.id) map.set(s.depot.id, { id: s.depot.id, name: s.depot.name, isActive: s.depot.isActive });
    }
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name, "fr"));
  }, [availableDepots, items]);

  const loadShiftsForWeek = useCallback(async (weekStartISO: string, targetUserId: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ weekStart: weekStartISO, userId: targetUserId });
      const { res, json } = await fetchJson(`/api/planning/shifts?${params.toString()}`);
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

      const accessRaw = run && "access" in run ? run.access : null;
      const access = isRecord(accessRaw) ? accessRaw : null;
      const canViewRun = access && typeof access.canViewRun === "boolean" ? access.canViewRun : null;
      const canViewAudit = access && typeof access.canViewAudit === "boolean" ? access.canViewAudit : null;

      const draftShifts = run && "draftShifts" in run ? run.draftShifts : null;
      const countFromArray = Array.isArray(draftShifts) ? draftShifts.length : null;

      const _count = run && "_count" in run ? run._count : null;
      const countObj = isRecord(_count) ? _count : null;
      const draftCount = countObj && typeof countObj.draftShifts === "number" ? countObj.draftShifts : null;

      const count = canViewRun === false ? null : draftCount ?? countFromArray ?? 0;

      const auditLogsRaw = run && "auditLogs" in run ? run.auditLogs : null;
      const auditLogs = safeArray<unknown>(auditLogsRaw)
        .map((x): RunAuditLog | null => {
          if (!isRecord(x)) return null;

          const id = getString(x.id);
          const createdAt = getString(x.createdAt);
          const action = getString(x.action);
          const entityType = getString(x.entityType);
          const entityId = getString(x.entityId);
          const summary = getString(x.summary);

          if (!id || !createdAt || !action || !entityType || !entityId || !summary) return null;

          const actor = isRecord(x.actorUser)
            ? {
                id: getString(x.actorUser.id),
                name: getString(x.actorUser.name),
                email: getString(x.actorUser.email),
              }
            : null;

          return {
            id,
            createdAt,
            action,
            entityType,
            entityId,
            summary,
            payload: "payload" in x ? x.payload : undefined,
            actorUser: actor && actor.id ? actor : null,
          };
        })
        .filter((x): x is RunAuditLog => Boolean(x));

      const matchingRaw = run && "matching" in run ? run.matching : null;
      const matching = isRecord(matchingRaw) ? matchingRaw : null;
      const matchingQualityRaw = matching && "quality" in matching ? matching.quality : null;
      const matchingVariantRaw = matching && "variant" in matching ? matching.variant : null;

      setLastRunStatus(typeof status === "string" ? status : null);
      setLastRunDraftCount(count);
      setRunAuditLogs(auditLogs);
      setRunCanViewRun(canViewRun);
      setRunCanViewAudit(canViewAudit);
      setRunMatchQuality(isPlanningQuality(matchingQualityRaw) ? matchingQualityRaw : null);
      setRunMatchingVariant(isMatchingVariantDefinition(matchingVariantRaw) ? matchingVariantRaw : null);
    } catch {
      setLastRunStatus(null);
      setLastRunDraftCount(null);
      setRunAuditLogs([]);
      setRunCanViewRun(null);
      setRunCanViewAudit(null);
      setRunMatchQuality(null);
      setRunMatchingVariant(null);
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
        const arr = Array.isArray(data)
          ? data
          : isRecord(data) && Array.isArray(data.items)
            ? data.items
            : [];

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
        setUsersAll(availableUsers);
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
  }, [availableUsers]);

  useEffect(() => {
    if (!canEditPlanning) return;
    if (listsLoaded) return;
    void loadCompanyLists();
  }, [canEditPlanning, listsLoaded, loadCompanyLists]);

  useEffect(() => {
    let cancelled = false;

    async function loadRule() {
      try {
        const { res, json } = await fetchJson(`/api/company/rules?keys=${COMPANY_PARAMETER_KEYS.PLANNING_VIEW_MODE}`);
        if (!res.ok || !jsonOkPayload(json)) {
          if (!cancelled) setCompanyRuleLoaded(true);
          return;
        }

        const data = isRecord(json) ? json.data : null;
        const rulesArr = Array.isArray(data) ? data : [];

        const rule = rulesArr.find((r) => isRecord(r) && r.key === COMPANY_PARAMETER_KEYS.PLANNING_VIEW_MODE);
        const value = isRecord(rule) ? parsePlanningViewModeValue(getString(rule.value)) : null;

        if (!cancelled) {
          if (value) setMode(value);
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
      await loadShiftsForWeek(weekStartStr, selectedUserId);
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [weekStartStr, selectedUserId, loadShiftsForWeek]);

  const title = useMemo(() => {
    const end = addDays(weekStart, 6);
    return `Semaine du ${weekStartStr} au ${formatDate(end)}`;
  }, [weekStart, weekStartStr]);

  const saveCompanyMode = useCallback(async () => {
    setSaving(true);
    setSaveMsg(null);

    try {
      const value = serializePlanningViewModeValue(mode);
      const { res, json, text } = await fetchJson("/api/company/rules", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: COMPANY_PARAMETER_KEYS.PLANNING_VIEW_MODE, value }),
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
    setMatchPreviewVariant(null);
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
        body: JSON.stringify({ weekStart: weekStartStr, assignmentMode }),
      });

      const existingRunId = getDraftAlreadyExistsRunId(json);
      if ((!res.ok || !jsonOkPayload(json)) && existingRunId) {
        setLastRunId(existingRunId);
        setGenMsg(`Un brouillon existe déjà pour cette semaine ↩️ (runId: ${existingRunId}).`);
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
        setGenMsg(`Brouillon semaine généré en mode ${formatAssignmentModeLabel(assignmentMode)} ✅ (runId: ${runId})`);
        await loadRunInfo(runId);
      } else {
        setGenMsg(`Brouillon semaine généré en mode ${formatAssignmentModeLabel(assignmentMode)} ✅`);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setGenMsg(`Erreur génération semaine : ${msg}`);
    } finally {
      setGenLoading(false);
    }
  }, [weekStartStr, assignmentMode, loadRunInfo, clearMatchUi]);

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
          body: JSON.stringify({ day: dayStr, assignmentMode }),
        });

        const existingRunId = getDraftAlreadyExistsRunId(json);
        if ((!res.ok || !jsonOkPayload(json)) && existingRunId) {
          setLastRunId(existingRunId);
          setDayGenMsg(`Un brouillon existe déjà pour le ${dayStr} ↩️ (runId: ${existingRunId}).`);
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
          setDayGenMsg(`Jour généré en mode ${formatAssignmentModeLabel(assignmentMode)} ✅ (${dayStr}, runId: ${runId})`);
          await loadRunInfo(runId);
        } else {
          setDayGenMsg(`Jour généré en mode ${formatAssignmentModeLabel(assignmentMode)} ✅ (${dayStr})`);
        }
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        setDayGenMsg(`Erreur génération jour : ${msg}`);
      } finally {
        setDayGenLoadingKey(null);
      }
    },
    [assignmentMode, loadRunInfo, clearMatchUi]
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
        setMatchMsg(`Impossible : le run courant est ${formatRunStatusLabel(lastRunStatus)}.`);
        setMatchPreviewRunId(null);
        setMatchPreview(null);
        setMatchQuality(null);
        return;
      }

      if (typeof lastRunDraftCount === "number" && lastRunDraftCount <= 0) {
        setMatchMsg("Impossible : aucun brouillon de shift n’est présent sur ce run.");
        setMatchPreviewRunId(null);
        setMatchPreview(null);
        setMatchQuality(null);
        return;
      }

      // ✅ appel direct API (standard { ok, data })
      const { res, json, text } = await fetchJson(`/api/planning/autoschedule/runs/${lastRunId}/match/preview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // on veut voir aussi ALREADY_ASSIGNED dans le tableau/compteurs
        body: JSON.stringify({ includeAlreadyAssigned: true, variant: selectedMatchingVariant }),
      });

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
      setMatchPreviewVariant(selectedMatchingVariant);
      setMatchQuality(isPlanningQuality(qualityRaw) ? qualityRaw : null);

      const c = countByReason(parsed);
      const q = isPlanningQuality(qualityRaw) ? qualityRaw : null;

      const variantLabel = MATCHING_VARIANTS.find((item) => item.key === selectedMatchingVariant)?.label ?? selectedMatchingVariant;
      setMatchMsg(
        q
          ? `Simulation OK ✅ — ${variantLabel} — Score ${q.overall}/100 (employés ${q.coverage.score}/100, véhicules ${q.vehicleCoverage.score}/100, stabilité ${q.stability.score}/100, équité ${q.equity.score}/100).`
          : `Simulation OK ✅ — ${variantLabel} — ${getReasonCount(c, "MATCHED")} affectation(s) proposées, ${getReasonCount(c, "ALREADY_ASSIGNED")} déjà en place, ${getReasonCount(c, "NO_USER_WITH_REQUIRED_ROLE") + getReasonCount(c, "NO_VEHICLE_WITH_REQUIRED_TYPE")} manque(s) de ressources.`
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setMatchMsg(`Erreur simulation auto-affectation : ${msg}`);
      setMatchPreview(null);
      setMatchQuality(null);
      setMatchPreviewRunId(null);
    } finally {
      setMatchPreviewLoading(false);
    }
  }, [lastRunId, loadRunInfo, lastRunStatus, lastRunDraftCount, selectedMatchingVariant]);

  const applyMatch = useCallback(async () => {
    if (!lastRunId) return;

    // ✅ guard : preview obligatoire et doit correspondre au run courant
    if (matchPreview === null || matchPreviewRunId !== lastRunId || matchPreviewVariant !== selectedMatchingVariant) {
      setMatchMsg("⛔ Lance d’abord une simulation sur le run courant avec la variante sélectionnée avant d’appliquer l’auto-affectation.");
      return;
    }

    await loadRunInfo(lastRunId);

    if (lastRunStatus && lastRunStatus !== "DRAFT") {
      setMatchMsg(`Impossible : le run courant est ${formatRunStatusLabel(lastRunStatus)}.`);
      return;
    }

    if (typeof lastRunDraftCount === "number" && lastRunDraftCount <= 0) {
      setMatchMsg("Impossible : aucun brouillon de shift n’est présent sur ce run.");
      return;
    }

    const confirmed = window.confirm(
      "Appliquer l’auto-affectation ?\n\nCela va modifier les brouillons du run en affectant les employés et véhicules proposés par la simulation."
    );
    if (!confirmed) return;

    setMatchApplyLoading(true);
    setMatchPreviewLoading(false);
    setMatchMsg(null);
    setPubMsg(null);

    try {
      // ✅ apply exige { confirm:true }
      const { res, json, text } = await fetchJson(`/api/planning/autoschedule/runs/${lastRunId}/match/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirm: true, variant: matchPreviewVariant ?? selectedMatchingVariant }),
      });

      if (!res.ok || !jsonOkPayload(json)) {
        const err = jsonErrPayload(json) ? getString(json.error) : `HTTP_${res.status}`;

        if (err === "MATCH_STALE_STATE") {
          setMatchApplied(null);
          setMatchMsg("⛔ Le brouillon a changé depuis la simulation. Relance la simulation puis réapplique.");
          return;
        }

        if (err === "RUN_NOT_DRAFT") {
          setMatchApplied(null);
          setMatchMsg("⛔ Impossible : le run n’est plus en brouillon.");
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
      setMatchPreviewVariant(matchPreviewVariant ?? selectedMatchingVariant);

      const { applied: appliedCount, notApplied } = countApplied(applied);
      setMatchMsg(`Application OK ✅ — ${appliedCount} affectation(s) appliquée(s), ${notApplied} non appliquée(s).`);

      await loadShiftsForWeek(weekStartStr, selectedUserId);
      await loadRunInfo(lastRunId);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setMatchMsg(`Erreur application auto-affectation : ${msg}`);
      setMatchApplied(null);
    } finally {
      setMatchApplyLoading(false);
    }
  }, [
    lastRunId,
    matchPreview,
    matchPreviewRunId,
    matchPreviewVariant,
    loadRunInfo,
    lastRunStatus,
    lastRunDraftCount,
    loadShiftsForWeek,
    selectedUserId,
    weekStartStr,
    selectedMatchingVariant,
  ]);

  const publishLastRun = useCallback(async () => {
    if (!lastRunId) return;

    setPubWarnings([]);
    setPubConflict(null);

    await loadRunInfo(lastRunId);

    if (lastRunStatus && lastRunStatus !== "DRAFT") {
      setPubMsg(`Impossible de publier : le run courant est ${formatRunStatusLabel(lastRunStatus)}.`);
      return;
    }

    if (typeof lastRunDraftCount === "number" && lastRunDraftCount <= 0) {
      setPubMsg("Impossible de publier : aucun brouillon de shift n’est présent sur ce run.");
      return;
    }

    const confirmed = window.confirm(
      "Publier ce brouillon ?\n\nCela va copier les brouillons vers les shifts publiés et passer le run à l’état publié."
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

        if (err === "VEHICLE_UNAVAILABLE" && isRecord(json) && isRecord(json.details)) {
          const d = json.details as JsonRecord;
          setPubMsg(`Publication bloquée ⛔ (véhicule indisponible : ${getString(d.vehicleId)} / ${getString(d.vehicleStatus)}).`);
          return;
        }

        if (err === "TEMPLATE_VEHICLE_TYPE_MISMATCH" && isRecord(json) && isRecord(json.details)) {
          const d = json.details as JsonRecord;
          setPubMsg(`Publication bloquée ⛔ (type véhicule incompatible : ${getString(d.vehicleType)} au lieu de ${getString(d.requiredVehicleType)}).`);
          return;
        }

        if (err === "ROLE_VEHICLE_RESTRICTION" && isRecord(json) && isRecord(json.details)) {
          const d = json.details as JsonRecord;
          const assignedRoles = Array.isArray(d.assignedRoles) ? d.assignedRoles.map(getString).join(", ") : "non définis";
          const allowedRoles = Array.isArray(d.allowedRoles) ? d.allowedRoles.map(getString).join(", ") : "non définis";
          setPubMsg(`Publication bloquée ⛔ (rôles ${assignedRoles} non autorisés sur ce véhicule ; autorisés : ${allowedRoles}).`);
          return;
        }

        throw new Error(`${err}${text ? ` - ${text}` : ""}`);
      }

      const data = isRecord(json) ? json.data : null;
      const warnings = isRecord(data) ? safeArray<RestWarning>(data.warnings) : [];
      setPubWarnings(warnings);

      if (warnings.length > 0) setPubMsg(`Brouillon publié ✅ avec ${warnings.length} avertissement(s) métier.`);
      else setPubMsg("Brouillon publié ✅");

      await loadShiftsForWeek(weekStartStr, selectedUserId);
      await loadRunInfo(lastRunId);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setPubMsg(`Erreur publication : ${msg}`);
    } finally {
      setPubLoading(false);
    }
  }, [lastRunId, lastRunStatus, lastRunDraftCount, loadRunInfo, loadShiftsForWeek, selectedUserId, weekStartStr]);

  const cancelLastRun = useCallback(async () => {
    if (!lastRunId) return;

    setPubWarnings([]);
    setPubConflict(null);

    await loadRunInfo(lastRunId);
    if (lastRunStatus && lastRunStatus !== "DRAFT") {
      setCancelMsg(`Impossible d’annuler : le run courant est ${formatRunStatusLabel(lastRunStatus)}.`);
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

      setCancelMsg("Brouillon autoschedule annulé ✅");
      await loadRunInfo(lastRunId);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setCancelMsg(`Erreur annulation : ${msg}`);
    } finally {
      setCancelLoading(false);
    }
  }, [lastRunId, lastRunStatus, loadRunInfo]);

  const assignOnDraftShift = useCallback(
    async (
      shiftId: string,
      patch: { userId?: string | null; user2Id?: string | null; vehicleId?: string | null; depotId?: string | null }
    ) => {
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

          if (err === "RULE_BLOCKED") {
            const details = jsonErrPayload(json) && isRecord(json.details) ? json.details : null;
            const requiredHours = details ? details.requiredHours : null;
            const suffix = isNumber(requiredHours) ? ` (${requiredHours}h requises)` : "";
            setAssignMsgById((m) => ({
              ...m,
              [shiftId]: `⛔ Affectation bloquée : repos minimum non respecté${suffix}.`,
            }));
            return;
          }

          if (err === "RULE_CONFIG_ERROR") {
            const details = jsonErrPayload(json) && isRecord(json.details) ? json.details : null;
            const message = details ? getOptionalString(details.message) : undefined;
            setAssignMsgById((m) => ({
              ...m,
              [shiftId]: `⛔ Configuration invalide de la règle repos minimum${message ? ` : ${message}` : ""}`,
            }));
            return;
          }

          if (err === "USER_CONFLICT" || err === "USER_OVERLAP_CONFLICT") {
            setAssignMsgById((m) => ({
              ...m,
              [shiftId]: "⛔ Conflit employé : déjà affecté sur un autre shift (chevauchement).",
            }));
            return;
          }

          if (err === "VEHICLE_CONFLICT" || err === "VEHICLE_OVERLAP_CONFLICT") {
            setAssignMsgById((m) => ({
              ...m,
              [shiftId]: "⛔ Conflit véhicule : déjà affecté sur un autre shift (chevauchement).",
            }));
            return;
          }

          if (err === "TEMPLATE_ROLE_MISMATCH") {
            setAssignMsgById((m) => ({
              ...m,
              [shiftId]: "⛔ Composition invalide : le rôle sélectionné ne respecte pas le template.",
            }));
            return;
          }

          if (err === "TEMPLATE_VEHICLE_TYPE_MISMATCH") {
            setAssignMsgById((m) => ({
              ...m,
              [shiftId]: "⛔ Véhicule invalide : le type choisi ne correspond pas au template.",
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

        const data = isRecord(json) && isRecord(json.data) ? json.data : null;
        const issues = safeArray<ManualAssignIssue>(data?.issues).filter(
          (issue): issue is ManualAssignIssue => isRecord(issue) && typeof issue.code === "string" && typeof issue.message === "string"
        );

        setAssignMsgById((m) => ({
          ...m,
          [shiftId]: formatManualAssignIssues(issues) ?? "Affectation enregistrée ✅",
        }));

        await loadShiftsForWeek(weekStartStr, selectedUserId);
        if (lastRunId) await loadRunInfo(lastRunId);
      } finally {
        setAssignLoadingId(null);
      }
    },
    [lastRunId, loadRunInfo, loadShiftsForWeek, selectedUserId, weekStartStr]
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

  const applyBlocked =
    matchPreview === null ||
    matchPreviewRunId !== lastRunId ||
    matchPreviewVariant !== selectedMatchingVariant;

  const matchShiftScoresById = useMemo(() => {
    return new Map((matchQuality?.shiftScores ?? []).map((item) => [item.shiftId, item]));
  }, [matchQuality]);

  return (
    <section style={{ display: "grid", gap: 12 }}>
      <ManualPlanningPanel
        availableDepots={availableDepots}
        availableUsers={availableUsers}
        currentUser={currentUser}
        canViewGlobal={canViewGlobal}
        canEditPlanning={canEditPlanning}
        canViewAudit={canViewAudit}
        canExportPlanning={canExportPlanning}
      />

      <section style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: 12, display: "grid", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontWeight: 800 }}>Zone legacy / autoschedule</div>
            <div style={{ opacity: 0.75, fontSize: 13 }}>
              Hors surface principale A8. Le planning manuel exploitable est affiché ci-dessus.
            </div>
          </div>
          <button onClick={() => setShowLegacyPlanning((value) => !value)}>
            {showLegacyPlanning ? "Masquer" : "Afficher"}
          </button>
        </div>
      </section>

      {showLegacyPlanning && (
        <>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={() => setWeekStart(addDays(weekStart, -7))}>← Semaine -1</button>
        <button onClick={() => setWeekStart(startOfWeekMonday(new Date()))}>Aujourd’hui</button>
        <button onClick={() => setWeekStart(addDays(weekStart, 7))}>Semaine +1 →</button>

        <div style={{ marginLeft: 8, fontWeight: 700 }}>{title}</div>

        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ opacity: 0.8 }}>Planning affiché :</span>
          {canViewGlobal ? (
            <select
              value={selectedUserId}
              onChange={(e) => {
                setSelectedUserId(e.target.value);
                setLastRunId(null);
                setLastRunStatus(null);
                setLastRunDraftCount(null);
                setRunAuditLogs([]);
                setPubWarnings([]);
                setPubConflict(null);
                setGenMsg(null);
                setDayGenMsg(null);
                setPubMsg(null);
                setCancelMsg(null);
                clearMatchUi();
              }}
            >
              {availableUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.id === currentUser.id ? `Moi — ${user.name}` : user.name}
                </option>
              ))}
            </select>
          ) : (
            <strong>{currentUser.name}</strong>
          )}
          <span style={{ fontSize: 12, opacity: 0.7 }}>
            {selectedUser.id === currentUser.id ? "Vue personnelle" : `Collègue sélectionné : ${selectedUser.name}`}
          </span>
        </div>

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

          {canManageCompanyMode && (
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
          )}

          {canAutoSchedule && (
            <>
              <label style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 12, opacity: 0.92 }}>
                <span>Matching :</span>
                <select
                  value={selectedMatchingVariant}
                  onChange={(e) => setSelectedMatchingVariant(e.target.value as MatchingVariantKey)}
                >
                  {MATCHING_VARIANTS.map((variant) => (
                    <option key={variant.key} value={variant.key}>
                      {variant.label}
                    </option>
                  ))}
                </select>
              </label>

              <button
                onClick={previewMatch}
                disabled={matchDisabled}
                style={{
                  border: "1px solid rgba(255,255,255,0.25)",
                  padding: "6px 10px",
                  borderRadius: 8,
                  opacity: matchDisabled ? 0.6 : 1,
                }}
                title="Simule l’auto-affectation employés + véhicules sans écrire en base sur le dernier brouillon"
              >
                {matchPreviewLoading ? "Simulation…" : "Simuler l’auto-affectation"}
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
                title={applyBlocked ? "Simulation requise sur le run courant avec la variante sélectionnée" : "Applique l’auto-affectation sur le dernier brouillon"}
              >
                {matchApplyLoading ? "Application…" : "Appliquer l’auto-affectation"}
              </button>
            </>
          )}

          {canEditPlanning && listsError && <span style={{ fontSize: 12, opacity: 0.8 }}>Listes : erreur ({listsError})</span>}

          {canAutoSchedule && (
            <label style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 12, opacity: 0.9 }}>
              <span>Mode autoschedule :</span>
              <select value={assignmentMode} onChange={(e) => setAssignmentMode(e.target.value as AssignmentMode)}>
                <option value="SHIFTS_ONLY">Générer les shifts seuls</option>
                <option value="AUTO_ASSIGN">Générer + auto-affecter employés et véhicules</option>
              </select>
            </label>
          )}

          {canAutoSchedule && (
            <>
              <button
                onClick={generateWeek}
                disabled={genLoading}
                style={{
                  border: "1px solid rgba(255,255,255,0.25)",
                  padding: "6px 10px",
                  borderRadius: 8,
                  opacity: genLoading ? 0.7 : 1,
                }}
                title="Génère un brouillon pour la semaine affichée selon le mode choisi"
              >
                {genLoading ? "Génération…" : "Générer la semaine"}
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
                title="Publie le dernier brouillon autoschedule"
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
                title="Annule le dernier brouillon autoschedule"
              >
                {cancelLoading ? "Annulation…" : "Annuler le brouillon"}
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: 10, opacity: 0.92 }}>
        {canViewGlobal
          ? "Consultation centrée utilisateur : sélectionnez un collègue autorisé pour afficher uniquement son planning."
          : "Consultation limitée à votre planning personnel selon vos permissions."}
      </div>

      {saveMsg && <div style={{ opacity: 0.9 }}>{saveMsg}</div>}
      {genMsg && <div style={{ opacity: 0.9 }}>{genMsg}</div>}
      {dayGenMsg && <div style={{ opacity: 0.9 }}>{dayGenMsg}</div>}
      {matchMsg && <div style={{ opacity: 0.9 }}>{matchMsg}</div>}

      {lastRunId && (
        <div style={{ border: "1px solid rgba(255,255,255,0.18)", borderRadius: 10, padding: 10, marginTop: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
            <div style={{ fontWeight: 900 }}>Historique du run courant</div>
            <div style={{ fontSize: 12, opacity: 0.75 }}>
              {runInfoLoading
                ? "Chargement…"
                : runCanViewAudit === false
                  ? "Audit non autorisé"
                  : `${runAuditLogs.length} entrée(s)`}
            </div>
          </div>

          {runInfoLoading ? (
            <div style={{ marginTop: 8, opacity: 0.75 }}>Chargement de l’audit…</div>
          ) : runCanViewAudit === false ? (
            <div style={{ marginTop: 8, opacity: 0.75 }}>Accès audit non autorisé sur ce run.</div>
          ) : runAuditLogs.length === 0 ? (
            <div style={{ marginTop: 8, opacity: 0.75 }}>Aucun log d’audit sur ce run.</div>
          ) : (
            <div style={{ marginTop: 8, display: "grid", gap: 8, maxHeight: 220, overflow: "auto" }}>
              {runAuditLogs.map((log) => (
                <div key={log.id} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
                    <div style={{ fontWeight: 800 }}>{log.action}</div>
                    <div style={{ fontSize: 12, opacity: 0.75 }}>{dateTimeFR(log.createdAt)}</div>
                  </div>

                  <div style={{ marginTop: 4, opacity: 0.92 }}>{log.summary}</div>

                  <div style={{ marginTop: 4, fontSize: 12, opacity: 0.75 }}>
                    {(log.actorUser?.name || log.actorUser?.email || "Auteur inconnu") + " • " + log.entityType}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75 }}>
            {runCanViewRun === false
              ? "Mode audit seul : détail complet du run masqué."
              : "Affichage limité à 20 lignes."}
          </div>
        </div>
      )}

      {runMatchQuality && (
        <div style={{ border: "1px solid rgba(255,255,255,0.18)", borderRadius: 10, padding: 10, marginTop: 8 }}>
          <div style={{ fontWeight: 900 }}>
            Score matching du run : {runMatchQuality.overall}/100
            {runMatchingVariant ? ` (${runMatchingVariant.label})` : ""}
          </div>
          <div style={{ fontSize: 12, opacity: 0.9, marginTop: 6 }}>
            Couverture employés {runMatchQuality.coverage.score}/100 — Couverture véhicules {runMatchQuality.vehicleCoverage.score}/100 — Stabilité {runMatchQuality.stability.score}/100 — Équité {runMatchQuality.equity.score}/100
          </div>
          {runMatchingVariant && (
            <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75 }}>{runMatchingVariant.description}</div>
          )}
          {(runMatchQuality.shiftScores ?? []).length > 0 && (
            <div style={{ marginTop: 8, display: "grid", gap: 6, maxHeight: 160, overflow: "auto" }}>
              {(runMatchQuality.shiftScores ?? []).slice(0, 20).map((shiftScore) => (
                <div key={shiftScore.shiftId} style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 12 }}>
                  <span style={{ opacity: 0.9 }}>{shiftScore.shiftId}</span>
                  <span style={{ opacity: 0.9 }}>{shiftScore.overall}/100</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {matchQuality && (
        <div style={{ border: "1px solid rgba(255,255,255,0.18)", borderRadius: 10, padding: 10, marginTop: 8 }}>
          <div style={{ fontWeight: 900 }}>Score qualité planning : {matchQuality.overall}/100{matchPreviewVariant ? ` (${MATCHING_VARIANTS.find((item) => item.key === matchPreviewVariant)?.label ?? matchPreviewVariant})` : ""}</div>
          <div style={{ fontSize: 12, opacity: 0.9, marginTop: 6 }}>
            Couverture employés {matchQuality.coverage.score}/100 — Couverture véhicules {matchQuality.vehicleCoverage.score}/100 — Stabilité {matchQuality.stability.score}/100 — Équité {matchQuality.equity.score}/100
          </div>
          {matchPreviewVariant && (
            <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75 }}>
              {MATCHING_VARIANTS.find((item) => item.key === matchPreviewVariant)?.description ?? ""}
            </div>
          )}
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
            <div style={{ fontWeight: 900 }}>Auto-affectation autoschedule</div>
            <button
              onClick={() => {
                setMatchMsg(null);
                setMatchPreview(null);
                setMatchApplied(null);
                setMatchQuality(null);
                setMatchPreviewRunId(null);
                setMatchPreviewVariant(null);
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
              Simulation — proposés {getReasonCount(previewSummary, "MATCHED")}, déjà affectés {getReasonCount(previewSummary, "ALREADY_ASSIGNED")}, indisponibilités employés {getReasonCount(previewSummary, "USER_UNAVAILABLE")}, repos minimum {getReasonCount(previewSummary, "MIN_REST_CONFLICT")}, indisponibilités véhicules {getReasonCount(previewSummary, "VEHICLE_UNAVAILABLE")}, rôles incompatibles véhicule {getReasonCount(previewSummary, "ROLE_VEHICLE_RESTRICTION")}
            </div>
          )}

          {appliedSummary && (
            <div style={{ marginTop: 6, fontSize: 12, opacity: 0.9 }}>
              Application — {appliedSummary.applied} affectation(s) appliquée(s), {appliedSummary.notApplied} non appliquée(s)
            </div>
          )}

          <div style={{ marginTop: 8, maxHeight: 220, overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ textAlign: "left", opacity: 0.85 }}>
                  <th style={{ padding: "6px 6px" }}>Cible</th>
                  <th style={{ padding: "6px 6px" }}>Shift</th>
                  <th style={{ padding: "6px 6px" }}>Début</th>
                  <th style={{ padding: "6px 6px" }}>Fin</th>
                  <th style={{ padding: "6px 6px" }}>Besoin</th>
                  <th style={{ padding: "6px 6px" }}>Proposition</th>
                  <th style={{ padding: "6px 6px" }}>Score shift</th>
                  <th style={{ padding: "6px 6px" }}>Signalement</th>
                  <th style={{ padding: "6px 6px" }}>Appliqué</th>
                </tr>
              </thead>
              <tbody>
                {(matchApplied ?? matchPreview ?? []).slice(0, 200).map((it, index) => {
                  const needLabel = it.target === "VEHICLE" ? (it.requiredVehicleType ?? "—") : (it.requiredRole ?? "—");
                  const proposalLabel = it.target === "VEHICLE" ? (it.proposedVehicleId ?? it.currentVehicleId ?? "—") : (it.proposedUserId ?? it.currentUserId ?? "—");
                  const shiftScore = matchShiftScoresById.get(it.shiftId);

                  return (
                    <tr key={`${it.shiftId}-${it.target}-${index}`} style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                      <td style={{ padding: "6px 6px", opacity: 0.9 }}>{formatMatchingTargetLabel(it.target)}</td>
                      <td style={{ padding: "6px 6px", opacity: 0.9 }}>{it.shiftId}</td>
                      <td style={{ padding: "6px 6px", opacity: 0.9 }}>{timeHM(it.startAt)}</td>
                      <td style={{ padding: "6px 6px", opacity: 0.9 }}>{timeHM(it.endAt)}</td>
                      <td style={{ padding: "6px 6px", opacity: 0.9 }}>{needLabel}</td>
                      <td style={{ padding: "6px 6px", opacity: 0.9 }}>{proposalLabel}</td>
                      <td style={{ padding: "6px 6px", opacity: 0.9 }}>{shiftScore ? `${shiftScore.overall}/100` : "—"}</td>
                      <td style={{ padding: "6px 6px", opacity: 0.9 }}>{it.message || formatMatchingReasonLabel(it.reason)}</td>
                      <td style={{ padding: "6px 6px", opacity: 0.9 }}>
                        {isMatchingApplyItem(it) ? (it.applied ? "✅" : "—") : "—"}
                      </td>
                    </tr>
                  );
                })}
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

                  {canAutoSchedule && (
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
                      title="Génère un brouillon pour ce jour selon le mode choisi"
                    >
                      {isDayGenerating ? "Génération…" : "Générer le jour"}
                    </button>
                  )}
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
                          editable={canEditPlanning}
                          users={userOptions}
                          vehicles={vehicleOptions}
                          depots={depotOptions}
                          loading={assignLoadingId === s.id}
                          msg={assignMsgById[s.id] ?? null}
                          onAssign={assignOnDraftShift}
                        />
                      ) : (
                        <ShiftCardAmbulance
                          key={s.id}
                          s={s}
                          editable={canEditPlanning}
                          users={userOptions}
                          vehicles={vehicleOptions}
                          depots={depotOptions}
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
        </>
      )}
    </section>
  );
}

function ShiftCardSimple({
  s,
  editable,
  users,
  vehicles,
  depots,
  loading,
  msg,
  onAssign,
}: {
  s: Shift;
  editable: boolean;
  users: UserLite[];
  vehicles: VehicleLite[];
  depots: DepotLite[];
  loading: boolean;
  msg: string | null;
  onAssign: (id: string, patch: { userId?: string | null; user2Id?: string | null; vehicleId?: string | null; depotId?: string | null }) => Promise<void>;
}) {
  const cat = String(s.template?.category ?? "").toUpperCase();
  const two = requiresTwoEmployees(cat, s.template?.minStaffCount);

  const usersSummary = two ? `${s.user?.name ?? "—"} / ${s.user2?.name ?? "—"}` : `${s.user?.name ?? "—"}`;

  const accentColor = normalizeTemplateColor(s.template?.color) ?? "#1D4ED8";

  return (
    <div style={{ border: `1px solid ${accentColor}`, borderLeft: `10px solid ${accentColor}`, borderRadius: 10, padding: 10, display: "grid", gap: 8 }}>
      <div style={{ fontWeight: 800 }}>
        {timeHM(s.startAt)} → {timeHM(s.endAt)}
      </div>

      <div style={{ opacity: 0.9 }}>
        {usersSummary} • {s.vehicle?.immatriculation ?? "—"} • {s.depot ? getDepotLabel(s.depot) : "Aucune base"}
      </div>

      <div style={{ opacity: 0.7 }}>
        {s.template?.name ?? "—"}
        {s.template?.requiredVehicleType ? ` • véhicule ${s.template.requiredVehicleType}` : ""}
      </div>

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

          <div style={{ display: "grid", gap: 4 }}>
            <label style={{ fontSize: 12, opacity: 0.75 }}>Base</label>
            <select
              value={s.depot?.id ?? ""}
              disabled={loading}
              onChange={(e) => {
                const v = e.target.value;
                onAssign(s.id, { depotId: v === "" ? null : v });
              }}
            >
              <option value="">— Aucune base —</option>
              {depots.map((depot) => (
                <option key={depot.id} value={depot.id}>
                  {getDepotLabel(depot)}
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
  depots,
  loading,
  msg,
  onAssign,
}: {
  s: Shift;
  editable: boolean;
  users: UserLite[];
  vehicles: VehicleLite[];
  depots: DepotLite[];
  loading: boolean;
  msg: string | null;
  onAssign: (id: string, patch: { userId?: string | null; user2Id?: string | null; vehicleId?: string | null; depotId?: string | null }) => Promise<void>;
}) {
  const cat = String(s.template?.category ?? "—").toUpperCase();
  const two = requiresTwoEmployees(cat, s.template?.minStaffCount);

  const accentColor = normalizeTemplateColor(s.template?.color) ?? "#1D4ED8";
  const borderStyle =
    cat === "GARDE"
      ? `2px dashed ${accentColor}`
      : cat === "AMBULANCE"
        ? `2px solid ${accentColor}`
        : `1px solid ${accentColor}`;

  return (
    <div style={{ border: borderStyle, borderLeft: `10px solid ${accentColor}`, borderRadius: 12, padding: 10, display: "grid", gap: 8 }}>
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
        <Row label="Type véhicule requis" value={s.template?.requiredVehicleType ?? "—"} />
        <Row label="Base" value={s.depot ? getDepotLabel(s.depot) : "Aucune"} />
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

          <div style={{ display: "grid", gap: 4 }}>
            <label style={{ fontSize: 12, opacity: 0.75 }}>Base</label>
            <select
              value={s.depot?.id ?? ""}
              disabled={loading}
              onChange={(e) => {
                const v = e.target.value;
                onAssign(s.id, { depotId: v === "" ? null : v });
              }}
            >
              <option value="">— Aucune base —</option>
              {depots.map((depot) => (
                <option key={depot.id} value={depot.id}>
                  {getDepotLabel(depot)}
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