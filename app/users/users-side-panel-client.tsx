"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarX, KeyRound, Plus, Save, Trash2, X } from "lucide-react";

import { ActionButton, ErrorMessage, LoadingState, StatusBadge } from "@/app/ui";

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

function parseDate(iso: string) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date;
}

function absenceStatus(absence: AbsenceItem) {
  const now = Date.now();
  const start = parseDate(absence.startAt)?.getTime() ?? now;
  return start > now ? "En attente" : "Validée";
}

function absenceReasonLabel(reason: string) {
  const normalized = reason.trim().toUpperCase();
  if (!normalized) return "Absence";
  if (normalized === "CONGE" || normalized === "CONGES_PAYES") return "Congé payé";
  if (normalized === "TRAINING") return "Formation";
  if (normalized === "UNAVAILABLE") return "Indisponibilité";
  return reason;
}

function roleVariant(role: string): "neutral" | "info" | "warning" {
  if (role === "ADMIN" || role === "GERANT") return "info";
  if (role === "BUREAU" || role === "REGULATEUR") return "warning";
  return "neutral";
}

function statusVariant(user: UserListRow): "success" | "warning" {
  return user.isActive === false ? "warning" : "success";
}

function roleLabel(role: string) {
  const labels: Record<string, string> = {
    ADMIN: "Admin",
    GERANT: "Gérant",
    BUREAU: "Bureau",
    ADE: "ADE",
    AA: "AA",
    TAXI: "Taxi",
    REGULATEUR: "Régulateur",
  };
  return labels[role] ?? role;
}

