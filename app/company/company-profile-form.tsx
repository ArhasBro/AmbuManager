"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";

import { ErrorMessage } from "@/app/ui";

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
  formId = "company-profile-form",
}: {
  initialProfile: CompanyProfile;
  formId?: string;
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
    <section className="company-card">
      <div className="company-card__head">
        <div className="company-card__title-row">
          <span className="company-card__title-icon" aria-hidden="true">
            <Building2 size={16} />
          </span>
          <h2 className="company-card__title">Identité société</h2>
          <span className="company-chip">Profil société</span>
        </div>
      </div>

      {error ? <ErrorMessage title="Erreur profil société" message={error} /> : null}
      {success ? <div className="company-alert company-alert--success">{success}</div> : null}

      <form id={formId} onSubmit={handleSubmit} className="company-form">
        <div className="company-form-grid company-form-grid--identity">
          <label className="company-field company-field--full">
            <span className="company-field__label">Nom de la société</span>
            <input
              id="company-name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
              disabled={isSubmitting}
            />
          </label>

          <label className="company-field company-field--full">
            <span className="company-field__label">Gérants</span>
            <input
              id="company-managers"
              value={form.managerNames}
              onChange={(e) => updateField("managerNames", e.target.value)}
              required
              disabled={isSubmitting}
            />
          </label>

          <label className="company-field company-field--full">
            <span className="company-field__label">Adresse</span>
            <input
              id="company-address"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              required
              disabled={isSubmitting}
            />
          </label>

          <label className="company-field company-field--full">
            <span className="company-field__label">Téléphone</span>
            <input
              id="company-phone"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              required
              disabled={isSubmitting}
            />
          </label>

          <label className="company-field company-field--full">
            <span className="company-field__label">SIRET</span>
            <input
              id="company-siret"
              value={form.siret}
              onChange={(e) => updateField("siret", e.target.value)}
              required
              disabled={isSubmitting}
            />
          </label>
        </div>
      </form>
    </section>
  );
}
