"use client";

import { useEffect, useMemo, useState } from "react";
import { Ambulance, Archive, Filter, Info, Landmark, MoreHorizontal, Save, Search, UsersRound, X } from "lucide-react";

import {
  ActionButton,
  DataTable,
  EmptyState,
  ErrorMessage,
  StatusBadge,
  type DataTableColumn,
} from "@/app/ui";

type Depot = {
  id: string;
  name: string;
  address: string | null;
  isActive: boolean;
  vehicleCount: number;
  userCount: number;
  createdAt: string;
  updatedAt: string;
};

type DepotForm = {
  name: string;
  address: string;
};

type DepotStatusFilter = "" | "ACTIVE" | "ARCHIVED";

type ApiSuccess<T> = { ok: true; data: T };
type ApiFailure = { ok: false; error: string; details?: unknown };
type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

function getApiError<T>(payload: ApiResponse<T> | null, fallback: string) {
  return payload && !payload.ok ? payload.error : fallback;
}

function sortDepots(items: Depot[]) {
  return [...items].sort((a, b) => {
    if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
    return a.name.localeCompare(b.name, "fr", { sensitivity: "base" });
  });
}

function toDepotForm(depot: Depot): DepotForm {
  return {
    name: depot.name,
    address: depot.address ?? "",
  };
}

function buildForms(items: Depot[]) {
  return Object.fromEntries(items.map((item) => [item.id, toDepotForm(item)]));
}

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("fr-FR");
}

function formatDateParts(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return { date: value, time: "" };
  }

  return {
    date: date.toLocaleDateString("fr-FR"),
    time: date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
  };
}

function depotMatchesSearch(depot: Depot, searchInput: string) {
  const query = searchInput.trim().toLowerCase();
  if (!query) return true;

  return [depot.name, depot.address ?? "", depot.isActive ? "actif" : "archivé"].some((value) =>
    value.toLowerCase().includes(query),
  );
}

function mergeDepotWithCounts(previousDepots: Depot[], nextDepot: Depot) {
  const previous = previousDepots.find((depot) => depot.id === nextDepot.id);
  return {
    ...nextDepot,
    vehicleCount: previous?.vehicleCount ?? nextDepot.vehicleCount ?? 0,
    userCount: previous?.userCount ?? nextDepot.userCount ?? 0,
  };
}

