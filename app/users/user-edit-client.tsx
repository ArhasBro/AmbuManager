"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

import { depotLabel, USER_ROLE_OPTIONS, type UserListRow } from "./users-client-shared";
import { USERS_SELECTION_EVENT, dispatchUsersRefresh, dispatchUsersSelection, type UsersSelectionEventDetail } from "./users-refresh";

type ApiOk<T> = {
  ok: true;
  data: T;
};

type ApiErr = {
  ok: false;
  error: string;
  details?: unknown;
};

type UpdatedUser = Pick<UserListRow, "id" | "name" | "email" | "role" | "depotId" | "depot">;

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

export default function UserEditClient() {
  const [selectedUser, setSelectedUser] = useState<UserListRow | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    function handleUsersSelection(event: Event) {
      const detail = (event as CustomEvent<UsersSelectionEventDetail>).detail;
      const nextSelectedUser = detail?.user ?? null;

      setSelectedUser(nextSelectedUser);
      setName(nextSelectedUser?.name ?? "");
      setEmail(nextSelectedUser?.email ?? "");
      setRole(nextSelectedUser?.role ?? "");
      setError(null);
      setSuccess(null);
    }

    window.addEventListener(USERS_SELECTION_EVENT, handleUsersSelection as EventListener);
    return () => window.removeEventListener(USERS_SELECTION_EVENT, handleUsersSelection as EventListener);
  }, []);

  const hasPendingChange = useMemo(() => {
    if (!selectedUser) return false;

    return name.trim() !== selectedUser.name
      || email.trim() !== (selectedUser.email ?? "")
      || role !== selectedUser.role;
  }, [email, name, role, selectedUser]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!selectedUser) {
      setError("Sélectionnez d'abord un utilisateur dans la liste ci-dessus.");
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError("Le nom est obligatoire.");
      return;
    }

    if (!trimmedEmail) {
      setError("L'email est obligatoire.");
      return;
    }

    if (!USER_ROLE_OPTIONS.includes(role as (typeof USER_ROLE_OPTIONS)[number])) {
      setError("Le rôle est obligatoire.");
      return;
    }

    if (!hasPendingChange) {
      setError("Aucune modification détectée.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`/api/users/${encodeURIComponent(selectedUser.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          role,
        }),
      });

      const json: unknown = await res.json();

      if (!res.ok || !isApiOk<UpdatedUser>(json)) {
        throw new Error(readApiError(json, res.status));
      }

      const updatedUser = json.data;
      setSelectedUser(updatedUser);
      setName(updatedUser.name);
      setEmail(updatedUser.email ?? "");
      setRole(updatedUser.role);
      setSuccess(`Utilisateur modifié : ${updatedUser.name}${updatedUser.email ? ` (${updatedUser.email})` : ""}.`);
      dispatchUsersSelection(updatedUser);
      dispatchUsersRefresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, padding: 12, border: "1px solid #333", borderRadius: 8, maxWidth: 720 }}>
      <div>
        <h2 style={{ margin: 0 }}>Modifier un utilisateur</h2>
        <p style={{ margin: "8px 0 0 0", opacity: 0.8 }}>
          Sélectionnez d&apos;abord un utilisateur dans la liste ci-dessus pour modifier uniquement les champs couverts par USERS-06 : nom, email et rôle.
        </p>
      </div>

      {!selectedUser ? (
        <div style={{ padding: 10, border: "1px solid #555", borderRadius: 8 }}>
          Aucun utilisateur sélectionné dans la liste.
        </div>
      ) : (
        <>
          <div style={{ padding: 10, border: "1px solid #333", borderRadius: 8 }}>
            <div>
              <strong>{selectedUser.name}</strong>
              {selectedUser.email ? ` (${selectedUser.email})` : ""} — rôle {selectedUser.role}
            </div>
            <div style={{ marginTop: 6, opacity: 0.8 }}>
              Base actuelle : {depotLabel(selectedUser.depot)}
            </div>
          </div>

          <label style={{ display: "grid", gap: 6 }}>
            <span>Nom</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nom complet"
              disabled={submitting}
              maxLength={160}
            />
          </label>

          <label style={{ display: "grid", gap: 6 }}>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="prenom.nom@entreprise.fr"
              disabled={submitting}
              autoComplete="email"
            />
          </label>

          <label style={{ display: "grid", gap: 6 }}>
            <span>Rôle</span>
            <select value={role} onChange={(event) => setRole(event.target.value)} disabled={submitting}>
              <option value="">Sélectionner un rôle</option>
              {USER_ROLE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </>
      )}

      {error ? (
        <div style={{ padding: 10, border: "1px solid #663333", borderRadius: 8 }}>
          Erreur : {error}
        </div>
      ) : null}

      {success ? (
        <div style={{ padding: 10, border: "1px solid #335533", borderRadius: 8 }}>
          {success}
        </div>
      ) : null}

      <button type="submit" disabled={submitting || !selectedUser || !hasPendingChange} style={{ justifySelf: "start", padding: "10px 14px" }}>
        {submitting ? "Enregistrement..." : "Enregistrer les modifications"}
      </button>
    </form>
  );
}
