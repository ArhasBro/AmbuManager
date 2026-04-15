"use client";

import { useCallback, useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";

type UserLite = { id: string; name: string; email?: string };
type DepotLite = { id: string; name: string; isActive: boolean };
type TemplateLite = { id: string; name: string; category: string; color?: string | null };

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
  template?: { id: string; name: string; category: string; color?: string | null } | null;
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

export default function ManualPlanningPanel({
  availableDepots,
  availableUsers,
  currentUser,
  canViewGlobal,
  canEditPlanning,
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
    params.set("includeHistory", "1");
    params.set("limit", "500");
    return params.toString();
  }, [canViewGlobal, currentUser.id, cursorDate, selectedUserId, viewMode]);

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

  function move(offset: number) {
    if (viewMode === "day") setCursorDate((current) => addDays(current, offset));
    else if (viewMode === "week") setCursorDate((current) => addDays(current, offset * 7));
    else setCursorDate((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  }

  const userChoices = canViewGlobal ? [{ id: "", name: "Toute la société" }, ...availableUsers] : [currentUser];

  return (
    <section style={{ border: "1px solid rgba(255,255,255,0.14)", borderRadius: 12, padding: 16, marginBottom: 18, display: "grid", gap: 14 }}>
      <div>
        <div style={{ fontSize: 20, fontWeight: 800 }}>Planning manuel</div>
        <div style={{ opacity: 0.75, marginTop: 4 }}>Vue jour / semaine / mois, création manuelle, modification publiée, annulation logique et historique minimal.</div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <button onClick={() => move(-1)}>← Précédent</button>
        <button onClick={() => setCursorDate(new Date())}>Aujourd’hui</button>
        <button onClick={() => move(1)}>Suivant →</button>
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
        <div style={{ fontWeight: 700 }}>
          {viewMode === "month" ? cursorDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }) : dateLabel(cursorDate.toISOString())}
        </div>
      </div>

      {canEditPlanning && (
        <div style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: 12, display: "grid", gap: 8 }}>
          <div style={{ fontWeight: 700 }}>Ajouter un shift publié</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8 }}>
            <input type="date" value={createForm.date} onChange={(e) => setCreateForm((v) => ({ ...v, date: e.target.value }))} />
            <input type="time" value={createForm.startTime} onChange={(e) => setCreateForm((v) => ({ ...v, startTime: e.target.value }))} />
            <input type="time" value={createForm.endTime} onChange={(e) => setCreateForm((v) => ({ ...v, endTime: e.target.value }))} />
            <select value={createForm.templateId} onChange={(e) => setCreateForm((v) => ({ ...v, templateId: e.target.value }))}>
              <option value="">Template</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>{template.name} — {template.category}</option>
              ))}
            </select>
            <select value={createForm.depotId} onChange={(e) => setCreateForm((v) => ({ ...v, depotId: e.target.value }))}>
              <option value="">Aucun dépôt</option>
              {availableDepots.map((depot) => (
                <option key={depot.id} value={depot.id}>{depot.name}</option>
              ))}
            </select>
          </div>
          <textarea rows={2} placeholder="Notes" value={createForm.notes} onChange={(e) => setCreateForm((v) => ({ ...v, notes: e.target.value }))} />
          <div><button disabled={saving || !createForm.templateId} onClick={submitCreate}>Créer</button></div>
        </div>
      )}

      {message && <div style={{ color: "green" }}>{message}</div>}
      {error && <div style={{ color: "crimson" }}>Erreur : {error}</div>}
      {loading && <div>Chargement du planning manuel…</div>}

      {!loading && viewMode !== "month" && (
        <div style={{ display: "grid", gap: 10 }}>
          {items.length === 0 ? <div style={{ opacity: 0.7 }}>Aucun shift sur cette période.</div> : items.map((shift) => (
            <ShiftCard
              key={shift.id}
              shift={shift}
              canEditPlanning={canEditPlanning}
              history={historyByShiftId[shift.id] ?? []}
              templates={templates}
              depots={availableDepots}
              isEditing={editingShiftId === shift.id}
              editForm={editForm}
              setEditForm={setEditForm}
              onEdit={() => startEdit(shift)}
              onSaveEdit={submitEdit}
              onCancelEdit={() => setEditingShiftId(null)}
              onCancelShift={() => void cancelShift(shift)}
            />
          ))}
        </div>
      )}

      {!loading && viewMode === "month" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(120px, 1fr))", gap: 8 }}>
          {monthDays.map((day) => {
            const key = formatDate(day);
            const dayItems = groupedByDay.get(key) ?? [];
            const isCurrentMonth = day.getMonth() === cursorDate.getMonth();
            return (
              <div key={key} style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: 8, minHeight: 120, opacity: isCurrentMonth ? 1 : 0.55 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>{day.toLocaleDateString("fr-FR", { weekday: "short", day: "2-digit" })}</div>
                {dayItems.length === 0 ? <div style={{ opacity: 0.6, fontSize: 12 }}>Aucun shift</div> : (
                  <div style={{ display: "grid", gap: 6 }}>
                    {dayItems.slice(0, 4).map((shift) => (
                      <div key={shift.id} style={{ borderLeft: `6px solid ${shift.template?.color ?? "#2563eb"}`, paddingLeft: 8, fontSize: 12 }}>
                        <div style={{ fontWeight: 700 }}>{timeHM(shift.startAt)}–{timeHM(shift.endAt)}</div>
                        <div>{shift.template?.name ?? "Sans template"}</div>
                        <div style={{ opacity: 0.8 }}>{shift.user?.name ?? "Non affecté"}</div>
                        {shift.isCancelled && <div style={{ color: "crimson" }}>Annulé</div>}
                      </div>
                    ))}
                    {dayItems.length > 4 && <div style={{ fontSize: 12, opacity: 0.7 }}>+ {dayItems.length - 4} autre(s)</div>}
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
  depots,
  canEditPlanning,
  isEditing,
  editForm,
  setEditForm,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onCancelShift,
}: {
  shift: ShiftItem;
  history: AuditItem[];
  templates: TemplateLite[];
  depots: DepotLite[];
  canEditPlanning: boolean;
  isEditing: boolean;
  editForm: FormState;
  setEditForm: Dispatch<SetStateAction<FormState>>;
  onEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onCancelShift: () => void;
}) {
  return (
    <div style={{ border: "1px solid rgba(255,255,255,0.14)", borderRadius: 12, padding: 12, display: "grid", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
        <div>
          <div style={{ fontWeight: 800 }}>{shift.template?.name ?? "Sans template"} — {shift.template?.category ?? "N/A"}</div>
          <div>{dateLabel(shift.startAt)} • {timeHM(shift.startAt)} → {timeHM(shift.endAt)}</div>
          <div style={{ opacity: 0.8 }}>Dépôt : {shift.depot?.name ?? "Aucun"} • Véhicule : {shift.vehicle?.immatriculation ?? "Aucun"}</div>
          <div style={{ opacity: 0.8 }}>Agents : {shift.user?.name ?? "—"}{shift.user2?.name ? ` / ${shift.user2.name}` : ""}</div>
          {shift.notes && <div style={{ opacity: 0.85 }}>Notes : {shift.notes}</div>}
          {shift.isCancelled && <div style={{ color: "crimson", fontWeight: 700 }}>Annulé — {shift.cancellationReason ?? "sans motif"}</div>}
        </div>
        {canEditPlanning && !shift.isCancelled && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={onEdit}>Modifier</button>
            <button onClick={onCancelShift}>Annuler</button>
          </div>
        )}
      </div>

      {isEditing && (
        <div style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: 10, display: "grid", gap: 8 }}>
          <div style={{ fontWeight: 700 }}>Modifier le shift publié</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8 }}>
            <input type="date" value={editForm.date} onChange={(e) => setEditForm((v) => ({ ...v, date: e.target.value }))} />
            <input type="time" value={editForm.startTime} onChange={(e) => setEditForm((v) => ({ ...v, startTime: e.target.value }))} />
            <input type="time" value={editForm.endTime} onChange={(e) => setEditForm((v) => ({ ...v, endTime: e.target.value }))} />
            <select value={editForm.templateId} onChange={(e) => setEditForm((v) => ({ ...v, templateId: e.target.value }))}>
              <option value="">Sans template</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>{template.name} — {template.category}</option>
              ))}
            </select>
            <select value={editForm.depotId} onChange={(e) => setEditForm((v) => ({ ...v, depotId: e.target.value }))}>
              <option value="">Aucun dépôt</option>
              {depots.map((depot) => (
                <option key={depot.id} value={depot.id}>{depot.name}</option>
              ))}
            </select>
          </div>
          <textarea rows={2} value={editForm.notes} onChange={(e) => setEditForm((v) => ({ ...v, notes: e.target.value }))} />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onSaveEdit}>Enregistrer</button>
            <button onClick={onCancelEdit}>Fermer</button>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gap: 6 }}>
        <div style={{ fontWeight: 700 }}>Historique minimal</div>
        {history.length === 0 ? <div style={{ opacity: 0.65 }}>Aucune trace disponible.</div> : history.slice(0, 6).map((entry) => (
          <div key={entry.id} style={{ fontSize: 13, opacity: 0.9 }}>
            {dateTimeLabel(entry.createdAt)} — {entry.summary}
            {entry.actorUser?.name ? ` (${entry.actorUser.name})` : ""}
          </div>
        ))}
      </div>
    </div>
  );
}
