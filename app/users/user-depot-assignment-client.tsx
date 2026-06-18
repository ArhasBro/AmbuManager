"use client";

import { useEffect, useMemo, useState } from "react";

import { ActionButton, EmptyState, ErrorMessage, LoadingState, StatusBadge } from "@/app/ui";

import { USERS_REFRESH_EVENT, dispatchUsersRefresh, dispatchUsersSelection } from "./users-refresh";

type ApiOk<T> = {
  ok: true;
  data: T;
};

type ApiErr = {
  ok: false;
  error: string;
  details?: unknown;
};

type DepotOption = {
  id: string;
  name: string;
  isActive: boolean;
};

type UserLite = {
  id: string;
  name: string;
  email: string | null;
  role: string;
  depotId: string | null;
  depot: DepotOption | null;
};

function isApiOk<T>(value: unknown): value is ApiOk<T> {
  return typeof value === "object" && value !== null && "ok" in value && (value as { ok?: unknown }).ok === true;
}

function isApiErr(value: unknown): value is ApiErr {
  return typeof value === "object" && value !== null && "ok" in value && (value as { ok?: unknown }).ok === false;
}

function getDepotLabel(depot: DepotOption) {
  return depot.isActive ? depot.name : `${depot.name} (archive)`;
}

function buildInitialSelectedDepotIds(users: UserLite[]) {
  return Object.fromEntries(users.map((user) => [user.id, user.depotId ?? ""]));
}

function roleStatusVariant(role: string): "neutral" | "info" | "warning" {
  if (role === "ADMIN" || role === "GERANT") return "info";
  if (role === "BUREAU" || role === "REGULATEUR") return "warning";
  return "neutral";
}

