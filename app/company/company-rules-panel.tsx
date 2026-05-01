"use client";

import { useEffect, useState } from "react";

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
  storage: {
    model: string;
    key: string | null;
  };
  allowedValues?: readonly string[];
  note?: string;
  isWritable: boolean;
  value: string | null;
  normalizedValue: string | number | null;
  valueStatus: "NOT_STORED" | "STORED_VALID" | "STORED_INVALID";
  mode: RuleModeValue | null;
  companyRuleId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

type ParametersResponse =
  | { ok: true; data: CompanyParameter[] }
  | { ok: false; error: string; details?: unknown };

type DraftState = {
  value: string;
  mode: RuleModeValue;
};

type SaveFeedback = {
  message: string | null;
  error: string | null;
};

function formatKind(kind: CompanyParameter["kind"]) {
  return kind === "BUSINESS_RULE" ? "Parametre metier ALPHA" : "Reglage UI / exploitation";
}

function formatEngineStatus(engineStatus: CompanyParameter["engineStatus"]) {
  return engineStatus === "BRANCHED" ? "Branche" : "Prepare";
}

function formatValueType(valueType: CompanyParameter["valueType"]) {
  switch (valueType) {
    case "POSITIVE_NUMBER":
      return "Nombre positif";
    case "ENUM":
      return "Liste de valeurs";
    default:
      return "INFORMATION NON FOURNIE — À CONFIRMER";
  }
}

function formatValueStatus(valueStatus: CompanyParameter["valueStatus"]) {
  switch (valueStatus) {
    case "STORED_VALID":
      return "Stockee et valide";
    case "STORED_INVALID":
      return "Stockee mais invalide";
    default:
      return "Non stockee";
  }
}

function formatModeLabel(mode: RuleModeValue | null, modeUsage: CompanyParameter["modeUsage"]) {
  if (modeUsage === "FIXED_OFF") return "OFF (fixe)";
  return mode ?? "Non configure";
}

function formatCurrentValue(parameter: CompanyParameter) {
  if (parameter.valueStatus === "NOT_STORED") {
    return parameter.kind === "UI_SETTING" ? "Non stockee" : "Non configuree";
  }

  if (parameter.normalizedValue !== null) {
    return String(parameter.normalizedValue);
  }

  if (parameter.value) {
    return parameter.value;
  }

  return "INFORMATION NON FOURNIE — À CONFIRMER";
}

function getInitialDraft(parameter: CompanyParameter): DraftState {
  return {
    value: parameter.value ?? "",
    mode: parameter.mode ?? "OFF",
  };
}

function getApiError(payload: ParametersResponse | null, fallback: string) {
  return payload && !payload.ok ? payload.error : fallback;
}

function getMutationError(payload: unknown, fallback: string) {
  if (
    typeof payload === "object" &&
    payload !== null &&
    "ok" in payload &&
    (payload as { ok?: unknown }).ok === false &&
    "details" in payload
  ) {
    const details = (payload as { details?: unknown }).details;
    if (
      typeof details === "object" &&
      details !== null &&
      "message" in details &&
      typeof (details as { message?: unknown }).message === "string"
    ) {
      return (details as { message: string }).message;
    }

    if (
      typeof payload === "object" &&
      payload !== null &&
      "error" in payload &&
      typeof (payload as { error?: unknown }).error === "string"
    ) {
      return (payload as { error: string }).error;
    }
  }

  return fallback;
}

function ParameterStatusBadges({ parameter }: { parameter: CompanyParameter }) {
  return (
    <div className="company-rule-tags">
      <StatusBadge variant="info">{formatKind(parameter.kind)}</StatusBadge>
      <StatusBadge variant={parameter.engineStatus === "BRANCHED" ? "success" : "warning"}>
        {formatEngineStatus(parameter.engineStatus)}
      </StatusBadge>
      <StatusBadge variant={parameter.isWritable ? "success" : "neutral"}>
        {parameter.isWritable ? "Editable" : "Lecture seule"}
      </StatusBadge>
    </div>
  );
}

