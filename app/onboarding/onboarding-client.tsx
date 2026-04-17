"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";

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

const DOMAIN_OPTIONS: Array<{ value: ImportDomain; label: string; help: string; columns: string[] }> = [
  {
    value: "depots",
    label: "Bases / dépôts",
    help: "Ajout simple de dépôts. Colonnes minimales : nom, adresse.",
    columns: ["nom", "adresse"],
  },
  {
    value: "users",
    label: "Utilisateurs",
    help: "Ajout simple d’utilisateurs. Colonnes minimales : email, nom, role, motDePasseInitial.",
    columns: ["email", "nom", "role", "motDePasseInitial", "depot"],
  },
  {
    value: "vehicles",
    label: "Véhicules",
    help: "Ajout simple de véhicules. Colonnes minimales : immatriculation, type. Colonnes optionnelles : statut, dépôt, dates.",
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
    label: "Indisponibilités utilisateurs",
    help: "Ajout simple d’indisponibilités. Colonnes minimales : userEmail, startAt, endAt.",
    columns: ["userEmail", "reason", "startAt", "endAt"],
  },
];

function statusLabel(done: boolean, count?: number) {
  if (typeof count === "number") return done ? `OK (${count})` : `À compléter (${count})`;
  return done ? "OK" : "À compléter";
}

