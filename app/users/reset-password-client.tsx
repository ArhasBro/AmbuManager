"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

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

export default function ResetPasswordClient({ actorUserId }: Props) {
  const [users, setUsers] = useState<UserLite[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
  }, [actorUserId]);

  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId) ?? null,
    [users, selectedUserId]
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!selectedUserId) {
      setError("Aucun utilisateur cible sélectionné.");
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
      setSuccess(`Mot de passe réinitialisé pour ${selectedUser?.name ?? "l'utilisateur"}.`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 720 }}>
      <div style={{ padding: 12, border: "1px solid #333", borderRadius: 8 }}>
        <h2 style={{ marginTop: 0 }}>Cible</h2>

        {loading ? <p style={{ marginBottom: 0 }}>Chargement des utilisateurs...</p> : null}

        {!loading && users.length === 0 ? (
          <p style={{ marginBottom: 0 }}>Aucun autre utilisateur de société administrable n&apos;est disponible pour un reset.</p>
        ) : null}

        {!loading && users.length > 0 ? (
          <div style={{ display: "grid", gap: 8 }}>
            <label style={{ display: "grid", gap: 6 }}>
              <span>Utilisateur</span>
              <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} — {user.role}
                    {user.email ? ` — ${user.email}` : ""}
                  </option>
                ))}
              </select>
            </label>

            {selectedUser ? (
              <p style={{ margin: 0, opacity: 0.8 }}>
                Cible actuelle : <strong>{selectedUser.name}</strong>
                {selectedUser.email ? ` (${selectedUser.email})` : ""} — rôle {selectedUser.role}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, padding: 12, border: "1px solid #333", borderRadius: 8 }}>
        <h2 style={{ margin: 0 }}>Nouveau mot de passe</h2>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Nouveau mot de passe</span>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
            disabled={loading || users.length === 0 || submitting}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Confirmation</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            disabled={loading || users.length === 0 || submitting}
          />
        </label>

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

        <button type="submit" disabled={loading || users.length === 0 || submitting || !selectedUserId}>
          {submitting ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
        </button>
      </form>
    </div>
  );
}
