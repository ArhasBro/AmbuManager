"use client";

import Link from "next/link";
import { type CSSProperties, useMemo, useState } from "react";

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
    value: "users",
    label: "Utilisateurs",
    help: "Ajout simple d'utilisateurs. Colonnes minimales : email, nom, role, motDePasseInitial.",
    columns: ["email", "nom", "role", "motDePasseInitial", "depot"],
  },
  {
    value: "vehicles",
    label: "Véhicules",
    help: "Ajout simple de véhicules. Colonnes minimales : immatriculation, type. Colonnes optionnelles : statut, depot, dates.",
    columns: ["immatriculation", "type", "statut", "depot", "insuranceExpiresAt", "technicalInspectionExpiresAt", "registrationDocumentPresent", "sanitaryApprovalExpiresAt"],
  },
  {
    value: "templates",
    label: "Modèles horaires",
    help: "Ajout simple de modèles horaires. Colonnes minimales : nom, categorie. Horaires et contraintes optionnels.",
    columns: ["nom", "categorie", "requiredRole", "secondaryAllowedRoles", "minStaffCount", "requiredVehicleType", "isActive", "isTimeDefined", "startTime", "endTime", "crossesMidnight", "color"],
  },
  {
    value: "depots",
    label: "Dépôts / Bases",
    help: "Ajout simple de dépôts / bases. Colonnes minimales : nom, adresse.",
    columns: ["nom", "adresse"],
  },
  {
    value: "user-absences",
    label: "Absences utilisateurs",
    help: "Ajout simple d'indisponibilites. Colonnes minimales : userEmail, startAt, endAt.",
    columns: ["userEmail", "reason", "startAt", "endAt"],
  },
];

