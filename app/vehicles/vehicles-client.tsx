"use client";

import { useMemo, useState } from "react";
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
type VehicleDocumentStatus = "conforme" | "bientôt expiré" | "expiré";

const VEHICLE_TYPE_OPTIONS: VehicleTypeOption[] = ["AMBULANCE", "VSL", "TAXI"];
const VEHICLE_STATUS_OPTIONS: VehicleStatusOption[] = ["ACTIVE", "MAINTENANCE", "OUT_OF_SERVICE"];
const DOCUMENT_WARNING_WINDOW_DAYS = 30;

const DOCUMENT_STATUS_STYLES: Record<VehicleDocumentStatus, React.CSSProperties> = {
  conforme: {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 10px",
    borderRadius: 999,
    border: "1px solid #bbf7d0",
    backgroundColor: "#f0fdf4",
    color: "#166534",
    fontSize: 13,
    fontWeight: 600,
  },
  "bientôt expiré": {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 10px",
    borderRadius: 999,
    border: "1px solid #fde68a",
    backgroundColor: "#fffbeb",
    color: "#92400e",
    fontSize: 13,
    fontWeight: 600,
  },
  expiré: {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 10px",
    borderRadius: 999,
    border: "1px solid #fecaca",
    backgroundColor: "#fef2f2",
    color: "#991b1b",
    fontSize: 13,
    fontWeight: 600,
  },
};

function getApiError<T>(payload: ApiResponse<T> | null, fallback: string) {
  return payload && !payload.ok ? payload.error : fallback;
}

function buildInitialSelectedDepotIds(vehicles: Vehicle[]) {
  return Object.fromEntries(vehicles.map((vehicle) => [vehicle.id, vehicle.depotId ?? ""]));
}

function getDepotLabel(depot: DepotOption) {
  return depot.isActive ? depot.name : `${depot.name} (archivé)`;
}

