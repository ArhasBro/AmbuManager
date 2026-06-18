"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

import { ActionButton, EmptyState, ErrorMessage, LoadingState, StatusBadge } from "@/app/ui";

import { USERS_REFRESH_EVENT } from "./users-refresh";

type ApiOk<T> = {
  ok: true;
  data: T;
};

type ApiErr = {
  ok: false;
  error: string;
  details?: unknown;
};

type UserLite = {
  id: string;
  name: string;
  email: string | null;
  role: string;
};

type Props = {
  actorUserId: string;
};

function isApiOk<T>(value: unknown): value is ApiOk<T> {
  return typeof value === "object" && value !== null && "ok" in value && (value as { ok?: unknown }).ok === true;
}

function isApiErr(value: unknown): value is ApiErr {
  return typeof value === "object" && value !== null && "ok" in value && (value as { ok?: unknown }).ok === false;
}

function roleStatusVariant(role: string): "neutral" | "info" | "warning" {
  if (role === "ADMIN" || role === "GERANT") return "info";
  if (role === "BUREAU" || role === "REGULATEUR") return "warning";
  return "neutral";
}

export default function ResetPasswordClient({ actorUserId }: Props) {
  const [users, setUsers] = useState<UserLite[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    function handleUsersRefresh() {
      setReloadKey((current) => current + 1);
    }

    window.addEventListener(USERS_REFRESH_EVENT, handleUsersRefresh);
    return () => window.removeEventListener(USERS_REFRESH_EVENT, handleUsersRefresh);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/users?limit=500", { cache: "no-store" });
        const json: unknown = await res.json();

        const payload = isApiOk<unknown>(json)
          ? Array.isArray(json.data)
            ? json.data
            : typeof json.data === "object" && json.data !== null && Array.isArray((json.data as { items?: unknown }).items)
              ? (json.data as { items: unknown[] }).items
              : null
          : null;

        if (!res.ok || !payload) {
          const msg = isApiErr(json) ? json.error : `HTTP_${res.status}`;
          throw new Error(msg);
        }

        const mapped = payload
          .map((item): UserLite | null => {
            if (typeof item !== "object" || item === null) return null;

            const record = item as Record<string, unknown>;
            const id = typeof record.id === "string" ? record.id : null;
            const name = typeof record.name === "string" ? record.name : null;
            const email = typeof record.email === "string" ? record.email : null;
            const role = typeof record.role === "string" ? record.role : null;

            if (!id || !name || !role) return null;
            return { id, name, email, role };
          })
          .filter((item): item is UserLite => Boolean(item))
          .filter((item) => item.id !== actorUserId);

        if (!cancelled) {
          setUsers(mapped);
          setSelectedUserId((current) => {
            if (current && mapped.some((u) => u.id === current)) return current;
            return mapped[0]?.id ?? "";
          });
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setUsers([]);
          setSelectedUserId("");
          setError(e instanceof Error ? e.message : "Unknown error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadUsers();

    return () => {
      cancelled = true;
    };
  }, [actorUserId, reloadKey]);

  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId) ?? null,
    [users, selectedUserId],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!selectedUserId) {
      setError("Aucun utilisateur cible selectionne.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`/api/users/${selectedUserId}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword, confirmPassword }),
      });

      const json: unknown = await res.json();

      if (!res.ok || !isApiOk<Record<string, unknown>>(json)) {
        const msg = isApiErr(json) ? json.error : `HTTP_${res.status}`;
        throw new Error(msg);
      }

      setNewPassword("");
      setConfirmPassword("");
      setSuccess(`Mot de passe reinitialise pour ${selectedUser?.name ?? "l'utilisateur"}.`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="users-section">
      <div className="users-card">
        <div className="users-card__head">
          <h2 className="users-card__title">Reinitialiser un mot de passe</h2>
          <p className="users-card__description">
            Le mot de passe est reinitialise pour un autre utilisateur de la societe courante.
          </p>
        </div>

        {loading ? (
          <LoadingState
            title="Chargement des utilisateurs"
            message="Récupération des comptes administrables pour le reset."
            className="users-selection-card"
          />
        ) : null}

        {!loading && users.length === 0 ? (
          <EmptyState
            title="Aucun utilisateur cible disponible"
            message="Aucun autre utilisateur administrable n'est disponible pour un reset."
          />
        ) : null}

        {!loading && users.length > 0 ? (
          <>
            <label className="users-field">
              <span className="users-field__label">Utilisateur</span>
              <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} - {user.role}
                    {user.email ? ` - ${user.email}` : ""}
                  </option>
                ))}
              </select>
            </label>

            {selectedUser ? (
              <div className="users-selection-card">
                <span>
                  <strong>{selectedUser.name}</strong>
                  {selectedUser.email ? ` (${selectedUser.email})` : ""}
                </span>
                <div className="users-inline-status">
                  <StatusBadge variant={roleStatusVariant(selectedUser.role)}>{selectedUser.role}</StatusBadge>
                </div>
              </div>
            ) : null}
          </>
        ) : null}

        <form onSubmit={onSubmit} className="users-form">
          <div className="users-form-grid users-form-grid--short">
            <label className="users-field">
              <span className="users-field__label">Nouveau mot de passe</span>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                disabled={loading || users.length === 0 || submitting}
              />
            </label>

            <label className="users-field">
              <span className="users-field__label">Confirmation</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                disabled={loading || users.length === 0 || submitting}
              />
            </label>
          </div>

          {error ? (
            <ErrorMessage
              title="Echec de reinitialisation"
              message={error}
              details={(
                <ActionButton type="button" variant="secondary" size="sm" onClick={() => setReloadKey((current) => current + 1)}>
                  Réessayer
                </ActionButton>
              )}
            />
          ) : null}
          {success ? <div className="users-alert users-alert--success">{success}</div> : null}

          <div className="users-actions">
            <ActionButton type="submit" variant="primary" disabled={loading || users.length === 0 || submitting || !selectedUserId}>
              {submitting ? "Reinitialisation..." : "Reinitialiser le mot de passe"}
            </ActionButton>
          </div>
        </form>
      </div>
    </section>
  );
}
