"use client";

import { useEffect, useMemo, useState } from "react";

import { ActionButton, ErrorMessage, StatusBadge } from "@/app/ui";

import { dailyScheduleLabel, depotLabel, type UserListRow } from "./users-client-shared";
import { USERS_SELECTION_EVENT, type UsersSelectionEventDetail } from "./users-refresh";

type AbsenceItem = {
  id: string;
  reason: string;
  startAt: string;
  endAt: string;
};

function formatDateLabel(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Date inconnue";
  return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

function roleVariant(role: string): "neutral" | "info" | "warning" {
  if (role === "ADMIN" || role === "GERANT") return "info";
  if (role === "BUREAU" || role === "REGULATEUR") return "warning";
  return "neutral";
}

export default function UsersSidePanelClient() {
  const [selectedUser, setSelectedUser] = useState<UserListRow | null>(null);
  const [absences, setAbsences] = useState<AbsenceItem[]>([]);
  const [loadingAbsences, setLoadingAbsences] = useState(false);
  const [absenceError, setAbsenceError] = useState<string | null>(null);

  useEffect(() => {
    function handleSelection(event: Event) {
      const detail = (event as CustomEvent<UsersSelectionEventDetail>).detail;
      setSelectedUser(detail?.user ?? null);
    }

    window.addEventListener(USERS_SELECTION_EVENT, handleSelection as EventListener);
    return () => window.removeEventListener(USERS_SELECTION_EVENT, handleSelection as EventListener);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadAbsences() {
      if (!selectedUser?.id) {
        setAbsences([]);
        setAbsenceError(null);
        setLoadingAbsences(false);
        return;
      }

      setLoadingAbsences(true);
      setAbsenceError(null);

      try {
        const response = await fetch(`/api/users/${encodeURIComponent(selectedUser.id)}/absences?limit=8`, { cache: "no-store" });
        const payload = await response.json().catch(() => null) as { ok?: boolean; data?: { items?: AbsenceItem[] }; error?: string } | null;

        if (!response.ok || !payload?.ok) {
          throw new Error(payload?.error ?? `HTTP_${response.status}`);
        }

        if (!cancelled) {
          setAbsences(Array.isArray(payload.data?.items) ? payload.data.items : []);
        }
      } catch (error) {
        if (!cancelled) {
          setAbsenceError(error instanceof Error ? error.message : "Erreur absences");
          setAbsences([]);
        }
      } finally {
        if (!cancelled) setLoadingAbsences(false);
      }
    }

    void loadAbsences();

    return () => {
      cancelled = true;
    };
  }, [selectedUser?.id]);

  const absenceSummary = useMemo(() => {
    if (absences.length === 0) return "Aucune absence";
    return `${absences.length} absence${absences.length > 1 ? "s" : ""} recensee${absences.length > 1 ? "s" : ""}`;
  }, [absences]);

  return (
    <aside className="users-side-panel">
      <div className="users-side-panel__head">
        <h2 className="users-side-panel__title">Panneau utilisateur</h2>
        <p className="users-side-panel__description">Selectionnez une ligne du tableau pour afficher le detail RH.</p>
      </div>

      {!selectedUser ? (
        <div className="users-selection-card">Aucun utilisateur selectionne.</div>
      ) : (
        <>
          <section className="users-side-card">
            <div className="users-side-card__identity">
              <div className="users-side-card__avatar" aria-hidden="true">
                {(selectedUser.initials || selectedUser.name.slice(0, 2)).toUpperCase()}
              </div>
              <div>
                <h3>{selectedUser.name}</h3>
                <p>{selectedUser.email ?? "Email non renseigne"}</p>
              </div>
            </div>

            <div className="users-inline-status">
              <StatusBadge variant={roleVariant(selectedUser.role)}>{selectedUser.role}</StatusBadge>
              <StatusBadge variant={selectedUser.isTrainee ? "warning" : "success"}>
                {selectedUser.isTrainee ? "Stagiaire" : "Actif"}
              </StatusBadge>
            </div>

            <dl className="users-side-card__meta">
              <div><dt>Base</dt><dd>{depotLabel(selectedUser.depot)}</dd></div>
              <div><dt>Telephone</dt><dd>{selectedUser.phone || "Non renseigne"}</dd></div>
              <div><dt>Horaires</dt><dd>{dailyScheduleLabel(selectedUser)}</dd></div>
            </dl>
          </section>

          <section className="users-side-card">
            <h3>Absences</h3>
            <p className="users-table-cell-subtle">{absenceSummary}</p>

            {loadingAbsences ? <p className="users-table-cell-subtle">Chargement des absences...</p> : null}
            {absenceError ? <ErrorMessage title="Erreur absences" message={absenceError} /> : null}

            {!loadingAbsences && !absenceError ? (
              <ul className="users-side-list">
                {absences.length === 0 ? (
                  <li className="users-side-list__empty">Aucune absence pour cet utilisateur.</li>
                ) : (
                  absences.map((absence) => (
                    <li key={absence.id}>
                      <strong>{absence.reason}</strong>
                      <span>{formatDateLabel(absence.startAt)} - {formatDateLabel(absence.endAt)}</span>
                    </li>
                  ))
                )}
              </ul>
            ) : null}
          </section>

          <section className="users-side-card users-side-card--danger">
            <h3>Zone de securite</h3>
            <div className="users-side-panel__actions">
              <ActionButton size="sm" variant="ghost">Reinitialiser</ActionButton>
              <ActionButton size="sm" variant="danger">Archiver</ActionButton>
            </div>
          </section>
        </>
      )}
    </aside>
  );
}