export default function DepotsClient({
  initialDepots,
}: {
  initialDepots: Depot[];
}) {
  const [depots, setDepots] = useState<Depot[]>(() => sortDepots(initialDepots));
  const [forms, setForms] = useState<Record<string, DepotForm>>(() => buildForms(initialDepots));
  const [createForm, setCreateForm] = useState<DepotForm>({ name: "", address: "" });
  const [selectedDepotId, setSelectedDepotId] = useState<string | null>(initialDepots[0]?.id ?? null);
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState<DepotStatusFilter>("");
  const [sortLabel, setSortLabel] = useState("NAME_ASC");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [archivingId, setArchivingId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    function syncFromHash() {
      if (window.location.hash === "#depots-create-form") {
        setShowCreateForm(true);
      }
    }

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  useEffect(() => {
    setIsEditing(false);
  }, [selectedDepotId]);

  function updateCreateForm(key: keyof DepotForm, value: string) {
    setCreateForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateDepotForm(id: string, key: keyof DepotForm, value: string) {
    setForms((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] ?? { name: "", address: "" }),
        [key]: value,
      },
    }));
  }

  function resetFilters() {
    setSearchInput("");
    setStatusFilter("");
    setSortLabel("NAME_ASC");
  }

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsCreating(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/depots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: createForm.name,
          address: createForm.address,
        }),
      });

      const data = (await res.json().catch(() => null)) as ApiResponse<Depot> | null;

      if (!res.ok || !data?.ok) {
        throw new Error(getApiError(data, "Erreur lors de la création du dépôt"));
      }

      const createdDepot: Depot = {
        ...data.data,
        vehicleCount: 0,
        userCount: 0,
      };

      setDepots((prev) => sortDepots([createdDepot, ...prev]));
      setForms((prev) => ({ ...prev, [createdDepot.id]: toDepotForm(createdDepot) }));
      setCreateForm({ name: "", address: "" });
      setSelectedDepotId(createdDepot.id);
      setShowCreateForm(false);
      setSuccess("Dépôt créé.");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setIsCreating(false);
    }
  }

  async function handleSave(id: string) {
    const form = forms[id];
    if (!form) return;

    setSavingId(id);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`/api/depots/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          address: form.address,
        }),
      });

      const data = (await res.json().catch(() => null)) as ApiResponse<Depot> | null;

      if (!res.ok || !data?.ok) {
        throw new Error(getApiError(data, "Erreur lors de la modification du dépôt"));
      }

      setDepots((prev) =>
        sortDepots(
          prev.map((item) => (item.id === id ? mergeDepotWithCounts(prev, data.data) : item)),
        ),
      );
      setForms((prev) => ({
        ...prev,
        [id]: toDepotForm({
          ...data.data,
          vehicleCount: depots.find((item) => item.id === id)?.vehicleCount ?? 0,
          userCount: depots.find((item) => item.id === id)?.userCount ?? 0,
        }),
      }));
      setIsEditing(false);
      setSuccess("Dépôt mis à jour.");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setSavingId(null);
    }
  }

  async function handleArchive(id: string) {
    const confirmed = window.confirm("Archiver ce dépôt ?");
    if (!confirmed) return;

    setArchivingId(id);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`/api/depots/${id}/archive`, {
        method: "POST",
      });

      const data = (await res.json().catch(() => null)) as ApiResponse<Depot> | null;

      if (!res.ok || !data?.ok) {
        throw new Error(getApiError(data, "Erreur lors de l'archivage du dépôt"));
      }

      setDepots((prev) =>
        sortDepots(
          prev.map((item) => (item.id === id ? mergeDepotWithCounts(prev, data.data) : item)),
        ),
      );
      setIsEditing(false);
      setSuccess("Dépôt archivé.");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setArchivingId(null);
    }
  }

  const filteredDepots = useMemo(() => {
    const matched = depots.filter((depot) => {
      if (!depotMatchesSearch(depot, searchInput)) return false;
      if (statusFilter === "ACTIVE" && !depot.isActive) return false;
      if (statusFilter === "ARCHIVED" && depot.isActive) return false;
      return true;
    });

    if (sortLabel === "NAME_ASC") {
      return [...matched].sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }));
    }

    return matched;
  }, [depots, searchInput, sortLabel, statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchInput, statusFilter, sortLabel, pageSize]);

  const selectedDepot = useMemo(
    () => depots.find((depot) => depot.id === selectedDepotId) ?? null,
    [depots, selectedDepotId],
  );

  const selectedDepotForm = selectedDepot ? forms[selectedDepot.id] ?? toDepotForm(selectedDepot) : null;

  const columns: DataTableColumn<Depot>[] = [
    {
      key: "selection",
      header: "",
      width: "48px",
      align: "center",
      render: (depot) => (
        <input
          type="checkbox"
          checked={selectedDepotId === depot.id}
          readOnly
          aria-label={`Sélection ${depot.name}`}
        />
      ),
    },
    {
      key: "name",
      header: "Nom",
      width: "170px",
      align: "left",
      render: (depot) => (
        <div className="depots-cell-main">
          <strong>{depot.name}</strong>
        </div>
      ),
    },
    {
      key: "address",
      header: "Adresse",
      width: "196px",
      align: "left",
      render: (depot) => <span className="depots-table-cell-subtle">{depot.address || "Adresse non renseignée"}</span>,
    },
        {
      key: "status",
      header: "Statut",
      width: "92px",
      align: "center",
      render: (depot) => (
        <div className="depots-status-badge-cell">
          <StatusBadge variant={depot.isActive ? "success" : "warning"}>
            {depot.isActive ? "Actif" : "Archivé"}
          </StatusBadge>
        </div>
      ),
    },
    {
      key: "vehicles",
      header: "Véhicules",
      width: "72px",
      align: "center",
      render: (depot) => depot.vehicleCount,
    },
    {
      key: "users",
      header: "Utilisateurs",
      width: "84px",
      align: "center",
      render: (depot) => depot.userCount,
    },
    {
      key: "updatedAt",
      header: "Dernière modif.",
      width: "98px",
      align: "left",
      render: (depot) => {
        const parts = formatDateParts(depot.updatedAt);
        return (
          <span className="depots-updated-cell">
            <strong>{parts.date}</strong>
            {parts.time ? <small>{parts.time}</small> : null}
          </span>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      align: "left",
      width: "70px",
      render: (depot) => (
        <div className="depots-table-actions">
          <span className="depots-table-actions__avatar" aria-hidden="true">
            {(depot.name || "D").slice(0, 2).toUpperCase()}
          </span>
          <button type="button" className="depots-table-actions__menu" onClick={() => setSelectedDepotId(depot.id)} aria-label={`Actions ${depot.name}`}>
            <MoreHorizontal size={16} />
          </button>
        </div>
      ),
    },
  ];

  const totalVisible = filteredDepots.length;
  const totalPages = Math.max(1, Math.ceil(totalVisible / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const firstRowIndex = totalVisible === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const lastRowIndex = totalVisible === 0 ? 0 : Math.min(safeCurrentPage * pageSize, totalVisible);
  const pagedDepots = totalVisible === 0 ? [] : filteredDepots.slice(firstRowIndex - 1, lastRowIndex);

  return (
    <section className="depots-module">
      {error ? <ErrorMessage title="Erreur module dépôts" message={error} /> : null}
      {success ? <div className="depots-alert depots-alert--success">{success}</div> : null}

      <div className="depots-layout">
        <div className="depots-layout__main">
          <section className="depots-card">
            <div className="depots-filters">
              <label className="depots-field">
                <div className="depots-input-with-icon">
                  <Search size={16} aria-hidden="true" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    placeholder="Rechercher un dépôt..."
                  />
                </div>
              </label>

              <label className="depots-field">
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value as DepotStatusFilter)}
                >
                  <option value="">Statut</option>
                  <option value="ACTIVE">Actif</option>
                  <option value="ARCHIVED">Archivé</option>
                </select>
              </label>

              <label className="depots-field depots-field--tri">
                <select value={sortLabel} onChange={(event) => setSortLabel(event.target.value)}>
                  <option value="NAME_ASC">Nom A → Z</option>
                </select>
              </label>

              <div className="depots-field depots-field--filter-action">
                <ActionButton size="md" variant="secondary" leadingIcon={<Filter size={16} />} onClick={resetFilters}>
                  Filtrer
                </ActionButton>
              </div>
            </div>

            <DataTable
              columns={columns}
              rows={pagedDepots}
              rowKey={(depot) => depot.id}
              selectedRowKey={selectedDepotId}
              onRowClick={(depot) => setSelectedDepotId(depot.id)}
              emptyTitle="Aucun dépôt"
              emptyMessage="Aucun dépôt ne correspond aux filtres sélectionnés."
              caption="Dépôts de la société courante"
              minWidth={860}
              className="depots-table"
            />

            <footer className="depots-table-footer">
              <span>{firstRowIndex} - {lastRowIndex} sur {totalVisible} dépôts</span>
              <div className="depots-table-footer__pager">
                <button
                  type="button"
                  aria-label="Page précédente"
                  disabled={safeCurrentPage <= 1}
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                >
                  ‹
                </button>
                <button type="button" className="is-active">
                  {safeCurrentPage}
                </button>
                <button
                  type="button"
                  aria-label="Page suivante"
                  disabled={safeCurrentPage >= totalPages}
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                >
                  ›
                </button>
              </div>
              <label>
                Lignes par page
                <select value={String(pageSize)} onChange={(event) => setPageSize(Number(event.target.value))}>
                  <option value="10">10</option>
                  <option value="25">25</option>
                </select>
              </label>
            </footer>
          </section>
        </div>

        <aside className="depots-detail-panel">
          {showCreateForm ? (
            <section id="depots-create-form" className="depots-detail-card depots-create-panel">
              <div className="depots-detail-card__head">
                <h2 className="depots-detail-card__title">Créer un dépôt</h2>
                <button type="button" className="depots-detail-card__close" onClick={() => setShowCreateForm(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreate} className="depots-form depots-create-disclosure__form">
                <div className="depots-form-grid depots-form-grid--edit">
                  <label className="depots-field">
                    <span className="depots-field__label">Nom</span>
                    <input
                      value={createForm.name}
                      onChange={(event) => updateCreateForm("name", event.target.value)}
                      disabled={isCreating}
                      required
                    />
                  </label>

                  <label className="depots-field">
                    <span className="depots-field__label">Adresse</span>
                    <input
                      value={createForm.address}
                      onChange={(event) => updateCreateForm("address", event.target.value)}
                      disabled={isCreating}
                    />
                  </label>
                </div>

                <div className="depots-actions depots-actions--end depots-actions--footer">
                  <ActionButton type="submit" variant="primary" disabled={isCreating}>
                    {isCreating ? "Création..." : "Créer un dépôt"}
                  </ActionButton>
                </div>
              </form>
            </section>
          ) : null}

          {selectedDepot && selectedDepotForm ? (
            <section className="depots-detail-card">
              <div className="depots-detail-card__head">
                <h2 className="depots-detail-card__title">{selectedDepot.name}</h2>
                <div className="depots-detail-card__head-actions">
                  <StatusBadge variant={selectedDepot.isActive ? "success" : "warning"}>
                    {selectedDepot.isActive ? "Actif" : "Archivé"}
                  </StatusBadge>
                  <button type="button" className="depots-detail-card__close" onClick={() => setSelectedDepotId(null)}>
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="depots-detail-block">
                <h3>Identité du dépôt</h3>
                {isEditing ? (
                  <div className="depots-form-grid depots-form-grid--edit">
                    <label className="depots-field">
                      <span className="depots-field__label">Nom</span>
                      <input
                        value={selectedDepotForm.name}
                        onChange={(event) => updateDepotForm(selectedDepot.id, "name", event.target.value)}
                        disabled={savingId === selectedDepot.id || archivingId === selectedDepot.id}
                        required
                      />
                    </label>
                  </div>
                ) : (
                  <div className="depots-detail-pair-list">
                    <div><span>Nom</span><strong>{selectedDepot.name}</strong></div>
                    <div><span>Statut</span><strong>{selectedDepot.isActive ? "Actif" : "Archivé"}</strong></div>
                  </div>
                )}
              </div>

              <div className="depots-detail-block">
                <h3>Adresse</h3>
                {isEditing ? (
                  <div className="depots-form-grid depots-form-grid--edit">
                    <label className="depots-field">
                      <span className="depots-field__label">Adresse complète</span>
                      <input
                        value={selectedDepotForm.address}
                        onChange={(event) => updateDepotForm(selectedDepot.id, "address", event.target.value)}
                        disabled={savingId === selectedDepot.id || archivingId === selectedDepot.id}
                      />
                    </label>
                  </div>
                ) : (
                    <div className="depots-detail-pair-list">
                      <div><span>Adresse</span><strong>{selectedDepot.address || "Adresse non renseignée"}</strong></div>
                    </div>
                )}
              </div>

              <div className="depots-detail-block">
                <h3>Rattachements</h3>
                <div className="depots-attachments-list">
                  <div>
                    <span className="depots-attachments-icon depots-attachments-icon--teal" aria-hidden="true">
                      <Ambulance size={16} />
                    </span>
                    <div>
                      <strong>Véhicules rattachés</strong>
                      <p>{selectedDepot.vehicleCount} véhicules</p>
                    </div>
                  </div>
                  <div>
                    <span className="depots-attachments-icon depots-attachments-icon--blue" aria-hidden="true">
                      <UsersRound size={16} />
                    </span>
                    <div>
                      <strong>Utilisateurs rattachés</strong>
                      <p>{selectedDepot.userCount} utilisateurs</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="depots-detail-block">
                <h3>Notes</h3>
                <div className="depots-detail-note">
                  <Info size={16} aria-hidden="true" />
                  <p>Dernière mise à jour : {formatDateTime(selectedDepot.updatedAt)}.</p>
                </div>
              </div>

              <div className="depots-danger-zone">
                <h3>Zone danger</h3>
                <p>
                  Cette action est irréversible. Toutes les données restent conservées, mais le dépôt sera inaccessible.
                </p>
                <ActionButton
                  variant="danger"
                  leadingIcon={<Archive size={16} />}
                  onClick={() => handleArchive(selectedDepot.id)}
                  disabled={!selectedDepot.isActive || savingId === selectedDepot.id || archivingId === selectedDepot.id}
                >
                  {archivingId === selectedDepot.id ? "Archivage..." : "Archiver le dépôt"}
                </ActionButton>
              </div>

              <div className="depots-actions depots-actions--end depots-actions--footer">
                <ActionButton variant="secondary" leadingIcon={<Landmark size={16} />} onClick={() => setIsEditing((v) => !v)}>
                  Modifier
                </ActionButton>
                <ActionButton
                  variant="primary"
                  leadingIcon={<Save size={16} />}
                  onClick={() => handleSave(selectedDepot.id)}
                  disabled={!isEditing || savingId === selectedDepot.id || archivingId === selectedDepot.id}
                >
                  {savingId === selectedDepot.id ? "Enregistrement..." : "Enregistrer"}
                </ActionButton>
              </div>
            </section>
          ) : (
            <EmptyState
              title="Aucun dépôt sélectionné"
              message="Sélectionnez une ligne de la liste pour afficher le panneau de détail."
            />
          )}
        </aside>
      </div>
    </section>
  );
}


