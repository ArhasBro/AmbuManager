"use client";

import { useMemo, useState } from "react";

import { ActionButton, DataTable, ErrorMessage, FilterBar, StatCard, StatusBadge, type DataTableColumn } from "@/app/ui";

import { AddVehicleForm } from "./add-vehicle-form";

type DepotOption = {
  id: string;
  name: string;
  isActive: boolean;
};

type Vehicle = {
  id: string;
  immatriculation: string;
  type: string | null;
  status: string | null;
  depotId: string | null;
  insuranceExpiresAt: string | null;
  technicalInspectionExpiresAt: string | null;
  registrationDocumentPresent: boolean;
  sanitaryApprovalExpiresAt: string | null;
  depot: DepotOption | null;
  createdAt: string;
  updatedAt: string;
};

type ApiSuccess<T> = { ok: true; data: T };
type ApiFailure = { ok: false; error: string };
type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

type VehicleTypeOption = "AMBULANCE" | "VSL" | "TAXI";
type VehicleStatusOption = "ACTIVE" | "MAINTENANCE" | "OUT_OF_SERVICE";
type VehicleDocumentStatus = "conforme" | "bientot_expire" | "expire";
type VehicleStatusFilter = "" | VehicleStatusOption;
type VehicleTypeFilter = "" | VehicleTypeOption;
type VehicleDocumentFilter = "" | VehicleDocumentStatus;

const VEHICLE_TYPE_OPTIONS: VehicleTypeOption[] = ["AMBULANCE", "VSL", "TAXI"];
const VEHICLE_STATUS_OPTIONS: VehicleStatusOption[] = ["ACTIVE", "MAINTENANCE", "OUT_OF_SERVICE"];
const DOCUMENT_WARNING_WINDOW_DAYS = 30;

function getApiError<T>(payload: ApiResponse<T> | null, fallback: string) {
  return payload && !payload.ok ? payload.error : fallback;
}

function buildInitialSelectedDepotIds(vehicles: Vehicle[]) {
  return Object.fromEntries(vehicles.map((vehicle) => [vehicle.id, vehicle.depotId ?? ""]));
}

function getDepotLabel(depot: DepotOption) {
  return depot.isActive ? depot.name : `${depot.name} (archive)`;
}

function compareVehiclesByImmatriculation(a: Vehicle, b: Vehicle) {
  return a.immatriculation.localeCompare(b.immatriculation, "fr", { sensitivity: "base" });
}

function isVehicleTypeOption(value: string): value is VehicleTypeOption {
  return VEHICLE_TYPE_OPTIONS.some((option) => option === value);
}

function isVehicleStatusOption(value: string): value is VehicleStatusOption {
  return VEHICLE_STATUS_OPTIONS.some((option) => option === value);
}

function getEditableVehicleType(value: Vehicle["type"]): VehicleTypeOption {
  return VEHICLE_TYPE_OPTIONS.find((option) => option === value) ?? "AMBULANCE";
}

function getEditableVehicleStatus(value: Vehicle["status"]): VehicleStatusOption {
  return VEHICLE_STATUS_OPTIONS.find((option) => option === value) ?? "ACTIVE";
}

function formatDateInputValue(value: string | null) {
  return value ? value.slice(0, 10) : "";
}

function formatDocumentDateLabel(value: string | null) {
  if (!value) return "Non renseignee";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("fr-FR");
}

function getVehicleTypeLabel(value: string | null) {
  if (value === "AMBULANCE") return "Ambulance";
  if (value === "VSL") return "VSL";
  if (value === "TAXI") return "Taxi";
  return "Type non renseigne";
}

function getVehicleStatusLabel(value: string | null) {
  if (value === "ACTIVE") return "Disponible";
  if (value === "MAINTENANCE") return "Maintenance";
  if (value === "OUT_OF_SERVICE") return "Hors service";
  return "Statut non renseigne";
}