export default function CompanyRulesPanel() {
  const [parameters, setParameters] = useState<CompanyParameter[]>([]);
  const [drafts, setDrafts] = useState<Record<string, DraftState>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [feedbackById, setFeedbackById] = useState<Record<string, SaveFeedback>>({});

  useEffect(() => {
    let cancelled = false;

    async function loadParameters() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/company/rules", { cache: "no-store" });
        const data = (await res.json().catch(() => null)) as ParametersResponse | null;

        if (!res.ok || !data?.ok) {
          throw new Error(getApiError(data, "Erreur lors du chargement des parametres metier"));
        }

        if (!cancelled) {
          setParameters(data.data);
          setDrafts(
            Object.fromEntries(data.data.map((parameter) => [parameter.id, getInitialDraft(parameter)])),
          );
        }
      } catch (e: unknown) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Erreur inconnue");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadParameters();

    return () => {
      cancelled = true;
    };
  }, []);

  function updateDraft(parameterId: string, patch: Partial<DraftState>) {
    setDrafts((prev) => ({
      ...prev,
      [parameterId]: {
        ...(prev[parameterId] ?? { value: "", mode: "OFF" as RuleModeValue }),
        ...patch,
      },
    }));
  }

  async function saveParameter(parameter: CompanyParameter) {
    const draft = drafts[parameter.id] ?? getInitialDraft(parameter);

    setSavingId(parameter.id);
    setFeedbackById((prev) => ({
      ...prev,
      [parameter.id]: {
        message: null,
        error: null,
      },
    }));

    try {
      const body: Record<string, unknown> = {
        parameterId: parameter.id,
        value: draft.value,
      };

      if (parameter.modeUsage === "RULE_MODE") {
        body.mode = draft.mode;
      }

      const res = await fetch("/api/company/rules", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const payload = (await res.json().catch(() => null)) as
        | { ok: true; data: CompanyParameter }
        | { ok: false; error: string; details?: unknown }
        | null;

      if (!res.ok || !payload?.ok) {
        throw new Error(getMutationError(payload, "Erreur lors de l'enregistrement du parametre"));
      }

      setParameters((prev) => prev.map((item) => (item.id === parameter.id ? payload.data : item)));
      setDrafts((prev) => ({
        ...prev,
        [parameter.id]: getInitialDraft(payload.data),
      }));
      setFeedbackById((prev) => ({
        ...prev,
        [parameter.id]: {
          message: "Parametre mis a jour.",
          error: null,
        },
      }));
    } catch (e: unknown) {
      setFeedbackById((prev) => ({
        ...prev,
        [parameter.id]: {
          message: null,
          error: e instanceof Error ? e.message : "Erreur inconnue",
        },
      }));
    } finally {
      setSavingId(null);
    }
  }

  const businessParameters = parameters.filter((parameter) => parameter.kind === "BUSINESS_RULE");
  const uiParameters = parameters.filter((parameter) => parameter.kind === "UI_SETTING");

  return (
    <section className="company-card company-rules-section">
      <div className="company-card__head">
        <h2 className="company-card__title">Parametres metier ALPHA</h2>
        <p className="company-card__description">
          Vue lisible des regles branchees, des regles preparees non stockables, et des reglages UI d&apos;exploitation.
        </p>
      </div>

      {loading ? <div className="company-loading">Chargement des parametres...</div> : null}
      {error ? <ErrorMessage title="Erreur parametres societe" message={error} /> : null}

      {!loading && !error ? (
        <>
          <section className="company-rules-block">
            <div className="company-rules-block__head">
              <h3 className="company-rules-block__title">Regles metier ALPHA</h3>
              <p className="company-rules-block__description">
                Les regles preparees restent visibles pour cadrage mais non editables sans cle de stockage prouvee.
              </p>
            </div>

            {businessParameters.length === 0 ? (
              <EmptyState
                title="Aucune regle metier"
                message="Aucun parametre metier n'est disponible pour cette societe."
              />
            ) : (
              <div className="company-rules-list">
                {businessParameters.map((parameter) => {
                  const draft = drafts[parameter.id] ?? getInitialDraft(parameter);
                  const feedback = feedbackById[parameter.id];
                  const isSaving = savingId === parameter.id;

                  return (
                    <article
                      key={parameter.id}
                      className={`company-rule-card${parameter.engineStatus === "PREPARED" ? " company-rule-card--prepared" : ""}`}
                    >
                      <div className="company-rule-card__head">
                        <div>
                          <h4 className="company-rule-card__title">{parameter.label}</h4>
                          <p className="company-rule-card__description">{parameter.description}</p>
                        </div>
                        <ParameterStatusBadges parameter={parameter} />
                      </div>

                      <div className="company-rule-details">
                        <p><strong>Identifiant :</strong> {parameter.id}</p>
                        <p><strong>Type de valeur :</strong> {formatValueType(parameter.valueType)}</p>
                        <p><strong>Mode :</strong> {formatModeLabel(parameter.mode, parameter.modeUsage)}</p>
                        <p><strong>Etat stockage :</strong> {formatValueStatus(parameter.valueStatus)}</p>
                        <p><strong>Valeur actuelle :</strong> {formatCurrentValue(parameter)}</p>
                        <p>
                          <strong>Stockage :</strong>{" "}
                          {parameter.storage.key
                            ? `${parameter.storage.model}.${parameter.storage.key}`
                            : "Prepare sans cle prouvee"}
                        </p>
                        {parameter.note ? <p><strong>Note :</strong> {parameter.note}</p> : null}
                      </div>

                      {parameter.isWritable ? (
                        <div className="company-rule-edit">
                          {parameter.valueType === "POSITIVE_NUMBER" ? (
                            <label className="company-field">
                              <span className="company-field__label">Valeur</span>
                              <input
                                type="number"
                                min={1}
                                step={1}
                                value={draft.value}
                                onChange={(e) => updateDraft(parameter.id, { value: e.target.value })}
                                disabled={isSaving}
                              />
                            </label>
                          ) : null}

                          {parameter.allowedValues && parameter.allowedValues.length > 0 ? (
                            <label className="company-field">
                              <span className="company-field__label">Valeur</span>
                              <select
                                value={draft.value}
                                onChange={(e) => updateDraft(parameter.id, { value: e.target.value })}
                                disabled={isSaving}
                              >
                                <option value="">Selectionner</option>
                                {parameter.allowedValues.map((value) => (
                                  <option key={value} value={value}>
                                    {value}
                                  </option>
                                ))}
                              </select>
                            </label>
                          ) : null}

                          {parameter.modeUsage === "RULE_MODE" ? (
                            <label className="company-field">
                              <span className="company-field__label">Mode de regle</span>
                              <select
                                value={draft.mode}
                                onChange={(e) => updateDraft(parameter.id, { mode: e.target.value as RuleModeValue })}
                                disabled={isSaving}
                              >
                                {COMPANY_RULE_MODE_VALUES.map((mode) => (
                                  <option key={mode} value={mode}>
                                    {mode}
                                  </option>
                                ))}
                              </select>
                            </label>
                          ) : null}

                          <div className="company-actions company-actions--between">
                            <ActionButton variant="primary" onClick={() => saveParameter(parameter)} disabled={isSaving}>
                              {isSaving ? "Enregistrement..." : "Enregistrer"}
                            </ActionButton>
                            {feedback?.message ? <span className="company-feedback company-feedback--success">{feedback.message}</span> : null}
                            {feedback?.error ? <span className="company-feedback company-feedback--error">{feedback.error}</span> : null}
                          </div>
                        </div>
                      ) : (
                        <div className="company-rule-readonly">
                          Parametre prepare uniquement : edition bloquee tant que la cle de stockage et le format metier
                          reels ne sont pas prouves.
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          <section className="company-rules-block">
            <div className="company-rules-block__head">
              <h3 className="company-rules-block__title">Reglages UI / exploitation</h3>
              <p className="company-rules-block__description">
                Reglages fonctionnels conserves, sans les presenter comme des regles moteur.
              </p>
            </div>

            {uiParameters.length === 0 ? (
              <EmptyState
                title="Aucun reglage UI"
                message="Aucun reglage UI / exploitation n'est disponible pour cette societe."
              />
            ) : (
              <div className="company-rules-list">
                {uiParameters.map((parameter) => {
                  const draft = drafts[parameter.id] ?? getInitialDraft(parameter);
                  const feedback = feedbackById[parameter.id];
                  const isSaving = savingId === parameter.id;

                  return (
                    <article key={parameter.id} className="company-rule-card">
                      <div className="company-rule-card__head">
                        <div>
                          <h4 className="company-rule-card__title">{parameter.label}</h4>
                          <p className="company-rule-card__description">{parameter.description}</p>
                        </div>
                        <div className="company-rule-tags">
                          <StatusBadge variant="info">{formatKind(parameter.kind)}</StatusBadge>
                          <StatusBadge variant="neutral">Non moteur</StatusBadge>
                          <StatusBadge variant={parameter.isWritable ? "success" : "neutral"}>
                            {parameter.isWritable ? "Editable" : "Lecture seule"}
                          </StatusBadge>
                        </div>
                      </div>

                      <div className="company-rule-details">
                        <p><strong>Identifiant :</strong> {parameter.id}</p>
                        <p><strong>Type de valeur :</strong> {formatValueType(parameter.valueType)}</p>
                        <p><strong>Mode :</strong> {formatModeLabel(parameter.mode, parameter.modeUsage)}</p>
                        <p><strong>Etat stockage :</strong> {formatValueStatus(parameter.valueStatus)}</p>
                        <p><strong>Valeur actuelle :</strong> {formatCurrentValue(parameter)}</p>
                        <p>
                          <strong>Stockage :</strong>{" "}
                          {parameter.storage.key
                            ? `${parameter.storage.model}.${parameter.storage.key}`
                            : "INFORMATION NON FOURNIE — À CONFIRMER"}
                        </p>
                        {parameter.note ? <p><strong>Note :</strong> {parameter.note}</p> : null}
                      </div>

                      {parameter.allowedValues && parameter.allowedValues.length > 0 ? (
                        <div className="company-rule-edit">
                          <label className="company-field">
                            <span className="company-field__label">Mode d&apos;affichage</span>
                            <select
                              value={draft.value}
                              onChange={(e) => updateDraft(parameter.id, { value: e.target.value })}
                              disabled={isSaving}
                            >
                              <option value="">Selectionner</option>
                              {parameter.allowedValues.map((value) => (
                                <option key={value} value={value}>
                                  {value}
                                </option>
                              ))}
                            </select>
                          </label>

                          <div className="company-actions company-actions--between">
                            <ActionButton variant="primary" onClick={() => saveParameter(parameter)} disabled={isSaving}>
                              {isSaving ? "Enregistrement..." : "Enregistrer"}
                            </ActionButton>
                            {feedback?.message ? <span className="company-feedback company-feedback--success">{feedback.message}</span> : null}
                            {feedback?.error ? <span className="company-feedback company-feedback--error">{feedback.error}</span> : null}
                          </div>
                        </div>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </>
      ) : null}
    </section>
  );
}
