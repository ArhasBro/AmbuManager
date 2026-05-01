"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ActionButton, ErrorMessage, StatusBadge } from "@/app/ui";

type Checklist = {
  profileComplete: boolean;
  depotsCount: number;
  usersCount: number;
  vehiclesCount: number;
  templatesCount: number;
  absencesCount: number;
};

type Links = {
  company: string;
  depots: string;
  users: string;
  vehicles: string;
  templates: string;
};

type ImportDomain = "users" | "vehicles" | "templates" | "depots" | "user-absences";

type PreviewRow = {
  rowNumber: number;
  values: Record<string, unknown>;
};

type PreviewError = {
  rowNumber: number;
  message: string;
  field?: string;
};

type PreviewData = {
  domain: ImportDomain;
  format: "csv" | "xlsx";
  fileName: string;
  columns: string[];
  totalRows: number;
  validRows: number;
  invalidRows: number;
  previewRows: PreviewRow[];
  rows: PreviewRow[];
  errors: PreviewError[];
  notes: string[];
};

type CommitData = {
  domain: ImportDomain;
  insertedCount: number;
  errorCount: number;
  insertedPreview: PreviewRow[];
  errors: PreviewError[];
};

type StepStatus = {
  label: string;
  variant: "success" | "warning";
};

const DOMAIN_OPTIONS: Array<{ value: ImportDomain; label: string; help: string; columns: string[] }> = [
  {
    value: "depots",
    label: "Bases / depots",
    help: "Ajout simple de depots. Colonnes minimales : nom, adresse.",
    columns: ["nom", "adresse"],
  },
  {
    value: "users",
    label: "Utilisateurs",
    help: "Ajout simple d'utilisateurs. Colonnes minimales : email, nom, role, motDePasseInitial.",
    columns: ["email", "nom", "role", "motDePasseInitial", "depot"],
  },
  {
    value: "vehicles",
    label: "Vehicules",
    help: "Ajout simple de vehicules. Colonnes minimales : immatriculation, type. Colonnes optionnelles : statut, depot, dates.",
    columns: ["immatriculation", "type", "statut", "depot", "insuranceExpiresAt", "technicalInspectionExpiresAt", "registrationDocumentPresent", "sanitaryApprovalExpiresAt"],
  },
  {
    value: "templates",
    label: "Templates",
    help: "Ajout simple de templates. Colonnes minimales : nom, categorie. Horaires et contraintes optionnels.",
    columns: ["nom", "categorie", "requiredRole", "secondaryAllowedRoles", "minStaffCount", "requiredVehicleType", "isActive", "isTimeDefined", "startTime", "endTime", "crossesMidnight", "color"],
  },
  {
    value: "user-absences",
    label: "Indisponibilites utilisateurs",
    help: "Ajout simple d'indisponibilites. Colonnes minimales : userEmail, startAt, endAt.",
    columns: ["userEmail", "reason", "startAt", "endAt"],
  },
];

function getStepStatus(done: boolean, count?: number): StepStatus {
  if (typeof count === "number") {
    return {
      label: done ? `OK (${count})` : `A completer (${count})`,
      variant: done ? "success" : "warning",
    };
  }

  return {
    label: done ? "OK" : "A completer",
    variant: done ? "success" : "warning",
  };
}

function renderValue(value: unknown) {
  if (Array.isArray(value)) return value.join(", ");
  if (value === null || value === undefined) return "-";
  if (typeof value === "boolean") return value ? "Oui" : "Non";
  return String(value);
}

