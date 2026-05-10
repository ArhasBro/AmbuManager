"use client";

import { useCallback, useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { ActionButton, EmptyState, ErrorMessage, StatusBadge } from "@/app/ui";
import { resolveTemplateMinStaffCount } from "@/lib/templates/template-rules";

type UserLite = { id: string; name: string; email?: string };
type DepotLite = { id: string; name: string; isActive: boolean };
type TemplateLite = {
  id: string;
  name: string;
  category: string;
  color?: string | null;
  minStaffCount?: number | null;
  isTimeDefined?: boolean;
  startTime?: string | null;
  endTime?: string | null;
  crossesMidnight?: boolean;
};

type ShiftItem = {
  id: string;
  date: string;
  startAt: string;
  endAt: string;
  notes?: string | null;
  isCancelled?: boolean;
  cancelledAt?: string | null;
  cancellationReason?: string | null;
  user?: { id: string; name: string; email?: string | null } | null;
  user2?: { id: string; name: string; email?: string | null } | null;
  vehicle?: { id: string; immatriculation: string; type: string } | null;
  depot?: { id: string; name: string; isActive: boolean } | null;
  template?: { id: string; name: string; category: string; color?: string | null; minStaffCount?: number | null } | null;
};

type AuditItem = {
  id: string;
  createdAt: string;
  action: string;
  summary: string;
  actorUser?: { id: string; name: string; email?: string | null } | null;
};

type Props = {
  availableDepots: DepotLite[];
  availableUsers: UserLite[];
  currentUser: UserLite;
  canViewGlobal: boolean;
  canEditPlanning: boolean;
  canViewAudit: boolean;
  canExportPlanning: boolean;
};

type ViewMode = "day" | "week" | "month";

type FormState = {
  date: string;
  startTime: string;
  endTime: string;
  templateId: string;
  depotId: string;
  notes: string;
};

function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatMonth(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function startOfWeekMonday(date: Date) {
  const jsDay = date.getDay();
  const diff = (jsDay + 6) % 7;
  return addDays(date, -diff);
}

function parseJsonSafe(text: string) {
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

async function fetchJson(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  const text = await res.text();
  return { res, json: parseJsonSafe(text) };
}

function timeHM(iso: string) {
  return new Date(iso).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function dateLabel(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" });
}

function dateTimeLabel(iso: string) {
  return new Date(iso).toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function initialForm(date: Date): FormState {
  return {
    date: formatDate(date),
    startTime: "08:00",
    endTime: "12:00",
    templateId: "",
    depotId: "",
    notes: "",
  };
}

function getTemplateTimeLabel(template: TemplateLite): string {
  if (!template.isTimeDefined || !template.startTime || !template.endTime) {
    return "horaires libres";
  }
  const suffix = template.crossesMidnight ? " (traverse minuit)" : "";
  return `${template.startTime}-${template.endTime}${suffix}`;
}

function applyTemplateTimes(form: FormState, templateId: string, templates: TemplateLite[]): FormState {
  const selectedTemplate = templates.find((template) => template.id === templateId);
  if (!selectedTemplate || !selectedTemplate.isTimeDefined || !selectedTemplate.startTime || !selectedTemplate.endTime) {
    return { ...form, templateId };
  }

  return {
    ...form,
    templateId,
    startTime: selectedTemplate.startTime,
    endTime: selectedTemplate.endTime,
  };
}

function canShiftUseSecondUser(shift: ShiftItem): boolean {
  return resolveTemplateMinStaffCount(shift.template?.minStaffCount ?? null, shift.template?.category ?? null) === 2;
}

export default function ManualPlanningPanel({
  availableDepots,
  availableUsers,
  currentUser,
  canViewGlobal,
  canEditPlanning,
  canViewAudit,
  canExportPlanning,
}: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [cursorDate, setCursorDate] = useState<Date>(new Date());
  const [selectedUserId, setSelectedUserId] = useState<string>(currentUser.id);
  const [templates, setTemplates] = useState<TemplateLite[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [items, setItems] = useState<ShiftItem[]>([]);
  const [historyByShiftId, setHistoryByShiftId] = useState<Record<string, AuditItem[]>>({});
  const [createForm, setCreateForm] = useState<FormState>(() => initialForm(new Date()));
  const [editingShiftId, setEditingShiftId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormState>(() => initialForm(new Date()));
  const [assignLoadingId, setAssignLoadingId] = useState<string | null>(null);
  const [assignMessageByShiftId, setAssignMessageByShiftId] = useState<Record<string, string | null>>({});

  const scopeParams = useMemo(() => {
    const params = new URLSearchParams();
    if (viewMode === "day") {
      params.set("day", formatDate(cursorDate));
    } else if (viewMode === "week") {
      params.set("weekStart", formatDate(startOfWeekMonday(cursorDate)));
    } else {
      params.set("month", formatMonth(cursorDate));
    }
    if (canViewGlobal && selectedUserId) params.set("userId", selectedUserId);
    if (!canViewGlobal) params.set("userId", currentUser.id);
    if (canViewAudit) params.set("includeHistory", "1");
    params.set("limit", "500");
    return params.toString();
  }, [canViewAudit, canViewGlobal, currentUser.id, cursorDate, selectedUserId, viewMode]);

  const loadTemplates = useCallback(async () => {
    const { res, json } = await fetchJson("/api/templates?limit=500");
    if (!res.ok || !json || json.ok !== true || !Array.isArray(json.data)) {
      return;
    }
    const mapped = json.data
      .map((template: Record<string, unknown>) => {
        if (typeof template.id !== "string" || typeof template.name !== "string" || typeof template.category !== "string") return null;
        return {
          id: template.id,
          name: template.name,
          category: template.category,
          minStaffCount: typeof template.minStaffCount === "number" ? template.minStaffCount : null,
          isTimeDefined: template.isTimeDefined === true,
          startTime: typeof template.startTime === "string" ? template.startTime : null,
          endTime: typeof template.endTime === "string" ? template.endTime : null,
          crossesMidnight: template.crossesMidnight === true,
          color: typeof template.color === "string" ? template.color : null,
        };
      })
      .filter(Boolean) as TemplateLite[];
    setTemplates(mapped);
  }, []);

  const loadPlanning = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { res, json } = await fetchJson(`/api/planning/shifts?${scopeParams}`);
      if (!res.ok || !json || json.ok !== true) {
        throw new Error(typeof json?.error === "string" ? json.error : `HTTP_${res.status}`);
      }
      setItems(Array.isArray(json.data) ? (json.data as ShiftItem[]) : []);
      setHistoryByShiftId((json.historyByShiftId as Record<string, AuditItem[]>) ?? {});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }, [scopeParams]);

  useEffect(() => {
    void loadTemplates();
  }, [loadTemplates]);

  useEffect(() => {
    void loadPlanning();
  }, [loadPlanning]);

  useEffect(() => {
    setCreateForm(initialForm(cursorDate));
  }, [cursorDate]);

  const groupedByDay = useMemo(() => {
    const map = new Map<string, ShiftItem[]>();
    for (const item of items) {
      const key = item.startAt.slice(0, 10);
      const list = map.get(key) ?? [];
      list.push(item);
      map.set(key, list);
    }
    return map;
  }, [items]);

  const monthDays = useMemo(() => {
    if (viewMode !== "month") return [] as Date[];
    const first = new Date(cursorDate.getFullYear(), cursorDate.getMonth(), 1);
    const start = startOfWeekMonday(first);
    return Array.from({ length: 42 }, (_, i) => addDays(start, i));
  }, [cursorDate, viewMode]);

  const selectedCreateTemplate = useMemo(
    () => templates.find((template) => template.id === createForm.templateId) ?? null,
    [createForm.templateId, templates]
  );

  async function submitCreate() {
    if (!canEditPlanning) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const body = {
        ...createForm,
        depotId: createForm.depotId || null,
        notes: createForm.notes || null,
      };
      const { res, json } = await fetchJson("/api/planning/shifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok || !json || json.ok !== true) {
        throw new Error(typeof json?.error === "string" ? json.error : `HTTP_${res.status}`);
      }
      setMessage("Shift manuel publié créé.");
      await loadPlanning();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(shift: ShiftItem) {
    setEditingShiftId(shift.id);
    setEditForm({
      date: shift.startAt.slice(0, 10),
      startTime: timeHM(shift.startAt),
      endTime: timeHM(shift.endAt),
      templateId: shift.template?.id ?? "",
      depotId: shift.depot?.id ?? "",
      notes: shift.notes ?? "",
    });
  }

  async function submitEdit() {
    if (!editingShiftId || !canEditPlanning) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const body = {
        ...editForm,
        templateId: editForm.templateId || null,
        depotId: editForm.depotId || null,
        notes: editForm.notes || null,
      };
      const { res, json } = await fetchJson(`/api/planning/shifts/${editingShiftId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok || !json || json.ok !== true) {
        throw new Error(typeof json?.error === "string" ? json.error : `HTTP_${res.status}`);
      }
      setMessage("Shift publié mis à jour.");
      setEditingShiftId(null);
      await loadPlanning();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setSaving(false);
    }
  }

  async function cancelShift(shift: ShiftItem) {
    if (!canEditPlanning) return;
    const reason = window.prompt("Motif d'annulation logique", shift.cancellationReason ?? "Annulation manuelle") ?? "";
    if (!reason) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const { res, json } = await fetchJson(`/api/planning/shifts/${shift.id}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      if (!res.ok || !json || json.ok !== true) {
        throw new Error(typeof json?.error === "string" ? json.error : `HTTP_${res.status}`);
      }
      setMessage("Shift annulé logiquement.");
      await loadPlanning();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setSaving(false);
    }
  }

  async function assignUsersToShift(shiftId: string, patch: { userId?: string | null; user2Id?: string | null }) {
    if (!canEditPlanning) return;
    setAssignLoadingId(shiftId);
    setAssignMessageByShiftId((current) => ({ ...current, [shiftId]: null }));
    setError(null);
    setMessage(null);
    try {
      const { res, json } = await fetchJson(`/api/planning/shifts/${shiftId}/assign`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok || !json || json.ok !== true) {
        throw new Error(typeof json?.error === "string" ? json.error : `HTTP_${res.status}`);
      }
      setAssignMessageByShiftId((current) => ({ ...current, [shiftId]: "Affectation enregistree." }));
      await loadPlanning();
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : "Erreur inconnue";
      setAssignMessageByShiftId((current) => ({ ...current, [shiftId]: `Echec affectation: ${errMessage}` }));
      setError(errMessage);
    } finally {
      setAssignLoadingId(null);
    }
  }

  function handleCreateTemplateChange(nextTemplateId: string) {
    setCreateForm((current) => applyTemplateTimes(current, nextTemplateId, templates));
  }

  function handleEditTemplateChange(nextTemplateId: string) {
    setEditForm((current) => applyTemplateTimes(current, nextTemplateId, templates));
  }

  function move(offset: number) {
    if (viewMode === "day") setCursorDate((current) => addDays(current, offset));
    else if (viewMode === "week") setCursorDate((current) => addDays(current, offset * 7));
    else setCursorDate((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  }

  function triggerExport(format: "csv" | "xlsx" | "pdf") {
    const url = `/api/planning/exports?format=${format}&${scopeParams}`;
    window.location.href = url;
  }


  const userChoices = canViewGlobal ? [{ id: "", name: "Toute la société" }, ...availableUsers] : [currentUser];

  return (
    <section className="panel planning-manual" style={{ marginBottom: 18, display: "grid", gap: 14 }}>
      <div className="planning-manual__header">
        <div className="planning-manual__title">Planning manuel</div>
        <div className="planning-manual__description">Vue jour / semaine / mois, creation manuelle, modification publiee, annulation logique et historique minimal.</div>
        <div className="planning-manual__badges">
          <StatusBadge variant="info">{items.length} shifts</StatusBadge>
          <StatusBadge variant="neutral">Vue {viewMode}</StatusBadge>
        </div>
      </div>

      <div className="planning-manual__toolbar">
        <ActionButton size="sm" onClick={() => move(-1)}>{"<- Precedent"}</ActionButton>
        <ActionButton size="sm" onClick={() => setCursorDate(new Date())}>Aujourd&apos;hui</ActionButton>
        <ActionButton size="sm" onClick={() => move(1)}>{"Suivant ->"}</ActionButton>
        <select value={viewMode} onChange={(e) => setViewMode(e.target.value as ViewMode)}>
          <option value="day">Jour</option>
          <option value="week">Semaine</option>
          <option value="month">Mois</option>
        </select>
        <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
          {userChoices.map((user) => (
            <option key={user.id || "all"} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <StatusBadge variant="info">
          {viewMode === "month" ? cursorDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }) : dateLabel(cursorDate.toISOString())}
        </StatusBadge>
        {canExportPlanning ? (
          <>
            <ActionButton size="sm" onClick={() => triggerExport("pdf")}>Export PDF</ActionButton>
            <ActionButton size="sm" onClick={() => triggerExport("xlsx")}>Export XLSX</ActionButton>
            <ActionButton size="sm" onClick={() => triggerExport("csv")}>Export CSV</ActionButton>
          </>
        ) : null}
        <ActionButton size="sm" onClick={() => window.print()}>Imprimer</ActionButton>
      </div>

      {canEditPlanning && (
        <div
          id="planning-manual-editor-anchor"
          className="planning-manual__editor"
          style={{ border: "1px solid var(--ui-border)", borderRadius: 12, padding: 12, display: "grid", gap: 8 }}
        >
          <div className="planning-manual__editor-title">Ajouter un shift publie</div>
          <div className="planning-manual__editor-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8 }}>
            <input type="date" value={createForm.date} onChange={(e) => setCreateForm((v) => ({ ...v, date: e.target.value }))} />
            <input
              type="time"
              value={createForm.startTime}
              disabled={selectedCreateTemplate?.isTimeDefined === true}
              onChange={(e) => setCreateForm((v) => ({ ...v, startTime: e.target.value }))}
            />
            <input
              type="time"
              value={createForm.endTime}
              disabled={selectedCreateTemplate?.isTimeDefined === true}
              onChange={(e) => setCreateForm((v) => ({ ...v, endTime: e.target.value }))}
            />
            <select value={createForm.templateId} onChange={(e) => handleCreateTemplateChange(e.target.value)}>
              <option value="">Template</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>{template.name} — {template.category} — {getTemplateTimeLabel(template)}</option>
              ))}
            </select>
            <select value={createForm.depotId} onChange={(e) => setCreateForm((v) => ({ ...v, depotId: e.target.value }))}>
              <option value="">Aucun dépôt</option>
              {availableDepots.map((depot) => (
                <option key={depot.id} value={depot.id}>{depot.name}</option>
              ))}
            </select>
          {selectedCreateTemplate?.isTimeDefined ? (
            <div style={{ fontSize: 12, opacity: 0.8 }}>
              Horaires imposes par le template selectionne: {selectedCreateTemplate.startTime}-{selectedCreateTemplate.endTime}
              {selectedCreateTemplate.crossesMidnight ? " (traverse minuit)." : "."}
            </div>
          ) : null}
          </div>
          <textarea rows={2} placeholder="Notes" value={createForm.notes} onChange={(e) => setCreateForm((v) => ({ ...v, notes: e.target.value }))} />
          <div className="planning-manual__editor-actions"><ActionButton variant="primary" disabled={saving || !createForm.templateId} onClick={submitCreate}>Creer</ActionButton></div>
        </div>
      )}

      {message && <div className="planning-manual__feedback planning-manual__feedback--success">{message}</div>}
      {error && <ErrorMessage title="Erreur planning manuel" message={error} />}
      {loading && <div className="planning-manual__loading">Chargement du planning manuel...</div>}

      {!loading && viewMode !== "month" && (
        <div className="planning-manual__list">
          {items.length === 0 ? <EmptyState title="Aucun shift sur cette periode" message="Ajustez la vue ou creez un shift publie pour cette plage." /> : items.map((shift) => (
            <ShiftCard
              key={shift.id}
              shift={shift}
              canEditPlanning={canEditPlanning}
              history={historyByShiftId[shift.id] ?? []}
              canViewAudit={canViewAudit}
              templates={templates}
              users={availableUsers}
              depots={availableDepots}
              isEditing={editingShiftId === shift.id}
              editForm={editForm}
              setEditForm={setEditForm}
              assignLoading={assignLoadingId === shift.id}
              assignMessage={assignMessageByShiftId[shift.id] ?? null}
              onEdit={() => startEdit(shift)}
              onSaveEdit={submitEdit}
              onCancelEdit={() => setEditingShiftId(null)}
              onCancelShift={() => void cancelShift(shift)}
              onAssign={assignUsersToShift}
              onEditTemplateChange={handleEditTemplateChange}
            />
          ))}
        </div>
      )}

      {!loading && viewMode === "month" && (
        <div className="planning-manual__month-grid" style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(120px, 1fr))", gap: 8 }}>
          {monthDays.map((day) => {
            const key = formatDate(day);
            const dayItems = groupedByDay.get(key) ?? [];
            const isCurrentMonth = day.getMonth() === cursorDate.getMonth();
            return (
              <div key={key} className={`planning-manual__day-card${isCurrentMonth ? "" : " is-muted"}`} style={{ border: "1px solid var(--ui-border)", borderRadius: 10, padding: 8, minHeight: 120, opacity: isCurrentMonth ? 1 : 0.55 }}>
                <div className="planning-manual__day-title" style={{ fontWeight: 700, marginBottom: 6 }}>{day.toLocaleDateString("fr-FR", { weekday: "short", day: "2-digit" })}</div>
                {dayItems.length === 0 ? <div className="planning-manual__day-empty" style={{ opacity: 0.6, fontSize: 12 }}>Aucun shift</div> : (
                  <div className="planning-manual__day-list" style={{ display: "grid", gap: 6 }}>
                    {dayItems.slice(0, 4).map((shift) => (
                      <div key={shift.id} className="planning-manual__day-item" style={{ borderLeft: `6px solid ${shift.template?.color ?? "#2563eb"}`, paddingLeft: 8, fontSize: 12 }}>
                        <div className="planning-manual__day-item-time" style={{ fontWeight: 700 }}>{timeHM(shift.startAt)}-{timeHM(shift.endAt)}</div>
                        <div className="planning-manual__day-item-template">{shift.template?.name ?? "Sans template"}</div>
                        {shift.user?.name ? <div className="planning-manual__day-item-user" style={{ opacity: 0.8 }}>{shift.user.name}</div> : null}
                        {shift.isCancelled ? <StatusBadge variant="danger">Annule</StatusBadge> : null}
                      </div>
                    ))}
                    {dayItems.length > 4 && <div className="planning-manual__day-more" style={{ fontSize: 12, opacity: 0.7 }}>+ {dayItems.length - 4} autre(s)</div>}
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

function ShiftCard({
  shift,
  history,
  templates,
  users,
  depots,
  canEditPlanning,
  isEditing,
  editForm,
  setEditForm,
  assignLoading,
  assignMessage,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onCancelShift,
  onAssign,
  onEditTemplateChange,
  canViewAudit,
}: {
  shift: ShiftItem;
  history: AuditItem[];
  templates: TemplateLite[];
  users: UserLite[];
  depots: DepotLite[];
  canEditPlanning: boolean;
  isEditing: boolean;
  editForm: FormState;
  setEditForm: Dispatch<SetStateAction<FormState>>;
  assignLoading: boolean;
  assignMessage: string | null;
  onEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onCancelShift: () => void;
  onAssign: (shiftId: string, patch: { userId?: string | null; user2Id?: string | null }) => Promise<void>;
  onEditTemplateChange: (nextTemplateId: string) => void;
  canViewAudit: boolean;
}) {
  const selectedEditTemplate = templates.find((template) => template.id === editForm.templateId) ?? null;
  const hasSecondSlot = canShiftUseSecondUser(shift);

  return (
    <div className="planning-manual-shift" style={{ border: "1px solid var(--ui-border)", borderRadius: 12, padding: 12, display: "grid", gap: 8 }}>
      <div className="planning-manual-shift__head" style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
        <div>
          <div style={{ fontWeight: 800 }}>{shift.template?.name ?? "Sans template"} — {shift.template?.category ?? "N/A"}</div>
          <div>{dateLabel(shift.startAt)} • {timeHM(shift.startAt)} → {timeHM(shift.endAt)}</div>
          <div className="planning-manual-shift__meta">
            <StatusBadge variant="info">{timeHM(shift.startAt)}-{timeHM(shift.endAt)}</StatusBadge>
            {shift.template?.category ? <StatusBadge variant="neutral">{shift.template.category}</StatusBadge> : null}
            {shift.isCancelled ? <StatusBadge variant="danger">Annule</StatusBadge> : <StatusBadge variant="success">Actif</StatusBadge>}
          </div>
          {shift.depot?.name ? <div style={{ opacity: 0.8 }}>Dépôt : {shift.depot.name}</div> : null}
          {shift.vehicle?.immatriculation ? <div style={{ opacity: 0.8 }}>Véhicule : {shift.vehicle.immatriculation}</div> : null}
          {(shift.user?.name || shift.user2?.name) ? (
            <div style={{ opacity: 0.8 }}>
              Équipe : {shift.user?.name ?? ""}
              {shift.user2?.name ? ` / ${shift.user2.name}` : ""}
            </div>
          ) : null}
          {shift.notes && <div style={{ opacity: 0.85 }}>Notes : {shift.notes}</div>}
          {shift.isCancelled && <div style={{ color: "var(--ui-danger-text)", fontWeight: 700 }}>Annulé — {shift.cancellationReason ?? "sans motif"}</div>}
        </div>
        {canEditPlanning && !shift.isCancelled && (
          <div className="planning-manual-shift__actions" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <ActionButton size="sm" onClick={onEdit}>Modifier</ActionButton>
            <ActionButton size="sm" variant="danger" onClick={onCancelShift}>Annuler</ActionButton>
          </div>
        )}
      </div>

      {canEditPlanning && !shift.isCancelled && (
        <div className="planning-manual-shift__assign" style={{ border: "1px solid var(--ui-border)", borderRadius: 10, padding: 10, display: "grid", gap: 8 }}>
          <div style={{ fontWeight: 700 }}>Affectation equipe</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8 }}>
            <select value={shift.user?.id ?? ""} disabled={assignLoading} onChange={(e) => { const value = e.target.value; void onAssign(shift.id, { userId: value || null }); }}>
              <option value="">Employe 1 - non affecte</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            {hasSecondSlot ? (
              <select value={shift.user2?.id ?? ""} disabled={assignLoading} onChange={(e) => { const value = e.target.value; void onAssign(shift.id, { user2Id: value || null }); }}>
                <option value="">Employe 2 - non affecte</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            ) : null}
          </div>
          {assignMessage ? <div style={{ fontSize: 12, opacity: 0.85 }}>{assignMessage}</div> : null}
        </div>
      )}

      {isEditing && (
        <div className="planning-manual-shift__edit" style={{ border: "1px solid var(--ui-border)", borderRadius: 10, padding: 10, display: "grid", gap: 8 }}>
          <div className="planning-manual-shift__edit-title" style={{ fontWeight: 700 }}>Modifier le shift publie</div>
          <div className="planning-manual-shift__edit-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8 }}>
            <input type="date" value={editForm.date} onChange={(e) => setEditForm((v) => ({ ...v, date: e.target.value }))} />
            <input type="time" value={editForm.startTime} disabled={selectedEditTemplate?.isTimeDefined === true} onChange={(e) => setEditForm((v) => ({ ...v, startTime: e.target.value }))} />
            <input type="time" value={editForm.endTime} disabled={selectedEditTemplate?.isTimeDefined === true} onChange={(e) => setEditForm((v) => ({ ...v, endTime: e.target.value }))} />
            <select value={editForm.templateId} onChange={(e) => onEditTemplateChange(e.target.value)}>
              <option value="">Sans template</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>{template.name} — {template.category} — {getTemplateTimeLabel(template)}</option>
              ))}
            </select>
            <select value={editForm.depotId} onChange={(e) => setEditForm((v) => ({ ...v, depotId: e.target.value }))}>
              <option value="">Aucun dépôt</option>
              {depots.map((depot) => (
                <option key={depot.id} value={depot.id}>{depot.name}</option>
              ))}
            </select>
          </div>
          {selectedEditTemplate?.isTimeDefined ? (
            <div style={{ fontSize: 12, opacity: 0.8 }}>
              Horaires imposes par le template selectionne: {selectedEditTemplate.startTime}-{selectedEditTemplate.endTime}
              {selectedEditTemplate.crossesMidnight ? " (traverse minuit)." : "."}
            </div>
          ) : null}
          <textarea rows={2} value={editForm.notes} onChange={(e) => setEditForm((v) => ({ ...v, notes: e.target.value }))} />
          <div className="planning-manual-shift__edit-actions" style={{ display: "flex", gap: 8 }}>
            <ActionButton size="sm" variant="primary" onClick={onSaveEdit}>Enregistrer</ActionButton>
            <ActionButton size="sm" onClick={onCancelEdit}>Fermer</ActionButton>
          </div>
        </div>
      )}

      <div className="planning-manual-shift__history" style={{ display: "grid", gap: 6 }}>
        <div className="planning-manual-shift__history-title" style={{ fontWeight: 700 }}>Historique minimal</div>
        {!canViewAudit ? <div style={{ opacity: 0.65 }}>Accès audit non autorisé.</div> : history.length === 0 ? <div style={{ opacity: 0.65 }}>Aucune trace disponible.</div> : history.slice(0, 6).map((entry) => (
          <div key={entry.id} style={{ fontSize: 13, opacity: 0.9 }}>
            {dateTimeLabel(entry.createdAt)} — {entry.summary}
            {entry.actorUser?.name ? ` (${entry.actorUser.name})` : ""}
          </div>
        ))}
      </div>
    </div>
  );
}
