export const COMPANY_PARAMETER_STORAGE_MODEL = "CompanyRule" as const;

export const COMPANY_PARAMETER_KEYS = {
  PLANNING_MIN_REST_HOURS: "PLANNING_MIN_REST_HOURS",
  PLANNING_VIEW_MODE: "PLANNING_VIEW_MODE",
} as const;

export type ProvenCompanyParameterStorageKey =
  (typeof COMPANY_PARAMETER_KEYS)[keyof typeof COMPANY_PARAMETER_KEYS];

export const COMPANY_RULE_MODE_VALUES = ["OFF", "ALERT", "BLOCK", "BOTH"] as const;
export type CompanyRuleModeValue = (typeof COMPANY_RULE_MODE_VALUES)[number];

export const PLANNING_VIEW_MODE_VALUES = ["SIMPLE", "AMBULANCE"] as const;
export type PlanningViewModeValue = (typeof PLANNING_VIEW_MODE_VALUES)[number];

export type CompanyParameterKind = "BUSINESS_RULE" | "UI_SETTING";
export type CompanyParameterValueType = "POSITIVE_NUMBER" | "ENUM" | "INFORMATION_NON_FOURNIE_A_CONFIRMER";
export type CompanyParameterModeUsage = "RULE_MODE" | "FIXED_OFF";
export type CompanyParameterEngineStatus = "BRANCHED" | "PREPARED";

export type CompanyParameterDefinition = {
  id:
    | "MIN_REST_BETWEEN_SHIFTS"
    | "AMBULANCE_GARDE_CREW_COMPOSITION"
    | "VSL_CREW_COMPOSITION"
    | "TAXI_CREW_COMPOSITION"
    | "VEHICLE_UNAVAILABILITY"
    | "EMPLOYEE_UNAVAILABILITY"
    | "VEHICLE_ROLE_RESTRICTIONS"
    | "PLANNING_VIEW_MODE";
  label: string;
  description: string;
  kind: CompanyParameterKind;
  valueType: CompanyParameterValueType;
  modeUsage: CompanyParameterModeUsage;
  engineStatus: CompanyParameterEngineStatus;
  storage: {
    model: typeof COMPANY_PARAMETER_STORAGE_MODEL;
    key: string | null;
  };
  allowedValues?: readonly string[];
  note?: string;
};