export default function OnboardingClient({ checklist, links }: { checklist: Checklist; links: Links }) {
  const [domain, setDomain] = useState<ImportDomain>("depots");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [committing, setCommitting] = useState(false);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [commitResult, setCommitResult] = useState<CommitData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedDomain = useMemo(() => DOMAIN_OPTIONS.find((option) => option.value === domain) ?? DOMAIN_OPTIONS[0], [domain]);

  async function previewImport() {
    if (!file) return;
    setLoading(true);
    setError(null);
    setCommitResult(null);
    try {
      const formData = new FormData();
      formData.set("domain", domain);
      formData.set("file", file);

      const response = await fetch("/api/imports", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json().catch(() => null)) as { ok?: boolean; data?: PreviewData; error?: string } | null;
      if (!response.ok || payload?.ok !== true || !payload.data) {
        throw new Error(payload?.error ?? `HTTP_${response.status}`);
      }

      setPreview(payload.data);
    } catch (reason) {
      setPreview(null);
      setError(reason instanceof Error ? reason.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  async function commitImport() {
    if (!preview || preview.rows.length === 0) return;
    setCommitting(true);
    setError(null);
    try {
      const response = await fetch("/api/imports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "commit", domain: preview.domain, rows: preview.rows }),
      });

      const payload = (await response.json().catch(() => null)) as { ok?: boolean; data?: CommitData; error?: string } | null;
      if (!response.ok || payload?.ok !== true || !payload.data) {
        throw new Error(payload?.error ?? `HTTP_${response.status}`);
      }

      setCommitResult(payload.data);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Erreur inconnue");
    } finally {
      setCommitting(false);
    }
  }

  return (
    <section className="onboarding-layout">
      <section className="panel onboarding-card">
        <div className="onboarding-card__head">
          <h2 className="onboarding-card__title">Parcours manuel recommande</h2>
          <p className="onboarding-card__description">
            Une societe pilote peut etre configuree sans import. L&apos;objectif est de rendre l&apos;ordre logique visible depuis l&apos;UI reelle.
          </p>
        </div>

        <div className="onboarding-steps">
          <StepRow href={links.company} title="1. Profil societe" description="Renseigner le profil complet de la societe." status={getStepStatus(checklist.profileComplete)} />
          <StepRow href={links.depots} title="2. Bases / depots" description="Creer les depots actifs utilises au demarrage." status={getStepStatus(checklist.depotsCount > 0, checklist.depotsCount)} />
          <StepRow href={links.users} title="3. Utilisateurs" description="Creer les comptes, roles et rattachements depots necessaires." status={getStepStatus(checklist.usersCount > 0, checklist.usersCount)} />
          <StepRow href={links.vehicles} title="4. Vehicules" description="Creer la flotte active et les rattachements bases." status={getStepStatus(checklist.vehiclesCount > 0, checklist.vehiclesCount)} />
          <StepRow href={links.templates} title="5. Templates" description="Creer les modeles de shifts utiles a la societe pilote." status={getStepStatus(checklist.templatesCount > 0, checklist.templatesCount)} />
          <StepRow href={links.users} title="6. Indisponibilites utilisateurs" description="Saisir les absences depuis le module utilisateurs." status={getStepStatus(checklist.absencesCount > 0, checklist.absencesCount)} />
        </div>
      </section>

      <section className="panel onboarding-card">
        <div className="onboarding-card__head">
          <h2 className="onboarding-card__title">Imports initiaux simples ALPHA</h2>
          <p className="onboarding-card__description">
            Ajout uniquement. Aucun import destructeur, aucune mise a jour automatique des existants, apercu obligatoire avant validation manuelle.
          </p>
        </div>

        <div className="onboarding-import-form">
          <label className="onboarding-field">
            <span className="onboarding-field__label">Domaine</span>
            <select
              value={domain}
              onChange={(event) => {
                setDomain(event.target.value as ImportDomain);
                setPreview(null);
                setCommitResult(null);
                setError(null);
              }}
            >
              {DOMAIN_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>

          <label className="onboarding-field">
            <span className="onboarding-field__label">Fichier CSV ou XLSX</span>
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={(event) => {
                setFile(event.target.files?.[0] ?? null);
                setPreview(null);
                setCommitResult(null);
                setError(null);
              }}
            />
          </label>
        </div>

        <section className="panel-soft onboarding-hint">
          <strong>{selectedDomain.label}</strong>
          <p>{selectedDomain.help}</p>
          <p className="onboarding-hint__columns">Colonnes conseillees : {selectedDomain.columns.join(", ")}</p>
        </section>

        <div className="onboarding-actions">
          <ActionButton type="button" variant="secondary" disabled={!file || loading} onClick={() => void previewImport()}>
            {loading ? "Preparation..." : "Apercu avant import"}
          </ActionButton>
          <ActionButton type="button" variant="primary" disabled={!preview || preview.rows.length === 0 || committing} onClick={() => void commitImport()}>
            {committing ? "Import en cours..." : "Valider l'import"}
          </ActionButton>
        </div>

        {error ? <ErrorMessage title="Erreur import" message={error} /> : null}

        {preview ? (
          <section className="onboarding-preview">
            <div className="onboarding-preview__badges">
              <StatusBadge variant="neutral">{preview.fileName}</StatusBadge>
              <StatusBadge variant="info">{preview.format.toUpperCase()}</StatusBadge>
              <StatusBadge variant="success">{preview.validRows} ligne(s) prete(s)</StatusBadge>
              <StatusBadge variant={preview.invalidRows > 0 ? "warning" : "neutral"}>{preview.invalidRows} ligne(s) en erreur</StatusBadge>
            </div>

            {preview.notes.length > 0 ? (
              <div className="onboarding-notes">
                {preview.notes.map((note) => <div key={note}>{note}</div>)}
              </div>
            ) : null}

            <section className="onboarding-block">
              <h3 className="onboarding-block__title">Apercu des lignes pretes</h3>
              {preview.previewRows.length === 0 ? (
                <div className="panel-soft onboarding-empty">Aucune ligne prete a importer.</div>
              ) : (
                <div className="onboarding-row-list">
                  {preview.previewRows.map((row) => (
                    <article key={row.rowNumber} className="onboarding-row-card">
                      <strong>Ligne {row.rowNumber}</strong>
                      <div className="onboarding-row-grid">
                        {Object.entries(row.values).map(([key, value]) => (
                          <div key={key} className="onboarding-row-grid__item">
                            <span className="onboarding-row-grid__label">{key}</span>
                            <span>{renderValue(value)}</span>
                          </div>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className="onboarding-block">
              <h3 className="onboarding-block__title">Rapport d&apos;erreurs</h3>
              {preview.errors.length === 0 ? (
                <div className="status-success onboarding-feedback">Aucune erreur bloquante detectee dans l&apos;apercu.</div>
              ) : (
                <div className="onboarding-errors">
                  {preview.errors.map((item, index) => (
                    <div key={`${item.rowNumber}-${index}`} className="onboarding-errors__item">
                      Ligne {item.rowNumber}{item.field ? ` • ${item.field}` : ""} - {item.message}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </section>
        ) : null}

        {commitResult ? (
          <section className="onboarding-preview">
            <h3 className="onboarding-block__title">Resultat d&apos;import</h3>
            <div className="onboarding-preview__badges">
              <StatusBadge variant="success">{commitResult.insertedCount} insertion(s)</StatusBadge>
              <StatusBadge variant={commitResult.errorCount > 0 ? "warning" : "neutral"}>{commitResult.errorCount} ligne(s) rejetee(s)</StatusBadge>
            </div>

            {commitResult.insertedPreview.length > 0 ? (
              <div className="onboarding-notes">
                {commitResult.insertedPreview.map((row) => (
                  <div key={row.rowNumber}>Ligne {row.rowNumber} importee.</div>
                ))}
              </div>
            ) : null}

            {commitResult.errors.length > 0 ? (
              <div className="onboarding-errors">
                {commitResult.errors.map((item, index) => (
                  <div key={`${item.rowNumber}-${index}`} className="onboarding-errors__item">
                    Ligne {item.rowNumber}{item.field ? ` • ${item.field}` : ""} - {item.message}
                  </div>
                ))}
              </div>
            ) : (
              <div className="status-success onboarding-feedback">Import valide sans erreur residuelle.</div>
            )}
          </section>
        ) : null}
      </section>
    </section>
  );
}

function StepRow({ href, title, description, status }: { href: string; title: string; description: string; status: StepStatus }) {
  return (
    <Link href={href} className="onboarding-step">
      <div className="onboarding-step__top">
        <strong>{title}</strong>
        <StatusBadge variant={status.variant}>{status.label}</StatusBadge>
      </div>
      <p className="onboarding-step__description">{description}</p>
      <span className="onboarding-step__action">Ouvrir</span>
    </Link>
  );
}


