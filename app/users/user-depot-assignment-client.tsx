"use client";

import { useEffect, useMemo, useState } from "react";

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
  return depot.isActive ? depot.name : `${depot.name} (archivé)`;
}

function buildInitialSelectedDepotIds(users: UserLite[]) {
  return Object.fromEntries(users.map((user) => [user.id, user.depotId ?? ""]));
}

export default function UserDepotAssignmentClient({ availableDepots }: { availableDepots: DepotOption[] }) {
  const [users, setUsers] = useState<UserLite[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedDepotIds, setSelectedDepotIds] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

        if (!res.ok || !isApiOk<unknown[]>(json) || !Array.isArray(json.data)) {
          const msg = isApiErr(json) ? json.error : `HTTP_${res.status}`;
          throw new Error(msg);
        }

        const mapped = json.data
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
  }, []);

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

      setUsers((prev) =>
        prev.map((user) => (
          user.id === selectedUser.id
            ? {
                ...user,
                depotId: updatedDepotId,
                depot: updatedDepot,
              }
            : user
        )),
      );
      setSelectedDepotIds((prev) => ({
        ...prev,
        [selectedUser.id]: updatedDepotId ?? "",
      }));
      setSuccess(`Base enregistrée pour ${selectedUser.name}.`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 720 }}>
      <div style={{ padding: 12, border: "1px solid #333", borderRadius: 8 }}>
        <h2 style={{ marginTop: 0 }}>Rattachement à une base</h2>
        <p style={{ margin: "8px 0 0 0", opacity: 0.8 }}>
          Affectation minimale d&apos;un utilisateur de société à un dépôt unique de la société courante. Les comptes support globaux sont exclus. L&apos;utilisateur peut aussi rester sans base.
        </p>
      </div>

      <div style={{ display: "grid", gap: 12, padding: 12, border: "1px solid #333", borderRadius: 8 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Utilisateur cible</span>
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
                {user.name} — {user.role}
              </option>
            ))}
          </select>
        </label>

        {loading ? <p style={{ margin: 0 }}>Chargement des utilisateurs...</p> : null}

        {!loading && users.length === 0 ? (
          <div style={{ padding: 10, border: "1px solid #555", borderRadius: 8 }}>
            Aucun utilisateur de société administrable disponible dans la société courante.
          </div>
        ) : null}

        {selectedUser ? (
          <>
            <div style={{ padding: 10, border: "1px solid #333", borderRadius: 8 }}>
              <div>
                <strong>{selectedUser.name}</strong>
                {selectedUser.email ? ` (${selectedUser.email})` : ""} — rôle {selectedUser.role}
              </div>
              <div style={{ marginTop: 6, opacity: 0.8 }}>
                Base actuelle : {selectedUser.depot ? getDepotLabel(selectedUser.depot) : "Aucune"}
              </div>
            </div>

            <label style={{ display: "grid", gap: 6 }}>
              <span>Nouvelle base</span>
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
              <div style={{ padding: 10, border: "1px solid #555", borderRadius: 8 }}>
                Aucun dépôt actif disponible pour rattacher un utilisateur.
              </div>
            ) : null}
          </>
        ) : null}

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

        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={loading || saving || !selectedUser || !hasPendingChange}
          style={{ justifySelf: "start", padding: "10px 14px" }}
        >
          {saving ? "Enregistrement..." : "Enregistrer la base"}
        </button>
      </div>
    </div>
  );
}
