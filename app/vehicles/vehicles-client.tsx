"use client";

import { useState } from "react";
import { AddVehicleForm } from "./add-vehicle-form";

type Vehicle = {
  id: string;
  immatriculation: string;
  type: string | null;
  status: string | null;
  createdAt: string;
};

type ApiSuccess<T> = { ok: true; data: T };
type ApiFailure = { ok: false; error: string };
type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

function getApiError<T>(payload: ApiResponse<T> | null, fallback: string) {
  return payload && !payload.ok ? payload.error : fallback;
}

export default function VehiclesClient({
  initialVehicles,
}: {
  initialVehicles: Vehicle[];
}) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleAddVehicle(payload: {
    immatriculation: string;
    type: string;
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

      setVehicles((prev) => [data.data, ...prev]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setIsSubmitting(false);
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
        <AddVehicleForm onSubmit={handleAddVehicle} disabled={isSubmitting} />
        {error && <p style={{ marginTop: 10, color: "crimson" }}>{error}</p>}
      </div>

      <div style={{ marginTop: 20 }}>
        {vehicles.length === 0 ? (
          <p>Aucun véhicule pour le moment.</p>
        ) : (
          <ul style={{ marginTop: 16, paddingLeft: 16 }}>
            {vehicles.map((v) => (
              <li key={v.id} style={{ marginBottom: 10 }}>
                <strong>{v.immatriculation}</strong> — {v.type ?? "-"} —{" "}
                {v.status ?? "-"}
                <button
                  onClick={() => handleDeleteVehicle(v.id)}
                  disabled={deletingId === v.id}
                  style={{
                    marginLeft: 12,
                    padding: "4px 10px",
                    border: "1px solid #ccc",
                    borderRadius: 6,
                    cursor: deletingId === v.id ? "not-allowed" : "pointer",
                  }}
                >
                  {deletingId === v.id ? "Suppression..." : "Supprimer"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}