function vehicleStatusBadgeVariant(value: string | null): "neutral" | "success" | "warning" | "danger" {
  if (value === "ACTIVE") return "success";
  if (value === "MAINTENANCE") return "warning";
  if (value === "OUT_OF_SERVICE") return "danger";
  return "neutral";
}

function documentStatusBadgeVariant(value: VehicleDocumentStatus): "success" | "warning" | "danger" {
  if (value === "conforme") return "success";
  if (value === "bientot_expire") return "warning";
  return "danger";
}

function documentStatusLabel(value: VehicleDocumentStatus) {
  if (value === "conforme") return "Conforme";
  if (value === "bientot_expire") return "Bientot expire";
  return "Expire";
}

function depotStatusVariant(depot: DepotOption | null): "neutral" | "success" | "warning" {
  if (!depot) return "neutral";
  return depot.isActive ? "success" : "warning";
}

function getStartOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function parseDocumentDate(value: string | null) {
  if (!value) return null;

  const isoDatePart = value.slice(0, 10);
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDatePart);

  if (!match) {
    const fallbackDate = new Date(value);

    if (Number.isNaN(fallbackDate.getTime())) {
      return null;
    }

    return new Date(fallbackDate.getFullYear(), fallbackDate.getMonth(), fallbackDate.getDate());
  }

  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
}

function isExpiredDocumentDate(value: string | null, today: Date) {
  const date = parseDocumentDate(value);

  if (!date) return false;

  return date.getTime() < today.getTime();
}

function isSoonExpiringDocumentDate(value: string | null, today: Date, warningLimit: Date) {
  const date = parseDocumentDate(value);

  if (!date) return false;

  return date.getTime() >= today.getTime() && date.getTime() <= warningLimit.getTime();
}

function getVehicleDocumentStatus(vehicle: Vehicle, today: Date, warningLimit: Date): VehicleDocumentStatus {
  const hasExpiredDocument =
    isExpiredDocumentDate(vehicle.insuranceExpiresAt, today)
    || isExpiredDocumentDate(vehicle.technicalInspectionExpiresAt, today)
    || isExpiredDocumentDate(vehicle.sanitaryApprovalExpiresAt, today);

  if (hasExpiredDocument || !vehicle.registrationDocumentPresent) {
    return "expire";
  }

  const hasSoonExpiringDocument =
    isSoonExpiringDocumentDate(vehicle.insuranceExpiresAt, today, warningLimit)
    || isSoonExpiringDocumentDate(vehicle.technicalInspectionExpiresAt, today, warningLimit)
    || isSoonExpiringDocumentDate(vehicle.sanitaryApprovalExpiresAt, today, warningLimit);

  if (hasSoonExpiringDocument) {
    return "bientot_expire";
  }

  return "conforme";
}

function vehicleMatchesQuery(vehicle: Vehicle, query: string) {
  if (!query) return true;

  const normalizedQuery = query.toLowerCase();
  const values = [
    vehicle.immatriculation,
    getVehicleTypeLabel(vehicle.type),
    getVehicleStatusLabel(vehicle.status),
    vehicle.depot?.name ?? "",
  ];

  return values.some((value) => value.toLowerCase().includes(normalizedQuery));
}

function toSafeTypeFilter(value: string): VehicleTypeFilter {
  if (!value) return "";
  return isVehicleTypeOption(value) ? value : "";
}

function toSafeStatusFilter(value: string): VehicleStatusFilter {
  if (!value) return "";
  return isVehicleStatusOption(value) ? value : "";
}

function toSafeDocumentFilter(value: string): VehicleDocumentFilter {
  if (!value) return "";
  if (value === "conforme" || value === "bientot_expire" || value === "expire") return value;
  return "";
}