function getStepStatus(done: boolean, count?: number): StepStatus {
  if (typeof count === "number") {
    return {
      label: done ? `OK (${count})` : `À compléter (${count})`,
      variant: done ? "success" : "warning",
    };
  }

  return {
    label: done ? "OK" : "À compléter",
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
  const [domain, setDomain] = useState<ImportDomain>("users");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [committing, setCommitting] = useState(false);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [commitResult, setCommitResult] = useState<CommitData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedDomain = useMemo(() => DOMAIN_OPTIONS.find((option) => option.value === domain) ?? DOMAIN_OPTIONS[0], [domain]);

  const onboardingSteps = useMemo(
    () => [
      {
        href: links.company,
        title: "Profil société",
        description: "Renseigner l'identité complète de la société.",
        status: getStepStatus(checklist.profileComplete),
        done: checklist.profileComplete,
        countLabel: "1 / 1",
      },
      {
        href: links.depots,
        title: "Dépôts / Bases",
        description: "Créer les dépôts / bases utilisés au démarrage.",
        status: getStepStatus(checklist.depotsCount > 0, checklist.depotsCount),
        done: checklist.depotsCount > 0,
        countLabel: `${checklist.depotsCount}`,
      },
      {
        href: links.users,
        title: "Utilisateurs",
        description: "Creer les comptes et rattachements necessaires.",
        status: getStepStatus(checklist.usersCount > 0, checklist.usersCount),
        done: checklist.usersCount > 0,
        countLabel: `${checklist.usersCount}`,
      },
      {
        href: links.vehicles,
        title: "Véhicules",
        description: "Renseigner la flotte active et son statut.",
        status: getStepStatus(checklist.vehiclesCount > 0, checklist.vehiclesCount),
        done: checklist.vehiclesCount > 0,
        countLabel: `${checklist.vehiclesCount}`,
      },
      {
        href: links.templates,
        title: "Modèles horaires",
        description: "Configurer les modèles horaires de départ.",
        status: getStepStatus(checklist.templatesCount > 0, checklist.templatesCount),
        done: checklist.templatesCount > 0,
        countLabel: `${checklist.templatesCount}`,
      },
    ],
    [checklist, links.company, links.depots, links.templates, links.users, links.vehicles],
  );

  const completedImportSteps = onboardingSteps.filter((step) => step.done).length;
  const completionPct = Math.round((completedImportSteps / onboardingSteps.length) * 100);

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
    <section className="onboarding-layout onboarding-layout--triple">
      <section className="panel onboarding-card onboarding-card--timeline">
        <div className="onboarding-card__head">
          <h2 className="onboarding-card__title">Progression de la mise en route</h2>
          <p className="onboarding-card__description">Préparer les données de démarrage avant la première exploitation réelle.</p>
        </div>

        <div className="onboarding-progress">
          <div className="onboarding-progress__bar">
            <span style={{ width: `${completionPct}%` }} />
          </div>
          <strong>{completionPct}%</strong>
        </div>

        <p className="onboarding-card__description">{completedImportSteps} étapes sur {onboardingSteps.length} complétées</p>

        <div className="onboarding-steps">
          {onboardingSteps.map((step, index) => (
            <Link href={step.href} className="onboarding-step" key={step.title}>
              <div className="onboarding-step__top">
                <strong>{index + 1}. {step.title}</strong>
                <StatusBadge variant={step.status.variant}>{step.status.label}</StatusBadge>
              </div>
              <p className="onboarding-step__description">{step.description}</p>
              <div className="onboarding-step__meta">
                <span>{step.countLabel}</span>
                <span className="onboarding-step__action">{step.done ? "Ouvrir" : "Configurer"}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="panel onboarding-card onboarding-card--import">
        <div className="onboarding-card__head">
          <h2 className="onboarding-card__title">Import initial</h2>
          <p className="onboarding-card__description">Aperçu obligatoire avant validation. Aucun import destructeur.</p>
        </div>

        <ol className="onboarding-import-steps" aria-label="Étapes d'import">
          <li className="is-active"><span>1</span><small>Type d&apos;import</small></li>
          <li className={file ? "is-active" : ""}><span>2</span><small>Fichier</small></li>
          <li className={preview ? "is-active" : ""}><span>3</span><small>Aperçu</small></li>
          <li className={preview?.invalidRows ? "is-warning" : preview ? "is-active" : ""}><span>4</span><small>Erreurs</small></li>
          <li className={commitResult ? "is-active" : ""}><span>5</span><small>Validation</small></li>
        </ol>

        <div className="onboarding-domain-tabs" role="tablist" aria-label="Type d'import">
          {DOMAIN_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`onboarding-domain-tab${domain === option.value ? " is-active" : ""}`}
              onClick={() => {
                setDomain(option.value);
                setPreview(null);
                setCommitResult(null);
                setError(null);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="onboarding-upload-zone">
          <p className="onboarding-upload-zone__title">Glissez-déposez votre fichier ici</p>
          <p className="onboarding-upload-zone__text">Formats acceptés : CSV, XLSX (max. 10 Mo)</p>
          <label className="onboarding-upload-zone__picker">
            <span>Cliquez pour parcourir</span>
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

        {file ? (
          <div className="onboarding-file-chip">
            <strong>{file.name}</strong>
            <span>{Math.round(file.size / 1024)} Ko</span>
          </div>
        ) : null}

        <section className="panel-soft onboarding-hint">
          <strong>{selectedDomain.label}</strong>
          <p>{selectedDomain.help}</p>
          <p className="onboarding-hint__columns">Colonnes conseillées : {selectedDomain.columns.join(", ")}</p>
        </section>

        <div className="onboarding-actions">
          <ActionButton type="button" variant="secondary" disabled={!file || loading} onClick={() => void previewImport()}>
            {loading ? "Analyse en cours..." : "Analyser le fichier"}
          </ActionButton>
          <ActionButton type="button" variant="ghost" disabled={loading}>
            Télécharger un modèle
          </ActionButton>
          <ActionButton type="button" variant="primary" disabled={!preview || preview.rows.length === 0 || committing} onClick={() => void commitImport()}>
            {committing ? "Validation..." : "Valider l'import"}
          </ActionButton>
        </div>

        {error ? <ErrorMessage title="Erreur import" message={error} /> : null}

        {preview ? (
          <section className="onboarding-preview">
            <div className="onboarding-preview__badges">
              <StatusBadge variant="neutral">{preview.fileName}</StatusBadge>
              <StatusBadge variant="info">{preview.format.toUpperCase()}</StatusBadge>
              <StatusBadge variant="success">{preview.validRows} ligne(s) prête(s)</StatusBadge>
              <StatusBadge variant={preview.invalidRows > 0 ? "warning" : "neutral"}>{preview.invalidRows} ligne(s) en erreur</StatusBadge>
            </div>

            {preview.notes.length > 0 ? (
              <div className="onboarding-notes">
                {preview.notes.map((note) => <div key={note}>{note}</div>)}
              </div>
            ) : null}

            <section className="onboarding-block">
              <h3 className="onboarding-block__title">Aperçu d&apos;import ({preview.previewRows.length} lignes)</h3>
              {preview.previewRows.length === 0 ? (
                <div className="panel-soft onboarding-empty">Aucune ligne prête à importer.</div>
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

            <section className="onboarding-grid-feedback">
              <section className="onboarding-block onboarding-block--danger">
                <h3 className="onboarding-block__title">Erreurs détectées ({preview.errors.length})</h3>
                {preview.errors.length === 0 ? (
                  <div className="status-success onboarding-feedback">Aucune erreur bloquante détectée dans l&apos;aperçu.</div>
                ) : (
                  <div className="onboarding-errors">
                    {preview.errors.map((item, index) => (
                      <div key={`${item.rowNumber}-${index}`} className="onboarding-errors__item">
                        Ligne {item.rowNumber}{item.field ? ` - ${item.field}` : ""} - {item.message}
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section className="onboarding-block onboarding-block--success">
                <h3 className="onboarding-block__title">Prêt à importer</h3>
                <p>{preview.validRows} lignes valides sur {preview.totalRows}</p>
                <p>{preview.invalidRows} erreurs à corriger</p>
              </section>
            </section>
          </section>
        ) : null}

        {commitResult ? (
          <section className="onboarding-preview">
            <h3 className="onboarding-block__title">Résultat d&apos;import</h3>
            <div className="onboarding-preview__badges">
              <StatusBadge variant="success">{commitResult.insertedCount} insertion(s)</StatusBadge>
              <StatusBadge variant={commitResult.errorCount > 0 ? "warning" : "neutral"}>{commitResult.errorCount} ligne(s) rejetée(s)</StatusBadge>
            </div>

            {commitResult.insertedPreview.length > 0 ? (
              <div className="onboarding-notes">
                {commitResult.insertedPreview.map((row) => (
                  <div key={row.rowNumber}>Ligne {row.rowNumber} importée.</div>
                ))}
              </div>
            ) : null}

            {commitResult.errors.length > 0 ? (
              <div className="onboarding-errors">
                {commitResult.errors.map((item, index) => (
                  <div key={`${item.rowNumber}-${index}`} className="onboarding-errors__item">
                    Ligne {item.rowNumber}{item.field ? ` - ${item.field}` : ""} - {item.message}
                  </div>
                ))}
              </div>
            ) : (
              <div className="status-success onboarding-feedback">Import validé sans erreur résiduelle.</div>
            )}
          </section>
        ) : null}
      </section>

      <aside className="panel onboarding-card onboarding-card--assist">
        <div className="onboarding-card__head">
          <h2 className="onboarding-card__title">Aide import</h2>
          <p className="onboarding-card__description">Conseils de préparation avant validation finale.</p>
        </div>

        <section className="onboarding-assist-progress">
          <div className="onboarding-progress-ring" style={{ "--completion": `${completionPct}%` } as CSSProperties}>
            <span>{completionPct}%</span>
          </div>
          <div>
            <strong>{completedImportSteps} étapes terminées sur {onboardingSteps.length}</strong>
            <p>Continuez pour finaliser la préparation de votre société.</p>
          </div>
        </section>

        <section className="onboarding-assist-block">
          <h3>Étape sélectionnée</h3>
          <StatusBadge variant="info">{selectedDomain.label}</StatusBadge>
        </section>

        <section className="onboarding-assist-block">
          <h3>Conseils de préparation</h3>
          <ul>
            <li>Vérifier que les dépôts / bases sont créés et actifs.</li>
            <li>Chaque utilisateur doit avoir un email unique.</li>
            <li>Les rôles doivent correspondre au référentiel.</li>
            <li>Les dépôts / bases doivent exister et être actifs.</li>
          </ul>
        </section>

        <section className="onboarding-assist-block">
          <h3>Ordre recommandé</h3>
          <ol>
            <li>Société</li>
            <li>Dépôts / Bases</li>
            <li>Utilisateurs</li>
            <li>Véhicules</li>
            <li>Modèles horaires</li>
          </ol>
        </section>

        <div className="onboarding-assist-actions">
          <ActionButton type="button" variant="secondary">Voir le guide</ActionButton>
          <ActionButton type="button" variant="primary" disabled={!preview}>
            Continuer
          </ActionButton>
        </div>
      </aside>
    </section>
  );
}