function renderValue(value: unknown) {
  if (Array.isArray(value)) return value.join(", ");
  if (value === null || value === undefined) return "—";
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
    <div style={{ display: "grid", gap: 16 }}>
      <section style={{ display: "grid", gap: 12, border: "1px solid #d0d7de", borderRadius: 12, padding: 16, background: "#fff" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 18 }}>Parcours manuel recommandé</div>
          <p style={{ margin: "8px 0 0 0", opacity: 0.8 }}>
            Une société pilote peut être configurée sans import. L’objectif ici est de rendre l’ordre logique visible depuis l’UI réelle.
          </p>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          <StepRow href={links.company} title="1. Profil société" description="Renseigner le profil complet de la société." status={statusLabel(checklist.profileComplete)} />
          <StepRow href={links.depots} title="2. Bases / dépôts" description="Créer les dépôts actifs utilisés au démarrage." status={statusLabel(checklist.depotsCount > 0, checklist.depotsCount)} />
          <StepRow href={links.users} title="3. Utilisateurs" description="Créer les comptes, rôles et rattachements dépôts nécessaires." status={statusLabel(checklist.usersCount > 0, checklist.usersCount)} />
          <StepRow href={links.vehicles} title="4. Véhicules" description="Créer la flotte active et les rattachements bases." status={statusLabel(checklist.vehiclesCount > 0, checklist.vehiclesCount)} />
          <StepRow href={links.templates} title="5. Templates" description="Créer les modèles de shifts utiles à la société pilote." status={statusLabel(checklist.templatesCount > 0, checklist.templatesCount)} />
          <StepRow href={links.users} title="6. Indisponibilités utilisateurs" description="Saisir les absences directement depuis le module utilisateurs." status={statusLabel(checklist.absencesCount > 0, checklist.absencesCount)} />
        </div>
      </section>

      <section style={{ display: "grid", gap: 12, border: "1px solid #d0d7de", borderRadius: 12, padding: 16, background: "#fff" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 18 }}>Imports initiaux simples ALPHA</div>
          <p style={{ margin: "8px 0 0 0", opacity: 0.8 }}>
            Ajout uniquement. Aucun import destructeur, aucune mise à jour automatique des existants, aperçu obligatoire avant validation manuelle.
          </p>
        </div>

        <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <label style={{ display: "grid", gap: 6 }}>
            <span>Domaine</span>
            <select value={domain} onChange={(event) => { setDomain(event.target.value as ImportDomain); setPreview(null); setCommitResult(null); setError(null); }}>
              {DOMAIN_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>

          <label style={{ display: "grid", gap: 6 }}>
            <span>Fichier CSV ou XLSX</span>
            <input type="file" accept=".csv,.xlsx" onChange={(event) => { setFile(event.target.files?.[0] ?? null); setPreview(null); setCommitResult(null); setError(null); }} />
          </label>
        </div>

        <div style={{ display: "grid", gap: 6, padding: 12, borderRadius: 10, background: "#f6f8fa" }}>
          <strong>{selectedDomain.label}</strong>
          <span style={{ opacity: 0.85 }}>{selectedDomain.help}</span>
          <span style={{ fontFamily: "monospace", fontSize: 13 }}>Colonnes conseillées : {selectedDomain.columns.join(", ")}</span>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button type="button" disabled={!file || loading} onClick={() => void previewImport()}>
            {loading ? "Préparation..." : "Aperçu avant import"}
          </button>
          <button type="button" disabled={!preview || preview.rows.length === 0 || committing} onClick={() => void commitImport()}>
            {committing ? "Import en cours..." : "Valider l’import"}
          </button>
        </div>

        {error ? <div style={{ color: "crimson" }}>Erreur : {error}</div> : null}

        {preview ? (
          <div style={{ display: "grid", gap: 12, borderTop: "1px solid #d0d7de", paddingTop: 12 }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Badge>{preview.fileName}</Badge>
              <Badge>{preview.format.toUpperCase()}</Badge>
              <Badge>{preview.validRows} ligne(s) prête(s)</Badge>
              <Badge>{preview.invalidRows} ligne(s) en erreur</Badge>
            </div>

            {preview.notes.length > 0 ? (
              <div style={{ display: "grid", gap: 4 }}>
                {preview.notes.map((note) => <div key={note} style={{ opacity: 0.85 }}>• {note}</div>)}
              </div>
            ) : null}

            <div style={{ display: "grid", gap: 6 }}>
              <strong>Aperçu des lignes prêtes</strong>
              {preview.previewRows.length === 0 ? (
                <div style={{ opacity: 0.7 }}>Aucune ligne prête à importer.</div>
              ) : (
                <div style={{ display: "grid", gap: 8 }}>
                  {preview.previewRows.map((row) => (
                    <div key={row.rowNumber} style={{ border: "1px solid #d0d7de", borderRadius: 10, padding: 10 }}>
                      <div style={{ fontWeight: 600, marginBottom: 6 }}>Ligne {row.rowNumber}</div>
                      <div style={{ display: "grid", gap: 4 }}>
                        {Object.entries(row.values).map(([key, value]) => (
                          <div key={key} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 8 }}>
                            <span style={{ opacity: 0.75 }}>{key}</span>
                            <span>{renderValue(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: "grid", gap: 6 }}>
              <strong>Rapport d’erreurs</strong>
              {preview.errors.length === 0 ? (
                <div style={{ color: "green" }}>Aucune erreur bloquante détectée dans l’aperçu.</div>
              ) : (
                <div style={{ display: "grid", gap: 4 }}>
                  {preview.errors.map((item, index) => (
                    <div key={`${item.rowNumber}-${index}`} style={{ color: "crimson" }}>
                      Ligne {item.rowNumber}{item.field ? ` • ${item.field}` : ""} — {item.message}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}

        {commitResult ? (
          <div style={{ display: "grid", gap: 8, borderTop: "1px solid #d0d7de", paddingTop: 12 }}>
            <strong>Résultat d’import</strong>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Badge>{commitResult.insertedCount} insertion(s)</Badge>
              <Badge>{commitResult.errorCount} ligne(s) rejetée(s)</Badge>
            </div>

            {commitResult.insertedPreview.length > 0 ? (
              <div style={{ display: "grid", gap: 4 }}>
                {commitResult.insertedPreview.map((row) => (
                  <div key={row.rowNumber} style={{ opacity: 0.85 }}>Ligne {row.rowNumber} importée.</div>
                ))}
              </div>
            ) : null}

            {commitResult.errors.length > 0 ? (
              <div style={{ display: "grid", gap: 4 }}>
                {commitResult.errors.map((item, index) => (
                  <div key={`${item.rowNumber}-${index}`} style={{ color: "crimson" }}>
                    Ligne {item.rowNumber}{item.field ? ` • ${item.field}` : ""} — {item.message}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: "green" }}>Import validé sans erreur résiduelle.</div>
            )}
          </div>
        ) : null}
      </section>
    </div>
  );
}

function StepRow({ href, title, description, status }: { href: string; title: string; description: string; status: string }) {
  return (
    <Link href={href} style={{ display: "grid", gap: 6, textDecoration: "none", color: "inherit", border: "1px solid #d0d7de", borderRadius: 10, padding: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <strong>{title}</strong>
        <span style={{ opacity: 0.75 }}>{status}</span>
      </div>
      <span style={{ opacity: 0.8 }}>{description}</span>
      <span style={{ fontWeight: 600 }}>Ouvrir</span>
    </Link>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return <span style={{ padding: "6px 10px", borderRadius: 999, background: "#f3f4f6" }}>{children}</span>;
}
