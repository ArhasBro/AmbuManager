"use client";

import { useEffect, useMemo, useState } from "react";
import { Archive, Ban, CalendarClock, ClipboardList, Copy, Download, Filter, List, PauseCircle, Plus, UsersRound } from "lucide-react";

import {
  ActionButton,
  DataTable,
  ErrorMessage,
  FilterBar,
  StatCard,
  StatusBadge,
  type DataTableColumn,
} from "@/app/ui";
import {
  getAllowedRolesForFirstSlot,
  getAllowedRolesForSecondSlot,
  getCategoryTemplatePreset,
  normalizeTemplateColor,
  resolveTemplateMinStaffCount,
} from "@/lib/templates/template-rules";

type Template = {
  id: string;
  name: string;
  category: CategoryOption;
  requiredRole: RoleOption | null;
  secondaryAllowedRoles: RoleOption[];
  minStaffCount: number | null;
  requiredVehicleType: VehicleTypeOption | null;
  isActive: boolean;
  archivedAt: string | null;
  isTimeDefined: boolean;
  startTime: string | null;
  endTime: string | null;
  crossesMidnight: boolean;
  color: string | null;
  createdAt: string;
  updatedAt: string;
};

type ApiSuccess<T> = { ok: true; data: T };
type ApiFailure = { ok: false; error: string; details?: unknown };
type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

type CategoryOption = "AMBULANCE" | "GARDE" | "VSL" | "TAXI";
type RoleOption = "ADMIN" | "GERANT" | "BUREAU" | "ADE" | "AA" | "TAXI" | "REGULATEUR";
type VehicleTypeOption = "AMBULANCE" | "VSL" | "TAXI";
type TemplateStatusFilter = "" | "ACTIVE" | "INACTIVE" | "ARCHIVED";
type MidnightFilter = "" | "YES" | "NO";
type TemplateDetailTab = "DETAILS" | "EQUIPE" | "HORAIRES" | "HISTORIQUE";

type TemplateFormState = {
  name: string;
  category: CategoryOption;
  requiredRole: RoleOption | "";
  secondaryAllowedRoles: RoleOption[];
  minStaffCount: 1 | 2;
  requiredVehicleType: VehicleTypeOption | "";
  isActive: boolean;
  isTimeDefined: boolean;
  startTime: string;
  endTime: string;
  crossesMidnight: boolean;
  color: string;
};

const CATEGORY_OPTIONS: CategoryOption[] = ["AMBULANCE", "GARDE", "VSL", "TAXI"];
const ROLE_OPTIONS: RoleOption[] = ["ADE", "AA", "TAXI", "BUREAU", "REGULATEUR", "GERANT", "ADMIN"];
const VEHICLE_TYPE_OPTIONS: VehicleTypeOption[] = ["AMBULANCE", "VSL", "TAXI"];
const DEFAULT_COLOR = "#1D4ED8";

const TEMPLATE_DETAIL_TABS: Array<{ id: TemplateDetailTab; label: string }> = [
  { id: "DETAILS", label: "Details" },
  { id: "EQUIPE", label: "Equipe" },
  { id: "HORAIRES", label: "Horaires" },
  { id: "HISTORIQUE", label: "Historique" },
];

function compareTemplates(a: Template, b: Template) {
  const aArchived = a.archivedAt ? 1 : 0;
  const bArchived = b.archivedAt ? 1 : 0;
  if (aArchived !== bArchived) return aArchived - bArchived;
  if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
  return a.name.localeCompare(b.name, "fr", { sensitivity: "base" });
}

function createDefaultForm(category: CategoryOption = "AMBULANCE"): TemplateFormState {
  const preset = getCategoryTemplatePreset(category);
  return {
    name: "",
    category,
    requiredRole: (preset.requiredRole ?? "") as RoleOption | "",
    secondaryAllowedRoles: [...preset.secondaryAllowedRoles] as RoleOption[],
    minStaffCount: preset.minStaffCount,
    requiredVehicleType: (preset.requiredVehicleType ?? "") as VehicleTypeOption | "",
    isActive: true,
    isTimeDefined: true,
    startTime: "08:00",
    endTime: "16:00",
    crossesMidnight: false,
    color: DEFAULT_COLOR,
  };
}

function formFromTemplate(template: Template): TemplateFormState {
  return {
    name: template.name,
    category: template.category,
    requiredRole: template.requiredRole ?? "",
    secondaryAllowedRoles: template.secondaryAllowedRoles,
    minStaffCount: resolveTemplateMinStaffCount(template.minStaffCount, template.category),
    requiredVehicleType: template.requiredVehicleType ?? "",
    isActive: template.isActive,
    isTimeDefined: template.isTimeDefined,
    startTime: template.startTime ?? "08:00",
    endTime: template.endTime ?? "16:00",
    crossesMidnight: template.crossesMidnight,
    color: template.color ?? DEFAULT_COLOR,
  };
}

