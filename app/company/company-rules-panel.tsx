"use client";

import { useEffect, useMemo, useState } from "react";
import { Settings2 } from "lucide-react";

import { EmptyState, ErrorMessage, StatusBadge } from "@/app/ui";
import { COMPANY_RULE_MODE_VALUES } from "@/lib/company-rules/catalog";

type RuleModeValue = (typeof COMPANY_RULE_MODE_VALUES)[number];

type CompanyParameter = {
  id: string;
  key: string | null;
  label: string;
  kind: "BUSINESS_RULE" | "UI_SETTING";
  valueType: string;
  modeUsage: "RULE_MODE" | "FIXED_OFF";
  allowedValues?: readonly string[];
  normalizedValue: string | number | null;
  value: string | null;
  mode: RuleModeValue | null;
};

type ParametersResponse =
  | { ok: true; data: CompanyParameter[] }
  | { ok: false; error: string; details?: unknown };

function readableValue(parameter: CompanyParameter) {
  if (parameter.normalizedValue !== null) return String(parameter.normalizedValue);
  if (parameter.value) return parameter.value;
  return "Non renseignée";
}

function normalizeMode(mode: RuleModeValue | null) {
  return mode ?? "OFF";
}

function normalizePlanningMode(value: string | number | null): "SIMPLE" | "AMBULANCE" {
  const normalized = String(value ?? "").trim().toUpperCase();
  if (normalized.includes("SIMPLE")) return "SIMPLE";
  return "AMBULANCE";
}

export default function CompanyRulesPanel() {
  const [parameters, setParameters] = useState<CompanyParameter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadParameters() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/company/rules", { cache: "no-store" });
        const payload = (await response.json().catch(() => null)) as ParametersResponse | null;

        if (!response.ok || !payload?.ok) {
          throw new Error(payload && !payload.ok ? payload.error : "Erreur de chargement des paramètres métier");
        }

        if (!cancelled) {
          setParameters(payload.data);
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

  const restMinimumValue = useMemo(() => {
    const target = parameters.find((parameter) => {
      const source = `${parameter.label} ${parameter.key ?? ""}`.toLowerCase();
      return source.includes("repos") && source.includes("shift");
    });

    const rawValue = target ? readableValue(target) : "11";
    const numeric = Number.parseInt(rawValue, 10);
    return Number.isFinite(numeric) && numeric > 0 ? String(numeric) : "11";
  }, [parameters]);

  const compactRows = useMemo(() => {
    return parameters
      .filter((parameter) => parameter.kind === "BUSINESS_RULE")
      .slice(0, 5)
      .map((parameter) => ({
        id: parameter.id,
        label: parameter.label,
        value: readableValue(parameter),
        mode: normalizeMode(parameter.mode),
      }));
  }, [parameters]);

  const planningMode = useMemo(() => {
    const setting = parameters.find((parameter) => {
      if (parameter.kind !== "UI_SETTING") return false;
      const source = `${parameter.label} ${parameter.key ?? ""}`.toLowerCase();
      return source.includes("planning") && source.includes("mode");
    });
    return normalizePlanningMode(setting?.normalizedValue ?? setting?.value ?? "AMBULANCE");
  }, [parameters]);

  return (
    <section className="company-card company-rules-section">
      <div className="company-card__head">
        <div className="company-card__title-row">
          <span className="company-card__title-icon" aria-hidden="true">
            <Settings2 size={16} />
          </span>
          <h2 className="company-card__title">Paramètres métier</h2>
          <span className="company-chip">ALPHA</span>
        </div>
      </div>

      {loading ? <div className="company-loading">Chargement des paramètres...</div> : null}
      {error ? <ErrorMessage title="Erreur paramètres société" message={error} /> : null}

      {!loading && !error ? (
        <>
          <section className="company-rules-inline-card">
            <p className="company-rules-inline-card__label">Repos minimum entre deux shifts</p>
            <strong className="company-rules-inline-card__value">{restMinimumValue} h</strong>
          </section>

          <section className="company-rules-mode-card">
            <p className="company-rules-mode-card__label">Mode d&apos;affichage planning</p>
            <div className="company-rules-mode-switch" role="group" aria-label="Mode d'affichage planning">
              <button type="button" className={`company-rules-mode-switch__item${planningMode === "SIMPLE" ? " is-active" : ""}`}>
                SIMPLE
              </button>
              <button type="button" className={`company-rules-mode-switch__item${planningMode === "AMBULANCE" ? " is-active" : ""}`}>
                AMBULANCE
              </button>
            </div>
          </section>

          <section className="company-rules-table-card">
            <div className="company-rules-table-card__head">
              <h3>Règles métier ALPHA</h3>
            </div>

            {compactRows.length === 0 ? (
              <EmptyState title="Aucune règle" message="Aucune règle métier n&apos;est disponible pour cette société." />
            ) : (
              <div className="company-rules-table-wrap">
                <table className="company-rules-table company-rules-table--compact">
                  <thead>
                    <tr>
                      <th>Paramètre</th>
                      <th>Valeur</th>
                      <th>Mode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compactRows.map((row) => (
                      <tr key={row.id}>
                        <td>{row.label}</td>
                        <td>{row.value}</td>
                        <td>
                          <StatusBadge variant={row.mode === "OFF" ? "neutral" : row.mode === "ALERT" ? "warning" : row.mode === "BLOCK" ? "danger" : "info"}>
                            {row.mode}
                          </StatusBadge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      ) : null}
    </section>
  );
}
