"use client";

import { useState } from "react";

type VehicleType = "AMBULANCE" | "VSL" | "TAXI";
type VehicleStatus = "ACTIVE" | "MAINTENANCE" | "OUT_OF_SERVICE";

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
    return value === "AMBULANCE" || value === "VSL" || value === "TAXI";
  }

  function isVehicleStatus(value: string): value is VehicleStatus {
    return value === "ACTIVE" || value === "MAINTENANCE" || value === "OUT_OF_SERVICE";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

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
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <input
        value={immatriculation}
        onChange={(e) => setImmatriculation(e.target.value)}
        placeholder="Immatriculation (ex: AA-123-AA)"
        style={{ padding: 10, minWidth: 240 }}
        disabled={disabled}
      />

      <select
        value={type}
        onChange={(e) => {
          const v = e.target.value;
          if (isVehicleType(v)) setType(v);
        }}
        style={{ padding: 10 }}
        disabled={disabled}
      >
        <option value="AMBULANCE">AMBULANCE</option>
        <option value="VSL">VSL</option>
        <option value="TAXI">TAXI</option>
      </select>

      <select
        value={status}
        onChange={(e) => {
          const v = e.target.value;
          if (isVehicleStatus(v)) setStatus(v);
        }}
        style={{ padding: 10 }}
        disabled={disabled}
      >
        <option value="ACTIVE">ACTIVE</option>
        <option value="MAINTENANCE">MAINTENANCE</option>
        <option value="OUT_OF_SERVICE">OUT_OF_SERVICE</option>
      </select>

      <button disabled={disabled} style={{ padding: 10 }}>
        {disabled ? "Ajout..." : "Ajouter"}
      </button>
    </form>
  );
}
