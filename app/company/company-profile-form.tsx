"use client";

import { useState } from "react";

type CompanyProfile = {
  name: string;
  managerNames: string;
  address: string;
  phone: string;
  siret: string;
};

type ApiSuccess<T> = { ok: true; data: T };
type ApiFailure = { ok: false; error: string; details?: unknown };
type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

type CompanyProfileResponse = CompanyProfile & {
  id: string;
  updatedAt: string;
};

function getApiError<T>(payload: ApiResponse<T> | null, fallback: string) {
  return payload && !payload.ok ? payload.error : fallback;
}

export default function CompanyProfileForm({
  initialProfile,
}: {
  initialProfile: CompanyProfile;
}) {
  const [form, setForm] = useState<CompanyProfile>(initialProfile);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function updateField<K extends keyof CompanyProfile>(key: K, value: CompanyProfile[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/company/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json().catch(() => null)) as ApiResponse<CompanyProfileResponse> | null;

      if (!res.ok || !data?.ok) {
        throw new Error(getApiError(data, "Erreur lors de la mise à jour du profil société"));
      }

      setForm({
        name: data.data.name,
        managerNames: data.data.managerNames,
        address: data.data.address,
        phone: data.data.phone,
        siret: data.data.siret,
      });
      setSuccess("Profil société mis à jour.");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gap: 16,
        padding: 16,
        border: "1px solid #ddd",
        borderRadius: 10,
        maxWidth: 720,
      }}
    >
      <div style={{ display: "grid", gap: 8 }}>
        <label htmlFor="company-name">Nom société</label>
        <input
          id="company-name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          required
          disabled={isSubmitting}
          style={{ padding: 10 }}
        />
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <label htmlFor="company-managers">Nom des gérants</label>
        <input
          id="company-managers"
          value={form.managerNames}
          onChange={(e) => updateField("managerNames", e.target.value)}
          required
          disabled={isSubmitting}
          style={{ padding: 10 }}
        />
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <label htmlFor="company-address">Adresse</label>
        <input
          id="company-address"
          value={form.address}
          onChange={(e) => updateField("address", e.target.value)}
          required
          disabled={isSubmitting}
          style={{ padding: 10 }}
        />
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <label htmlFor="company-phone">Téléphone</label>
        <input
          id="company-phone"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          required
          disabled={isSubmitting}
          style={{ padding: 10 }}
        />
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <label htmlFor="company-siret">SIRET</label>
        <input
          id="company-siret"
          value={form.siret}
          onChange={(e) => updateField("siret", e.target.value)}
          required
          disabled={isSubmitting}
          style={{ padding: 10 }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <button disabled={isSubmitting} style={{ padding: "10px 14px" }}>
          {isSubmitting ? "Enregistrement..." : "Enregistrer"}
        </button>
        {success ? <span style={{ color: "green" }}>{success}</span> : null}
        {error ? <span style={{ color: "crimson" }}>{error}</span> : null}
      </div>
    </form>
  );
}