export default function VehiclesClient({
  initialVehicles,
  availableDepots,
  canCreateVehicle,
}: {
  initialVehicles: Vehicle[];
  availableDepots: DepotOption[];
  canCreateVehicle: boolean;
}) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [selectedDepotIds, setSelectedDepotIds] = useState<Record<string, string>>(() =>
    buildInitialSelectedDepotIds(initialVehicles),
  );
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [archivingVehicleId, setArchivingVehicleId] = useState<string | null>(null);
  const [savingDepotVehicleId, setSavingDepotVehicleId] = useState<string | null>(null);
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);
  const [editImmatriculation, setEditImmatriculation] = useState("");
  const [editType, setEditType] = useState<VehicleTypeOption>("AMBULANCE");
  const [editStatus, setEditStatus] = useState<VehicleStatusOption>("ACTIVE");
  const [editInsuranceExpiresAt, setEditInsuranceExpiresAt] = useState("");
  const [editTechnicalInspectionExpiresAt, setEditTechnicalInspectionExpiresAt] = useState("");
  const [editRegistrationDocumentPresent, setEditRegistrationDocumentPresent] = useState(false);
  const [editSanitaryApprovalExpiresAt, setEditSanitaryApprovalExpiresAt] = useState("");
  const [savingEditVehicleId, setSavingEditVehicleId] = useState<string | null>(null);

  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState<VehicleStatusFilter>("");
  const [typeFilter, setTypeFilter] = useState<VehicleTypeFilter>("");
  const [documentFilter, setDocumentFilter] = useState<VehicleDocumentFilter>("");

  const depotOptions = useMemo(() => availableDepots, [availableDepots]);
  const displayVehicles = useMemo(() => [...vehicles].sort(compareVehiclesByImmatriculation), [vehicles]);

  const documentStatusContext = useMemo(() => {
    const today = getStartOfToday();
    const warningLimit = new Date(today);
    warningLimit.setDate(warningLimit.getDate() + DOCUMENT_WARNING_WINDOW_DAYS);

    return { today, warningLimit };
  }, []);

  const documentStatusByVehicleId = useMemo(() => {
    const entries = displayVehicles.map((vehicle) => {
      const status = getVehicleDocumentStatus(vehicle, documentStatusContext.today, documentStatusContext.warningLimit);
      return [vehicle.id, status] as const;
    });

    return new Map<string, VehicleDocumentStatus>(entries);
  }, [displayVehicles, documentStatusContext.today, documentStatusContext.warningLimit]);

  const filteredVehicles = useMemo(() => {
    return displayVehicles.filter((vehicle) => {
      if (!vehicleMatchesQuery(vehicle, searchInput.trim())) return false;
      if (typeFilter && vehicle.type !== typeFilter) return false;
      if (statusFilter && vehicle.status !== statusFilter) return false;

      const documentStatus = documentStatusByVehicleId.get(vehicle.id) ?? "conforme";
      if (documentFilter && documentStatus !== documentFilter) return false;

      return true;
    });
  }, [displayVehicles, documentFilter, documentStatusByVehicleId, searchInput, statusFilter, typeFilter]);

  const vehicleStats = useMemo(() => {
    const counts = {
      total: displayVehicles.length,
      conformes: 0,
      bientotExpires: 0,
      expires: 0,
      indisponibles: 0,
    };

    for (const vehicle of displayVehicles) {
      const documentStatus = documentStatusByVehicleId.get(vehicle.id) ?? "conforme";
      if (documentStatus === "conforme") counts.conformes += 1;
      if (documentStatus === "bientot_expire") counts.bientotExpires += 1;
      if (documentStatus === "expire") counts.expires += 1;
      if (vehicle.status === "MAINTENANCE" || vehicle.status === "OUT_OF_SERVICE") counts.indisponibles += 1;
    }

    return counts;
  }, [displayVehicles, documentStatusByVehicleId]);

  const editingVehicle = useMemo(
    () => displayVehicles.find((vehicle) => vehicle.id === editingVehicleId) ?? null,
    [displayVehicles, editingVehicleId],
  );

  function clearFeedback() {
    setError(null);
    setSuccessMessage(null);
  }

  function resetEditForm() {
    setEditingVehicleId(null);
    setEditImmatriculation("");
    setEditType("AMBULANCE");
    setEditStatus("ACTIVE");
    setEditInsuranceExpiresAt("");
    setEditTechnicalInspectionExpiresAt("");
    setEditRegistrationDocumentPresent(false);
    setEditSanitaryApprovalExpiresAt("");
  }

  function openEditVehicle(vehicle: Vehicle) {
    clearFeedback();
    setEditingVehicleId(vehicle.id);
    setEditImmatriculation(vehicle.immatriculation);
    setEditType(getEditableVehicleType(vehicle.type));
    setEditStatus(getEditableVehicleStatus(vehicle.status));
    setEditInsuranceExpiresAt(formatDateInputValue(vehicle.insuranceExpiresAt));
    setEditTechnicalInspectionExpiresAt(formatDateInputValue(vehicle.technicalInspectionExpiresAt));
    setEditRegistrationDocumentPresent(vehicle.registrationDocumentPresent);
    setEditSanitaryApprovalExpiresAt(formatDateInputValue(vehicle.sanitaryApprovalExpiresAt));
  }

  async function handleAddVehicle(payload: {
    immatriculation: string;
    type: string;
    status: string;
  }) {
    setIsSubmitting(true);
    clearFeedback();

    try {
      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => null)) as ApiResponse<Vehicle> | null;

      if (!res.ok || !data?.ok) {
        throw new Error(getApiError(data, "Erreur lors de la creation du vehicule"));
      }

      setVehicles((prev) => [...prev, data.data]);
      setSelectedDepotIds((prev) => ({
        ...prev,
        [data.data.id]: data.data.depotId ?? "",
      }));
      setSuccessMessage(`Vehicule ${data.data.immatriculation} ajoute.`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSaveVehicle(vehicleId: string) {
    setSavingEditVehicleId(vehicleId);
    clearFeedback();

    try {
      const res = await fetch(`/api/vehicles/${encodeURIComponent(vehicleId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          immatriculation: editImmatriculation,
          type: editType,
          status: editStatus,
          insuranceExpiresAt: editInsuranceExpiresAt ? editInsuranceExpiresAt : null,
          technicalInspectionExpiresAt: editTechnicalInspectionExpiresAt ? editTechnicalInspectionExpiresAt : null,
          registrationDocumentPresent: editRegistrationDocumentPresent,
          sanitaryApprovalExpiresAt: editSanitaryApprovalExpiresAt ? editSanitaryApprovalExpiresAt : null,
        }),
      });

      const data = (await res.json().catch(() => null)) as ApiResponse<Vehicle> | null;

      if (!res.ok || !data?.ok) {
        throw new Error(getApiError(data, "Erreur lors de la modification du vehicule"));
      }

      setVehicles((prev) => prev.map((vehicle) => (vehicle.id === vehicleId ? data.data : vehicle)));
      setSelectedDepotIds((prev) => ({
        ...prev,
        [vehicleId]: data.data.depotId ?? "",
      }));
      setSuccessMessage(`Vehicule ${data.data.immatriculation} mis a jour.`);
      resetEditForm();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setSavingEditVehicleId(null);
    }
  }

  async function handleSaveDepot(vehicleId: string) {
    setSavingDepotVehicleId(vehicleId);
    clearFeedback();

    try {
      const depotId = selectedDepotIds[vehicleId] || null;
      const res = await fetch(`/api/vehicles/${encodeURIComponent(vehicleId)}/depot`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ depotId }),
      });

      const data = (await res.json().catch(() => null)) as ApiResponse<Vehicle> | null;

      if (!res.ok || !data?.ok) {
        throw new Error(getApiError(data, "Erreur lors de l'enregistrement de la base"));
      }

      setVehicles((prev) => prev.map((vehicle) => (vehicle.id === vehicleId ? data.data : vehicle)));
      setSelectedDepotIds((prev) => ({
        ...prev,
        [vehicleId]: data.data.depotId ?? "",
      }));
      setSuccessMessage(`Base du vehicule ${data.data.immatriculation} mise a jour.`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setSavingDepotVehicleId(null);
    }
  }

  async function handleArchiveVehicle(vehicle: Vehicle) {
    const confirmed = window.confirm(`Archiver le vehicule ${vehicle.immatriculation} ?`);
    if (!confirmed) return;

    setArchivingVehicleId(vehicle.id);
    clearFeedback();

    try {
      const res = await fetch(`/api/vehicles/${encodeURIComponent(vehicle.id)}/archive`, {
        method: "POST",
      });

      const data = (await res.json().catch(() => null)) as ApiResponse<Vehicle> | null;

      if (!res.ok || !data?.ok) {
        throw new Error(getApiError(data, "Erreur lors de l'archivage du vehicule"));
      }

      setVehicles((prev) => prev.filter((currentVehicle) => currentVehicle.id !== vehicle.id));
      setSelectedDepotIds((prev) => {
        const next = { ...prev };
        delete next[vehicle.id];
        return next;
      });
      if (editingVehicleId === vehicle.id) {
        resetEditForm();
      }
      setSuccessMessage(`Vehicule ${data.data.immatriculation} archive.`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setArchivingVehicleId(null);
    }
  }

  function resetFilters() {
    setSearchInput("");
    setTypeFilter("");
    setStatusFilter("");
    setDocumentFilter("");
  }

  const columns: DataTableColumn<Vehicle>[] = [
      {
        key: "immatriculation",
        header: "Vehicule",
        width: "220px",
        render: (vehicle) => (
          <div className="vehicles-cell-main">
            <strong>{vehicle.immatriculation}</strong>
            <span className="vehicles-table-cell-subtle">{getVehicleTypeLabel(vehicle.type)}</span>
          </div>
        ),
      },
      {
        key: "status",
        header: "Statut",
        width: "150px",
        render: (vehicle) => (
          <StatusBadge variant={vehicleStatusBadgeVariant(vehicle.status)}>{getVehicleStatusLabel(vehicle.status)}</StatusBadge>
        ),
      },
      {
        key: "documents",
        header: "Conformite",
        width: "170px",
        render: (vehicle) => {
          const documentStatus = documentStatusByVehicleId.get(vehicle.id) ?? "conforme";
          return (
            <StatusBadge variant={documentStatusBadgeVariant(documentStatus)}>
              {documentStatusLabel(documentStatus)}
            </StatusBadge>
          );
        },
      },
      {
        key: "depot",
        header: "Base",
        width: "340px",
        render: (vehicle) => {
          const currentDepot = vehicle.depot;
          const currentSelection = selectedDepotIds[vehicle.id] ?? "";
          const options = currentDepot && !depotOptions.some((depot) => depot.id === currentDepot.id)
            ? [currentDepot, ...depotOptions]
            : depotOptions;
          const hasPendingDepotChange = currentSelection !== (vehicle.depotId ?? "");
          const isSavingDepot = savingDepotVehicleId === vehicle.id;
          const isArchiving = archivingVehicleId === vehicle.id;

          return (
            <div className="vehicles-depot-cell">
              <StatusBadge variant={depotStatusVariant(vehicle.depot)}>
                {vehicle.depot ? getDepotLabel(vehicle.depot) : "Aucune base"}
              </StatusBadge>

              <div className="vehicles-depot-editor">
                <select
                  value={currentSelection}
                  onChange={(event) => {
                    const value = event.target.value;
                    setSelectedDepotIds((prev) => ({
                      ...prev,
                      [vehicle.id]: value,
                    }));
                  }}
                  disabled={isSavingDepot || isArchiving}
                >
                  <option value="">Aucune base</option>
                  {options.map((depot) => (
                    <option key={depot.id} value={depot.id}>
                      {getDepotLabel(depot)}
                    </option>
                  ))}
                </select>

                <ActionButton
                  size="sm"
                  onClick={() => handleSaveDepot(vehicle.id)}
                  disabled={isSavingDepot || isArchiving || !hasPendingDepotChange}
                >
                  {isSavingDepot ? "Enregistrement..." : "Enregistrer"}
                </ActionButton>
              </div>
            </div>
          );
        },
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        width: "230px",
        render: (vehicle) => {
          const isSavingEdit = savingEditVehicleId === vehicle.id;
          const isArchiving = archivingVehicleId === vehicle.id;
          const isEditing = editingVehicleId === vehicle.id;
          const isBusy = isSavingEdit || isArchiving;

          return (
            <div className="vehicles-actions vehicles-actions--wrap vehicles-actions--end">
              <ActionButton
                size="sm"
                variant="secondary"
                onClick={() => openEditVehicle(vehicle)}
                disabled={isBusy}
              >
                {isEditing ? "Edition en cours" : "Modifier"}
              </ActionButton>

              <ActionButton
                size="sm"
                variant="danger"
                onClick={() => handleArchiveVehicle(vehicle)}
                disabled={isBusy}
              >
                {isArchiving ? "Archivage..." : "Archiver"}
              </ActionButton>
            </div>
          );
        },
      },
    ];

  return (
    <section className="vehicles-section">
      <div className="vehicles-grid-stats">
        <StatCard title="Vehicules actifs" value={vehicleStats.total} hint="Flotte active de la societe" />
        <StatCard title="Conformes" value={vehicleStats.conformes} hint="Dossiers a jour" tone="success" />
        <StatCard title="Bientot expires" value={vehicleStats.bientotExpires} hint={`A moins de ${DOCUMENT_WARNING_WINDOW_DAYS} jours`} tone="warning" />
        <StatCard title="Indisponibles" value={vehicleStats.indisponibles} hint="Maintenance ou hors service" tone="danger" />
      </div>

      {error ? <ErrorMessage title="Erreur module vehicules" message={error} /> : null}
      {successMessage ? <div className="vehicles-alert vehicles-alert--success">{successMessage}</div> : null}

      <section className="vehicles-card">
        <div className="vehicles-card__head">
          <h2 className="vehicles-card__title">Ajouter un vehicule</h2>
          <p className="vehicles-card__description">
            Creation d&apos;un vehicule actif avec type et statut initial, sans modification de logique metier.
          </p>
          {!canCreateVehicle ? (
            <div className="vehicles-inline-status">
              <StatusBadge variant="warning">Creation reservee au profil ADMIN</StatusBadge>
            </div>
          ) : null}
        </div>

        {canCreateVehicle ? (
          <AddVehicleForm onSubmit={handleAddVehicle} disabled={isSubmitting} />
        ) : (
          <p className="vehicles-table-cell-subtle">Votre role ne permet pas la creation de vehicules.</p>
        )}
      </section>

      <section className="vehicles-card">
        <div className="vehicles-card__head">
          <h2 className="vehicles-card__title">Liste des vehicules</h2>
          <p className="vehicles-card__description">
            Consultation, filtrage simple, affectation de base, edition et archivage logique des vehicules actifs.
          </p>
        </div>

        <FilterBar
          summary={`Filtres actifs : ${searchInput.trim() ? `recherche "${searchInput.trim()}"` : "aucune recherche"}${typeFilter ? `, type ${getVehicleTypeLabel(typeFilter)}` : ""}${statusFilter ? `, statut ${getVehicleStatusLabel(statusFilter)}` : ""}${documentFilter ? `, conformite ${documentStatusLabel(documentFilter)}` : ""}`}
          actions={(
            <ActionButton size="sm" variant="ghost" onClick={resetFilters}>
              Reinitialiser
            </ActionButton>
          )}
        >
          <label className="vehicles-field">
            <span className="vehicles-field__label">Recherche</span>
            <input
              type="text"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Immatriculation, type, statut ou base"
            />
          </label>

          <label className="vehicles-field">
            <span className="vehicles-field__label">Type</span>
            <select value={typeFilter} onChange={(event) => setTypeFilter(toSafeTypeFilter(event.target.value))}>
              <option value="">Tous les types</option>
              <option value="AMBULANCE">Ambulance</option>
              <option value="VSL">VSL</option>
              <option value="TAXI">Taxi</option>
            </select>
          </label>

          <label className="vehicles-field">
            <span className="vehicles-field__label">Statut</span>
            <select value={statusFilter} onChange={(event) => setStatusFilter(toSafeStatusFilter(event.target.value))}>
              <option value="">Tous les statuts</option>
              <option value="ACTIVE">Disponible</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="OUT_OF_SERVICE">Hors service</option>
            </select>
          </label>

          <label className="vehicles-field">
            <span className="vehicles-field__label">Conformite</span>
            <select
              value={documentFilter}
              onChange={(event) => setDocumentFilter(toSafeDocumentFilter(event.target.value))}
            >
              <option value="">Tous les niveaux</option>
              <option value="conforme">Conforme</option>
              <option value="bientot_expire">Bientot expire</option>
              <option value="expire">Expire</option>
            </select>
          </label>
        </FilterBar>

        <DataTable
          columns={columns}
          rows={filteredVehicles}
          rowKey={(vehicle) => vehicle.id}
          loading={false}
          error={null}
          emptyTitle="Aucun vehicule trouve"
          emptyMessage="Aucun vehicule ne correspond aux criteres de recherche."
          minWidth={1200}
          caption="Vehicules actifs de la societe courante"
        />
      </section>

      {editingVehicle ? (
        <section className="vehicles-card">
          <div className="vehicles-card__head">
            <h2 className="vehicles-card__title">Modifier le vehicule selectionne</h2>
            <p className="vehicles-card__description">
              Mise a jour des donnees du vehicule et des dates documentaires, sans changement fonctionnel hors perimetre.
            </p>
          </div>

          <div className="vehicles-selection-card">
            <span>
              <strong>{editingVehicle.immatriculation}</strong>
            </span>
            <div className="vehicles-inline-status">
              <StatusBadge variant={vehicleStatusBadgeVariant(editingVehicle.status)}>
                {getVehicleStatusLabel(editingVehicle.status)}
              </StatusBadge>
              <StatusBadge variant={documentStatusBadgeVariant(documentStatusByVehicleId.get(editingVehicle.id) ?? "conforme")}>
                Conformite: {documentStatusLabel(documentStatusByVehicleId.get(editingVehicle.id) ?? "conforme")}
              </StatusBadge>
              <StatusBadge variant={depotStatusVariant(editingVehicle.depot)}>
                Base: {editingVehicle.depot ? getDepotLabel(editingVehicle.depot) : "Aucune"}
              </StatusBadge>
            </div>
          </div>

          <form
            className="vehicles-form"
            onSubmit={(event) => {
              event.preventDefault();
              void handleSaveVehicle(editingVehicle.id);
            }}
          >
            <div className="vehicles-form-grid vehicles-form-grid--edit">
              <label className="vehicles-field">
                <span className="vehicles-field__label">Immatriculation</span>
                <input
                  type="text"
                  value={editImmatriculation}
                  onChange={(event) => setEditImmatriculation(event.target.value.toUpperCase())}
                  disabled={savingEditVehicleId === editingVehicle.id || archivingVehicleId === editingVehicle.id}
                  maxLength={24}
                  required
                />
              </label>

              <label className="vehicles-field">
                <span className="vehicles-field__label">Type</span>
                <select
                  value={editType}
                  onChange={(event) => setEditType(getEditableVehicleType(event.target.value))}
                  disabled={savingEditVehicleId === editingVehicle.id || archivingVehicleId === editingVehicle.id}
                >
                  <option value="AMBULANCE">Ambulance</option>
                  <option value="VSL">VSL</option>
                  <option value="TAXI">Taxi</option>
                </select>
              </label>

              <label className="vehicles-field">
                <span className="vehicles-field__label">Statut</span>
                <select
                  value={editStatus}
                  onChange={(event) => setEditStatus(getEditableVehicleStatus(event.target.value))}
                  disabled={savingEditVehicleId === editingVehicle.id || archivingVehicleId === editingVehicle.id}
                >
                  <option value="ACTIVE">Disponible</option>
                  <option value="MAINTENANCE">Maintenance</option>
                  <option value="OUT_OF_SERVICE">Hors service</option>
                </select>
              </label>

              <label className="vehicles-field">
                <span className="vehicles-field__label">Expiration assurance</span>
                <input
                  type="date"
                  value={editInsuranceExpiresAt}
                  onChange={(event) => setEditInsuranceExpiresAt(event.target.value)}
                  disabled={savingEditVehicleId === editingVehicle.id || archivingVehicleId === editingVehicle.id}
                />
              </label>

              <label className="vehicles-field">
                <span className="vehicles-field__label">Expiration controle technique</span>
                <input
                  type="date"
                  value={editTechnicalInspectionExpiresAt}
                  onChange={(event) => setEditTechnicalInspectionExpiresAt(event.target.value)}
                  disabled={savingEditVehicleId === editingVehicle.id || archivingVehicleId === editingVehicle.id}
                />
              </label>

              <label className="vehicles-field">
                <span className="vehicles-field__label">Expiration agrement sanitaire</span>
                <input
                  type="date"
                  value={editSanitaryApprovalExpiresAt}
                  onChange={(event) => setEditSanitaryApprovalExpiresAt(event.target.value)}
                  disabled={savingEditVehicleId === editingVehicle.id || archivingVehicleId === editingVehicle.id}
                />
              </label>
            </div>

            <label className="vehicles-checkbox">
              <input
                type="checkbox"
                checked={editRegistrationDocumentPresent}
                onChange={(event) => setEditRegistrationDocumentPresent(event.target.checked)}
                disabled={savingEditVehicleId === editingVehicle.id || archivingVehicleId === editingVehicle.id}
              />
              <span>Carte grise presente</span>
            </label>

            <div className="vehicles-doc-grid">
              <div className="vehicles-doc-item">
                Assurance actuelle: <strong>{formatDocumentDateLabel(editingVehicle.insuranceExpiresAt)}</strong>
              </div>
              <div className="vehicles-doc-item">
                Controle technique actuel: <strong>{formatDocumentDateLabel(editingVehicle.technicalInspectionExpiresAt)}</strong>
              </div>
              <div className="vehicles-doc-item">
                Agrement sanitaire actuel: <strong>{formatDocumentDateLabel(editingVehicle.sanitaryApprovalExpiresAt)}</strong>
              </div>
            </div>

            <div className="vehicles-actions">
              <ActionButton
                type="submit"
                variant="primary"
                disabled={savingEditVehicleId === editingVehicle.id || archivingVehicleId === editingVehicle.id}
              >
                {savingEditVehicleId === editingVehicle.id ? "Enregistrement..." : "Enregistrer les modifications"}
              </ActionButton>
              <ActionButton
                type="button"
                variant="secondary"
                onClick={resetEditForm}
                disabled={savingEditVehicleId === editingVehicle.id || archivingVehicleId === editingVehicle.id}
              >
                Annuler
              </ActionButton>
            </div>
          </form>
        </section>
      ) : null}
    </section>
  );
}

