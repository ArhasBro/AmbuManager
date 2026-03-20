"use client";

import { useEffect, useMemo, useState } from "react";

import { depotLabel, USER_ROLE_OPTIONS, type UserListRow } from "./users-client-shared";
import { USERS_REFRESH_EVENT, dispatchUsersSelection } from "./users-refresh";

type ApiOk<T> = {
  ok: true;
  data: T;
};

type ApiErr = {
  ok: false;
  error: string;
  details?: unknown;
};


type UserListResponse = {
  items: UserListRow[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  filters: {
    q: string;
    role: string | null;
  };
};

const ROLE_FILTER_OPTIONS = ["", ...USER_ROLE_OPTIONS] as const;
const PAGE_SIZE = 10;

function isApiOk<T>(value: unknown): value is ApiOk<T> {
  return typeof value === "object" && value !== null && "ok" in value && (value as { ok?: unknown }).ok === true;
}

function isApiErr(value: unknown): value is ApiErr {
  return typeof value === "object" && value !== null && "ok" in value && (value as { ok?: unknown }).ok === false;
}

function toUserRow(value: unknown): UserListRow | null {
  if (typeof value !== "object" || value === null) return null;

  const record = value as Record<string, unknown>;
  const id = typeof record.id === "string" ? record.id : null;
  const name = typeof record.name === "string" ? record.name : null;
  const email = typeof record.email === "string" ? record.email : null;
  const role = typeof record.role === "string" ? record.role : null;
  const depotId = typeof record.depotId === "string" ? record.depotId : null;
  const depotRecord = typeof record.depot === "object" && record.depot !== null ? (record.depot as Record<string, unknown>) : null;
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
}


export default function UsersListClient() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<UserListRow[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [pagination, setPagination] = useState<UserListResponse["pagination"]>({
    page: 1,
    pageSize: PAGE_SIZE,
    total: 0,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
  }, [role]);

  useEffect(() => {
    function handleUsersRefresh() {
      setPage(1);
      setReloadKey((current) => current + 1);
    }

    window.addEventListener(USERS_REFRESH_EVENT, handleUsersRefresh);
    return () => window.removeEventListener(USERS_REFRESH_EVENT, handleUsersRefresh);
  }, []);

  useEffect(() => {
    return () => {
      dispatchUsersSelection(null);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: String(page),
          pageSize: String(PAGE_SIZE),
        });

        if (search) params.set("q", search);
        if (role) params.set("role", role);

        const res = await fetch(`/api/users?${params.toString()}`, { cache: "no-store" });
        const json: unknown = await res.json();

        if (!res.ok || !isApiOk<unknown>(json)) {
          const msg = isApiErr(json) ? json.error : `HTTP_${res.status}`;
          throw new Error(msg);
        }

        const data = json.data as Record<string, unknown>;
        const items = Array.isArray(data.items) ? data.items : [];
        const mapped = items.map(toUserRow).filter((item): item is UserListRow => Boolean(item));
        const nextPaginationRaw = typeof data.pagination === "object" && data.pagination !== null
          ? (data.pagination as Record<string, unknown>)
          : null;

        const nextPagination: UserListResponse["pagination"] = {
          page: typeof nextPaginationRaw?.page === "number" ? nextPaginationRaw.page : page,
          pageSize: typeof nextPaginationRaw?.pageSize === "number" ? nextPaginationRaw.pageSize : PAGE_SIZE,
          total: typeof nextPaginationRaw?.total === "number" ? nextPaginationRaw.total : mapped.length,
          totalPages: typeof nextPaginationRaw?.totalPages === "number" ? nextPaginationRaw.totalPages : 1,
          hasPreviousPage: nextPaginationRaw?.hasPreviousPage === true,
          hasNextPage: nextPaginationRaw?.hasNextPage === true,
        };

        if (!cancelled) {
          setRows(mapped);
          setPagination(nextPagination);
          setSelectedUserId((current) => {
            if (current && mapped.some((user) => user.id === current)) return current;
            return mapped[0]?.id ?? "";
          });
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setRows([]);
          setPagination({
            page: 1,
            pageSize: PAGE_SIZE,
            total: 0,
            totalPages: 1,
            hasPreviousPage: false,
            hasNextPage: false,
          });
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
  }, [page, reloadKey, role, search]);

  const selectedUser = useMemo(
    () => rows.find((user) => user.id === selectedUserId) ?? null,
    [rows, selectedUserId],
  );

  useEffect(() => {
    dispatchUsersSelection(selectedUser);
  }, [selectedUser]);

  return (
    <section style={{ display: "grid", gap: 16 }}>
      <div style={{ padding: 12, border: "1px solid #333", borderRadius: 8, display: "grid", gap: 12 }}>
        <div>
          <h2 style={{ margin: 0 }}>Liste utilisateurs</h2>
          <p style={{ margin: "8px 0 0 0", opacity: 0.8 }}>
            Recherche simple, filtre rôle et pagination minimale sur les comptes actifs de la société.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(240px, 1fr) minmax(180px, 240px)", gap: 12 }}>
          <label style={{ display: "grid", gap: 6 }}>
            <span>Recherche</span>
            <input
              type="text"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Nom ou email"
            />
          </label>

          <label style={{ display: "grid", gap: 6 }}>
            <span>Rôle</span>
            <select value={role} onChange={(event) => setRole(event.target.value)}>
              {ROLE_FILTER_OPTIONS.map((value) => (
                <option key={value || "ALL"} value={value}>
                  {value || "Tous les rôles"}
                </option>
              ))}
            </select>
          </label>
        </div>

        {loading ? <div style={{ padding: 12, border: "1px solid #444", borderRadius: 8 }}>Chargement de la liste...</div> : null}

        {!loading && error ? (
          <div style={{ padding: 12, border: "1px solid #a33", borderRadius: 8 }}>
            Erreur de chargement : {error}
          </div>
        ) : null}

        {!loading && !error ? (
          <>
            {rows.length === 0 ? (
              <div style={{ padding: 12, border: "1px solid #444", borderRadius: 8 }}>
                Aucun utilisateur trouvé pour ces critères.
              </div>
            ) : (
              <div style={{ overflowX: "auto", border: "1px solid #333", borderRadius: 8 }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #333" }}>Nom</th>
                      <th style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #333" }}>Email</th>
                      <th style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #333" }}>Rôle</th>
                      <th style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #333" }}>Base</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((user) => {
                      const isSelected = user.id === selectedUserId;

                      return (
                        <tr
                          key={user.id}
                          onClick={() => setSelectedUserId(user.id)}
                          style={{ cursor: "pointer", background: isSelected ? "rgba(255,255,255,0.06)" : "transparent" }}
                        >
                          <td style={{ padding: 10, borderBottom: "1px solid #222" }}>
                            <strong>{user.name}</strong>
                          </td>
                          <td style={{ padding: 10, borderBottom: "1px solid #222" }}>{user.email || "—"}</td>
                          <td style={{ padding: 10, borderBottom: "1px solid #222" }}>{user.role}</td>
                          <td style={{ padding: 10, borderBottom: "1px solid #222" }}>{depotLabel(user.depot)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div style={{ opacity: 0.8 }}>
                {pagination.total} utilisateur{pagination.total > 1 ? "s" : ""} • page {pagination.page} / {pagination.totalPages}
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={loading || !pagination.hasPreviousPage}>
                  Précédent
                </button>
                <button type="button" onClick={() => setPage((current) => current + 1)} disabled={loading || !pagination.hasNextPage}>
                  Suivant
                </button>
              </div>
            </div>

            <div style={{ padding: 12, border: "1px solid #333", borderRadius: 8 }}>
              <strong>Sélection actuelle :</strong>{" "}
              {selectedUser ? (
                <>
                  {selectedUser.name}
                  {selectedUser.email ? ` (${selectedUser.email})` : ""} — rôle {selectedUser.role} — base {depotLabel(selectedUser.depot)}
                </>
              ) : (
                "Aucun utilisateur sélectionné"
              )}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
