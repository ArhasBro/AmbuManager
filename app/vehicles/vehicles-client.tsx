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
  depot: DepotOption | null;
  createdAt: string;
  updatedAt: string;
};

type ApiSuccess<T> = { ok: true; data: T };
type ApiFailure = { ok: false; error: string };
type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [savingDepotVehicleId, setSavingDepotVehicleId] = useState<string | null>(null);

  const depotOptions = useMemo(() => availableDepots, [availableDepots]);
  const displayVehicles = useMemo(() => [...vehicles].sort(compareVehiclesByImmatriculation), [vehicles]);

  async function handleAddVehicle(payload: {
    immatriculation: string;
    type: string;
    status: string;
  }) {
    setIsSubmitting(true);
    setError(null);

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
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSaveDepot(vehicleId: string) {
    setSavingDepotVehicleId(vehicleId);
    setError(null);

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
    setError(null);

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
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setDeletingId(null);
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
      </div>

      <div style={{ marginTop: 20 }}>
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

              return (
                <li key={v.id} style={{ marginBottom: 14 }}>
                  <div>
                    <strong>{v.immatriculation}</strong> — {v.type ?? "-"} — {v.status ?? "-"}
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
                      disabled={savingDepotVehicleId === v.id}
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
                      onClick={() => handleSaveDepot(v.id)}
                      disabled={savingDepotVehicleId === v.id || !hasPendingDepotChange}
                      style={{ padding: "6px 10px" }}
                    >
                      {savingDepotVehicleId === v.id ? "Enregistrement..." : "Enregistrer base"}
                    </button>

                    <button
                      onClick={() => handleDeleteVehicle(v.id)}
                      disabled={deletingId === v.id}
                      style={{
                        padding: "4px 10px",
                        border: "1px solid #ccc",
                        borderRadius: 6,
                        cursor: deletingId === v.id ? "not-allowed" : "pointer",
                      }}
                    >
                      {deletingId === v.id ? "Suppression..." : "Supprimer"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