export const COMPANY_PARAMETER_DEFINITIONS: readonly CompanyParameterDefinition[] = [
  {
    id: "MIN_REST_BETWEEN_SHIFTS",
    label: "Repos minimum entre shifts",
    description:
      "Règle métier ALPHA réellement branchée sur le planning manuel et la publication autoschedule.",
    kind: "BUSINESS_RULE",
    valueType: "POSITIVE_NUMBER",
    modeUsage: "RULE_MODE",
    engineStatus: "BRANCHED",
    storage: {
      model: COMPANY_PARAMETER_STORAGE_MODEL,
      key: COMPANY_PARAMETER_KEYS.PLANNING_MIN_REST_HOURS,
    },
    note: "Valeur attendue : nombre positif d'heures.",
  },
  {
    id: "AMBULANCE_GARDE_CREW_COMPOSITION",
    label: "Composition équipage ambulance / garde",
    description:
      "Paramètre métier ALPHA cadré pour la composition d'équipe Ambulance / Garde, non encore branché comme moteur réel.",
    kind: "BUSINESS_RULE",
    valueType: "INFORMATION_NON_FOURNIE_A_CONFIRMER",
    modeUsage: "RULE_MODE",
    engineStatus: "PREPARED",
    storage: {
      model: COMPANY_PARAMETER_STORAGE_MODEL,
      key: null,
    },
    note: "Clé de stockage et format métier exacts : INFORMATION NON FOURNIE — À CONFIRMER.",
  },
  {
    id: "VSL_CREW_COMPOSITION",
    label: "Composition équipage VSL",
    description:
      "Paramètre métier ALPHA cadré pour la composition d'équipe VSL, non encore branché comme moteur réel.",
    kind: "BUSINESS_RULE",
    valueType: "INFORMATION_NON_FOURNIE_A_CONFIRMER",
    modeUsage: "RULE_MODE",
    engineStatus: "PREPARED",
    storage: {
      model: COMPANY_PARAMETER_STORAGE_MODEL,
      key: null,
    },
    note: "Clé de stockage et format métier exacts : INFORMATION NON FOURNIE — À CONFIRMER.",
  },
  {
    id: "TAXI_CREW_COMPOSITION",
    label: "Composition équipage taxi",
    description:
      "Paramètre métier ALPHA cadré pour la composition d'équipe taxi, non encore branché comme moteur réel.",
    kind: "BUSINESS_RULE",
    valueType: "INFORMATION_NON_FOURNIE_A_CONFIRMER",
    modeUsage: "RULE_MODE",
    engineStatus: "PREPARED",
    storage: {
      model: COMPANY_PARAMETER_STORAGE_MODEL,
      key: null,
    },
    note: "Clé de stockage et format métier exacts : INFORMATION NON FOURNIE — À CONFIRMER.",
  },
  {
    id: "VEHICLE_UNAVAILABILITY",
    label: "Indisponibilité véhicule",
    description:
      "Paramètre métier ALPHA cadré pour l'indisponibilité véhicule, non encore branché comme règle moteur explicite.",
    kind: "BUSINESS_RULE",
    valueType: "INFORMATION_NON_FOURNIE_A_CONFIRMER",
    modeUsage: "RULE_MODE",
    engineStatus: "PREPARED",
    storage: {
      model: COMPANY_PARAMETER_STORAGE_MODEL,
      key: null,
    },
    note: "Clé de stockage et format métier exacts : INFORMATION NON FOURNIE — À CONFIRMER.",
  },
  {
    id: "EMPLOYEE_UNAVAILABILITY",
    label: "Indisponibilité salarié",
    description:
      "Paramètre métier ALPHA cadré pour l'indisponibilité salarié, non encore branché via une clé CompanyRule dédiée.",
    kind: "BUSINESS_RULE",
    valueType: "INFORMATION_NON_FOURNIE_A_CONFIRMER",
    modeUsage: "RULE_MODE",
    engineStatus: "PREPARED",
    storage: {
      model: COMPANY_PARAMETER_STORAGE_MODEL,
      key: null,
    },
    note: "Clé de stockage et format métier exacts : INFORMATION NON FOURNIE — À CONFIRMER.",
  },
  {
    id: "VEHICLE_ROLE_RESTRICTIONS",
    label: "Interdiction de certains rôles sur certains véhicules",
    description:
      "Paramètre métier ALPHA cadré pour contraindre certains rôles selon le véhicule, non encore branché comme moteur réel.",
    kind: "BUSINESS_RULE",
    valueType: "INFORMATION_NON_FOURNIE_A_CONFIRMER",
    modeUsage: "RULE_MODE",
    engineStatus: "PREPARED",
    storage: {
      model: COMPANY_PARAMETER_STORAGE_MODEL,
      key: null,
    },
    note: "Clé de stockage et format métier exacts : INFORMATION NON FOURNIE — À CONFIRMER.",
  },
  {
    id: "PLANNING_VIEW_MODE",
    label: "Mode d'affichage du planning",
    description:
      "Réglage d'exploitation UI réellement branché pour la vue planning, distinct des règles moteur.",
    kind: "UI_SETTING",
    valueType: "ENUM",
    modeUsage: "FIXED_OFF",
    engineStatus: "BRANCHED",
    storage: {
      model: COMPANY_PARAMETER_STORAGE_MODEL,
      key: COMPANY_PARAMETER_KEYS.PLANNING_VIEW_MODE,
    },
    allowedValues: PLANNING_VIEW_MODE_VALUES,
    note: "Le champ mode reste stocké en OFF pour ce réglage UI.",
  },
] as const;

const DEFINITIONS_BY_STORAGE_KEY = new Map(
  COMPANY_PARAMETER_DEFINITIONS.filter((definition) => definition.storage.key).map((definition) => [definition.storage.key!, definition])
);

export function getCompanyParameterDefinitionByStorageKey(key: string): CompanyParameterDefinition | undefined {
  return DEFINITIONS_BY_STORAGE_KEY.get(key);
}

export function parsePositiveNumberCompanyValue(raw: string | null | undefined): number | null {
  const normalized = String(raw ?? "").trim();
  if (!normalized) return null;

  const value = Number(normalized);
  if (!Number.isFinite(value) || value <= 0) return null;

  return value;
}

export function normalizePositiveNumberCompanyValue(raw: string | null | undefined): string | null {
  const value = parsePositiveNumberCompanyValue(raw);
  return value === null ? null : String(value);
}

export function parsePlanningViewModeValue(raw: string | null | undefined): PlanningViewModeValue | null {
  const normalized = String(raw ?? "").trim().toUpperCase();
  return PLANNING_VIEW_MODE_VALUES.includes(normalized as PlanningViewModeValue)
    ? (normalized as PlanningViewModeValue)
    : null;
}

export function serializePlanningViewModeValue(value: PlanningViewModeValue): string {
  return value;
}
