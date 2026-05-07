"use client";

import { useEffect, useMemo, useState } from "react";
import { Settings2 } from "lucide-react";

import { ActionButton, EmptyState, ErrorMessage, StatusBadge } from "@/app/ui";
import { COMPANY_RULE_MODE_VALUES } from "@/lib/company-rules/catalog";

type RuleModeValue = (typeof COMPANY_RULE_MODE_VALUES)[number];

type CompanyParameter = {
  id: string;
  key: string | null;
  label: string;
  description: string;
  kind: "BUSINESS_RULE" | "UI_SETTING";
  valueType: string;
  modeUsage: "RULE_MODE" | "FIXED_OFF";
  engineStatus: "BRANCHED" | "PREPARED";
  storage: { model: string; key: string | null };
  allowedValues?: readonly string[];
  note?: string;
  isWritable: boolean;
  value: string | null;
  normalizedValue: string | number | null;
  valueStatus: "NOT_STORED" | "STORED_VALID" | "STORED_INVALID";
  mode: RuleModeValue | null;
};

type ParametersResponse =
  | { ok: true; data: CompanyParameter[] }
  | { ok: false; error: string; details?: unknown };

type DraftState = {
  value: string;
  mode: RuleModeValue;
};

function kindLabel(kind: CompanyParameter["kind"]) {
  return kind === "BUSINESS_RULE" ? "Regle metier" : "Reglage UI";
}

function statusVariant(valueStatus: CompanyParameter["valueStatus"]): "success" | "warning" | "neutral" {
  if (valueStatus === "STORED_VALID") return "success";
  if (valueStatus === "STORED_INVALID") return "warning";
  return "neutral";
}

function readableValue(parameter: CompanyParameter) {
  if (parameter.normalizedValue !== null) return String(parameter.normalizedValue);
  if (parameter.value) return parameter.value;
  return "Non configure";
}

function modeVariant(mode: RuleModeValue | null): "neutral" | "info" | "warning" | "danger" {
  if (mode === "BOTH") return "info";
  if (mode === "ALERT") return "warning";
  if (mode === "BLOCK") return "danger";
  return "neutral";
}

function initialDraft(parameter: CompanyParameter): DraftState {
  return {
    value: parameter.value ?? "",
    mode: parameter.mode ?? "OFF",
  };
}

