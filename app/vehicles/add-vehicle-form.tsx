"use client";

import { useState } from "react";

type VehicleType = "AMBULANCE" | "VSL" | "TAXI";

export function AddVehicleForm({
  onSubmit,
  disabled,
}: {
  onSubmit: (payload: { immatriculation: string; type: VehicleType }) => Promise<void>;
  disabled?: boolean;
}) {
  const [immatriculation, setImmatriculation] = useState("");
  const [type, setType] = useState<VehicleType>("AMBULANCE");

  function isVehicleType(value: string): value is VehicleType {
    return value === "AMBULANCE" || value === "VSL" || value === "TAXI";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      immatriculation: immatriculation.trim().toUpperCase(),
      type,
    };

    if (!payload.immatriculation) return;

    await onSubmit(payload);
    setImmatriculation("");
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

      <button disabled={disabled} style={{ padding: 10 }}>
        {disabled ? "Ajout..." : "Ajouter"}
      </button>
    </form>
  );
}