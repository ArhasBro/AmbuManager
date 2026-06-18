"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

import { ActionButton, EmptyState, ErrorMessage, LoadingState, StatusBadge } from "@/app/ui";

import { type UserListRow } from "./users-client-shared";
import { USERS_SELECTION_EVENT, type UsersSelectionEventDetail } from "./users-refresh";

type ApiOk<T> = {
  ok: true;
  data: T;
};

type ApiErr = {
  ok: false;
  error: string;
  details?: unknown;
};

type UserAbsenceRow = {
  id: string;
  companyId: string;
  userId: string;
  reason: string | null;
  startAt: string;
  endAt: string;
  createdAt: string;
  updatedAt: string;
};

type EditableAbsenceForm = {
  reason: string;
  startAt: string;
  endAt: string;
};

const EMPTY_FORM: EditableAbsenceForm = {
  reason: "",
  startAt: "",
  endAt: "",
};

function isApiOk<T>(value: unknown): value is ApiOk<T> {
  return typeof value === "object" && value !== null && "ok" in value && (value as { ok?: unknown }).ok === true;
}

function isApiErr(value: unknown): value is ApiErr {
  return typeof value === "object" && value !== null && "ok" in value && (value as { ok?: unknown }).ok === false;
}

function toAbsenceRow(value: unknown): UserAbsenceRow | null {
  if (typeof value !== "object" || value === null) return null;

  const record = value as Record<string, unknown>;
  const id = typeof record.id === "string" ? record.id : null;
  const companyId = typeof record.companyId === "string" ? record.companyId : null;
  const userId = typeof record.userId === "string" ? record.userId : null;
  const reason = typeof record.reason === "string" ? record.reason : record.reason === null ? null : null;
  const startAt = typeof record.startAt === "string" ? record.startAt : null;
  const endAt = typeof record.endAt === "string" ? record.endAt : null;
  const createdAt = typeof record.createdAt === "string" ? record.createdAt : null;
  const updatedAt = typeof record.updatedAt === "string" ? record.updatedAt : null;

  if (!id || !companyId || !userId || !startAt || !endAt || !createdAt || !updatedAt) return null;

  return {
    id,
    companyId,
    userId,
    reason,
    startAt,
    endAt,
    createdAt,
    updatedAt,
  };
}

function getErrorMessage(json: unknown, status: number) {
  if (!isApiErr(json)) return `HTTP_${status}`;

  const details = typeof json.details === "object" && json.details !== null
    ? (json.details as Record<string, unknown>)
    : null;

  if (typeof details?.message === "string") return details.message;

  if (json.error === "ABSENCE_OVERLAP") {
    const conflict = typeof details?.conflict === "object" && details.conflict !== null
      ? (details.conflict as Record<string, unknown>)
      : null;

    if (typeof conflict?.startAt === "string" && typeof conflict?.endAt === "string") {
      return `Une absence existe deja sur le creneau ${formatIntervalLabel(conflict.startAt, conflict.endAt)}.`;
    }
  }

  if (json.error === "VALIDATION_ERROR") {
    const fieldErrors = details && "fieldErrors" in details ? (details.fieldErrors as Record<string, unknown>) : null;
    const message = fieldErrors
      ? Object.values(fieldErrors)
          .flatMap((value) => Array.isArray(value) ? value : [])
          .find((value): value is string => typeof value === "string")
      : null;

    if (message) return message;
  }

  if (json.error === "NOT_FOUND") return "Utilisateur ou absence introuvable.";
  if (json.error === "FORBIDDEN") return "Action non autorisee.";
  if (json.error === "UNAUTHORIZED") return "Session invalide.";

  return json.error;
}