export default function CompanyRulesPanel() {
  const [parameters, setParameters] = useState<CompanyParameter[]>([]);
  const [drafts, setDrafts] = useState<Record<string, DraftState>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;

    async function loadParameters() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/company/rules", { cache: "no-store" });
        const payload = (await response.json().catch(() => null)) as ParametersResponse | null;

        if (!response.ok || !payload?.ok) {
          throw new Error(payload && !payload.ok ? payload.error : "Erreur chargement parametres");
        }

        if (!cancelled) {
          setParameters(payload.data);
          setDrafts(Object.fromEntries(payload.data.map((item) => [item.id, initialDraft(item)])));
        }
      } catch (cause) {
        if (!cancelled) setError(cause instanceof Error ? cause.message : "Erreur inconnue");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadParameters();

    return () => {
      cancelled = true;
    };
  }, []);

  const summary = useMemo(() => {
    return {
      business: parameters.filter((item) => item.kind === "BUSINESS_RULE").length,
      ui: parameters.filter((item) => item.kind === "UI_SETTING").length,
      writable: parameters.filter((item) => item.isWritable).length,
    };
  }, [parameters]);

  function updateDraft(parameterId: string, patch: Partial<DraftState>) {
    setDrafts((current) => ({
      ...current,
      [parameterId]: {
        ...(current[parameterId] ?? { value: "", mode: "OFF" as RuleModeValue }),
        ...patch,
      },
    }));
  }

  async function saveParameter(parameter: CompanyParameter) {
    const draft = drafts[parameter.id] ?? initialDraft(parameter);

    setSavingId(parameter.id);
    setFeedback((current) => ({ ...current, [parameter.id]: "" }));

    try {
      const body: Record<string, unknown> = {
        parameterId: parameter.id,
        value: draft.value,
      };

      if (parameter.modeUsage === "RULE_MODE") {
        body.mode = draft.mode;
      }

      const response = await fetch("/api/company/rules", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const payload = (await response.json().catch(() => null)) as
        | { ok: true; data: CompanyParameter }
        | { ok: false; error: string; details?: unknown }
        | null;

      if (!response.ok || !payload?.ok) {
        throw new Error(payload && !payload.ok ? payload.error : "Erreur enregistrement");
      }

      setParameters((current) => current.map((item) => (item.id === parameter.id ? payload.data : item)));
      setDrafts((current) => ({ ...current, [parameter.id]: initialDraft(payload.data) }));
      setFeedback((current) => ({ ...current, [parameter.id]: "Enregistre" }));
    } catch (cause) {
      setFeedback((current) => ({
        ...current,
        [parameter.id]: cause instanceof Error ? cause.message : "Erreur inconnue",
      }));
    } finally {
      setSavingId(null);
    }
  }

  return (
    <section className="company-card company-rules-section">
      <div className="company-card__head">
        <div className="company-card__title-row">
          <span className="company-card__title-icon" aria-hidden="true">
            <Settings2 size={16} />
          </span>
          <h2 className="company-card__title">Parametres metier</h2>
          <span className="company-chip">ALPHA</span>
        </div>
        <p className="company-card__description">Vue compacte des regles et reglages principaux de la societe.</p>
      </div>

      {loading ? <div className="company-loading">Chargement des parametres...</div> : null}
      {error ? <ErrorMessage title="Erreur parametres societe" message={error} /> : null}

      {!loading && !error ? (
        <>
          <div className="company-rules-summary">
            <StatusBadge variant="info">Regles metier: {summary.business}</StatusBadge>
            <StatusBadge variant="neutral">Reglages UI: {summary.ui}</StatusBadge>
            <StatusBadge variant="success">Editables: {summary.writable}</StatusBadge>
          </div>

          {parameters.length === 0 ? (
            <EmptyState title="Aucun parametre" message="Aucun parametre n'est disponible pour cette societe." />
          ) : (
            <div className="company-rules-table-wrap">
              <table className="company-rules-table">
                <thead>
                  <tr>
                    <th>Parametre</th>
                    <th>Valeur</th>
                    <th>Mode</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {parameters.map((parameter) => {
                    const draft = drafts[parameter.id] ?? initialDraft(parameter);
                    const editable = parameter.isWritable;
                    const saving = savingId === parameter.id;

                    return (
                      <tr key={parameter.id}>
                        <td>
                          <strong>{parameter.label}</strong>
                          <div className="company-rules-table__meta">{kindLabel(parameter.kind)}</div>
                        </td>
                        <td>
                          {editable && parameter.allowedValues && parameter.allowedValues.length > 0 ? (
                            <select
                              value={draft.value}
                              onChange={(event) => updateDraft(parameter.id, { value: event.target.value })}
                              disabled={saving}
                            >
                              <option value="">Selectionner</option>
                              {parameter.allowedValues.map((value) => (
                                <option key={value} value={value}>{value}</option>
                              ))}
                            </select>
                          ) : editable && parameter.valueType === "POSITIVE_NUMBER" ? (
                            <input
                              type="number"
                              min={1}
                              step={1}
                              value={draft.value}
                              onChange={(event) => updateDraft(parameter.id, { value: event.target.value })}
                              disabled={saving}
                            />
                          ) : (
                            <span>{readableValue(parameter)}</span>
                          )}
                        </td>
                        <td>
                          {parameter.modeUsage === "RULE_MODE" ? (
                            editable ? (
                              <select
                                value={draft.mode}
                                onChange={(event) => updateDraft(parameter.id, { mode: event.target.value as RuleModeValue })}
                                disabled={saving}
                              >
                                {COMPANY_RULE_MODE_VALUES.map((mode) => (
                                  <option key={mode} value={mode}>{mode}</option>
                                ))}
                              </select>
                            ) : (
                              <StatusBadge variant={modeVariant(parameter.mode)}>
                                {parameter.mode ?? "OFF"}
                              </StatusBadge>
                            )
                          ) : (
                            <StatusBadge variant="neutral">OFF</StatusBadge>
                          )}
                        </td>
                        <td>
                          <StatusBadge variant={statusVariant(parameter.valueStatus)}>
                            {parameter.valueStatus === "STORED_VALID"
                              ? "Valide"
                              : parameter.valueStatus === "STORED_INVALID"
                                ? "Invalide"
                                : "Non stocke"}
                          </StatusBadge>
                        </td>
                        <td>
                          {editable ? (
                            <ActionButton size="sm" variant="primary" onClick={() => saveParameter(parameter)} disabled={saving}>
                              {saving ? "..." : "Sauver"}
                            </ActionButton>
                          ) : (
                            <StatusBadge variant="neutral">Lecture</StatusBadge>
                          )}
                          {feedback[parameter.id] ? <div className="company-rules-table__feedback">{feedback[parameter.id]}</div> : null}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <details className="company-rules-advanced">
            <summary>Mode expert (details de stockage et descriptions)</summary>
            <div className="company-rules-advanced__content">
              {parameters.map((parameter) => (
                <article key={`${parameter.id}-expert`} className="company-rule-card company-rule-card--soft">
                  <h4 className="company-rule-card__title">{parameter.label}</h4>
                  <p className="company-rule-card__description">{parameter.description}</p>
                  <p><strong>ID:</strong> {parameter.id}</p>
                  <p><strong>Stockage:</strong> {parameter.storage.key ? `${parameter.storage.model}.${parameter.storage.key}` : "Non configure"}</p>
                  <p><strong>Etat moteur:</strong> {parameter.engineStatus === "BRANCHED" ? "Branche" : "Prepare"}</p>
                  {parameter.note ? <p><strong>Note:</strong> {parameter.note}</p> : null}
                </article>
              ))}
            </div>
          </details>
        </>
      ) : null}
    </section>
  );
}
