"use client";

import { useMemo, useState } from "react";

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

      setDepots((prev) => sortDepots([data.data, ...prev]));
      setForms((prev) => ({ ...prev, [data.data.id]: toDepotForm(data.data) }));
      setCreateForm({ name: "", address: "" });
      setSelectedDepotId(data.data.id);
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

      setDepots((prev) =>
        sortDepots(prev.map((item) => (item.id === id ? data.data : item))),
      );
      setForms((prev) => ({ ...prev, [id]: toDepotForm(data.data) }));
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

      setDepots((prev) =>
        sortDepots(prev.map((item) => (item.id === id ? data.data : item))),
      );
      setForms((prev) => ({ ...prev, [id]: toDepotForm(data.data) }));
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

    for (const depot of depots) {
      if (depot.isActive) {
        active += 1;
      } else {
        archived += 1;
      }
    }

    return {
      total: depots.length,
      active,
      archived,
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
      header: "Depot",
      width: "280px",
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
        <StatusBadge variant={depot.isActive ? "success" : "neutral"}>
          {depot.isActive ? "Actif" : "Archive"}
        </StatusBadge>
      ),
    },
    {
      key: "updatedAt",
      header: "Mise a jour",
      width: "190px",
      render: (depot) => formatDateTime(depot.updatedAt),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      width: "250px",
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

      <section className="depots-card">
        <div className="depots-card__head">
          <h2 className="depots-card__title">Creer un depot</h2>
          <p className="depots-card__description">
            Creation rapide d&apos;un depot avec nom et adresse, sans impact sur la logique metier.
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
              <ActionButton type="submit" variant="primary" disabled={isCreating}>
                {isCreating ? "Creation..." : "Creer le depot"}
              </ActionButton>
            </div>
          </div>
        </form>
      </section>

      <section className="depots-card">
        <div className="depots-card__head">
          <h2 className="depots-card__title">Liste des depots</h2>
          <p className="depots-card__description">
            Consultation, filtrage simple et archivage visuel des depots de la societe courante.
          </p>
        </div>

        <FilterBar
          summary={`Total ${depotStats.total} | Actifs ${depotStats.active} | Archives ${depotStats.archived}`}
          actions={(
            <ActionButton size="sm" variant="ghost" onClick={resetFilters}>
              Reinitialiser
            </ActionButton>
          )}
        >
          <label className="depots-field">
            <span className="depots-field__label">Recherche</span>
            <input
              type="text"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Nom, adresse ou statut"
            />
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
          minWidth={980}
        />
      </section>

      {selectedDepot && selectedDepotForm ? (
        <section className="depots-card">
          <div className="depots-card__head">
            <h2 className="depots-card__title">Modifier le depot selectionne</h2>
            <p className="depots-card__description">
              Edition visuelle des informations de depot et archivage logique si necessaire.
            </p>
          </div>

          <div className="depots-selection-card">
            <strong>{selectedDepot.name}</strong>
            <div className="depots-inline-status">
              <StatusBadge variant={selectedDepot.isActive ? "success" : "neutral"}>
                {selectedDepot.isActive ? "Actif" : "Archive"}
              </StatusBadge>
              <StatusBadge variant="neutral">Cree le {formatDateTime(selectedDepot.createdAt)}</StatusBadge>
              <StatusBadge variant="neutral">Maj le {formatDateTime(selectedDepot.updatedAt)}</StatusBadge>
            </div>
          </div>

          <div className="depots-form">
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

              <label className="depots-field">
                <span className="depots-field__label">Adresse</span>
                <input
                  value={selectedDepotForm.address}
                  onChange={(event) => updateDepotForm(selectedDepot.id, "address", event.target.value)}
                  disabled={savingId === selectedDepot.id || archivingId === selectedDepot.id}
                />
              </label>
            </div>

            <div className="depots-actions depots-actions--end">
              <ActionButton
                variant="primary"
                onClick={() => handleSave(selectedDepot.id)}
                disabled={savingId === selectedDepot.id || archivingId === selectedDepot.id}
              >
                {savingId === selectedDepot.id ? "Enregistrement..." : "Enregistrer"}
              </ActionButton>
              {selectedDepot.isActive ? (
                <ActionButton
                  variant="danger"
                  onClick={() => handleArchive(selectedDepot.id)}
                  disabled={savingId === selectedDepot.id || archivingId === selectedDepot.id}
                >
                  {archivingId === selectedDepot.id ? "Archivage..." : "Archiver"}
                </ActionButton>
              ) : null}
            </div>
          </div>
        </section>
      ) : (
        <EmptyState
          title="Aucun depot selectionne"
          message="Selectionnez une ligne de la liste pour afficher le formulaire d'edition."
        />
      )}
    </section>
  );
}