function toPayload(form: TemplateFormState) {
  const normalizedColor = normalizeTemplateColor(form.color) ?? DEFAULT_COLOR;

  return {
    name: form.name.trim(),
    category: form.category,
    requiredRole: form.requiredRole === "" ? null : form.requiredRole,
    secondaryAllowedRoles: form.secondaryAllowedRoles,
    minStaffCount: form.minStaffCount,
    requiredVehicleType: form.requiredVehicleType === "" ? null : form.requiredVehicleType,
    isActive: form.isActive,
    isTimeDefined: form.isTimeDefined,
    startTime: form.isTimeDefined ? form.startTime : null,
    endTime: form.isTimeDefined ? form.endTime : null,
    crossesMidnight: form.isTimeDefined ? form.crossesMidnight : false,
    color: normalizedColor,
  };
}

function getApiError<T>(payload: ApiResponse<T> | null, fallback: string) {
  return payload && !payload.ok ? payload.error : fallback;
}

function formatDateTime(value: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("fr-FR");
}

function getTimeLabel(template: Template) {
  if (!template.isTimeDefined) return "Sans horaire";
  return `${template.startTime ?? "-"} -> ${template.endTime ?? "-"}${template.crossesMidnight ? " (+1j)" : ""}`;
}

function getStatusLabel(template: Template) {
  if (template.archivedAt) return "Archive";
  return template.isActive ? "Actif" : "Desactive";
}

function getStatusVariant(template: Template): "success" | "warning" | "neutral" {
  if (template.archivedAt) return "neutral";
  return template.isActive ? "success" : "warning";
}

function getVehicleTypeLabel(value: VehicleTypeOption | null) {
  if (!value) return "Tous";
  if (value === "AMBULANCE") return "Ambulance";
  if (value === "VSL") return "VSL";
  return "Taxi";
}

function getCrossesMidnightLabel(crossesMidnight: boolean) {
  return crossesMidnight ? "Oui" : "Non";
}

function updateFormForCategory(category: CategoryOption, prev: TemplateFormState): TemplateFormState {
  const preset = getCategoryTemplatePreset(category);
  return {
    ...prev,
    category,
    requiredRole: (preset.requiredRole ?? "") as RoleOption | "",
    secondaryAllowedRoles: [...preset.secondaryAllowedRoles] as RoleOption[],
    minStaffCount: preset.minStaffCount,
    requiredVehicleType: (preset.requiredVehicleType ?? "") as VehicleTypeOption | "",
  };
}

function templateMatchesQuery(template: Template, query: string) {
  if (!query) return true;

  const normalizedQuery = query.toLowerCase();
  const values = [
    template.name,
    template.category,
    template.requiredRole ?? "",
    template.requiredVehicleType ?? "",
    getStatusLabel(template),
    getTimeLabel(template),
  ];

  return values.some((value) => value.toLowerCase().includes(normalizedQuery));
}

function RoleCheckboxGroup({
  selected,
  disabled,
  onChange,
}: {
  selected: RoleOption[];
  disabled?: boolean;
  onChange: (next: RoleOption[]) => void;
}) {
  return (
    <div className="templates-role-grid">
      {ROLE_OPTIONS.map((role) => {
        const checked = selected.includes(role);

        return (
          <label key={role} className={`templates-role-chip${checked ? " is-selected" : ""}`}>
            <input
              type="checkbox"
              checked={checked}
              disabled={disabled}
              onChange={() => {
                if (checked) {
                  onChange(selected.filter((value) => value !== role));
                } else {
                  onChange([...selected, role]);
                }
              }}
            />
            {role}
          </label>
        );
      })}
    </div>
  );
}

