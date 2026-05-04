"use client";

import { useEffect, useMemo, useState } from "react";

import { ActionButton, DataTable, FilterBar, StatusBadge, type DataTableColumn } from "@/app/ui";

import { dailyScheduleLabel, depotLabel, USER_ROLE_OPTIONS, type UserListRow } from "./users-client-shared";
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
  const firstName = typeof record.firstName === "string" ? record.firstName : null;
  const lastName = typeof record.lastName === "string" ? record.lastName : null;
  const initials = typeof record.initials === "string" ? record.initials : null;
  const phone = typeof record.phone === "string" ? record.phone : null;
  const email = typeof record.email === "string" ? record.email : null;
  const role = typeof record.role === "string" ? record.role : null;
  const depotId = typeof record.depotId === "string" ? record.depotId : null;
  const isTrainee = record.isTrainee === true;
  const dailyWorkStartTime = typeof record.dailyWorkStartTime === "string" ? record.dailyWorkStartTime : null;
  const dailyWorkEndTime = typeof record.dailyWorkEndTime === "string" ? record.dailyWorkEndTime : null;
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
  return { id, name, firstName, lastName, initials, phone, email, role, depotId, depot, isTrainee, dailyWorkStartTime, dailyWorkEndTime };
}

function roleStatusVariant(role: string): "neutral" | "info" | "success" | "warning" {
  if (role === "ADMIN" || role === "GERANT") return "info";
  if (role === "BUREAU" || role === "REGULATEUR") return "warning";
  return "neutral";
}

function depotStatusVariant(user: UserListRow): "neutral" | "success" | "warning" {
  if (!user.depot) return "neutral";
  return user.depot.isActive ? "success" : "warning";
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

  const columns = useMemo<DataTableColumn<UserListRow>[]>(() => ([
    {
      key: "name",
      header: "Nom",
      render: (user) => (
        <>
          <strong>{user.name}</strong>
          {(user.firstName || user.lastName) ? (
            <div className="users-table-cell-subtle">
              {[user.firstName, user.lastName].filter(Boolean).join(" ")}
            </div>
          ) : null}
        </>
      ),
      width: "220px",
    },
    {
      key: "initials",
      header: "Initiales",
      render: (user) => user.initials || "-",
      width: "110px",
    },
    {
      key: "email",
      header: "Email",
      render: (user) => user.email || "-",
      width: "220px",
    },
    {
      key: "phone",
      header: "Telephone",
      render: (user) => user.phone || "-",
      width: "160px",
    },
    {
      key: "role",
      header: "Role",
      render: (user) => (
        <StatusBadge variant={roleStatusVariant(user.role)}>{user.role}</StatusBadge>
      ),
      width: "140px",
    },
    {
      key: "rh",
      header: "RH",
      render: (user) => (
        <div className="users-form">
          <StatusBadge variant={user.isTrainee ? "warning" : "success"}>
            {user.isTrainee ? "Stagiaire" : "Titulaire"}
          </StatusBadge>
          <span className="users-table-cell-subtle">{dailyScheduleLabel(user)}</span>
        </div>
      ),
      width: "170px",
    },
    {
      key: "depot",
      header: "Base",
      render: (user) => (
        <StatusBadge variant={depotStatusVariant(user)}>{depotLabel(user.depot)}</StatusBadge>
      ),
      width: "160px",
    },
  ]), []);

  useEffect(() => {
    dispatchUsersSelection(selectedUser);
  }, [selectedUser]);

  return (
    <section className="users-section">
      <div className="users-card">
        <div className="users-card__head">
          <h2 className="users-card__title">Liste utilisateurs</h2>
          <p className="users-card__description">
            Recherche simple, filtre role et pagination minimale sur les comptes actifs de la societe.
          </p>
        </div>

        <FilterBar
          summary={`Filtres actifs : ${search ? `recherche "${search}"` : "aucune recherche"}${role ? `, role ${role}` : ", tous les roles"}`}
        >
          <label className="users-field">
            <span className="users-field__label">Recherche</span>
            <input
              type="text"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Nom, email, initiales ou telephone"
            />
          </label>

          <label className="users-field">
            <span className="users-field__label">Role</span>
            <select value={role} onChange={(event) => setRole(event.target.value)}>
              {ROLE_FILTER_OPTIONS.map((value) => (
                <option key={value || "ALL"} value={value}>
                  {value || "Tous les roles"}
                </option>
              ))}
            </select>
          </label>
        </FilterBar>

        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(user) => user.id}
          loading={loading}
          error={error}
          loadingLabel="Chargement de la liste utilisateurs..."
          emptyTitle="Aucun utilisateur trouve"
          emptyMessage="Aucun utilisateur ne correspond a ces criteres."
          selectedRowKey={selectedUserId || null}
          onRowClick={(user) => setSelectedUserId(user.id)}
          minWidth={980}
          caption="Liste des comptes actifs de la societe courante"
        />

        {!loading && !error ? (
          <>
            <div className="users-pagination">
              <div className="users-table-cell-subtle">
                {pagination.total} utilisateur{pagination.total > 1 ? "s" : ""} - page {pagination.page} / {pagination.totalPages}
              </div>

              <div className="users-actions">
                <ActionButton
                  size="sm"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={loading || !pagination.hasPreviousPage}
                >
                  Precedent
                </ActionButton>
                <ActionButton
                  size="sm"
                  onClick={() => setPage((current) => current + 1)}
                  disabled={loading || !pagination.hasNextPage}
                >
                  Suivant
                </ActionButton>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
