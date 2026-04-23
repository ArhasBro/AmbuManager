"use client";

import { useEffect, useState } from "react";

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
    if (!selectedUser) return setError("Sélectionnez d'abord un utilisateur actif dans la liste.");
    if (isSelf) return setError("Vous ne pouvez pas archiver votre propre compte depuis cette interface.");
    if (!window.confirm(`Archiver ${selectedUser.name}${selectedUser.email ? ` (${selectedUser.email})` : ""} ?`)) return;

    setArchiving(true);
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(selectedUser.id)}/archive`, { method: "POST" });
      const json: unknown = await res.json();
      if (!res.ok || !isApiOk<ArchivedUser>(json)) throw new Error(readApiError(json, res.status));
      const archivedUser = json.data;
      setSuccess(`Utilisateur archivé : ${archivedUser.name}${archivedUser.email ? ` (${archivedUser.email})` : ""}.`);
      dispatchUsersSelection(null);
      dispatchUsersRefresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setArchiving(false);
    }
  }

  return (
    <section style={{ display: "grid", gap: 16, maxWidth: 720 }}>
      <div style={{ padding: 12, border: "1px solid var(--ui-border)", borderRadius: 8, display: "grid", gap: 12 }}>
        <div>
          <h2 style={{ margin: 0 }}>Archiver un utilisateur</h2>
          <p style={{ margin: "8px 0 0 0", opacity: 0.8 }}>
            Archivage logique uniquement : le compte reste en base mais sort du flux standard des utilisateurs actifs.
          </p>
        </div>

        {!selectedUser ? (
          <div style={{ padding: 10, border: "1px solid var(--ui-border-strong)", borderRadius: 8 }}>Aucun utilisateur sélectionné dans la liste.</div>
        ) : (
          <div style={{ padding: 10, border: "1px solid var(--ui-border)", borderRadius: 8 }}>
            <div><strong>{selectedUser.name}</strong>{selectedUser.email ? ` (${selectedUser.email})` : ""} — rôle {selectedUser.role}</div>
            {isSelf ? <div style={{ marginTop: 6, opacity: 0.8 }}>Votre propre compte ne peut pas être archivé depuis cette UI.</div> : null}
          </div>
        )}

        {error ? <div style={{ padding: 10, border: "1px solid var(--ui-danger-border)", borderRadius: 8 }}>Erreur : {error}</div> : null}
        {success ? <div style={{ padding: 10, border: "1px solid var(--ui-success-border)", borderRadius: 8 }}>{success}</div> : null}

        <button type="button" onClick={handleArchive} disabled={archiving || !selectedUser || isSelf} style={{ justifySelf: "start", padding: "10px 14px" }}>
          {archiving ? "Archivage..." : "Archiver l'utilisateur sélectionné"}
        </button>
      </div>
    </section>
  );
}