function formatDateTimeLabel(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatIntervalLabel(startAt: string, endAt: string) {
  return `${formatDateTimeLabel(startAt)} -> ${formatDateTimeLabel(endAt)}`;
}

function toDatetimeLocalValue(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const localValue = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return localValue.toISOString().slice(0, 16);
}

function toIsoString(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

function toEditableForm(absence: UserAbsenceRow): EditableAbsenceForm {
  return {
    reason: absence.reason ?? "",
    startAt: toDatetimeLocalValue(absence.startAt),
    endAt: toDatetimeLocalValue(absence.endAt),
  };
}

function roleStatusVariant(role: string): "neutral" | "info" | "warning" {
  if (role === "ADMIN" || role === "GERANT") return "info";
  if (role === "BUREAU" || role === "REGULATEUR") return "warning";
  return "neutral";
}

export default function UserAbsenceClient() {
  const [selectedUser, setSelectedUser] = useState<UserListRow | null>(null);
  const [items, setItems] = useState<UserAbsenceRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingAbsenceId, setEditingAbsenceId] = useState<string | null>(null);
  const [form, setForm] = useState<EditableAbsenceForm>(EMPTY_FORM);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    function handleSelection(event: Event) {
      const detail = (event as CustomEvent<UsersSelectionEventDetail>).detail;
      setSelectedUser(detail?.user ?? null);
      setItems([]);
      setError(null);
      setSuccess(null);
      setEditingAbsenceId(null);
      setForm(EMPTY_FORM);
    }

    window.addEventListener(USERS_SELECTION_EVENT, handleSelection as EventListener);
    return () => window.removeEventListener(USERS_SELECTION_EVENT, handleSelection as EventListener);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadAbsences() {
      if (!selectedUser?.id) {
        setItems([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/users/${selectedUser.id}/absences?limit=200`, { cache: "no-store" });
        const json: unknown = await res.json();

        if (!res.ok || !isApiOk<unknown>(json)) {
          throw new Error(getErrorMessage(json, res.status));
        }

        const data = json.data as Record<string, unknown>;
        const rawItems = Array.isArray(data.items) ? data.items : [];
        const mapped = rawItems.map(toAbsenceRow).filter((item): item is UserAbsenceRow => Boolean(item));

        if (!cancelled) {
          setItems(mapped);
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setItems([]);
          setError(e instanceof Error ? e.message : "Unknown error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadAbsences();

    return () => {
      cancelled = true;
    };
  }, [reloadKey, selectedUser?.id]);

  const editingAbsence = useMemo(
    () => items.find((item) => item.id === editingAbsenceId) ?? null,
    [editingAbsenceId, items],
  );

  function resetForm() {
    setEditingAbsenceId(null);
    setForm(EMPTY_FORM);
  }

  function validateForm() {
    if (!selectedUser?.id) return "Aucun utilisateur selectionne.";
    if (!form.startAt || !form.endAt) return "Les dates de debut et de fin sont obligatoires.";

    const startAt = toIsoString(form.startAt);
    const endAt = toIsoString(form.endAt);

    if (!startAt || !endAt) return "Les dates saisies sont invalides.";
    if (startAt >= endAt) return "La fin doit etre strictement apres le debut.";

    return null;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const validationMessage = validateForm();
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    if (!selectedUser?.id) {
      setError("Aucun utilisateur selectionne.");
      return;
    }

    const startAt = toIsoString(form.startAt);
    const endAt = toIsoString(form.endAt);
    if (!startAt || !endAt) {
      setError("Les dates saisies sont invalides.");
      return;
    }

    setSaving(true);

    try {
      const isEditing = Boolean(editingAbsenceId);
      const res = await fetch(
        isEditing ? `/api/users/${selectedUser.id}/absences/${editingAbsenceId}` : `/api/users/${selectedUser.id}/absences`,
        {
          method: isEditing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reason: form.reason,
            startAt,
            endAt,
          }),
        },
      );

      const json: unknown = await res.json();

      if (!res.ok || !isApiOk<unknown>(json)) {
        throw new Error(getErrorMessage(json, res.status));
      }

      setSuccess(isEditing ? "Absence mise a jour." : "Absence creee.");
      resetForm();
      setReloadKey((current) => current + 1);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(absence: UserAbsenceRow) {
    if (!selectedUser?.id) {
      setError("Aucun utilisateur selectionne.");
      return;
    }

    const confirmed = window.confirm(`Supprimer l'absence du creneau ${formatIntervalLabel(absence.startAt, absence.endAt)} ?`);
    if (!confirmed) return;

    setDeletingId(absence.id);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`/api/users/${selectedUser.id}/absences/${absence.id}`, {
        method: "DELETE",
      });
      const json: unknown = await res.json();

      if (!res.ok || !isApiOk<unknown>(json)) {
        throw new Error(getErrorMessage(json, res.status));
      }

      if (editingAbsenceId === absence.id) resetForm();
      setSuccess("Absence supprimee.");
      setReloadKey((current) => current + 1);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setDeletingId(null);
    }
  }

  function startEdit(absence: UserAbsenceRow) {
    setEditingAbsenceId(absence.id);
    setForm(toEditableForm(absence));
    setError(null);
    setSuccess(null);
  }

  return (
    <section className="users-section">
      <div className="users-card">
        <div className="users-card__head">
          <h2 className="users-card__title">Indisponibilites / absences</h2>
          <p className="users-card__description">
            Gestion UI minimale branchee sur l&apos;API users existante : lecture, creation, modification et suppression des absences pour le salarie selectionne.
          </p>
        </div>

        <div className="users-selection-card">
          <strong>Utilisateur cible</strong>
          {selectedUser
            ? (
              <>
                <span>
                  {selectedUser.name}
                  {selectedUser.email ? ` (${selectedUser.email})` : ""}
                </span>
                <div className="users-inline-status">
                  <StatusBadge variant={roleStatusVariant(selectedUser.role)}>{selectedUser.role}</StatusBadge>
                </div>
              </>
            )
            : "Selectionnez un utilisateur dans la liste ci-dessus."}
        </div>

        {selectedUser ? (
          <>
            <form onSubmit={onSubmit} className="users-card users-card--soft users-form">
              <h3 className="users-card__title">{editingAbsence ? "Modifier une absence" : "Creer une absence"}</h3>

              <div className="users-form-grid">
                <label className="users-field">
                  <span className="users-field__label">Debut</span>
                  <input
                    type="datetime-local"
                    value={form.startAt}
                    onChange={(event) => setForm((current) => ({ ...current, startAt: event.target.value }))}
                    disabled={saving || loading || deletingId !== null}
                    required
                  />
                </label>

                <label className="users-field">
                  <span className="users-field__label">Fin</span>
                  <input
                    type="datetime-local"
                    value={form.endAt}
                    onChange={(event) => setForm((current) => ({ ...current, endAt: event.target.value }))}
                    disabled={saving || loading || deletingId !== null}
                    required
                  />
                </label>
              </div>

              <label className="users-field">
                <span className="users-field__label">Motif</span>
                <input
                  type="text"
                  maxLength={160}
                  value={form.reason}
                  onChange={(event) => setForm((current) => ({ ...current, reason: event.target.value }))}
                  placeholder="Conge, formation, indisponible..."
                  disabled={saving || loading || deletingId !== null}
                />
              </label>

              <div className="users-actions">
                <ActionButton type="submit" variant="primary" disabled={saving || loading || deletingId !== null}>
                  {saving ? (editingAbsence ? "Mise a jour..." : "Creation...") : (editingAbsence ? "Enregistrer" : "Creer l'absence")}
                </ActionButton>

                <ActionButton
                  type="button"
                  onClick={resetForm}
                  disabled={saving || deletingId !== null || (!editingAbsence && !form.reason && !form.startAt && !form.endAt)}
                >
                  {editingAbsence ? "Annuler la modification" : "Vider le formulaire"}
                </ActionButton>
              </div>
            </form>

              {error ? (
                <ErrorMessage
                  title="Echec de gestion des absences"
                  message={error}
                  details={(
                    <ActionButton type="button" variant="secondary" size="sm" onClick={() => setReloadKey((current) => current + 1)}>
                      Réessayer
                    </ActionButton>
                  )}
                />
              ) : null}
            {success ? <div className="users-alert users-alert--success">{success}</div> : null}

            <div className="users-card users-card--soft">
              <div className="users-pagination">
                <h3 className="users-card__title">Absences enregistrees</h3>
                <StatusBadge variant="neutral">{items.length} element{items.length > 1 ? "s" : ""}</StatusBadge>
              </div>

              {loading ? (
                <LoadingState
                  title="Chargement des absences"
                  message="Récupération des absences de l'utilisateur sélectionné."
                  className="users-selection-card"
                />
              ) : null}

              {!loading && items.length === 0 ? (
                <EmptyState
                  title="Aucune absence enregistree"
                  message="Aucune absence n'est actuellement enregistree pour cet utilisateur."
                />
              ) : null}

              {!loading && items.length > 0 ? (
                <div className="users-absence-list">
                  {items.map((absence) => {
                    const isEditing = editingAbsenceId === absence.id;
                    const isDeleting = deletingId === absence.id;

                    return (
                      <article key={absence.id} className="users-absence-item">
                        <div className="users-absence-item__head">
                          <div className="users-form">
                            <strong>{formatIntervalLabel(absence.startAt, absence.endAt)}</strong>
                            <span>{absence.reason || "Motif non renseigne"}</span>
                            <span className="users-absence-item__meta">
                              Derniere mise a jour : {formatDateTimeLabel(absence.updatedAt)}
                            </span>
                          </div>

                          <div className="users-actions">
                            <ActionButton type="button" onClick={() => startEdit(absence)} disabled={saving || isDeleting}>
                              {isEditing ? "En cours d'edition" : "Modifier"}
                            </ActionButton>
                            <ActionButton type="button" onClick={() => onDelete(absence)} variant="danger" disabled={saving || isDeleting}>
                              {isDeleting ? "Suppression..." : "Supprimer"}
                            </ActionButton>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
