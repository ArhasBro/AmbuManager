"use client";

import { useMemo, useRef, useState } from "react";
import { Ambulance, Archive, Filter, Info, Landmark, Plus, Save, Search, UsersRound } from "lucide-react";

import {
  ActionButton,
  DataTable,
  EmptyState,
  ErrorMessage,
  FilterBar,
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

function depotMatchesSearch(depot: Depot, searchInput: string) {
  const query = searchInput.trim().toLowerCase();
  if (!query) return true;

  return [
    depot.name,
    depot.address ?? "",
    depot.isActive ? "actif" : "archive",
  ].some((value) => value.toLowerCase().includes(query));
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

  const [isCreating, setIsCreating] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [archivingId, setArchivingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const selectedNameRef = useRef<HTMLInputElement | null>(null);

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
  }

  function focusSelectedNameField() {
    selectedNameRef.current?.focus();
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
        throw new Error(getApiError(data, "Erreur lors de la creation du depot"));
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
      setSuccess("Depot cree.");
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
        throw new Error(getApiError(data, "Erreur lors de la modification du depot"));
      }

      setDepots((prev) => sortDepots(prev.map((item) => (
        item.id === id ? mergeDepotWithCounts(prev, data.data) : item
      ))));
      setForms((prev) => ({ ...prev, [id]: toDepotForm({
        ...data.data,
        vehicleCount: depots.find((item) => item.id === id)?.vehicleCount ?? 0,
        userCount: depots.find((item) => item.id === id)?.userCount ?? 0,
      }) }));
      setSuccess("Depot mis a jour.");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setSavingId(null);
    }
  }

  async function handleArchive(id: string) {
    const confirmed = window.confirm("Archiver ce depot ?");
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
        throw new Error(getApiError(data, "Erreur lors de l'archivage du depot"));
      }

      setDepots((prev) => sortDepots(prev.map((item) => (
        item.id === id ? mergeDepotWithCounts(prev, data.data) : item
      ))));
      setSuccess("Depot archive.");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setArchivingId(null);
    }
  }

  const depotStats = useMemo(() => {
    let active = 0;
    let archived = 0;
    let attachedVehicles = 0;
    let attachedUsers = 0;

    for (const depot of depots) {
      if (depot.isActive) {
        active += 1;
      } else {
        archived += 1;
      }
      attachedVehicles += depot.vehicleCount;
      attachedUsers += depot.userCount;
    }

    return {
      total: depots.length,
      active,
      archived,
      attachedVehicles,
      attachedUsers,
    };
  }, [depots]);

  const filteredDepots = useMemo(() => {
    return depots.filter((depot) => {
      if (!depotMatchesSearch(depot, searchInput)) return false;

      if (statusFilter === "ACTIVE" && !depot.isActive) return false;
      if (statusFilter === "ARCHIVED" && depot.isActive) return false;

      return true;
    });
  }, [depots, searchInput, statusFilter]);

  const selectedDepot = useMemo(
    () => depots.find((depot) => depot.id === selectedDepotId) ?? null,
    [depots, selectedDepotId],
  );

  const selectedDepotForm = selectedDepot ? forms[selectedDepot.id] ?? toDepotForm(selectedDepot) : null;

  const columns: DataTableColumn<Depot>[] = [
    {
      key: "name",
      header: "Nom",
      width: "300px",
      render: (depot) => (
        <div className="depots-cell-main">
          <strong>{depot.name}</strong>
          <span className="depots-table-cell-subtle">{depot.address || "Adresse non renseignee"}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Statut",
      width: "130px",
      render: (depot) => (
        <StatusBadge variant={depot.isActive ? "success" : "warning"}>
          {depot.isActive ? "Actif" : "Archive"}
        </StatusBadge>
      ),
    },
    {
      key: "vehicles",
      header: "Vehicules",
      width: "120px",
      render: (depot) => depot.vehicleCount,
    },
    {
      key: "users",
      header: "Utilisateurs",
      width: "130px",
      render: (depot) => depot.userCount,
    },
    {
      key: "updatedAt",
      header: "Derniere modif.",
      width: "190px",
      render: (depot) => formatDateTime(depot.updatedAt),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      width: "220px",
      render: (depot) => {
        const isSaving = savingId === depot.id;
        const isArchiving = archivingId === depot.id;
        const isBusy = isSaving || isArchiving;

        return (
          <div className="depots-actions depots-actions--end depots-actions--wrap">
            <ActionButton
              size="sm"
              variant="secondary"
              disabled={isBusy}
              onClick={() => setSelectedDepotId(depot.id)}
            >
              Modifier
            </ActionButton>
            {depot.isActive ? (
              <ActionButton
                size="sm"
                variant="danger"
                disabled={isBusy}
                onClick={() => handleArchive(depot.id)}
              >
                {isArchiving ? "Archivage..." : "Archiver"}
              </ActionButton>
            ) : null}
          </div>
        );
      },
    },
  ];

  return (
    <section className="depots-module">
      {error ? <ErrorMessage title="Erreur module depots" message={error} /> : null}
      {success ? <div className="depots-alert depots-alert--success">{success}</div> : null}

      <div className="depots-layout">
        <div className="depots-layout__main">
          <section id="depots-create-form" className="depots-card">
            <div className="depots-card__head">
              <h2 className="depots-card__title">Creer un depot</h2>
              <p className="depots-card__description">
                Creation rapide d&apos;un depot avec nom et adresse.
              </p>
            </div>

            <form onSubmit={handleCreate} className="depots-form">
              <div className="depots-form-grid depots-form-grid--create">
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

                <div className="depots-actions depots-actions--end depots-actions--align-end">
                  <ActionButton type="submit" variant="primary" disabled={isCreating} leadingIcon={<Plus size={16} />}>
                    {isCreating ? "Creation..." : "Creer un depot"}
                  </ActionButton>
                </div>
              </div>
            </form>
          </section>

          <section className="depots-card">
            <div className="depots-card__head">
              <h2 className="depots-card__title">Liste des depots</h2>
              <p className="depots-card__description">
                Filtrage, consultation et selection d&apos;un depot pour edition.
              </p>
            </div>

            <FilterBar
              summary={`Depots ${depotStats.total} | Actifs ${depotStats.active} | Archives ${depotStats.archived} | Vehicules ${depotStats.attachedVehicles} | Utilisateurs ${depotStats.attachedUsers}`}
              actions={(
                <ActionButton size="sm" variant="ghost" onClick={resetFilters}>
                  Reinitialiser
                </ActionButton>
              )}
            >
              <label className="depots-field">
                <span className="depots-field__label">Recherche</span>
                <div className="depots-input-with-icon">
                  <Search size={16} aria-hidden="true" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    placeholder="Rechercher un depot..."
                  />
                </div>
              </label>

              <label className="depots-field">
                <span className="depots-field__label">Statut</span>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value as DepotStatusFilter)}
                >
                  <option value="">Tous les statuts</option>
                  <option value="ACTIVE">Actif</option>
                  <option value="ARCHIVED">Archive</option>
                </select>
              </label>

              <div className="depots-field depots-field--filter-action">
                <span className="depots-field__label">Actions</span>
                <ActionButton size="md" variant="secondary" leadingIcon={<Filter size={16} />} onClick={resetFilters}>
                  Filtrer
                </ActionButton>
              </div>
            </FilterBar>

            <DataTable
              columns={columns}
              rows={filteredDepots}
              rowKey={(depot) => depot.id}
              selectedRowKey={selectedDepotId}
              onRowClick={(depot) => setSelectedDepotId(depot.id)}
              emptyTitle="Aucun depot"
              emptyMessage="Aucun depot ne correspond aux filtres selectionnes."
              caption="Depots de la societe courante"
              minWidth={1040}
            />
          </section>
        </div>

        <aside className="depots-detail-panel">
          {selectedDepot && selectedDepotForm ? (
            <section className="depots-detail-card">
              <div className="depots-detail-card__head">
                <h2 className="depots-detail-card__title">{selectedDepot.name}</h2>
                <StatusBadge variant={selectedDepot.isActive ? "success" : "warning"}>
                  {selectedDepot.isActive ? "Actif" : "Archive"}
                </StatusBadge>
              </div>

              <div className="depots-detail-block">
                <h3>Identite du depot</h3>
                <div className="depots-form-grid depots-form-grid--edit">
                  <label className="depots-field">
                    <span className="depots-field__label">Nom</span>
                    <input
                      ref={selectedNameRef}
                      value={selectedDepotForm.name}
                      onChange={(event) => updateDepotForm(selectedDepot.id, "name", event.target.value)}
                      disabled={savingId === selectedDepot.id || archivingId === selectedDepot.id}
                      required
                    />
                  </label>

                  <label className="depots-field">
                    <span className="depots-field__label">Adresse</span>
                    <input
                      value={selectedDepotForm.address}
                      onChange={(event) => updateDepotForm(selectedDepot.id, "address", event.target.value)}
                      disabled={savingId === selectedDepot.id || archivingId === selectedDepot.id}
                    />
                  </label>
                </div>
              </div>

              <div className="depots-detail-block">
                <h3>Rattachements</h3>
                <div className="depots-attachments-list">
                  <div>
                    <span className="depots-attachments-icon depots-attachments-icon--teal" aria-hidden="true">
                      <Ambulance size={16} />
                    </span>
                    <div>
                      <strong>Vehicules rattaches</strong>
                      <p>{selectedDepot.vehicleCount} vehicules</p>
                    </div>
                  </div>
                  <div>
                    <span className="depots-attachments-icon depots-attachments-icon--blue" aria-hidden="true">
                      <UsersRound size={16} />
                    </span>
                    <div>
                      <strong>Utilisateurs rattaches</strong>
                      <p>{selectedDepot.userCount} utilisateurs</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="depots-detail-note">
                <Info size={16} aria-hidden="true" />
                <p>
                  Derniere modification: {formatDateTime(selectedDepot.updatedAt)}.
                </p>
              </div>

              <div className="depots-danger-zone">
                <h3>Zone danger</h3>
                <p>
                  Cette action est irreversible. Les donnees restent conservees, mais le depot devient inactif.
                </p>
                <ActionButton
                  variant="danger"
                  leadingIcon={<Archive size={16} />}
                  onClick={() => handleArchive(selectedDepot.id)}
                  disabled={!selectedDepot.isActive || savingId === selectedDepot.id || archivingId === selectedDepot.id}
                >
                  {archivingId === selectedDepot.id ? "Archivage..." : "Archiver le depot"}
                </ActionButton>
              </div>

              <div className="depots-actions depots-actions--between depots-actions--footer">
                <ActionButton variant="secondary" onClick={focusSelectedNameField} leadingIcon={<Landmark size={16} />}>
                  Modifier
                </ActionButton>
                <ActionButton
                  variant="primary"
                  leadingIcon={<Save size={16} />}
                  onClick={() => handleSave(selectedDepot.id)}
                  disabled={savingId === selectedDepot.id || archivingId === selectedDepot.id}
                >
                  {savingId === selectedDepot.id ? "Enregistrement..." : "Enregistrer"}
                </ActionButton>
              </div>
            </section>
          ) : (
            <EmptyState
              title="Aucun depot selectionne"
              message="Selectionnez une ligne de la liste pour afficher le panneau de detail."
            />
          )}
        </aside>
      </div>
    </section>
  );
}
