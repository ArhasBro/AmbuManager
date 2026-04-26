"use client";

import { useEffect, useState } from "react";

import { ActionButton, ErrorMessage, StatusBadge } from "@/app/ui";

import type { UserListRow } from "./users-client-shared";
import { USERS_SELECTION_EVENT, dispatchUsersRefresh, dispatchUsersSelection, type UsersSelectionEventDetail } from "./users-refresh";

type ApiOk<T> = { ok: true; data: T };
type ApiErr = { ok: false; error: string; details?: unknown };
type ArchivedUser = Pick<UserListRow, "id" | "name" | "email" | "role"> & { isActive: boolean };

type Props = { actorUserId: string };

function isApiOk<T>(value: unknown): value is ApiOk<T> {
  return typeof value === "object" && value !== null && "ok" in value && (value as { ok?: unknown }).ok === true;
}
function isApiErr(value: unknown): value is ApiErr {
  return typeof value === "object" && value !== null && "ok" in value && (value as { ok?: unknown }).ok === false;
}
function readApiError(value: unknown, status: number) {
  if (!isApiErr(value)) return `HTTP_${status}`;
  if (typeof value.details === "object" && value.details !== null && "message" in (value.details as Record<string, unknown>)) {
    const message = (value.details as Record<string, unknown>).message;
    if (typeof message === "string" && message.trim()) return message;
  }
  return value.error;
}

function roleStatusVariant(role: string): "neutral" | "info" | "warning" {
  if (role === "ADMIN" || role === "GERANT") return "info";
  if (role === "BUREAU" || role === "REGULATEUR") return "warning";
  return "neutral";
}

export default function UserArchiveClient({ actorUserId }: Props) {
  const [selectedUser, setSelectedUser] = useState<UserListRow | null>(null);
  const [archiving, setArchiving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    function handleUsersSelection(event: Event) {
      const detail = (event as CustomEvent<UsersSelectionEventDetail>).detail;
      setSelectedUser(detail?.user ?? null);
      setError(null);
      setSuccess(null);
    }
    window.addEventListener(USERS_SELECTION_EVENT, handleUsersSelection as EventListener);
    return () => window.removeEventListener(USERS_SELECTION_EVENT, handleUsersSelection as EventListener);
  }, []);

  const isSelf = selectedUser?.id === actorUserId;

  async function handleArchive() {
    setError(null);
    setSuccess(null);
    if (!selectedUser) return setError("Selectionnez d'abord un utilisateur actif dans la liste.");
    if (isSelf) return setError("Vous ne pouvez pas archiver votre propre compte depuis cette interface.");
    if (!window.confirm(`Archiver ${selectedUser.name}${selectedUser.email ? ` (${selectedUser.email})` : ""} ?`)) return;

    setArchiving(true);
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(selectedUser.id)}/archive`, { method: "POST" });
      const json: unknown = await res.json();
      if (!res.ok || !isApiOk<ArchivedUser>(json)) throw new Error(readApiError(json, res.status));
      const archivedUser = json.data;
      setSuccess(`Utilisateur archive : ${archivedUser.name}${archivedUser.email ? ` (${archivedUser.email})` : ""}.`);
      dispatchUsersSelection(null);
      dispatchUsersRefresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setArchiving(false);
    }
  }

  return (
    <section className="users-section">
      <div className="users-card">
        <div className="users-card__head">
          <h2 className="users-card__title">Archiver un utilisateur</h2>
          <p className="users-card__description">
            Archivage logique uniquement : le compte reste en base mais sort du flux standard des utilisateurs actifs.
          </p>
        </div>

        {!selectedUser ? (
          <div className="users-selection-card">Aucun utilisateur selectionne dans la liste.</div>
        ) : (
          <div className="users-selection-card">
            <span>
              <strong>{selectedUser.name}</strong>
              {selectedUser.email ? ` (${selectedUser.email})` : ""}
            </span>
            <div className="users-inline-status">
              <StatusBadge variant={roleStatusVariant(selectedUser.role)}>{selectedUser.role}</StatusBadge>
              {isSelf ? <StatusBadge variant="warning">Compte courant</StatusBadge> : null}
            </div>
          </div>
        )}

        {error ? <ErrorMessage title="Echec de l'archivage utilisateur" message={error} /> : null}
        {success ? <div className="users-alert users-alert--success">{success}</div> : null}

        <div className="users-actions">
          <ActionButton type="button" onClick={handleArchive} variant="danger" disabled={archiving || !selectedUser || isSelf}>
            {archiving ? "Archivage..." : "Archiver l'utilisateur selectionne"}
          </ActionButton>
        </div>
      </div>
    </section>
  );
}
