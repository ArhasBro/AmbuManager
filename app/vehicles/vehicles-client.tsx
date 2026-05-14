"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Ambulance,
  AlertTriangle,
  BadgeCheck,
  CircleDot,
  CarFront,
  CheckCircle2,
  FileClock,
  Building2,
  History,
  MoreVertical,
  Plus,
  Search,
  SlidersHorizontal,
  UserCircle2,
  Wrench,
  X,
  XCircle,
} from "lucide-react";

import { ActionButton, DataTable, ErrorMessage, StatusBadge, type DataTableColumn } from "@/app/ui";

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

type VehicleDetailTab = "DETAILS" | "EQUIPEMENTS" | "MAINTENANCE" | "DOCS" | "ANOMALIES";

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
  if (!value) return "Non renseignée";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("fr-FR");
}

function formatDateLabel(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("fr-FR");
}

function formatTimeLabel(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function getVehicleTypeLabel(value: string | null) {
  if (value === "AMBULANCE") return "Ambulance";
  if (value === "VSL") return "VSL";
  if (value === "TAXI") return "Taxi";
  return "Type non renseigné";
}

function getVehicleStatusLabel(value: string | null) {
  if (value === "ACTIVE") return "En service";
  if (value === "MAINTENANCE") return "En maintenance";
  if (value === "OUT_OF_SERVICE") return "Hors service";
  return "Statut non renseigné";
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
  if (value === "bientot_expire") return "Bientôt expiré";
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

const VEHICLE_DETAIL_TABS: Array<{ id: VehicleDetailTab; label: string }> = [
  { id: "DETAILS", label: "Détails" },
  { id: "EQUIPEMENTS", label: "Équipements" },
  { id: "MAINTENANCE", label: "Maintenance" },
  { id: "DOCS", label: "Docs" },
  { id: "ANOMALIES", label: "Anomalies" },
];

const VEHICLE_MODEL_ROTATION = [
  "Renault Master",
  "Peugeot Boxer",
  "Mercedes Sprinter",
  "Citroen Jumpy",
  "Toyota Corolla",
  "Skoda Octavia",
  "Ford Tourneo",
  "Dacia Logan",
];

function getVehicleDisplayName(vehicle: Vehicle, index: number) {
  const typeLabel = getVehicleTypeLabel(vehicle.type);
  const rank = String(index + 1).padStart(2, "0");
  return `${typeLabel} ${rank}`;
}

function getVehicleModelLabel(index: number) {
  return VEHICLE_MODEL_ROTATION[index % VEHICLE_MODEL_ROTATION.length];
}

function getVehicleYearLabel(index: number) {
  return String(2024 - (index % 6));
}

function getVehicleMileageLabel(index: number) {
  return `${(62450 + index * 3870).toLocaleString("fr-FR")} km`;
}

function getVehicleFuelLabel(type: string | null) {
  if (type === "TAXI") return "Hybride";
  return "Diesel";
}

function getVehicleCapacityLabel(type: string | null) {
  if (type === "AMBULANCE") return "4 places / 1 brancard";
  if (type === "VSL") return "4 places";
  return "4 places";
}

function getDocumentDateToneClass(value: string | null, today: Date, warningLimit: Date) {
  const date = parseDocumentDate(value);
  if (!date) return "vehicles-date vehicles-date--muted";
  if (date.getTime() < today.getTime()) return "vehicles-date vehicles-date--danger";
  if (date.getTime() <= warningLimit.getTime()) return "vehicles-date vehicles-date--warning";
  return "vehicles-date vehicles-date--ok";
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
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(initialVehicles[0]?.id ?? null);
  const [detailTab, setDetailTab] = useState<VehicleDetailTab>("DETAILS");
  const [showCreateVehicleForm, setShowCreateVehicleForm] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

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
  const [depotFilter, setDepotFilter] = useState<string>("");

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

  const vehicleIndexById = useMemo(
    () => new Map(displayVehicles.map((vehicle, index) => [vehicle.id, index] as const)),
    [displayVehicles],
  );

  const filteredVehicles = useMemo(() => {
    return displayVehicles.filter((vehicle) => {
      if (!vehicleMatchesQuery(vehicle, searchInput.trim())) return false;
      if (typeFilter && vehicle.type !== typeFilter) return false;
      if (statusFilter && vehicle.status !== statusFilter) return false;
      if (depotFilter && vehicle.depotId !== depotFilter) return false;

      const documentStatus = documentStatusByVehicleId.get(vehicle.id) ?? "conforme";
      if (documentFilter && documentStatus !== documentFilter) return false;

      return true;
    });
  }, [displayVehicles, depotFilter, documentFilter, documentStatusByVehicleId, searchInput, statusFilter, typeFilter]);

  useEffect(() => {
    if (filteredVehicles.length === 0) {
      setSelectedVehicleId(null);
      return;
    }

    if (!selectedVehicleId || !filteredVehicles.some((vehicle) => vehicle.id === selectedVehicleId)) {
      setSelectedVehicleId(filteredVehicles[0].id);
      setDetailTab("DETAILS");
    }
  }, [filteredVehicles, selectedVehicleId]);

  const selectedVehicle = useMemo(
    () => filteredVehicles.find((vehicle) => vehicle.id === selectedVehicleId) ?? null,
    [filteredVehicles, selectedVehicleId],
  );

  const vehicleStats = useMemo(() => {
    const counts = {
      total: displayVehicles.length,
      enService: 0,
      maintenance: 0,
      horsService: 0,
      conformiteASurveiller: 0,
    };

    for (const vehicle of displayVehicles) {
      const documentStatus = documentStatusByVehicleId.get(vehicle.id) ?? "conforme";

      if (vehicle.status === "ACTIVE") counts.enService += 1;
      if (vehicle.status === "MAINTENANCE") counts.maintenance += 1;
      if (vehicle.status === "OUT_OF_SERVICE") counts.horsService += 1;
      if (documentStatus !== "conforme") counts.conformiteASurveiller += 1;
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
    setSelectedVehicleId(vehicle.id);
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
        throw new Error(getApiError(data, "Erreur lors de la création du véhicule"));
      }

      setVehicles((prev) => [...prev, data.data]);
      setSelectedDepotIds((prev) => ({
        ...prev,
        [data.data.id]: data.data.depotId ?? "",
      }));
      setSelectedVehicleId(data.data.id);
      setDetailTab("DETAILS");
      setShowCreateVehicleForm(false);
      setSuccessMessage(`Véhicule ${data.data.immatriculation} ajouté.`);
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
        throw new Error(getApiError(data, "Erreur lors de la modification du véhicule"));
      }

      setVehicles((prev) => prev.map((vehicle) => (vehicle.id === vehicleId ? data.data : vehicle)));
      setSelectedDepotIds((prev) => ({
        ...prev,
        [vehicleId]: data.data.depotId ?? "",
      }));
      setSuccessMessage(`Véhicule ${data.data.immatriculation} mis à jour.`);
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
      setSuccessMessage(`Base du véhicule ${data.data.immatriculation} mise à jour.`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setSavingDepotVehicleId(null);
    }
  }

  async function handleArchiveVehicle(vehicle: Vehicle) {
    const confirmed = window.confirm(`Archiver le véhicule ${vehicle.immatriculation} ?`);
    if (!confirmed) return;

    setArchivingVehicleId(vehicle.id);
    clearFeedback();

    try {
      const res = await fetch(`/api/vehicles/${encodeURIComponent(vehicle.id)}/archive`, {
        method: "POST",
      });

      const data = (await res.json().catch(() => null)) as ApiResponse<Vehicle> | null;

      if (!res.ok || !data?.ok) {
        throw new Error(getApiError(data, "Erreur lors de l'archivage du véhicule"));
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
      setSuccessMessage(`Véhicule ${data.data.immatriculation} archivé.`);
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
    setDepotFilter("");
    setShowAdvancedFilters(false);
  }

  const kpiCards = [
    {
      key: "total",
      value: vehicleStats.total,
      label: "Total véhicules",
      icon: Ambulance,
      toneClass: "vehicles-kpi-card--info",
    },
    {
      key: "active",
      value: vehicleStats.enService,
      label: "En service",
      icon: BadgeCheck,
      toneClass: "vehicles-kpi-card--success",
    },
    {
      key: "maintenance",
      value: vehicleStats.maintenance,
      label: "En maintenance",
      icon: Wrench,
      toneClass: "vehicles-kpi-card--warning",
    },
    {
      key: "out",
      value: vehicleStats.horsService,
      label: "Hors service",
      icon: FileClock,
      toneClass: "vehicles-kpi-card--danger",
    },
    {
      key: "compliance",
      value: vehicleStats.conformiteASurveiller,
      label: "Conformité à surveiller",
      icon: AlertTriangle,
      toneClass: "vehicles-kpi-card--warning-soft",
    },
  ] as const;

  const columns: DataTableColumn<Vehicle>[] = [
    {
      key: "select",
      header: "",
      width: "36px",
      render: (vehicle) => (
        <label className="vehicles-row-checkbox" aria-label={`Selectionner ${vehicle.immatriculation}`}>
          <input type="checkbox" readOnly checked={selectedVehicleId === vehicle.id} />
        </label>
      ),
    },
    {
      key: "vehicle",
      header: "Véhicules",
      width: "178px",
      align: "left",
      className: "vehicles-col-vehicle",
      render: (vehicle) => {
        const index = vehicleIndexById.get(vehicle.id) ?? 0;
        return (
          <div className="vehicles-cell-main vehicles-cell-main--identity">
            <span className="vehicles-mini-icon" aria-hidden="true">
              <CarFront size={14} />
            </span>
            <span className="vehicles-vehicle-lines">
              <strong>{getVehicleDisplayName(vehicle, index)}</strong>
              <span className="vehicles-table-cell-subtle">{getVehicleModelLabel(index)}</span>
            </span>
          </div>
        );
      },
    },
    {
      key: "immatriculation",
      header: "Immatriculation",
      width: "90px",
      align: "center",
      render: (vehicle) => vehicle.immatriculation,
    },
    {
      key: "type",
      header: "Type",
      width: "76px",
      align: "center",
      render: (vehicle) => <StatusBadge variant="info">{getVehicleTypeLabel(vehicle.type)}</StatusBadge>,
    },
    {
      key: "depot",
      header: "Dépôt",
      width: "88px",
      align: "center",
      render: (vehicle) => vehicle.depot ? vehicle.depot.name : "Aucun",
    },
    {
      key: "status",
      header: "Statut",
      width: "88px",
      align: "center",
      render: (vehicle) => (
        <StatusBadge variant={vehicleStatusBadgeVariant(vehicle.status)}>{getVehicleStatusLabel(vehicle.status)}</StatusBadge>
      ),
    },
    {
      key: "insurance",
      header: "Assurance",
      width: "90px",
      align: "center",
      render: (vehicle) => (
        <span className={getDocumentDateToneClass(
          vehicle.insuranceExpiresAt,
          documentStatusContext.today,
          documentStatusContext.warningLimit,
        )}
        >
          {formatDocumentDateLabel(vehicle.insuranceExpiresAt)}
        </span>
      ),
    },
    {
      key: "technical",
      header: <span className="vehicles-colhead-multiline">Contrôle technique</span>,
      width: "96px",
      align: "center",
      render: (vehicle) => {
        const hasControlDate = Boolean(parseDocumentDate(vehicle.technicalInspectionExpiresAt));
        return (
          <div className="vehicles-tech-cell">
            <span className={getDocumentDateToneClass(
              vehicle.technicalInspectionExpiresAt,
              documentStatusContext.today,
              documentStatusContext.warningLimit,
            )}
            >
              {formatDocumentDateLabel(vehicle.technicalInspectionExpiresAt)}
            </span>
            {hasControlDate ? <CheckCircle2 size={14} className="vehicles-tech-cell__ok" /> : <XCircle size={14} className="vehicles-tech-cell__danger" />}
          </div>
        );
      },
    },
    {
      key: "registration",
      header: "Carte grise",
      width: "78px",
      align: "center",
      render: (vehicle) => (
        <span className={vehicle.registrationDocumentPresent ? "vehicles-date vehicles-date--ok" : "vehicles-date vehicles-date--danger"}>
          {vehicle.registrationDocumentPresent ? formatDocumentDateLabel(vehicle.updatedAt) : "Absente"}
        </span>
      ),
    },
    {
      key: "sanitary",
      header: <span className="vehicles-colhead-multiline">Agrément sanitaire</span>,
      width: "96px",
      align: "center",
      render: (vehicle) => (
        <span className={getDocumentDateToneClass(
          vehicle.sanitaryApprovalExpiresAt,
          documentStatusContext.today,
          documentStatusContext.warningLimit,
        )}
        >
          {formatDocumentDateLabel(vehicle.sanitaryApprovalExpiresAt)}
        </span>
      ),
    },
    {
      key: "documents",
      header: "Conformité",
      width: "90px",
      align: "center",
      render: (vehicle) => {
        const documentStatus = documentStatusByVehicleId.get(vehicle.id) ?? "conforme";
        return <StatusBadge variant={documentStatusBadgeVariant(documentStatus)}>{documentStatusLabel(documentStatus)}</StatusBadge>;
      },
    },
    {
      key: "updatedAt",
      header: <span className="vehicles-colhead-multiline">Dernière modif.</span>,
      width: "84px",
      align: "center",
      render: (vehicle) => (
        <div className="vehicles-updated-cell">
          <span>{formatDateLabel(vehicle.updatedAt)}</span>
          <span>{formatTimeLabel(vehicle.updatedAt)}</span>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      width: "52px",
      render: (vehicle) => (
        <button
          type="button"
          className="vehicles-row-more"
          onClick={(event) => {
            event.stopPropagation();
            openEditVehicle(vehicle);
          }}
          aria-label={`Actions ${vehicle.immatriculation}`}
          disabled={savingEditVehicleId === vehicle.id || archivingVehicleId === vehicle.id}
        >
          <MoreVertical size={15} />
        </button>
      ),
    },
  ];

  const selectedVehicleDocumentStatus = selectedVehicle
    ? documentStatusByVehicleId.get(selectedVehicle.id) ?? "conforme"
    : null;
  const selectedVehicleIndex = selectedVehicle ? (vehicleIndexById.get(selectedVehicle.id) ?? 0) : 0;

  return (
    <section className="vehicles-section vehicles-section--v2">
      <header className="vehicles-page-top">
        <div className="vehicles-page-top__title-wrap">
          <h1 className="vehicles-page-top__title">Véhicules</h1>
          <p className="vehicles-page-top__subtitle">Gérez votre flotte de véhicules et leurs équipements</p>
        </div>
        <div className="vehicles-page-top__actions">
          {!canCreateVehicle ? <StatusBadge variant="warning">Création réservée au profil ADMIN</StatusBadge> : null}
          <ActionButton
            variant={showCreateVehicleForm ? "secondary" : "primary"}
            size="md"
            leadingIcon={<Plus size={16} />}
            onClick={() => setShowCreateVehicleForm((prev) => !prev)}
            disabled={!canCreateVehicle}
          >
            {showCreateVehicleForm ? "Masquer le formulaire" : "Ajouter un véhicule"}
          </ActionButton>
        </div>
      </header>

      <section className="vehicles-filters-strip" aria-label="Filtres véhicules">
        <label className="vehicles-filter-pill vehicles-filter-pill--search">
          <span className="vehicles-filter-pill__label">Recherche</span>
          <div className="vehicles-filter-pill__field vehicles-search-input-wrap">
            <Search size={16} aria-hidden="true" />
            <input
              type="text"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Rechercher un véhicule..."
              aria-label="Rechercher un véhicule"
            />
          </div>
        </label>

        <label className="vehicles-filter-pill vehicles-filter-pill--select">
          <span className="vehicles-filter-pill__icon" aria-hidden="true"><CircleDot size={14} /></span>
          <span className="vehicles-filter-pill__label">Statut</span>
          <select aria-label="Statut" value={statusFilter} onChange={(event) => setStatusFilter(toSafeStatusFilter(event.target.value))}>
            <option value="">Tous</option>
            <option value="ACTIVE">En service</option>
            <option value="MAINTENANCE">En maintenance</option>
            <option value="OUT_OF_SERVICE">Hors service</option>
          </select>
        </label>

        <label className="vehicles-filter-pill vehicles-filter-pill--select">
          <span className="vehicles-filter-pill__icon" aria-hidden="true"><CarFront size={14} /></span>
          <span className="vehicles-filter-pill__label">Type</span>
          <select aria-label="Type" value={typeFilter} onChange={(event) => setTypeFilter(toSafeTypeFilter(event.target.value))}>
            <option value="">Tous</option>
            <option value="AMBULANCE">Ambulance</option>
            <option value="VSL">VSL</option>
            <option value="TAXI">Taxi</option>
          </select>
        </label>

        <label className="vehicles-filter-pill vehicles-filter-pill--select">
          <span className="vehicles-filter-pill__icon" aria-hidden="true"><Building2 size={14} /></span>
          <span className="vehicles-filter-pill__label">Dépôt</span>
          <select aria-label="Dépôt" value={depotFilter} onChange={(event) => setDepotFilter(event.target.value)}>
            <option value="">Tous</option>
            {depotOptions.map((depot) => (
              <option key={depot.id} value={depot.id}>
                {getDepotLabel(depot)}
              </option>
            ))}
          </select>
        </label>

        <div className="vehicles-filters-strip__actions">
          <ActionButton size="md" variant="secondary" leadingIcon={<SlidersHorizontal size={14} />} onClick={() => setShowAdvancedFilters((prev) => !prev)}>
            {showAdvancedFilters ? "Masquer filtres" : "Filtres avancés"}
          </ActionButton>
        </div>
      </section>

      {showAdvancedFilters ? (
        <div className="vehicles-filters-advanced">
          <label className="vehicles-filter-select">
            <span className="vehicles-field__label">Conformité</span>
            <select
              aria-label="Conformité"
              value={documentFilter}
              onChange={(event) => setDocumentFilter(toSafeDocumentFilter(event.target.value))}
            >
              <option value="">Tous les niveaux</option>
              <option value="conforme">Conforme</option>
              <option value="bientot_expire">Bientôt expiré</option>
              <option value="expire">Expire</option>
            </select>
          </label>
          <ActionButton size="md" variant="ghost" onClick={resetFilters}>Réinitialiser les filtres</ActionButton>
        </div>
      ) : null}

      <div className="vehicles-grid-stats">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.key} className={`vehicles-kpi-card ${card.toneClass}`}>
              <span className="vehicles-kpi-card__icon" aria-hidden="true">
                <Icon size={20} />
              </span>
              <div className="vehicles-kpi-card__content">
                <strong className="vehicles-kpi-card__value">{card.value}</strong>
                <p className="vehicles-kpi-card__label">{card.label}</p>
              </div>
            </article>
          );
        })}
      </div>

      {error ? <ErrorMessage title="Erreur module véhicules" message={error} /> : null}
      {successMessage ? <div className="vehicles-alert vehicles-alert--success">{successMessage}</div> : null}

      {showCreateVehicleForm ? (
        <section className="vehicles-card vehicles-card--create-panel">
          <div className="vehicles-card__head">
            <div>
              <h2 className="vehicles-card__title">Nouveau véhicule</h2>
              <p className="vehicles-card__description">
                Formulaire avancé relié au backend. Il reste replié tant qu&apos;il n&apos;est pas demandé.
              </p>
            </div>
          </div>
          <AddVehicleForm onSubmit={handleAddVehicle} disabled={isSubmitting} />
        </section>
      ) : null}

      <div className="vehicles-layout">
        <div className="vehicles-layout__main">
          <section className="vehicles-card vehicles-card--table">
            <DataTable
              columns={columns}
              rows={filteredVehicles}
              rowKey={(vehicle) => vehicle.id}
              loading={false}
              error={null}
              emptyTitle="Aucun élément à afficher"
              emptyMessage="Aucun véhicule ne correspond aux critères sélectionnés."
              minWidth={1120}
              caption={`${filteredVehicles.length} véhicule(s) affiché(s) sur ${displayVehicles.length}`}
              selectedRowKey={selectedVehicleId}
              onRowClick={(vehicle) => {
                setSelectedVehicleId(vehicle.id);
                clearFeedback();
              }}
              className="vehicles-table"
            />
          </section>
        </div>

        <aside className="vehicles-detail-panel">
          {selectedVehicle ? (
            <>
              <div className="vehicles-detail-panel__head">
                <div>
                  <h3 className="vehicles-detail-panel__title">{getVehicleDisplayName(selectedVehicle, selectedVehicleIndex)}</h3>
                  <p className="vehicles-detail-panel__subtitle">{selectedVehicle.immatriculation}</p>
                </div>
                <div className="vehicles-detail-panel__head-right">
                  <StatusBadge variant={vehicleStatusBadgeVariant(selectedVehicle.status)}>{getVehicleStatusLabel(selectedVehicle.status)}</StatusBadge>
                  <button
                    type="button"
                    className="vehicles-detail-close"
                    aria-label="Fermer le panneau detail"
                    onClick={() => setSelectedVehicleId(null)}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <nav className="vehicles-detail-tabs" aria-label="Détails véhicule">
                {VEHICLE_DETAIL_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`vehicles-detail-tab${detailTab === tab.id ? " is-active" : ""}`}
                    onClick={() => setDetailTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>

              {detailTab === "DETAILS" ? (
                <div className="vehicles-detail-stack">
                  <section className="vehicles-detail-group">
                    <div className="vehicles-detail-hero">
                      <div className="vehicles-detail-hero__media" aria-hidden="true">
                        <CarFront size={30} />
                      </div>
                      <dl className="vehicles-detail-list">
                        <div><dt>Type</dt><dd>{getVehicleTypeLabel(selectedVehicle.type)}</dd></div>
                        <div><dt>Marque / Modèle</dt><dd>{getVehicleModelLabel(selectedVehicleIndex)}</dd></div>
                        <div><dt>Année</dt><dd>{getVehicleYearLabel(selectedVehicleIndex)}</dd></div>
                        <div><dt>Kilométrage</dt><dd>{getVehicleMileageLabel(selectedVehicleIndex)}</dd></div>
                      </dl>
                    </div>
                  </section>

                  <section className="vehicles-detail-group">
                    <h4 className="vehicles-detail-group__title">Affectation</h4>
                    <dl className="vehicles-detail-list">
                      <div><dt>Dépôt</dt><dd>{selectedVehicle.depot ? getDepotLabel(selectedVehicle.depot) : "Aucune base"}</dd></div>
                      <div><dt>Affecté à</dt><dd>Équipe A - Jour</dd></div>
                      <div>
                        <dt>Conducteur principal</dt>
                        <dd className="vehicles-driver-line"><UserCircle2 size={16} />Nathan Archenoul</dd>
                      </div>
                    </dl>
                  </section>

                  <section className="vehicles-detail-group">
                    <h4 className="vehicles-detail-group__title">Contrôles & maintenance</h4>
                    <dl className="vehicles-detail-list">
                      <div>
                        <dt>Dernier contrôle technique</dt>
                        <dd>{formatDocumentDateLabel(selectedVehicle.technicalInspectionExpiresAt)}</dd>
                      </div>
                      <div>
                        <dt>Prochain contrôle technique</dt>
                        <dd className={getDocumentDateToneClass(
                          selectedVehicle.technicalInspectionExpiresAt,
                          documentStatusContext.today,
                          documentStatusContext.warningLimit,
                        )}
                        >
                          {formatDocumentDateLabel(selectedVehicle.technicalInspectionExpiresAt)}
                        </dd>
                      </div>
                      <div><dt>Dernière révision</dt><dd>{formatDocumentDateLabel(selectedVehicle.updatedAt)}</dd></div>
                      <div><dt>Prochaine révision</dt><dd>{formatDocumentDateLabel(selectedVehicle.insuranceExpiresAt)}</dd></div>
                    </dl>
                  </section>

                  <section className="vehicles-detail-group">
                    <h4 className="vehicles-detail-group__title">Informations complémentaires</h4>
                    <dl className="vehicles-detail-list">
                      <div><dt>Carburant</dt><dd>{getVehicleFuelLabel(selectedVehicle.type)}</dd></div>
                      <div><dt>Capacité</dt><dd>{getVehicleCapacityLabel(selectedVehicle.type)}</dd></div>
                      <div><dt>Assurance</dt><dd>{selectedVehicle.registrationDocumentPresent ? "AXA - N 123456789" : "À compléter"}</dd></div>
                      <div><dt>Fin d&apos;assurance</dt><dd>{formatDocumentDateLabel(selectedVehicle.insuranceExpiresAt)}</dd></div>
                    </dl>
                  </section>
                </div>
              ) : null}

              {detailTab === "EQUIPEMENTS" ? (
                <div className="vehicles-detail-group">
                  <h4 className="vehicles-detail-group__title">Équipements et affectation</h4>
                  <div className="vehicles-depot-editor">
                    <select
                      value={selectedDepotIds[selectedVehicle.id] ?? ""}
                      onChange={(event) => {
                        const value = event.target.value;
                        setSelectedDepotIds((prev) => ({
                          ...prev,
                          [selectedVehicle.id]: value,
                        }));
                      }}
                      disabled={savingDepotVehicleId === selectedVehicle.id || archivingVehicleId === selectedVehicle.id}
                    >
                      <option value="">Aucune base</option>
                      {depotOptions.map((depot) => (
                        <option key={depot.id} value={depot.id}>{getDepotLabel(depot)}</option>
                      ))}
                    </select>
                    <ActionButton
                      size="sm"
                      onClick={() => handleSaveDepot(selectedVehicle.id)}
                      disabled={
                        savingDepotVehicleId === selectedVehicle.id
                        || archivingVehicleId === selectedVehicle.id
                        || (selectedDepotIds[selectedVehicle.id] ?? "") === (selectedVehicle.depotId ?? "")
                      }
                    >
                      {savingDepotVehicleId === selectedVehicle.id ? "Enregistrement..." : "Enregistrer"}
                    </ActionButton>
                  </div>
                  <p className="vehicles-table-cell-subtle">La composition détaillée des équipements reste reliée à une session fonctionnelle dédiée.</p>
                </div>
              ) : null}

              {detailTab === "MAINTENANCE" ? (
                <div className="vehicles-detail-group">
                  <h4 className="vehicles-detail-group__title">Contrôles & maintenance</h4>
                  <dl className="vehicles-detail-list">
                    <div><dt>Assurance</dt><dd>{formatDocumentDateLabel(selectedVehicle.insuranceExpiresAt)}</dd></div>
                    <div><dt>Contrôle technique</dt><dd>{formatDocumentDateLabel(selectedVehicle.technicalInspectionExpiresAt)}</dd></div>
                    <div><dt>Agrément sanitaire</dt><dd>{formatDocumentDateLabel(selectedVehicle.sanitaryApprovalExpiresAt)}</dd></div>
                  </dl>
                </div>
              ) : null}

              {detailTab === "DOCS" ? (
                <div className="vehicles-detail-group">
                  <h4 className="vehicles-detail-group__title">Conformité documentaire</h4>
                  <div className="vehicles-inline-status">
                    <StatusBadge variant={selectedVehicle.registrationDocumentPresent ? "success" : "danger"}>
                      Carte grise {selectedVehicle.registrationDocumentPresent ? "OK" : "manquante"}
                    </StatusBadge>
                    <StatusBadge variant={documentStatusBadgeVariant(selectedVehicleDocumentStatus ?? "conforme")}>
                      {documentStatusLabel(selectedVehicleDocumentStatus ?? "conforme")}
                    </StatusBadge>
                  </div>
                </div>
              ) : null}

              {detailTab === "ANOMALIES" ? (
                <div className="vehicles-detail-group">
                  <h4 className="vehicles-detail-group__title">Anomalies</h4>
                  <p className="vehicles-table-cell-subtle">
                    Aucune anomalie signalée pour ce véhicule.
                  </p>
                  <p className="vehicles-table-cell-subtle">
                    Ce panneau est visuel uniquement dans ce lot.
                  </p>
                </div>
              ) : null}

              <div className="vehicles-detail-panel__actions">
                <ActionButton
                  variant="secondary"
                  leadingIcon={<Wrench size={14} />}
                  onClick={() => openEditVehicle(selectedVehicle)}
                  disabled={archivingVehicleId === selectedVehicle.id || savingEditVehicleId === selectedVehicle.id}
                >
                  Modifier
                </ActionButton>
                <ActionButton variant="primary" leadingIcon={<History size={14} />} disabled>Voir l&apos;historique</ActionButton>
              </div>
            </>
          ) : (
            <p className="vehicles-table-cell-subtle">Sélectionnez un véhicule dans le tableau pour afficher le détail.</p>
          )}
        </aside>
      </div>

      {editingVehicle ? (
        <section className="vehicles-card">
          <div className="vehicles-card__head">
            <h2 className="vehicles-card__title">Édition avancée du véhicule sélectionné</h2>
            <p className="vehicles-card__description">
              Formulaire technique relayé hors vue principale pour conserver une présentation liste + détail proche maquette.
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
                Conformité: {documentStatusLabel(documentStatusByVehicleId.get(editingVehicle.id) ?? "conforme")}
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
                  <option value="ACTIVE">En service</option>
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
              <ActionButton
                type="button"
                variant="danger"
                onClick={() => handleArchiveVehicle(editingVehicle)}
                disabled={savingEditVehicleId === editingVehicle.id || archivingVehicleId === editingVehicle.id}
              >
                {archivingVehicleId === editingVehicle.id ? "Archivage..." : "Archiver"}
              </ActionButton>
            </div>
          </form>
        </section>
      ) : null}
    </section>
  );
}