export default function UsersSidePanelClient() {
  const [selectedUser, setSelectedUser] = useState<UserListRow | null>(null);
  const [absences, setAbsences] = useState<AbsenceItem[]>([]);
  const [loadingAbsences, setLoadingAbsences] = useState(false);
  const [absenceError, setAbsenceError] = useState<string | null>(null);
  const [absencesReloadKey, setAbsencesReloadKey] = useState(0);

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
  }, [selectedUser?.id, absencesReloadKey]);

  const absenceSummary = useMemo(() => {
    if (absences.length === 0) return "Aucune absence";
    return `${absences.length} absence${absences.length > 1 ? "s" : ""} enregistrée${absences.length > 1 ? "s" : ""}`;
  }, [absences]);

  const absencesRecap = useMemo(() => {
    const now = Date.now();
    let upcoming = 0;
    let validatedDays = 0;
    let lastAbsenceLabel = "Aucune";

    const sorted = [...absences].sort((a, b) => (parseDate(b.startAt)?.getTime() ?? 0) - (parseDate(a.startAt)?.getTime() ?? 0));
    const latestPast = sorted.find((absence) => (parseDate(absence.startAt)?.getTime() ?? 0) <= now);
    if (latestPast) {
      lastAbsenceLabel = `${absenceReasonLabel(latestPast.reason)} (${formatDateLabel(latestPast.startAt)})`;
    }

    for (const absence of absences) {
      const start = parseDate(absence.startAt);
      const end = parseDate(absence.endAt);
      if (!start || !end) continue;
      if (start.getTime() > now) {
        upcoming += 1;
        continue;
      }
      const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / 86_400_000) + 1);
      validatedDays += days;
    }

    return { upcoming, validatedDays, lastAbsenceLabel };
  }, [absences]);

  return (
    <aside className="users-side-panel">
      <div className="users-side-panel__head">
        <h2 className="users-side-panel__title">Panneau RH</h2>
        <p className="users-side-panel__description">Sélectionnez une ligne du tableau pour afficher le détail RH.</p>
      </div>

      {!selectedUser ? (
        <div className="users-selection-card">Aucun utilisateur sélectionné.</div>
      ) : (
        <>
          <section className="users-side-card users-side-card--identity">
            <div className="users-side-card__topbar">
              <span className="users-side-card__topbar-title">Fiche utilisateur</span>
              <button type="button" className="users-side-close" aria-label="Fermer le panneau">
                <X size={16} />
              </button>
            </div>

            <div className="users-side-card__identity">
              <div className="users-side-card__avatar" aria-hidden="true">
                {(selectedUser.initials || selectedUser.name.slice(0, 2)).toUpperCase()}
              </div>
              <div>
                <h3>{selectedUser.name}</h3>
                <p>{selectedUser.email ?? "Email non renseigné"}</p>
              </div>
            </div>

            <div className="users-inline-status">
              <StatusBadge variant={roleVariant(selectedUser.role)}>{roleLabel(selectedUser.role)}</StatusBadge>
              <StatusBadge variant={statusVariant(selectedUser)}>
                {selectedUser.isActive === false ? "Inactif" : "Actif"}
              </StatusBadge>
              <StatusBadge variant={selectedUser.isTrainee ? "warning" : "neutral"}>
                {selectedUser.isTrainee ? "Stagiaire" : "Titulaire"}
              </StatusBadge>
            </div>

            <nav className="users-side-tabs" aria-label="Onglets fiche utilisateur">
              <span>Identité</span>
              <span>Rôle & permissions</span>
              <span>RH</span>
              <span className="is-active">Absences</span>
              <span>Sécurité</span>
            </nav>

            <dl className="users-side-card__meta users-summary-grid">
              <div><dt>Base</dt><dd>{depotLabel(selectedUser.depot)}</dd></div>
              <div><dt>Téléphone</dt><dd>{selectedUser.phone || "Non renseigné"}</dd></div>
              <div><dt>Horaires</dt><dd>{dailyScheduleLabel(selectedUser)}</dd></div>
            </dl>
            <div className="users-side-panel__actions users-side-panel__actions--primary">
              <ActionButton size="sm" variant="primary" leadingIcon={<Save size={15} />}>
                Enregistrer
              </ActionButton>
            </div>
          </section>

          <section className="users-side-card">
            <div className="users-side-card__row">
              <h3 className="users-side-section-title"><CalendarX size={18} /> Absences enregistrées</h3>
              <ActionButton size="sm" variant="secondary" leadingIcon={<Plus size={14} />}>
                + Ajouter une absence
              </ActionButton>
            </div>
            <p className="users-table-cell-subtle">{absenceSummary}</p>

            {loadingAbsences ? (
              <LoadingState
                title="Chargement des absences"
                message="Récupération des absences de l'utilisateur sélectionné."
                className="users-selection-card"
              />
            ) : null}
            {absenceError ? (
              <ErrorMessage
                title="Erreur absences"
                message={absenceError}
                details={(
                  <ActionButton type="button" variant="secondary" size="sm" onClick={() => setAbsencesReloadKey((value) => value + 1)}>
                    Réessayer
                  </ActionButton>
                )}
              />
            ) : null}

            {!loadingAbsences && !absenceError ? (
              <div className="users-absences-table-wrap">
                <table className="users-absences-table">
                  <thead>
                    <tr>
                      <th>Motif</th>
                      <th>Début</th>
                      <th>Fin</th>
                      <th>Statut</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {absences.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="users-absences-table__empty">Aucune absence pour cet utilisateur.</td>
                      </tr>
                    ) : (
                      absences.map((absence) => {
                        const status = absenceStatus(absence);
                        return (
                          <tr key={absence.id}>
                            <td>{absenceReasonLabel(absence.reason)}</td>
                            <td>{formatDateLabel(absence.startAt)}</td>
                            <td>{formatDateLabel(absence.endAt)}</td>
                            <td>
                              <StatusBadge variant={status === "En attente" ? "warning" : "success"}>{status}</StatusBadge>
                            </td>
                            <td>
                              <button type="button" className="users-table-icon-button" aria-label="Supprimer l'absence">
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            ) : null}
          </section>

          <section className="users-side-card users-side-card--summary">
            <h3 className="users-side-section-title">Récapitulatif</h3>
            <ul className="users-side-list">
              <li>
                <strong>{absencesRecap.upcoming}</strong>
                <span>Absence{absencesRecap.upcoming > 1 ? "s" : ""} à venir</span>
              </li>
              <li>
                <strong>{absencesRecap.validatedDays}</strong>
                <span>Jour{absencesRecap.validatedDays > 1 ? "s" : ""} d’absence validé{absencesRecap.validatedDays > 1 ? "s" : ""}</span>
              </li>
              <li>
                <strong>{absencesRecap.lastAbsenceLabel}</strong>
                <span>Dernière absence</span>
              </li>
            </ul>
          </section>

          <section className="users-side-card users-side-card--danger">
            <h3 className="users-side-section-title">Zone de sécurité</h3>
            <p className="users-table-cell-subtle">
              Actions sensibles conservées dans la fiche utilisateur.
            </p>
            <div className="users-side-panel__actions users-side-panel__actions--danger">
              <ActionButton size="sm" variant="secondary" className="users-security-action" leadingIcon={<KeyRound size={15} />}>
                Réinitialiser le mot de passe
              </ActionButton>
              <ActionButton size="sm" variant="secondary" className="users-security-action" leadingIcon={<Trash2 size={15} />}>
                Archiver l’utilisateur
              </ActionButton>
            </div>
          </section>
        </>
      )}
    </aside>
  );
}