export default function UserDepotAssignmentClient({ availableDepots }: { availableDepots: DepotOption[] }) {
  const [users, setUsers] = useState<UserLite[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedDepotIds, setSelectedDepotIds] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
            const depotId = typeof record.depotId === "string" ? record.depotId : null;
            const depotRecord = typeof record.depot === "object" && record.depot !== null
              ? (record.depot as Record<string, unknown>)
              : null;
            const depot = depotRecord
              && typeof depotRecord.id === "string"
              && typeof depotRecord.name === "string"
              && typeof depotRecord.isActive === "boolean"
              ? {
                  id: depotRecord.id,
                  name: depotRecord.name,
                  isActive: depotRecord.isActive,
                }
              : null;

            if (!id || !name || !role) return null;
            return { id, name, email, role, depotId, depot };
          })
          .filter((item): item is UserLite => Boolean(item));

        if (!cancelled) {
          setUsers(mapped);
          setSelectedDepotIds(buildInitialSelectedDepotIds(mapped));
          setSelectedUserId((current) => {
            if (current && mapped.some((user) => user.id === current)) return current;
            return mapped[0]?.id ?? "";
          });
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setUsers([]);
          setSelectedUserId("");
          setSelectedDepotIds({});
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
  }, [reloadKey]);

  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId) ?? null,
    [users, selectedUserId],
  );

  const depotOptions = useMemo(() => {
    if (!selectedUser?.depot?.id) return availableDepots.filter((depot) => depot.isActive);
    return availableDepots.filter((depot) => depot.isActive || depot.id === selectedUser.depot?.id);
  }, [availableDepots, selectedUser]);

  const hasPendingChange = selectedUser
    ? (selectedDepotIds[selectedUser.id] ?? "") !== (selectedUser.depotId ?? "")
    : false;

  async function handleSave() {
    if (!selectedUser) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const depotId = selectedDepotIds[selectedUser.id] || null;
      const res = await fetch(`/api/users/${encodeURIComponent(selectedUser.id)}/depot`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ depotId }),
      });

      const json: unknown = await res.json();

      if (!res.ok || !isApiOk<unknown>(json)) {
        const msg = isApiErr(json) ? json.error : `HTTP_${res.status}`;
        throw new Error(msg);
      }

      const record = typeof json.data === "object" && json.data !== null ? (json.data as Record<string, unknown>) : null;
      const nextDepot = record && typeof record.depot === "object" && record.depot !== null
        ? (record.depot as Record<string, unknown>)
        : null;
      const updatedDepot = nextDepot
        && typeof nextDepot.id === "string"
        && typeof nextDepot.name === "string"
        && typeof nextDepot.isActive === "boolean"
        ? { id: nextDepot.id, name: nextDepot.name, isActive: nextDepot.isActive }
        : null;
      const updatedDepotId = record && typeof record.depotId === "string" ? record.depotId : null;

      const nextSelectedUser = {
        ...selectedUser,
        depotId: updatedDepotId,
        depot: updatedDepot,
      };

      setUsers((prev) =>
        prev.map((user) => (
          user.id === selectedUser.id
            ? nextSelectedUser
            : user
        )),
      );
      setSelectedDepotIds((prev) => ({
        ...prev,
        [selectedUser.id]: updatedDepotId ?? "",
      }));
      dispatchUsersSelection(nextSelectedUser);
      dispatchUsersRefresh();
      setSuccess(`Base enregistree pour ${selectedUser.name}.`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="users-section">
      <div className="users-card">
        <div className="users-card__head">
          <h2 className="users-card__title">Rattachement a une base</h2>
          <p className="users-card__description">
            Affectation d&apos;un utilisateur de societe a un depot unique de la societe courante. Les comptes support globaux sont exclus.
          </p>
        </div>

        <label className="users-field">
          <span className="users-field__label">Utilisateur cible</span>
          <select
            value={selectedUserId}
            onChange={(e) => {
              setSelectedUserId(e.target.value);
              setError(null);
              setSuccess(null);
            }}
            disabled={loading || users.length === 0 || saving}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} - {user.role}
              </option>
            ))}
          </select>
        </label>

        {loading ? (
          <LoadingState
            title="Chargement des utilisateurs"
            message="Récupération des comptes administrables de la société courante."
            className="users-selection-card"
          />
        ) : null}

        {!loading && users.length === 0 ? (
          <EmptyState
            title="Aucun utilisateur administrable"
            message="Aucun utilisateur de societe administrable n'est disponible dans la societe courante."
          />
        ) : null}

        {selectedUser ? (
          <>
            <div className="users-selection-card">
              <span>
                <strong>{selectedUser.name}</strong>
                {selectedUser.email ? ` (${selectedUser.email})` : ""}
              </span>
              <div className="users-inline-status">
                <StatusBadge variant={roleStatusVariant(selectedUser.role)}>{selectedUser.role}</StatusBadge>
                <StatusBadge variant={selectedUser.depot?.isActive ? "success" : "warning"}>
                  Base actuelle: {selectedUser.depot ? getDepotLabel(selectedUser.depot) : "Aucune"}
                </StatusBadge>
              </div>
            </div>

            <label className="users-field">
              <span className="users-field__label">Nouvelle base</span>
              <select
                value={selectedDepotIds[selectedUser.id] ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedDepotIds((prev) => ({
                    ...prev,
                    [selectedUser.id]: value,
                  }));
                  setError(null);
                  setSuccess(null);
                }}
                disabled={saving}
              >
                <option value="">Aucune base</option>
                {depotOptions.map((depot) => (
                  <option key={depot.id} value={depot.id}>
                    {getDepotLabel(depot)}
                  </option>
                ))}
              </select>
            </label>

            {availableDepots.filter((depot) => depot.isActive).length === 0 ? (
              <EmptyState
                title="Aucun depot actif"
                message="Aucun depot actif n'est disponible pour rattacher un utilisateur."
              />
            ) : null}
          </>
        ) : null}

        {error ? (
          <ErrorMessage
            title="Echec de l'affectation depot"
            message={error}
            details={(
              <ActionButton type="button" variant="secondary" size="sm" onClick={() => setReloadKey((value) => value + 1)}>
                Réessayer
              </ActionButton>
            )}
          />
        ) : null}
        {success ? <div className="users-alert users-alert--success">{success}</div> : null}

        <div className="users-actions">
          <ActionButton
            type="button"
            onClick={() => void handleSave()}
            variant="primary"
            disabled={loading || saving || !selectedUser || !hasPendingChange}
          >
            {saving ? "Enregistrement..." : "Enregistrer la base"}
          </ActionButton>
        </div>
      </div>
    </section>
  );
}
