"use client";

import { useEffect, useMemo, useState } from "react";

import {
  ActionButton,
  DataTable,
  ErrorMessage,
  FilterBar,
  StatCard,
  StatusBadge,
  type DataTableColumn,
  type StatusBadgeVariant,
} from "@/app/ui";

type AuditEntry = {
  id: string;
  source: string;
  createdAt: string;
  action: string;
  entityType: string;
  entityId: string;
  summary: string;
  payload?: unknown;
  actorUser?: { id: string; name: string; email?: string | null } | null;
};

function formatDateTime(iso: string) {
  const value = new Date(iso);
  if (Number.isNaN(value.getTime())) return "Date inconnue";

  return value.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function sourceLabel(source: string) {
  if (source === "PLANNING_AUDIT") return "Planning";
  if (source === "LOGIN_AUDIT") return "Connexion";
  return source;
}

function sourceVariant(source: string): StatusBadgeVariant {
  if (source === "PLANNING_AUDIT") return "info";
  if (source === "LOGIN_AUDIT") return "warning";
  return "neutral";
}

function actionVariant(action: string): StatusBadgeVariant {
  if (action.includes("FAILURE") || action.includes("ERROR")) return "danger";
  if (action.includes("DELETE") || action.includes("ARCHIVE")) return "warning";
  if (action.includes("CREATE") || action.includes("SUCCESS")) return "success";
  return "neutral";
}

export default function AuditClient({
  defaultCompanyId,
  isGlobalSupport,
}: {
  defaultCompanyId: string;
  isGlobalSupport: boolean;
}) {
  const [companyId, setCompanyId] = useState(defaultCompanyId);
  const [entityType, setEntityType] = useState("");
  const [entityId, setEntityId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (companyId) params.set("companyId", companyId);
    if (entityType.trim()) params.set("entityType", entityType.trim());
    if (entityId.trim()) params.set("entityId", entityId.trim());
    params.set("limit", "100");
    return params.toString();
  }, [companyId, entityId, entityType]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!companyId) {
        setEntries([]);
        setSelectedEntryId(null);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/audit?${query}`);
        const json = await response.json().catch(() => null);
        if (!response.ok || !json || json.ok !== true) {
          throw new Error(typeof json?.error === "string" ? json.error : `HTTP_${response.status}`);
        }

        if (cancelled) return;
        const nextEntries = Array.isArray(json.data?.entries) ? (json.data.entries as AuditEntry[]) : [];
        setEntries(nextEntries);
        setSelectedEntryId((previous) => {
          if (previous && nextEntries.some((entry) => entry.id === previous)) return previous;
          return nextEntries[0]?.id ?? null;
        });
      } catch (cause) {
        if (!cancelled) {
          setEntries([]);
          setSelectedEntryId(null);
          setError(cause instanceof Error ? cause.message : "Erreur inconnue");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [companyId, query]);

  const sourceOptions = useMemo(() => {
    const values = new Set(entries.map((entry) => entry.source));
    return Array.from(values).sort((left, right) => left.localeCompare(right, "fr"));
  }, [entries]);

  const filteredEntries = useMemo(() => {
    const search = normalize(searchInput.trim());
    return entries.filter((entry) => {
      if (sourceFilter && entry.source !== sourceFilter) return false;
      if (!search) return true;

      const actorName = entry.actorUser?.name ?? "Systeme";
      const haystack = normalize(
        [entry.summary, entry.action, entry.entityType, entry.entityId, actorName, sourceLabel(entry.source)].join(" "),
      );

      return haystack.includes(search);
    });
  }, [entries, searchInput, sourceFilter]);

  useEffect(() => {
    if (filteredEntries.length === 0) {
      setSelectedEntryId(null);
      return;
    }

    setSelectedEntryId((previous) => {
      if (previous && filteredEntries.some((entry) => entry.id === previous)) return previous;
      return filteredEntries[0]?.id ?? null;
    });
  }, [filteredEntries]);

  const selectedEntry = filteredEntries.find((entry) => entry.id === selectedEntryId) ?? null;

  const columns: DataTableColumn<AuditEntry>[] = [
    {
      key: "createdAt",
      header: "Date",
      width: "170px",
      render: (entry) => <span className="audit-table-cell-subtle">{formatDateTime(entry.createdAt)}</span>,
    },
    {
      key: "summary",
      header: "Lecture audit",
      render: (entry) => (
        <div className="audit-cell-main">
          <strong>{entry.summary}</strong>
          <span className="audit-table-cell-subtle">
            {entry.entityType} - {entry.entityId}
          </span>
        </div>
      ),
    },
    {
      key: "source",
      header: "Source",
      width: "130px",
      render: (entry) => <StatusBadge variant={sourceVariant(entry.source)}>{sourceLabel(entry.source)}</StatusBadge>,
    },
    {
      key: "action",
      header: "Action",
      width: "170px",
      render: (entry) => <StatusBadge variant={actionVariant(entry.action)}>{entry.action}</StatusBadge>,
    },
    {
      key: "actor",
      header: "Acteur",
      width: "200px",
      render: (entry) => (
        <div className="audit-cell-main">
          <strong>{entry.actorUser?.name ?? "Systeme"}</strong>
          <span className="audit-table-cell-subtle">{entry.actorUser?.email ?? "N/A"}</span>
        </div>
      ),
    },
  ];

  const resetFilters = () => {
    setEntityType("");
    setEntityId("");
    setSearchInput("");
    setSourceFilter("");
  };

  const sourceStats = useMemo(
    () => ({
      planning: filteredEntries.filter((entry) => entry.source === "PLANNING_AUDIT").length,
      login: filteredEntries.filter((entry) => entry.source === "LOGIN_AUDIT").length,
    }),
    [filteredEntries],
  );

  return (
    <section className="audit-section">
      <div className="audit-grid-stats">
        <StatCard
          title="Entrees affichees"
          value={filteredEntries.length}
          hint={loading ? "Chargement en cours" : "Apres application des filtres"}
          tone="info"
        />
        <StatCard title="Audit planning" value={sourceStats.planning} hint="Source PLANNING_AUDIT" tone="success" />
        <StatCard title="Audit connexion" value={sourceStats.login} hint="Source LOGIN_AUDIT" tone="warning" />
      </div>

      <section className="audit-card">
        <div className="audit-card__head">
          <h2 className="audit-card__title">Filtres</h2>
          <p className="audit-card__description">
            Filtrage simple de la lecture audit sans modification de la logique de recuperation des logs.
          </p>
        </div>

        <FilterBar
          summary={`Total ${entries.length} | Affichees ${filteredEntries.length}${sourceFilter ? ` | Source ${sourceLabel(sourceFilter)}` : ""}`}
          actions={(
            <ActionButton size="sm" variant="ghost" onClick={resetFilters}>
              Reinitialiser
            </ActionButton>
          )}
        >
          <label className="audit-field">
            <span className="audit-field__label">Company ID</span>
            <input
              type="text"
              value={companyId}
              onChange={(event) => setCompanyId(event.target.value)}
              disabled={!isGlobalSupport || loading}
              placeholder={isGlobalSupport ? "UUID societe cible" : "Societe session courante"}
            />
          </label>

          <label className="audit-field">
            <span className="audit-field__label">Entity type</span>
            <input
              type="text"
              value={entityType}
              onChange={(event) => setEntityType(event.target.value)}
              placeholder="Ex: SHIFT, LOGIN"
              disabled={loading}
            />
          </label>

          <label className="audit-field">
            <span className="audit-field__label">Entity ID</span>
            <input
              type="text"
              value={entityId}
              onChange={(event) => setEntityId(event.target.value)}
              placeholder="Identifiant metier cible"
              disabled={loading}
            />
          </label>

          <label className="audit-field">
            <span className="audit-field__label">Source</span>
            <select
              value={sourceFilter}
              onChange={(event) => setSourceFilter(event.target.value)}
              disabled={loading || sourceOptions.length === 0}
            >
              <option value="">Toutes les sources</option>
              {sourceOptions.map((source) => (
                <option key={source} value={source}>
                  {sourceLabel(source)}
                </option>
              ))}
            </select>
          </label>

          <label className="audit-field">
            <span className="audit-field__label">Recherche libre</span>
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Resume, action, type, acteur..."
              disabled={loading}
            />
          </label>
        </FilterBar>
      </section>

      {error ? (
        <ErrorMessage title="Erreur de lecture audit" message={error} />
      ) : (
        <section className="audit-main-grid">
          <section className="audit-card">
            <div className="audit-card__head">
              <h2 className="audit-card__title">Lecture audit</h2>
              <p className="audit-card__description">
                Selectionnez une ligne pour afficher le detail et le payload JSON associe.
              </p>
            </div>

            <DataTable
              columns={columns}
              rows={filteredEntries}
              rowKey={(entry) => entry.id}
              loading={loading}
              error={null}
              selectedRowKey={selectedEntryId}
              onRowClick={(entry) => setSelectedEntryId(entry.id)}
              emptyTitle="Aucune entree d'audit"
              emptyMessage="Aucune entree ne correspond aux filtres selectionnes."
              caption="Journal d'audit consolide"
              minWidth={980}
              loadingLabel="Chargement du journal d'audit..."
            />
          </section>

          <aside className="audit-card audit-card--drawer">
            <div className="audit-card__head">
              <h2 className="audit-card__title">Detail de la ligne</h2>
              <p className="audit-card__description">Panneau lateral de relecture de l&apos;evenement.</p>
            </div>

            {selectedEntry ? (
              <>
                <div className="audit-selection-card">
                  <strong>{selectedEntry.summary}</strong>
                  <div className="audit-inline-status">
                    <StatusBadge variant={sourceVariant(selectedEntry.source)}>{sourceLabel(selectedEntry.source)}</StatusBadge>
                    <StatusBadge variant={actionVariant(selectedEntry.action)}>{selectedEntry.action}</StatusBadge>
                    <StatusBadge variant="neutral">{formatDateTime(selectedEntry.createdAt)}</StatusBadge>
                  </div>
                  <p className="audit-selection-card__line">
                    <strong>Acteur :</strong> {selectedEntry.actorUser?.name ?? "Systeme"} ({selectedEntry.actorUser?.email ?? "N/A"})
                  </p>
                  <p className="audit-selection-card__line">
                    <strong>Cible :</strong> {selectedEntry.entityType} - {selectedEntry.entityId}
                  </p>
                </div>

                <div className="audit-payload-panel">
                  <h3 className="audit-payload-panel__title">Payload JSON</h3>
                  {selectedEntry.payload !== undefined ? (
                    <pre className="audit-payload-panel__content">{JSON.stringify(selectedEntry.payload, null, 2)}</pre>
                  ) : (
                    <p className="audit-payload-panel__empty">Aucun payload disponible pour cette entree.</p>
                  )}
                </div>
              </>
            ) : (
              <p className="audit-table-cell-subtle">Selectionnez une entree pour afficher le panneau detail.</p>
            )}
          </aside>
        </section>
      )}
    </section>
  );
}