function compareVehiclesByImmatriculation(a: Vehicle, b: Vehicle) {
  return a.immatriculation.localeCompare(b.immatriculation, "fr", { sensitivity: "base" });
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
    isExpiredDocumentDate(vehicle.insuranceExpiresAt, today) ||
    isExpiredDocumentDate(vehicle.technicalInspectionExpiresAt, today) ||
    isExpiredDocumentDate(vehicle.sanitaryApprovalExpiresAt, today);

  if (hasExpiredDocument || !vehicle.registrationDocumentPresent) {
    return "expiré";
  }

  const hasSoonExpiringDocument =
    isSoonExpiringDocumentDate(vehicle.insuranceExpiresAt, today, warningLimit) ||
    isSoonExpiringDocumentDate(vehicle.technicalInspectionExpiresAt, today, warningLimit) ||
    isSoonExpiringDocumentDate(vehicle.sanitaryApprovalExpiresAt, today, warningLimit);

  if (hasSoonExpiringDocument) {
    return "bientôt expiré";
  }

  return "conforme";
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
  const [deletingId, setDeletingId] = useState<string | null>(null);
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

  const depotOptions = useMemo(() => availableDepots, [availableDepots]);
  const displayVehicles = useMemo(() => [...vehicles].sort(compareVehiclesByImmatriculation), [vehicles]);
  const documentStatusContext = useMemo(() => {
    const today = getStartOfToday();
    const warningLimit = new Date(today);
    warningLimit.setDate(warningLimit.getDate() + DOCUMENT_WARNING_WINDOW_DAYS);

    return { today, warningLimit };
  }, []);

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
        throw new Error(getApiError(data, "Erreur lors de la création du véhicule"));
      }

      setVehicles((prev) => [...prev, data.data]);
      setSelectedDepotIds((prev) => ({
        ...prev,
        [data.data.id]: data.data.depotId ?? "",
      }));
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
        throw new Error(getApiError(data, "Erreur lors de l’enregistrement de la base"));
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

  async function handleDeleteVehicle(id: string) {
    const ok = window.confirm("Supprimer ce véhicule ?");
    if (!ok) return;

    setDeletingId(id);
    clearFeedback();

    try {
      const res = await fetch(`/api/vehicles?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      const data = (await res.json().catch(() => null)) as ApiResponse<{ id: string }> | null;

      if (!res.ok || !data?.ok) {
        throw new Error(getApiError(data, "Erreur lors de la suppression"));
      }

      setVehicles((prev) => prev.filter((v) => v.id !== id));
      setSelectedDepotIds((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      if (editingVehicleId === id) {
        resetEditForm();
      }
      setSuccessMessage("Véhicule supprimé.");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setDeletingId(null);
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
        throw new Error(getApiError(data, "Erreur lors de l’archivage du véhicule"));
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

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 10 }}>
        <h2 style={{ marginTop: 0 }}>Ajouter un véhicule</h2>
        {canCreateVehicle ? (
          <AddVehicleForm onSubmit={handleAddVehicle} disabled={isSubmitting} />
        ) : (
          <p style={{ margin: 0, opacity: 0.8 }}>Création réservée au profil ADMIN.</p>
        )}
        {error && <p style={{ marginTop: 10, color: "crimson" }}>{error}</p>}
        {successMessage && <p style={{ marginTop: 10, color: "green" }}>{successMessage}</p>}
      </div>

      <div style={{ marginTop: 20 }}>
        <p style={{ marginTop: 0, opacity: 0.8 }}>
          État documentaire affiché sur la base des 4 champs minimaux existants. Seuil local UI pour “bientôt expiré” : {DOCUMENT_WARNING_WINDOW_DAYS} jours.
        </p>

        {displayVehicles.length === 0 ? (
          <p>Aucun véhicule pour le moment.</p>
        ) : (
          <ul style={{ marginTop: 16, paddingLeft: 16 }}>
            {displayVehicles.map((v) => {
              const currentDepot = v.depot;
              const currentSelection = selectedDepotIds[v.id] ?? "";
              const options = currentDepot && !depotOptions.some((depot) => depot.id === currentDepot.id)
                ? [currentDepot, ...depotOptions]
                : depotOptions;
              const hasPendingDepotChange = currentSelection !== (v.depotId ?? "");
              const isEditing = editingVehicleId === v.id;
              const isSavingEdit = savingEditVehicleId === v.id;
              const isArchiving = archivingVehicleId === v.id;
              const isSavingDepot = savingDepotVehicleId === v.id;
              const isDeleting = deletingId === v.id;
              const isBusy = isArchiving || isSavingDepot || isSavingEdit || isDeleting;
              const documentStatus = getVehicleDocumentStatus(
                v,
                documentStatusContext.today,
                documentStatusContext.warningLimit,
              );

              return (
                <li key={v.id} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <strong>{v.immatriculation}</strong> — {v.type ?? "-"} — {v.status ?? "-"}
                    <span style={DOCUMENT_STATUS_STYLES[documentStatus]}>Conformité : {documentStatus}</span>
                  </div>

                  <div style={{ marginTop: 6, display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <span>Assurance : {formatDocumentDateLabel(v.insuranceExpiresAt)}</span>
                    <span>Contrôle technique : {formatDocumentDateLabel(v.technicalInspectionExpiresAt)}</span>
                    <span>Carte grise : {v.registrationDocumentPresent ? "Présente" : "Absente"}</span>
                    <span>Agrément sanitaire : {formatDocumentDateLabel(v.sanitaryApprovalExpiresAt)}</span>
                  </div>

                  <div style={{ marginTop: 6, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <span>Base actuelle : {v.depot ? getDepotLabel(v.depot) : "Aucune"}</span>

                    <select
                      value={currentSelection}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedDepotIds((prev) => ({
                          ...prev,
                          [v.id]: value,
                        }));
                      }}
                      disabled={isSavingDepot || isArchiving}
                      style={{ padding: 8 }}
                    >
                      <option value="">Aucune base</option>
                      {options.map((depot) => (
                        <option key={depot.id} value={depot.id}>
                          {getDepotLabel(depot)}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => handleSaveDepot(v.id)}
                      disabled={isSavingDepot || !hasPendingDepotChange || isArchiving}
                      style={{ padding: "6px 10px" }}
                    >
                      {isSavingDepot ? "Enregistrement..." : "Enregistrer base"}
                    </button>

                    <button
                      type="button"
                      onClick={() => openEditVehicle(v)}
                      disabled={isSavingEdit || isArchiving}
                      style={{
                        padding: "4px 10px",
                        border: "1px solid #ccc",
                        borderRadius: 6,
                        cursor: isSavingEdit || isArchiving ? "not-allowed" : "pointer",
                      }}
                    >
                      {isEditing ? "Édition en cours" : "Modifier"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleArchiveVehicle(v)}
                      disabled={isBusy}
                      style={{
                        padding: "4px 10px",
                        border: "1px solid #ccc",
                        borderRadius: 6,
                        cursor: isBusy ? "not-allowed" : "pointer",
                      }}
                    >
                      {isArchiving ? "Archivage..." : "Archiver"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteVehicle(v.id)}
                      disabled={isDeleting || isArchiving}
                      style={{
                        padding: "4px 10px",
                        border: "1px solid #ccc",
                        borderRadius: 6,
                        cursor: isDeleting || isArchiving ? "not-allowed" : "pointer",
                      }}
                    >
                      {isDeleting ? "Suppression..." : "Supprimer"}
                    </button>
                  </div>

                  {isEditing && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        void handleSaveVehicle(v.id);
                      }}
                      style={{
                        marginTop: 10,
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
                        alignItems: "center",
                        padding: 12,
                        border: "1px solid #eee",
                        borderRadius: 8,
                      }}
                    >
                      <input
                        value={editImmatriculation}
                        onChange={(e) => setEditImmatriculation(e.target.value)}
                        placeholder="Immatriculation"
                        disabled={isSavingEdit || isArchiving}
                        style={{ padding: 8, minWidth: 180 }}
                      />

                      <select
                        value={editType}
                        onChange={(e) => setEditType(getEditableVehicleType(e.target.value))}
                        disabled={isSavingEdit || isArchiving}
                        style={{ padding: 8 }}
                      >
                        {VEHICLE_TYPE_OPTIONS.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>

                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(getEditableVehicleStatus(e.target.value))}
                        disabled={isSavingEdit || isArchiving}
                        style={{ padding: 8 }}
                      >
                        {VEHICLE_STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>

                      <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <span>Assurance</span>
                        <input
                          type="date"
                          value={editInsuranceExpiresAt}
                          onChange={(e) => setEditInsuranceExpiresAt(e.target.value)}
                          disabled={isSavingEdit || isArchiving}
                          style={{ padding: 8 }}
                        />
                      </label>

                      <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <span>Contrôle technique</span>
                        <input
                          type="date"
                          value={editTechnicalInspectionExpiresAt}
                          onChange={(e) => setEditTechnicalInspectionExpiresAt(e.target.value)}
                          disabled={isSavingEdit || isArchiving}
                          style={{ padding: 8 }}
                        />
                      </label>

                      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input
                          type="checkbox"
                          checked={editRegistrationDocumentPresent}
                          onChange={(e) => setEditRegistrationDocumentPresent(e.target.checked)}
                          disabled={isSavingEdit || isArchiving}
                        />
                        <span>Carte grise présente</span>
                      </label>

                      <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <span>Agrément sanitaire</span>
                        <input
                          type="date"
                          value={editSanitaryApprovalExpiresAt}
                          onChange={(e) => setEditSanitaryApprovalExpiresAt(e.target.value)}
                          disabled={isSavingEdit || isArchiving}
                          style={{ padding: 8 }}
                        />
                      </label>

                      <button type="submit" disabled={isSavingEdit || isArchiving} style={{ padding: "6px 10px" }}>
                        {isSavingEdit ? "Enregistrement..." : "Enregistrer modifications"}
                      </button>

                      <button
                        type="button"
                        onClick={resetEditForm}
                        disabled={isSavingEdit || isArchiving}
                        style={{
                          padding: "6px 10px",
                          border: "1px solid #ccc",
                          borderRadius: 6,
                          cursor: isSavingEdit || isArchiving ? "not-allowed" : "pointer",
                        }}
                      >
                        Annuler
                      </button>
                    </form>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
