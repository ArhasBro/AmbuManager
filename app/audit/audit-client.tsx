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

type DrawerTab = "details" | "context";

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

function isSameDay(iso: string, reference: Date) {
  const value = new Date(iso);
  if (Number.isNaN(value.getTime())) return false;

  return (
    value.getFullYear() === reference.getFullYear() &&
    value.getMonth() === reference.getMonth() &&
    value.getDate() === reference.getDate()
  );
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
  const [actionFilter, setActionFilter] = useState<string>("");
  const [actorFilter, setActorFilter] = useState<string>("");
  const [drawerTab, setDrawerTab] = useState<DrawerTab>("details");

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

  const actionOptions = useMemo(() => {
    const values = new Set(entries.map((entry) => entry.action));
    return Array.from(values).sort((left, right) => left.localeCompare(right, "fr"));
  }, [entries]);

  const actorOptions = useMemo(() => {
    const values = new Set(entries.map((entry) => entry.actorUser?.name ?? "Systeme"));
    return Array.from(values).sort((left, right) => left.localeCompare(right, "fr"));
  }, [entries]);

  const filteredEntries = useMemo(() => {
    const search = normalize(searchInput.trim());
    return entries.filter((entry) => {
      if (sourceFilter && entry.source !== sourceFilter) return false;
      if (actionFilter && entry.action !== actionFilter) return false;
      if (actorFilter && (entry.actorUser?.name ?? "Systeme") !== actorFilter) return false;
      if (!search) return true;

      const actorName = entry.actorUser?.name ?? "Systeme";
      const haystack = normalize(
        [entry.summary, entry.action, entry.entityType, entry.entityId, actorName, sourceLabel(entry.source)].join(" "),
      );

      return haystack.includes(search);
    });
  }, [actionFilter, actorFilter, entries, searchInput, sourceFilter]);

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
      key: "entityType",
      header: "Type entite",
      width: "140px",
      render: (entry) => <StatusBadge variant="neutral">{entry.entityType}</StatusBadge>,
    },
    {
      key: "entityId",
      header: "ID entite",
      width: "130px",
      render: (entry) => <span className="audit-table-cell-subtle">{entry.entityId}</span>,
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
    {
      key: "detail",
      header: "Detail",
      width: "88px",
      align: "center",
      render: (entry) => (
        <ActionButton size="sm" variant="ghost" onClick={() => setSelectedEntryId(entry.id)}>
          Voir
        </ActionButton>
      ),
    },
  ];

  const resetFilters = () => {
    setEntityType("");
    setEntityId("");
    setSearchInput("");
    setSourceFilter("");
    setActionFilter("");
    setActorFilter("");
  };

  const sourceStats = useMemo(() => {
    const now = new Date();
    return {
      today: filteredEntries.filter((entry) => isSameDay(entry.createdAt, now)).length,
      planning: filteredEntries.filter((entry) => entry.source === "PLANNING_AUDIT").length,
      login: filteredEntries.filter((entry) => entry.source === "LOGIN_AUDIT").length,
      sensitive: filteredEntries.filter((entry) => /UPDATE|DELETE|ARCHIVE|RESET/.test(entry.action)).length,
      support: filteredEntries.filter((entry) => normalize(entry.actorUser?.name ?? "").includes("support")).length,
      alerts: filteredEntries.filter((entry) => /FAIL|ERROR|DENIED|BLOCK/.test(entry.action)).length,
    };
  }, [filteredEntries]);

  const selectedEntryPayload =
    selectedEntry && selectedEntry.payload !== undefined ? JSON.stringify(selectedEntry.payload, null, 2) : "";

  function extractContext(payload: unknown) {
    if (!payload || typeof payload !== "object") return null;
    const record = payload as Record<string, unknown>;
    return {
      ip: typeof record.ip === "string" ? record.ip : "INFORMATION NON FOURNIE — À CONFIRMER",
      browser:
        typeof record.userAgent === "string"
          ? record.userAgent
          : "INFORMATION NON FOURNIE — À CONFIRMER",
      result: typeof record.result === "string" ? record.result : "INFORMATION NON FOURNIE — À CONFIRMER",
    };
  }

  return (
    <section className="audit-section">
      <div className="audit-grid-stats">
        <StatCard
          title="Actions aujourd'hui"
          value={sourceStats.today}
          hint={loading ? "Chargement en cours" : "Perimetre filtre courant"}
          tone="info"
        />
        <StatCard title="Connexions" value={sourceStats.login} hint="Source LOGIN_AUDIT" tone="success" />
        <StatCard title="Modifications sensibles" value={sourceStats.sensitive} hint="Actions UPDATE/DELETE/ARCHIVE/RESET" tone="warning" />
        <StatCard title="Actions support" value={sourceStats.support} hint="Acteur contenant support" tone="info" />
        <StatCard title="Alertes a verifier" value={sourceStats.alerts} hint="Actions FAIL/ERROR/DENIED/BLOCK" tone="warning" />
      </div>

      <section className="audit-card">
        <div className="audit-card__head">
          <h2 className="audit-card__title">Filtres</h2>
          <p className="audit-card__description">
            Lecture unifiee des evenements traces avec filtres visuels, sans modification de la logique de recuperation.
          </p>
        </div>

        <FilterBar
          summary={`Total ${entries.length} | Affichees ${filteredEntries.length}${sourceFilter ? ` | Source ${sourceLabel(sourceFilter)}` : ""}${actionFilter ? ` | Action ${actionFilter}` : ""}`}
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
            <span className="audit-field__label">Periode</span>
            <input
              type="text"
              value={new Date().toLocaleDateString("fr-FR")}
              readOnly
              disabled
            />
          </label>

          <label className="audit-field">
            <span className="audit-field__label">Societe</span>
            <input
              type="text"
              value={companyId || "Societe courante"}
              readOnly
              disabled
            />
          </label>

          <label className="audit-field">
            <span className="audit-field__label">Type d&apos;entite</span>
            <input
              type="text"
              value={entityType}
              onChange={(event) => setEntityType(event.target.value)}
              placeholder="Ex: SHIFT, LOGIN"
              disabled={loading}
            />
          </label>

          <label className="audit-field">
            <span className="audit-field__label">ID entite</span>
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
            <span className="audit-field__label">Action</span>
            <select
              value={actionFilter}
              onChange={(event) => setActionFilter(event.target.value)}
              disabled={loading || actionOptions.length === 0}
            >
              <option value="">Toutes les actions</option>
              {actionOptions.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </label>

          <label className="audit-field">
            <span className="audit-field__label">Acteur</span>
            <select
              value={actorFilter}
              onChange={(event) => setActorFilter(event.target.value)}
              disabled={loading || actorOptions.length === 0}
            >
              <option value="">Tous</option>
              {actorOptions.map((actor) => (
                <option key={actor} value={actor}>
                  {actor}
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
              minWidth={1180}
              loadingLabel="Chargement du journal d'audit..."
            />
          </section>

          <aside className="audit-card audit-card--drawer">
            <div className="audit-card__head">
              <h2 className="audit-card__title">{selectedEntry?.summary ?? "Detail de la ligne"}</h2>
              <p className="audit-card__description">Panneau lateral de relecture de l&apos;evenement selectionne.</p>
            </div>

            {selectedEntry ? (
              <>
                <div className="audit-drawer-header">
                  <div className="audit-inline-status">
                    <StatusBadge variant="neutral">{selectedEntry.id}</StatusBadge>
                    <StatusBadge variant={sourceVariant(selectedEntry.source)}>{sourceLabel(selectedEntry.source)}</StatusBadge>
                    <StatusBadge variant={actionVariant(selectedEntry.action)}>{selectedEntry.action}</StatusBadge>
                  </div>
                  <ActionButton
                    size="sm"
                    variant="ghost"
                    onClick={() => void navigator.clipboard.writeText(selectedEntry.id)}
                  >
                    Copier l&apos;ID
                  </ActionButton>
                </div>

                <div className="audit-drawer-tabs" role="tablist" aria-label="Detail audit">
                  <button
                    type="button"
                    className={`audit-drawer-tab${drawerTab === "details" ? " is-active" : ""}`}
                    onClick={() => setDrawerTab("details")}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className={`audit-drawer-tab${drawerTab === "context" ? " is-active" : ""}`}
                    onClick={() => setDrawerTab("context")}
                  >
                    Contexte
                  </button>
                </div>

                <div className="audit-selection-card">
                  {drawerTab === "details" ? (
                    <>
                      <strong>Resume de l&apos;action</strong>
                      <p className="audit-selection-card__line">
                        <strong>Date et heure :</strong> {formatDateTime(selectedEntry.createdAt)}
                      </p>
                      <p className="audit-selection-card__line">
                        <strong>Source :</strong> {sourceLabel(selectedEntry.source)}
                      </p>
                      <p className="audit-selection-card__line">
                        <strong>Action :</strong> {selectedEntry.action}
                      </p>
                      <p className="audit-selection-card__line">
                        <strong>Acteur :</strong> {selectedEntry.actorUser?.name ?? "Systeme"} ({selectedEntry.actorUser?.email ?? "N/A"})
                      </p>
                      <p className="audit-selection-card__line">
                        <strong>Entite concernee :</strong> {selectedEntry.entityType}
                      </p>
                      <p className="audit-selection-card__line">
                        <strong>ID entite :</strong> {selectedEntry.entityId}
                      </p>
                    </>
                  ) : (
                    <>
                      {(() => {
                        const context = extractContext(selectedEntry.payload);
                        return (
                          <>
                            <strong>Tracabilite</strong>
                            <p className="audit-selection-card__line">
                              <strong>Adresse IP :</strong> {context?.ip ?? "INFORMATION NON FOURNIE — À CONFIRMER"}
                            </p>
                            <p className="audit-selection-card__line">
                              <strong>Navigateur :</strong> {context?.browser ?? "INFORMATION NON FOURNIE — À CONFIRMER"}
                            </p>
                            <p className="audit-selection-card__line">
                              <strong>Resultat :</strong> {context?.result ?? "INFORMATION NON FOURNIE — À CONFIRMER"}
                            </p>
                          </>
                        );
                      })()}
                    </>
                  )}
                </div>

                <div className="audit-payload-panel">
                  <div className="audit-payload-panel__head">
                    <h3 className="audit-payload-panel__title">Payload JSON</h3>
                    <ActionButton
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (!selectedEntryPayload) return;
                        void navigator.clipboard.writeText(selectedEntryPayload);
                      }}
                    >
                      Copier JSON
                    </ActionButton>
                  </div>
                  {selectedEntry.payload !== undefined ? (
                    <pre className="audit-payload-panel__content">{selectedEntryPayload}</pre>
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


