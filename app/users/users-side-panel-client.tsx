"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarX, KeyRound, Save, Trash2 } from "lucide-react";

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

function statusVariant(user: UserListRow): "success" | "warning" {
  return user.isActive === false ? "warning" : "success";
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
        <h2 className="users-side-panel__title">Fiche utilisateur</h2>
        <p className="users-side-panel__description">Selectionnez une ligne du tableau pour afficher le detail RH visible.</p>
      </div>

      {!selectedUser ? (
        <div className="users-selection-card">Aucun utilisateur selectionne.</div>
      ) : (
        <>
          <section className="users-side-card users-side-card--identity">
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
              <StatusBadge variant={statusVariant(selectedUser)}>
                {selectedUser.isActive === false ? "Inactif" : "Actif"}
              </StatusBadge>
              <StatusBadge variant={selectedUser.isTrainee ? "warning" : "neutral"}>
                {selectedUser.isTrainee ? "Stagiaire" : "Titulaire"}
              </StatusBadge>
            </div>

            <nav className="users-side-tabs" aria-label="Onglets fiche utilisateur">
              <span>Identite</span>
              <span>Role & permissions</span>
              <span>RH</span>
              <span className="is-active">Absences</span>
              <span>Securite</span>
            </nav>

            <dl className="users-side-card__meta users-summary-grid">
              <div><dt>Base</dt><dd>{depotLabel(selectedUser.depot)}</dd></div>
              <div><dt>Telephone</dt><dd>{selectedUser.phone || "Non renseigne"}</dd></div>
              <div><dt>Horaires</dt><dd>{dailyScheduleLabel(selectedUser)}</dd></div>
            </dl>

            <div className="users-side-panel__actions users-side-panel__actions--primary">
              <ActionButton size="sm" variant="primary" leadingIcon={<Save size={15} />}>
                Enregistrer
              </ActionButton>
              <ActionButton size="sm" variant="secondary">
                Modifier
              </ActionButton>
            </div>
          </section>

          <section className="users-side-card">
            <h3 className="users-side-section-title"><CalendarX size={18} /> Absences</h3>
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
            <h3 className="users-side-section-title">Zone de securite</h3>
            <p className="users-table-cell-subtle">
              Actions sensibles conservees dans la fiche utilisateur, sans ajout de logique RH avancee.
            </p>
            <div className="users-side-panel__actions">
              <ActionButton size="sm" variant="secondary" leadingIcon={<KeyRound size={15} />}>
                Reinitialiser mot de passe
              </ActionButton>
              <ActionButton size="sm" variant="danger" leadingIcon={<Trash2 size={15} />}>
                Archiver
              </ActionButton>
            </div>
          </section>
        </>
      )}
    </aside>
  );
}
