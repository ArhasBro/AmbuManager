"use client";

import { useEffect, useMemo, useState } from "react";
import { Archive, Ban, CalendarClock, CheckSquare, ClipboardList, Copy, Download, Filter, List, MoreVertical, PauseCircle, Plus, UsersRound, X } from "lucide-react";

import {
  ActionButton,
  DataTable,
  ErrorMessage,
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
  { id: "DETAILS", label: "Détails" },
  { id: "EQUIPE", label: "Équipe" },
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

function formatDateShort(value: string | null) {
  if (!value) return "Donnée non renseignée";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

function formatTimeShort(value: string | null) {
  if (!value) return "Donnée non renseignée";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Donnée non renseignée";
  return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function getTimeLabel(template: Template) {
  if (!template.isTimeDefined) return "Sans horaire";
  return `${template.startTime ?? "-"} - ${template.endTime ?? "-"}${template.crossesMidnight ? " (+1j)" : ""}`;
}

function getStatusLabel(template: Template) {
  if (template.archivedAt) return "Archivé";
  return template.isActive ? "Actif" : "Désactivé";
}

function getStatusVariant(template: Template): "success" | "warning" | "neutral" {
  if (template.archivedAt) return "neutral";
  return template.isActive ? "success" : "warning";
}

function getVehicleTypeLabel(value: VehicleTypeOption | null) {
  if (!value) return "Tous types";
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

function buildTemplateCode(template: Template, rowIndex: number) {
  const initials = template.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 3)
    .padEnd(3, "X");
  return `${initials}-${String(rowIndex + 1).padStart(3, "0")}`;
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
  const [checkedTemplateIds, setCheckedTemplateIds] = useState<string[]>(initialTemplates[0] ? [initialTemplates[0].id] : []);
  const [templateDetailTab, setTemplateDetailTab] = useState<TemplateDetailTab>("DETAILS");
  const [editForm, setEditForm] = useState<TemplateFormState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [savingTemplateId, setSavingTemplateId] = useState<string | null>(null);
  const [archivingTemplateId, setArchivingTemplateId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [showFormWorkspace, setShowFormWorkspace] = useState<boolean>(false);
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

  useEffect(() => {
    if (filteredTemplates.length === 0) return;
    setCheckedTemplateIds((prev) => prev.filter((id) => filteredTemplates.some((template) => template.id === id)));
  }, [filteredTemplates]);

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

  const selectedTemplateIndex = useMemo(
    () => (selectedTemplate ? filteredTemplates.findIndex((template) => template.id === selectedTemplate.id) : -1),
    [filteredTemplates, selectedTemplate],
  );

  const selectedTemplateColor = selectedTemplate ? normalizeTemplateColor(selectedTemplate.color) ?? DEFAULT_COLOR : DEFAULT_COLOR;

  function clearFeedback() {
    setError(null);
    setSuccessMessage(null);
  }

  function openCreateWorkspace() {
    setTemplateDetailTab("DETAILS");
    setEditingTemplateId(null);
    setEditForm(null);
    setShowFormWorkspace(true);
    setShowCreateForm(true);
    clearFeedback();
  }

  function closeFormWorkspace() {
    setShowFormWorkspace(false);
    setShowCreateForm(false);
    setEditingTemplateId(null);
    setEditForm(null);
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
      setCheckedTemplateIds([payload.data.id]);
      setShowCreateForm(false);
      setShowFormWorkspace(false);
      setSuccessMessage("Template cree.");
    } finally {
      setIsCreating(false);
    }
  }

  function openEdit(template: Template) {
    clearFeedback();
    setSelectedTemplateId(template.id);
    setCheckedTemplateIds([template.id]);
    setEditingTemplateId(template.id);
    setEditForm(formFromTemplate(template));
    setShowFormWorkspace(true);
    setShowCreateForm(false);
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
    setEditingTemplateId(null);
    setEditForm(null);
    setShowCreateForm(true);
    setShowFormWorkspace(true);
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

  function toggleCheckedTemplate(templateId: string) {
    setCheckedTemplateIds((prev) => (prev.includes(templateId) ? prev.filter((id) => id !== templateId) : [...prev, templateId]));
  }

  const columns: DataTableColumn<Template>[] = [
    {
      key: "checked",
      header: "",
      width: "44px",
      align: "center",
      render: (template) => (
        <label className="templates-row-checkbox" onClick={(event) => event.stopPropagation()}>
          <input
            type="checkbox"
            checked={checkedTemplateIds.includes(template.id)}
            onChange={() => toggleCheckedTemplate(template.id)}
            aria-label={`Sélectionner ${template.name}`}
          />
        </label>
      ),
    },
    {
      key: "name",
      header: "Nom du template",
      width: "188px",
      render: (template) => {
        const rowIndex = filteredTemplates.findIndex((current) => current.id === template.id);
        return (
          <div className="templates-cell-main">
            <strong>{template.name}</strong>
            <span className="templates-table-cell-subtle">{buildTemplateCode(template, rowIndex >= 0 ? rowIndex : 0)}</span>
          </div>
        );
      },
    },
    {
      key: "vehicle",
      header: "Type véhicule",
      width: "104px",
      render: (template) => <StatusBadge variant="info">{getVehicleTypeLabel(template.requiredVehicleType)}</StatusBadge>,
    },
    {
      key: "time",
      header: "Horaire",
      width: "96px",
      render: (template) => getTimeLabel(template),
    },
    {
      key: "crossesMidnight",
      header: "Traverse minuit",
      width: "92px",
      render: (template) => (
        <StatusBadge variant={template.crossesMidnight ? "danger" : "success"}>
          {getCrossesMidnightLabel(template.crossesMidnight)}
        </StatusBadge>
      ),
    },
    {
      key: "staffCount",
      header: "Nb personnes",
      width: "82px",
      align: "center",
      render: (template) => String(resolveTemplateMinStaffCount(template.minStaffCount, template.category)),
    },
    {
      key: "requiredRole",
      header: "Rôle slot 1",
      width: "82px",
      align: "center",
      render: (template) => template.requiredRole ?? "Aucun",
    },
    {
      key: "secondaryRoles",
      header: "Rôles autorisés",
      width: "102px",
      render: (template) => template.secondaryAllowedRoles.join(", ") || "Aucun",
    },
    {
      key: "updatedAt",
      header: "Dernière modif.",
      width: "116px",
      render: (template) => (
        <div className="templates-updated-cell">
          <span>{formatDateShort(template.updatedAt)}</span>
          <span>{formatTimeShort(template.updatedAt)} • Nathan A.</span>
        </div>
      ),
    },
    {
      key: "usage",
      header: "Utilisé",
      width: "70px",
      align: "center",
      render: () => "—",
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      width: "52px",
      render: (template) => (
        <button
          type="button"
          className="templates-row-more"
          onClick={(event) => {
            event.stopPropagation();
            setSelectedTemplateId(template.id);
            openEdit(template);
          }}
          aria-label={`Actions ${template.name}`}
        >
          <MoreVertical size={16} />
        </button>
      ),
    },
  ];

  const canShowAllDetailCards = templateDetailTab === "DETAILS";

  return (
    <section className="templates-section templates-section--v2">
      <div className="templates-page-top">
        <div className="templates-page-top__title-wrap">
          <h1 className="templates-page-top__title">Modèles horaires</h1>
          <p className="templates-page-top__subtitle">Gérez vos modèles horaires de garde et de shift pour organiser vos plannings.</p>
        </div>
        <div className="templates-page-top__actions">
          <ActionButton variant="primary" leadingIcon={<Plus size={16} />} onClick={openCreateWorkspace}>
            Nouveau template
          </ActionButton>
        </div>
      </div>

      <div className="templates-grid-stats">
        <StatCard title="Total templates" value={templateStats.total} hint="Total templates" tone="info" icon={<ClipboardList size={18} />} />
        <StatCard title="Actifs" value={templateStats.active} hint="Actifs" tone="success" icon={<CalendarClock size={18} />} />
        <StatCard title="Désactivés" value={templateStats.inactive} hint="Désactivés" tone="warning" icon={<PauseCircle size={18} />} />
        <StatCard title="Archivés" value={templateStats.archived} hint="Archivés" tone="neutral" icon={<Archive size={18} />} />
        <StatCard title="Types de garde" value={templateStats.categoryCount} hint="Types de garde" tone="info" icon={<UsersRound size={18} />} />
      </div>

      {error ? <ErrorMessage title="Erreur module templates" message={error} /> : null}
      {successMessage ? <div className="templates-alert templates-alert--success">{successMessage}</div> : null}

      <div className="templates-layout">
        <div className="templates-layout__main">
          <section className="templates-card templates-card--table">
            <div className="templates-card__head templates-card__head--plain">
              <div>
                <h2 className="templates-card__title">Liste des modèles horaires</h2>
              </div>
            </div>

            <div className="templates-filters-strip">
              <div className="templates-filter-pill templates-filter-pill--search">
                <label className="templates-filter-pill__label" htmlFor="template-search">Recherche</label>
                <input
                  id="template-search"
                  type="text"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  placeholder="Rechercher un template..."
                />
              </div>

              <div className="templates-filter-pill templates-filter-pill--select">
                <span className="templates-filter-pill__label">Type véhicule</span>
                <select
                  value={vehicleTypeFilter}
                  onChange={(event) => setVehicleTypeFilter(event.target.value as VehicleTypeOption | "")}
                >
                  <option value="">Tous</option>
                  {VEHICLE_TYPE_OPTIONS.map((category) => (
                    <option key={category} value={category}>
                      {getVehicleTypeLabel(category)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="templates-filter-pill templates-filter-pill--select">
                <span className="templates-filter-pill__label">Traverse minuit</span>
                <select
                  value={crossesMidnightFilter}
                  onChange={(event) => setCrossesMidnightFilter(event.target.value as MidnightFilter)}
                >
                  <option value="">Tous</option>
                  <option value="NO">Non</option>
                  <option value="YES">Oui</option>
                </select>
              </div>

              <div className="templates-filters-strip__actions">
                <div className="templates-actions templates-actions--wrap">
                  <ActionButton size="sm" variant="secondary" leadingIcon={<Filter size={14} />} onClick={() => setShowAdvancedFilters((prev) => !prev)}>
                    Filtres avancés
                  </ActionButton>
                  <ActionButton size="sm" variant="secondary" leadingIcon={<Download size={14} />} disabled>
                    Export
                  </ActionButton>
                  <ActionButton size="sm" variant="secondary" leadingIcon={<List size={14} />} disabled>
                    Vue
                  </ActionButton>
                </div>
              </div>
            </div>

            {showAdvancedFilters ? (
              <div className="templates-filters-advanced">
                <label className="templates-field">
                  <span className="templates-field__label">Statut</span>
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value as TemplateStatusFilter)}
                  >
                    <option value="">Tous les statuts</option>
                    <option value="ACTIVE">Actif</option>
                    <option value="INACTIVE">Désactivé</option>
                    <option value="ARCHIVED">Archivé</option>
                  </select>
                </label>
                <label className="templates-checkbox">
                  <input
                    type="checkbox"
                    checked={showArchived}
                    onChange={(event) => setShowArchived(event.target.checked)}
                  />
                  <span>Afficher les archivés</span>
                </label>
                <ActionButton size="sm" variant="ghost" onClick={resetFilters}>Réinitialiser</ActionButton>
              </div>
            ) : null}

            <DataTable
              columns={columns}
              rows={filteredTemplates}
              rowKey={(template) => template.id}
              loading={false}
              error={null}
              emptyTitle="Aucun élément à afficher"
              emptyMessage="Aucun template ne correspond aux critères sélectionnés."
              selectedRowKey={selectedTemplateId}
              onRowClick={(template) => {
                setSelectedTemplateId(template.id);
                setCheckedTemplateIds([template.id]);
              }}
              minWidth={1120}
              caption="Templates de garde"
              className="templates-table"
            />

            <div className="templates-table-footer">
              <span>{filteredTemplates.length} template(s) affiché(s)</span>
              <span>Vue liste + détail priorisée</span>
            </div>
          </section>
        </div>

        <aside className="templates-detail-panel">
          {selectedTemplate ? (
            <>
              <div className="templates-detail-panel__head">
                <div>
                  <h3 className="templates-detail-panel__title">{selectedTemplate.name}</h3>
                  <p className="templates-detail-panel__subtitle">
                    {buildTemplateCode(selectedTemplate, selectedTemplateIndex >= 0 ? selectedTemplateIndex : 0)}
                  </p>
                </div>
                <div className="templates-detail-panel__head-right">
                  <StatusBadge variant={getStatusVariant(selectedTemplate)}>{getStatusLabel(selectedTemplate)}</StatusBadge>
                  <button
                    type="button"
                    className="templates-detail-close"
                    onClick={() => setSelectedTemplateId(null)}
                    aria-label="Fermer le détail"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <nav className="templates-detail-tabs" aria-label="Détails template">
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

              {canShowAllDetailCards ? (
                <div className="templates-detail-group">
                  <h4 className="templates-detail-group__title">Informations générales</h4>
                  <dl className="templates-detail-list">
                    <div><dt>Nom</dt><dd>{selectedTemplate.name}</dd></div>
                    <div><dt>Code</dt><dd>{buildTemplateCode(selectedTemplate, selectedTemplateIndex >= 0 ? selectedTemplateIndex : 0)}</dd></div>
                    <div><dt>Type véhicule</dt><dd>{getVehicleTypeLabel(selectedTemplate.requiredVehicleType)}</dd></div>
                    <div><dt>Couleur</dt><dd><span className="templates-color-swatch" style={{ backgroundColor: selectedTemplateColor }} aria-label={`Couleur ${selectedTemplateColor}`} title={selectedTemplateColor} /></dd></div>
                    <div><dt>Actif</dt><dd>{selectedTemplate.isActive ? "Oui" : "Non"}</dd></div>
                  </dl>
                </div>
              ) : null}

              {(canShowAllDetailCards || templateDetailTab === "HORAIRES") ? (
                <div className="templates-detail-group">
                  <h4 className="templates-detail-group__title">Horaires</h4>
                  <dl className="templates-detail-list">
                    <div><dt>Heure début</dt><dd>{selectedTemplate.startTime ?? "Donnée non renseignée"}</dd></div>
                    <div><dt>Heure fin</dt><dd>{selectedTemplate.endTime ?? "Donnée non renseignée"}</dd></div>
                    <div><dt>Traverse minuit</dt><dd>{getCrossesMidnightLabel(selectedTemplate.crossesMidnight)}</dd></div>
                  </dl>
                </div>
              ) : null}

              {(canShowAllDetailCards || templateDetailTab === "EQUIPE") ? (
                <div className="templates-detail-group">
                  <h4 className="templates-detail-group__title">Équipe requise</h4>
                  <dl className="templates-detail-list">
                    <div><dt>Nombre de personnes</dt><dd>{resolveTemplateMinStaffCount(selectedTemplate.minStaffCount, selectedTemplate.category)}</dd></div>
                    <div><dt>Rôle obligatoire (slot 1)</dt><dd>{selectedTemplate.requiredRole ?? "Aucun"}</dd></div>
                    <div><dt>Rôles autorisés</dt><dd>{selectedTemplate.secondaryAllowedRoles.join(", ") || "Aucun"}</dd></div>
                  </dl>
                </div>
              ) : null}

              {(canShowAllDetailCards || templateDetailTab === "HISTORIQUE") ? (
                <div className="templates-detail-group">
                  <h4 className="templates-detail-group__title">Utilisation</h4>
                  <dl className="templates-detail-list">
                    <div><dt>Nombre d&apos;utilisations</dt><dd>Donnée non renseignée</dd></div>
                    <div><dt>Dernière utilisation</dt><dd>{formatDateShort(selectedTemplate.updatedAt)}</dd></div>
                    <div><dt>Utilisé dans</dt><dd>Donnée non renseignée</dd></div>
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
                    Template archivé
                  </ActionButton>
                )}
              </div>
            </>
          ) : (
            <p className="templates-table-cell-subtle">Sélectionnez un template dans le tableau pour afficher le détail.</p>
          )}
        </aside>
      </div>

      {showFormWorkspace ? (
        <section className="templates-card templates-card--advanced" id="templates-form-zone">
          <div className="templates-card__head templates-card__head--plain">
            <div>
              <h2 className="templates-card__title">Formulaires avancés</h2>
              <p className="templates-card__description">Création/édition complète, volontairement reléguées hors vue principale.</p>
            </div>
            <ActionButton variant="secondary" size="sm" onClick={closeFormWorkspace}>
              Fermer
            </ActionButton>
          </div>

          <div className="templates-advanced-switch">
            <ActionButton
              variant={showCreateForm ? "primary" : "secondary"}
              size="sm"
              leadingIcon={<Plus size={14} />}
              onClick={() => {
                setShowCreateForm(true);
                setEditingTemplateId(null);
                setEditForm(null);
              }}
            >
              Nouveau template
            </ActionButton>
            <ActionButton
              variant={!showCreateForm ? "primary" : "secondary"}
              size="sm"
              leadingIcon={<CheckSquare size={14} />}
              onClick={() => {
                if (!selectedTemplate) return;
                openEdit(selectedTemplate);
                setShowCreateForm(false);
              }}
              disabled={!selectedTemplate}
            >
              Modifier la sélection
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
                  {isCreating ? "Création..." : "Créer le template"}
                </ActionButton>
              </div>
            </>
          ) : null}

          {editingTemplateId && editForm ? (
            <>
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
            </>
          ) : null}
        </section>
      ) : null}
    </section>
  );
}