function TemplateFormFields({
  form,
  disabled,
  onChange,
}: {
  form: TemplateFormState;
  disabled?: boolean;
  onChange: (updater: (prev: TemplateFormState) => TemplateFormState) => void;
}) {
  const firstSlotRoles = getAllowedRolesForFirstSlot({
    category: form.category,
    requiredRole: form.requiredRole === "" ? null : form.requiredRole,
    secondaryAllowedRoles: form.secondaryAllowedRoles,
    minStaffCount: form.minStaffCount,
  });
  const secondSlotRoles = getAllowedRolesForSecondSlot({
    category: form.category,
    requiredRole: form.requiredRole === "" ? null : form.requiredRole,
    secondaryAllowedRoles: form.secondaryAllowedRoles,
    minStaffCount: form.minStaffCount,
  });

  return (
    <div className="templates-form">
      <div className="templates-field">
        <span className="templates-field__label">Nom</span>
        <input
          value={form.name}
          disabled={disabled}
          onChange={(event) => onChange((prev) => ({ ...prev, name: event.target.value }))}
          placeholder="Ex. Journee ambulance"
        />
      </div>

      <div className="templates-form-grid templates-form-grid--main">
        <label className="templates-field">
          <span className="templates-field__label">Categorie</span>
          <select
            value={form.category}
            disabled={disabled}
            onChange={(event) => onChange((prev) => updateFormForCategory(event.target.value as CategoryOption, prev))}
          >
            {CATEGORY_OPTIONS.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="templates-field">
          <span className="templates-field__label">Vehicule requis</span>
          <select
            value={form.requiredVehicleType}
            disabled={disabled}
            onChange={(event) => onChange((prev) => ({ ...prev, requiredVehicleType: event.target.value as VehicleTypeOption | "" }))}
          >
            <option value="">Aucun</option>
            {VEHICLE_TYPE_OPTIONS.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="templates-field">
          <span className="templates-field__label">Personnes requises</span>
          <select
            value={String(form.minStaffCount)}
            disabled={disabled}
            onChange={(event) => onChange((prev) => ({ ...prev, minStaffCount: Number(event.target.value) as 1 | 2 }))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </label>

        <div className="templates-field">
          <span className="templates-field__label">Couleur</span>
          <div className="templates-color-field">
            <input
              type="color"
              value={normalizeTemplateColor(form.color) ?? DEFAULT_COLOR}
              disabled={disabled}
              onChange={(event) => onChange((prev) => ({ ...prev, color: event.target.value }))}
            />
            <input
              value={form.color}
              disabled={disabled}
              onChange={(event) => onChange((prev) => ({ ...prev, color: event.target.value }))}
              placeholder="#1D4ED8"
            />
          </div>
        </div>
      </div>

      <div className="templates-form-grid templates-form-grid--secondary">
        <label className="templates-field">
          <span className="templates-field__label">Role obligatoire slot 1</span>
          <select
            value={form.requiredRole}
            disabled={disabled}
            onChange={(event) => onChange((prev) => ({ ...prev, requiredRole: event.target.value as RoleOption | "" }))}
          >
            <option value="">Aucun</option>
            {ROLE_OPTIONS.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>

        <label className="templates-checkbox">
          <input
            type="checkbox"
            checked={form.isActive}
            disabled={disabled}
            onChange={(event) => onChange((prev) => ({ ...prev, isActive: event.target.checked }))}
          />
          <span>Actif pour les nouvelles generations</span>
        </label>
      </div>

      <div className="templates-field">
        <span className="templates-field__label">Roles autorises pour les autres slots</span>
        <RoleCheckboxGroup
          selected={form.secondaryAllowedRoles}
          disabled={disabled}
          onChange={(next) => onChange((prev) => ({ ...prev, secondaryAllowedRoles: next }))}
        />
        <p className="templates-help-text">
          Slot 1 autorise : {firstSlotRoles.length > 0 ? firstSlotRoles.join(", ") : "libre"}
          {form.minStaffCount === 2
            ? ` | Slot 2 autorise : ${secondSlotRoles.length > 0 ? secondSlotRoles.join(", ") : "libre"}`
            : " | Slot 2 non utilise"}
        </p>
      </div>

      <div className="templates-fieldset">
        <label className="templates-checkbox">
          <input
            type="checkbox"
            checked={form.isTimeDefined}
            disabled={disabled}
            onChange={(event) => onChange((prev) => ({ ...prev, isTimeDefined: event.target.checked, crossesMidnight: event.target.checked ? prev.crossesMidnight : false }))}
          />
          <span>Template horodate</span>
        </label>

        {form.isTimeDefined ? (
          <div className="templates-form-grid templates-form-grid--time">
            <label className="templates-field">
              <span className="templates-field__label">Debut</span>
              <input
                type="time"
                value={form.startTime}
                disabled={disabled}
                onChange={(event) => onChange((prev) => ({ ...prev, startTime: event.target.value }))}
              />
            </label>

            <label className="templates-field">
              <span className="templates-field__label">Fin</span>
              <input
                type="time"
                value={form.endTime}
                disabled={disabled}
                onChange={(event) => onChange((prev) => ({ ...prev, endTime: event.target.value }))}
              />
            </label>

            <label className="templates-checkbox templates-checkbox--time">
              <input
                type="checkbox"
                checked={form.crossesMidnight}
                disabled={disabled}
                onChange={(event) => onChange((prev) => ({ ...prev, crossesMidnight: event.target.checked }))}
              />
              <span>Passe minuit</span>
            </label>
          </div>
        ) : (
          <p className="templates-help-text">
            Le template est conserve sans horaire. Il n&apos;est pas utilisable par l&apos;autoschedule dans l&apos;etat actuel du lot.
          </p>
        )}
      </div>
    </div>
  );
}

export default function TemplatesClient({ initialTemplates }: { initialTemplates: Template[] }) {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [createForm, setCreateForm] = useState<TemplateFormState>(() => createDefaultForm());
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(initialTemplates[0]?.id ?? null);
  const [templateDetailTab, setTemplateDetailTab] = useState<TemplateDetailTab>("DETAILS");
  const [editForm, setEditForm] = useState<TemplateFormState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [savingTemplateId, setSavingTemplateId] = useState<string | null>(null);
  const [archivingTemplateId, setArchivingTemplateId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const [showArchived, setShowArchived] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<VehicleTypeOption | "">("");
  const [crossesMidnightFilter, setCrossesMidnightFilter] = useState<MidnightFilter>("");
  const [statusFilter, setStatusFilter] = useState<TemplateStatusFilter>("");

  const sortedTemplates = useMemo(() => [...templates].sort(compareTemplates), [templates]);

  const visibleTemplates = useMemo(() => {
    return showArchived ? sortedTemplates : sortedTemplates.filter((template) => !template.archivedAt);
  }, [showArchived, sortedTemplates]);

  const filteredTemplates = useMemo(() => {
    return visibleTemplates.filter((template) => {
      if (!templateMatchesQuery(template, searchInput.trim())) return false;
      if (vehicleTypeFilter && template.requiredVehicleType !== vehicleTypeFilter) return false;
      if (crossesMidnightFilter === "YES" && !template.crossesMidnight) return false;
      if (crossesMidnightFilter === "NO" && template.crossesMidnight) return false;

      if (statusFilter === "ACTIVE" && (template.archivedAt || !template.isActive)) return false;
      if (statusFilter === "INACTIVE" && (template.archivedAt || template.isActive)) return false;
      if (statusFilter === "ARCHIVED" && !template.archivedAt) return false;

      return true;
    });
  }, [crossesMidnightFilter, searchInput, statusFilter, vehicleTypeFilter, visibleTemplates]);

  useEffect(() => {
    if (filteredTemplates.length === 0) {
      setSelectedTemplateId(null);
      return;
    }

    if (!selectedTemplateId || !filteredTemplates.some((template) => template.id === selectedTemplateId)) {
      setSelectedTemplateId(filteredTemplates[0].id);
      setTemplateDetailTab("DETAILS");
    }
  }, [filteredTemplates, selectedTemplateId]);

  const templateStats = useMemo(() => {
    const counts = {
      total: sortedTemplates.length,
      active: 0,
      inactive: 0,
      archived: 0,
      categories: new Set<CategoryOption>(),
    };

    for (const template of sortedTemplates) {
      if (template.archivedAt) {
        counts.archived += 1;
      } else if (template.isActive) {
        counts.active += 1;
      } else {
        counts.inactive += 1;
      }
      counts.categories.add(template.category);
    }

    return {
      total: counts.total,
      active: counts.active,
      inactive: counts.inactive,
      archived: counts.archived,
      categoryCount: counts.categories.size,
    };
  }, [sortedTemplates]);

  const selectedTemplate = useMemo(
    () => filteredTemplates.find((template) => template.id === selectedTemplateId) ?? null,
    [selectedTemplateId, filteredTemplates],
  );

  function clearFeedback() {
    setError(null);
    setSuccessMessage(null);
  }

  function resetFilters() {
    setSearchInput("");
    setVehicleTypeFilter("");
    setCrossesMidnightFilter("");
    setStatusFilter("");
    setShowAdvancedFilters(false);
  }

  async function handleCreate() {
    if (createForm.name.trim().length === 0) {
      setError("Le nom du template est obligatoire.");
      return;
    }

    setIsCreating(true);
    clearFeedback();

    try {
      const response = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toPayload(createForm)),
      });

      const payload = (await response.json().catch(() => null)) as ApiResponse<Template> | null;

      if (!response.ok || !payload?.ok) {
        setError(getApiError(payload, "Impossible de creer le template."));
        return;
      }

      setTemplates((prev) => [...prev, payload.data]);
      setCreateForm(createDefaultForm());
      setSelectedTemplateId(payload.data.id);
      setShowCreateForm(false);
      setSuccessMessage("Template cree.");
    } finally {
      setIsCreating(false);
    }
  }

  function openEdit(template: Template) {
    clearFeedback();
    setSelectedTemplateId(template.id);
    setEditingTemplateId(template.id);
    setEditForm(formFromTemplate(template));
  }

  function closeEdit() {
    setEditingTemplateId(null);
    setEditForm(null);
  }

  function prepareDuplicate(template: Template) {
    setCreateForm({
      ...formFromTemplate(template),
      name: `${template.name} (copie)`,
    });
    setShowCreateForm(true);
    setSuccessMessage("Template pre-rempli pour duplication.");
  }

  async function handleSave(templateId: string) {
    if (!editForm) return;
    if (editForm.name.trim().length === 0) {
      setError("Le nom du template est obligatoire.");
      return;
    }

    setSavingTemplateId(templateId);
    clearFeedback();

    try {
      const response = await fetch(`/api/templates/${templateId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toPayload(editForm)),
      });

      const payload = (await response.json().catch(() => null)) as ApiResponse<Template> | null;

      if (!response.ok || !payload?.ok) {
        setError(getApiError(payload, "Impossible d'enregistrer le template."));
        return;
      }

      setTemplates((prev) => prev.map((template) => (template.id === templateId ? payload.data : template)));
      setSuccessMessage("Template mis a jour.");
      closeEdit();
    } finally {
      setSavingTemplateId(null);
    }
  }

  async function handleArchive(templateId: string) {
    const confirmed = window.confirm("Archiver ce template ? Il restera visible dans l'historique mais ne sera plus actif.");
    if (!confirmed) return;

    setArchivingTemplateId(templateId);
    clearFeedback();

    try {
      const response = await fetch(`/api/templates/${templateId}/archive`, { method: "POST" });
      const payload = (await response.json().catch(() => null)) as ApiResponse<Template> | null;

      if (!response.ok || !payload?.ok) {
        setError(getApiError(payload, "Impossible d'archiver le template."));
        return;
      }

      setTemplates((prev) => prev.map((template) => (template.id === templateId ? payload.data : template)));
      setSuccessMessage("Template archive.");
      if (editingTemplateId === templateId) closeEdit();
    } finally {
      setArchivingTemplateId(null);
    }
  }

  async function handleToggleActive(template: Template) {
    clearFeedback();
    setSavingTemplateId(template.id);

    try {
      const response = await fetch(`/api/templates/${template.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !template.isActive }),
      });

      const payload = (await response.json().catch(() => null)) as ApiResponse<Template> | null;

      if (!response.ok || !payload?.ok) {
        setError(getApiError(payload, "Impossible de modifier le statut."));
        return;
      }

      setTemplates((prev) => prev.map((current) => (current.id === template.id ? payload.data : current)));
      setSuccessMessage(payload.data.isActive ? "Template active." : "Template desactive.");
    } finally {
      setSavingTemplateId(null);
    }
  }

  const columns: DataTableColumn<Template>[] = [
    {
      key: "name",
      header: "Nom du template",
      width: "260px",
      render: (template) => (
        <div className="templates-cell-main">
          <strong>{template.name}</strong>
          <span className="templates-table-cell-subtle">
            {template.category} • {normalizeTemplateColor(template.color) ?? DEFAULT_COLOR}
          </span>
        </div>
      ),
    },
    {
      key: "vehicle",
      header: "Type vehicule",
      width: "130px",
      render: (template) => <StatusBadge variant="info">{getVehicleTypeLabel(template.requiredVehicleType)}</StatusBadge>,
    },
    {
      key: "time",
      header: "Horaire",
      width: "140px",
      render: (template) => getTimeLabel(template),
    },
    {
      key: "crossesMidnight",
      header: "Traverse minuit",
      width: "120px",
      render: (template) => (
        <StatusBadge variant={template.crossesMidnight ? "danger" : "success"}>
          {getCrossesMidnightLabel(template.crossesMidnight)}
        </StatusBadge>
      ),
    },
    {
      key: "staffCount",
      header: "Nb personnes",
      width: "110px",
      render: (template) => String(resolveTemplateMinStaffCount(template.minStaffCount, template.category)),
    },
    {
      key: "requiredRole",
      header: "Role slot 1",
      width: "120px",
      render: (template) => template.requiredRole ?? "Aucun",
    },
    {
      key: "secondaryRoles",
      header: "Roles autorises",
      width: "170px",
      render: (template) => template.secondaryAllowedRoles.join(", ") || "Aucun",
    },
    {
      key: "updatedAt",
      header: "Derniere modif.",
      width: "170px",
      render: (template) => formatDateTime(template.updatedAt),
    },
    {
      key: "usage",
      header: "Utilise",
      width: "90px",
      render: () => "-",
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      width: "230px",
      render: (template) => {
        const isSaving = savingTemplateId === template.id;
        const isArchiving = archivingTemplateId === template.id;
        const isBusy = isSaving || isArchiving;

        return (
          <div className="templates-actions templates-actions--end templates-actions--wrap">
            {!template.archivedAt ? (
              <ActionButton
                size="sm"
                variant="ghost"
                onClick={() => handleToggleActive(template)}
                disabled={isBusy}
              >
                {isSaving ? "Enregistrement..." : template.isActive ? "Desactiver" : "Reactiver"}
              </ActionButton>
            ) : null}

            {!template.archivedAt ? (
              <ActionButton
                size="sm"
                variant="secondary"
                onClick={() => openEdit(template)}
                disabled={isBusy}
              >
                Modifier
              </ActionButton>
            ) : null}

            {!template.archivedAt ? (
              <ActionButton
                size="sm"
                variant="danger"
                onClick={() => handleArchive(template.id)}
                disabled={isBusy}
              >
                {isArchiving ? "Archivage..." : "Archiver"}
              </ActionButton>
            ) : null}
          </div>
        );
      },
    },
  ];

  return (
    <section className="templates-section">
      <div className="templates-grid-stats">
        <StatCard title="Total templates" value={templateStats.total} hint="Catalogue de la societe" tone="info" icon={<ClipboardList size={18} />} />
        <StatCard title="Actifs" value={templateStats.active} hint="Disponibles a la generation" tone="success" icon={<CalendarClock size={18} />} />
        <StatCard title="Desactives" value={templateStats.inactive} hint="Conserves sans activation" tone="warning" icon={<PauseCircle size={18} />} />
        <StatCard title="Archives" value={templateStats.archived} hint="Historique non modifiable" tone="neutral" icon={<Archive size={18} />} />
        <StatCard title="Types de garde" value={templateStats.categoryCount} hint="Categories configurees" tone="info" icon={<UsersRound size={18} />} />
      </div>

      {error ? <ErrorMessage title="Erreur module templates" message={error} /> : null}
      {successMessage ? <div className="templates-alert templates-alert--success">{successMessage}</div> : null}

      <div className="templates-layout">
        <div className="templates-layout__main">
          <section className="templates-card">
            <div className="templates-card__head">
              <div>
                <h2 className="templates-card__title">Creer un template</h2>
                <p className="templates-card__description">
                  Les presets de categorie pre-remplissent la composition minimale la plus courante. Vous pouvez ensuite ajuster le detail.
                </p>
              </div>
              <ActionButton
                variant={showCreateForm ? "secondary" : "primary"}
                size="sm"
                leadingIcon={<Plus size={16} />}
                onClick={() => setShowCreateForm((prev) => !prev)}
              >
                {showCreateForm ? "Masquer" : "Nouveau template"}
              </ActionButton>
            </div>

            {showCreateForm ? (
              <>
                <TemplateFormFields
                  form={createForm}
                  disabled={isCreating}
                  onChange={(updater) => setCreateForm((prev) => updater(prev))}
                />

                <div className="templates-actions templates-actions--end">
                  <ActionButton variant="primary" onClick={handleCreate} disabled={isCreating}>
                    {isCreating ? "Creation..." : "Creer le template"}
                  </ActionButton>
                </div>
              </>
            ) : (
              <p className="templates-table-cell-subtle">Formulaire replie. Utilisez &quot;Nouveau template&quot; pour preparer la creation.</p>
            )}
          </section>

          <section className="templates-card">
            <div className="templates-card__head">
              <div>
                <h2 className="templates-card__title">Liste des templates</h2>
                <p className="templates-card__description">
                  Consultation, filtrage, activation, edition et archivage logique des templates de shifts.
                </p>
              </div>
            </div>

            <FilterBar
              summary={`Filtres actifs : ${searchInput.trim() ? `recherche "${searchInput.trim()}"` : "aucune recherche"}${vehicleTypeFilter ? `, type vehicule ${vehicleTypeFilter}` : ""}${crossesMidnightFilter ? `, traverse minuit ${crossesMidnightFilter === "YES" ? "oui" : "non"}` : ""}${showAdvancedFilters && statusFilter ? `, statut ${statusFilter}` : ""}${showArchived ? ", archives visibles" : ", archives masquees"}`}
              actions={(
                <div className="templates-actions templates-actions--wrap">
                  <ActionButton size="sm" variant="secondary" leadingIcon={<Filter size={14} />} onClick={() => setShowAdvancedFilters((prev) => !prev)}>
                    {showAdvancedFilters ? "Masquer filtres avances" : "Filtres avances"}
                  </ActionButton>
                  <ActionButton size="sm" variant="secondary" leadingIcon={<Download size={14} />} disabled>
                    Export
                  </ActionButton>
                  <ActionButton size="sm" variant="secondary" leadingIcon={<List size={14} />} disabled>
                    Vue
                  </ActionButton>
                  <ActionButton size="sm" variant="ghost" onClick={resetFilters}>
                    Reinitialiser
                  </ActionButton>
                </div>
              )}
            >
              <label className="templates-field">
                <span className="templates-field__label">Recherche</span>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  placeholder="Nom, role, vehicule ou statut"
                />
              </label>

              <label className="templates-field">
                <span className="templates-field__label">Type vehicule</span>
                <select
                  value={vehicleTypeFilter}
                  onChange={(event) => setVehicleTypeFilter(event.target.value as VehicleTypeOption | "")}
                >
                  <option value="">Tous</option>
                  {VEHICLE_TYPE_OPTIONS.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="templates-field">
                <span className="templates-field__label">Traverse minuit</span>
                <select
                  value={crossesMidnightFilter}
                  onChange={(event) => setCrossesMidnightFilter(event.target.value as MidnightFilter)}
                >
                  <option value="">Tous</option>
                  <option value="NO">Non</option>
                  <option value="YES">Oui</option>
                </select>
              </label>

              {showAdvancedFilters ? (
                <>
                  <label className="templates-field">
                    <span className="templates-field__label">Statut</span>
                    <select
                      value={statusFilter}
                      onChange={(event) => setStatusFilter(event.target.value as TemplateStatusFilter)}
                    >
                      <option value="">Tous les statuts</option>
                      <option value="ACTIVE">Actif</option>
                      <option value="INACTIVE">Desactive</option>
                      <option value="ARCHIVED">Archive</option>
                    </select>
                  </label>
                  <label className="templates-checkbox">
                    <input
                      type="checkbox"
                      checked={showArchived}
                      onChange={(event) => setShowArchived(event.target.checked)}
                    />
                    <span>Afficher les archives</span>
                  </label>
                </>
              ) : null}
            </FilterBar>

            <DataTable
              columns={columns}
              rows={filteredTemplates}
              rowKey={(template) => template.id}
              loading={false}
              error={null}
              emptyTitle="Aucun template trouve"
              emptyMessage="Aucun template ne correspond aux criteres selectionnes."
              selectedRowKey={selectedTemplateId}
              onRowClick={(template) => setSelectedTemplateId(template.id)}
              minWidth={1700}
              caption="Templates de shifts de la societe courante"
            />
          </section>
        </div>

        <aside className="templates-detail-panel">
          {selectedTemplate ? (
            <>
              <div className="templates-detail-panel__head">
                <div>
                  <h3 className="templates-detail-panel__title">{selectedTemplate.name}</h3>
                  <p className="templates-detail-panel__subtitle">{selectedTemplate.category}</p>
                </div>
                <StatusBadge variant={getStatusVariant(selectedTemplate)}>{getStatusLabel(selectedTemplate)}</StatusBadge>
              </div>

              <nav className="templates-detail-tabs" aria-label="Details template">
                {TEMPLATE_DETAIL_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`templates-detail-tab${templateDetailTab === tab.id ? " is-active" : ""}`}
                    onClick={() => setTemplateDetailTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>

              {templateDetailTab === "DETAILS" ? (
                <div className="templates-detail-group">
                  <h4 className="templates-detail-group__title">Informations generales</h4>
                  <dl className="templates-detail-list">
                    <div><dt>Nom</dt><dd>{selectedTemplate.name}</dd></div>
                    <div><dt>Type vehicule</dt><dd>{getVehicleTypeLabel(selectedTemplate.requiredVehicleType)}</dd></div>
                    <div><dt>Couleur</dt><dd>{normalizeTemplateColor(selectedTemplate.color) ?? DEFAULT_COLOR}</dd></div>
                    <div><dt>Actif</dt><dd>{selectedTemplate.isActive ? "Oui" : "Non"}</dd></div>
                  </dl>
                </div>
              ) : null}

              {templateDetailTab === "EQUIPE" ? (
                <div className="templates-detail-group">
                  <h4 className="templates-detail-group__title">Equipe requise</h4>
                  <dl className="templates-detail-list">
                    <div><dt>Nombre de personnes</dt><dd>{resolveTemplateMinStaffCount(selectedTemplate.minStaffCount, selectedTemplate.category)}</dd></div>
                    <div><dt>Role obligatoire</dt><dd>{selectedTemplate.requiredRole ?? "Aucun"}</dd></div>
                    <div><dt>Roles autorises</dt><dd>{selectedTemplate.secondaryAllowedRoles.join(", ") || "Aucun"}</dd></div>
                  </dl>
                </div>
              ) : null}

              {templateDetailTab === "HORAIRES" ? (
                <div className="templates-detail-group">
                  <h4 className="templates-detail-group__title">Horaires</h4>
                  <dl className="templates-detail-list">
                    <div><dt>Heure debut</dt><dd>{selectedTemplate.startTime ?? "-"}</dd></div>
                    <div><dt>Heure fin</dt><dd>{selectedTemplate.endTime ?? "-"}</dd></div>
                    <div><dt>Traverse minuit</dt><dd>{getCrossesMidnightLabel(selectedTemplate.crossesMidnight)}</dd></div>
                  </dl>
                </div>
              ) : null}

              {templateDetailTab === "HISTORIQUE" ? (
                <div className="templates-detail-group">
                  <h4 className="templates-detail-group__title">Utilisation</h4>
                  <dl className="templates-detail-list">
                    <div><dt>Cree le</dt><dd>{formatDateTime(selectedTemplate.createdAt)}</dd></div>
                    <div><dt>Derniere mise a jour</dt><dd>{formatDateTime(selectedTemplate.updatedAt)}</dd></div>
                    <div><dt>Archive le</dt><dd>{selectedTemplate.archivedAt ? formatDateTime(selectedTemplate.archivedAt) : "Non archive"}</dd></div>
                  </dl>
                </div>
              ) : null}

              <div className="templates-detail-panel__actions">
                {!selectedTemplate.archivedAt ? (
                  <ActionButton
                    variant="secondary"
                    onClick={() => openEdit(selectedTemplate)}
                    disabled={savingTemplateId === selectedTemplate.id || archivingTemplateId === selectedTemplate.id}
                  >
                    Modifier
                  </ActionButton>
                ) : null}
                {!selectedTemplate.archivedAt ? (
                  <ActionButton
                    variant="secondary"
                    leadingIcon={<Copy size={14} />}
                    onClick={() => prepareDuplicate(selectedTemplate)}
                    disabled={savingTemplateId === selectedTemplate.id || archivingTemplateId === selectedTemplate.id}
                  >
                    Dupliquer
                  </ActionButton>
                ) : null}
                {!selectedTemplate.archivedAt ? (
                  <ActionButton
                    variant="danger"
                    onClick={() => handleArchive(selectedTemplate.id)}
                    disabled={savingTemplateId === selectedTemplate.id || archivingTemplateId === selectedTemplate.id}
                  >
                    {archivingTemplateId === selectedTemplate.id ? "Archivage..." : "Archiver"}
                  </ActionButton>
                ) : (
                  <ActionButton variant="secondary" leadingIcon={<Ban size={14} />} disabled>
                    Template archive
                  </ActionButton>
                )}
              </div>
            </>
          ) : (
            <p className="templates-table-cell-subtle">Selectionnez un template dans le tableau pour afficher le detail.</p>
          )}
        </aside>
      </div>

      {editingTemplateId && editForm ? (
        <section className="templates-card">
          <div className="templates-card__head">
            <h2 className="templates-card__title">Modifier le template selectionne</h2>
            <p className="templates-card__description">
              Mise a jour du template sans changement de logique metier ni de regles de composition.
            </p>
          </div>

          <TemplateFormFields
            form={editForm}
            disabled={savingTemplateId === editingTemplateId || archivingTemplateId === editingTemplateId}
            onChange={(updater) => setEditForm((prev) => (prev ? updater(prev) : prev))}
          />

          <div className="templates-actions templates-actions--end">
            <ActionButton
              variant="secondary"
              onClick={closeEdit}
              disabled={savingTemplateId === editingTemplateId || archivingTemplateId === editingTemplateId}
            >
              Annuler
            </ActionButton>
            <ActionButton
              variant="primary"
              onClick={() => handleSave(editingTemplateId)}
              disabled={savingTemplateId === editingTemplateId || archivingTemplateId === editingTemplateId}
            >
              {savingTemplateId === editingTemplateId ? "Enregistrement..." : "Enregistrer les modifications"}
            </ActionButton>
          </div>
        </section>
      ) : null}
    </section>
  );
}
