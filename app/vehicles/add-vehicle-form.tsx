"use client";

import { useState } from "react";

import { ActionButton } from "@/app/ui";

type VehicleType = "AMBULANCE" | "VSL" | "TAXI";
type VehicleStatus = "ACTIVE" | "MAINTENANCE" | "OUT_OF_SERVICE";

const VEHICLE_TYPE_OPTIONS: Array<{ value: VehicleType; label: string }> = [
  { value: "AMBULANCE", label: "Ambulance" },
  { value: "VSL", label: "VSL" },
  { value: "TAXI", label: "Taxi" },
];

const VEHICLE_STATUS_OPTIONS: Array<{ value: VehicleStatus; label: string }> = [
  { value: "ACTIVE", label: "Disponible" },
  { value: "MAINTENANCE", label: "Maintenance" },
  { value: "OUT_OF_SERVICE", label: "Hors service" },
];

export function AddVehicleForm({
  onSubmit,
  disabled,
}: {
  onSubmit: (payload: { immatriculation: string; type: VehicleType; status: VehicleStatus }) => Promise<void>;
  disabled?: boolean;
}) {
  const [immatriculation, setImmatriculation] = useState("");
  const [type, setType] = useState<VehicleType>("AMBULANCE");
  const [status, setStatus] = useState<VehicleStatus>("ACTIVE");

  function isVehicleType(value: string): value is VehicleType {
    return VEHICLE_TYPE_OPTIONS.some((option) => option.value === value);
  }

  function isVehicleStatus(value: string): value is VehicleStatus {
    return VEHICLE_STATUS_OPTIONS.some((option) => option.value === value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      immatriculation: immatriculation.trim().toUpperCase(),
      type,
      status,
    };

    if (!payload.immatriculation) return;

    await onSubmit(payload);
    setImmatriculation("");
    setType("AMBULANCE");
    setStatus("ACTIVE");
  }

  return (
    <form onSubmit={handleSubmit} className="vehicles-form vehicles-form-grid vehicles-form-grid--create">
      <label className="vehicles-field">
        <span className="vehicles-field__label">Immatriculation</span>
        <input
          type="text"
          value={immatriculation}
          onChange={(event) => setImmatriculation(event.target.value)}
          placeholder="AA-123-AA"
          disabled={disabled}
          maxLength={24}
          required
        />
      </label>

      <label className="vehicles-field">
        <span className="vehicles-field__label">Type</span>
        <select
          value={type}
          onChange={(event) => {
            const nextValue = event.target.value;
            if (isVehicleType(nextValue)) setType(nextValue);
          }}
          disabled={disabled}
        >
          {VEHICLE_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="vehicles-field">
        <span className="vehicles-field__label">Statut</span>
        <select
          value={status}
          onChange={(event) => {
            const nextValue = event.target.value;
            if (isVehicleStatus(nextValue)) setStatus(nextValue);
          }}
          disabled={disabled}
        >
          {VEHICLE_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <div className="vehicles-actions vehicles-actions--end">
        <ActionButton type="submit" variant="primary" busy={disabled} busyLabel="Ajout...">
          Ajouter le vehicule
        </ActionButton>
      </div>
    </form>
  );
}
