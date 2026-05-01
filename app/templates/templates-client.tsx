"use client";

import { useMemo, useState } from "react";

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
  const [editForm, setEditForm] = useState<TemplateFormState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [savingTemplateId, setSavingTemplateId] = useState<string | null>(null);
  const [archivingTemplateId, setArchivingTemplateId] = useState<string | null>(null);

  const [showArchived, setShowArchived] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryOption | "">("");
  const [statusFilter, setStatusFilter] = useState<TemplateStatusFilter>("");

  const sortedTemplates = useMemo(() => [...templates].sort(compareTemplates), [templates]);

  const visibleTemplates = useMemo(() => {
    return showArchived ? sortedTemplates : sortedTemplates.filter((template) => !template.archivedAt);
  }, [showArchived, sortedTemplates]);

  const filteredTemplates = useMemo(() => {
    return visibleTemplates.filter((template) => {
      if (!templateMatchesQuery(template, searchInput.trim())) return false;
      if (categoryFilter && template.category !== categoryFilter) return false;

      if (statusFilter === "ACTIVE" && (template.archivedAt || !template.isActive)) return false;
      if (statusFilter === "INACTIVE" && (template.archivedAt || template.isActive)) return false;
      if (statusFilter === "ARCHIVED" && !template.archivedAt) return false;

      return true;
    });
  }, [categoryFilter, searchInput, statusFilter, visibleTemplates]);

  const templateStats = useMemo(() => {
    const counts = {
      total: sortedTemplates.length,
      active: 0,
      inactive: 0,
      archived: 0,
    };

    for (const template of sortedTemplates) {
      if (template.archivedAt) {
        counts.archived += 1;
      } else if (template.isActive) {
        counts.active += 1;
      } else {
        counts.inactive += 1;
      }
    }

    return counts;
  }, [sortedTemplates]);

  const selectedTemplate = useMemo(
    () => sortedTemplates.find((template) => template.id === selectedTemplateId) ?? null,
    [selectedTemplateId, sortedTemplates],
  );

  function clearFeedback() {
    setError(null);
    setSuccessMessage(null);
  }

  function resetFilters() {
    setSearchInput("");
    setCategoryFilter("");
    setStatusFilter("");
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
      header: "Template",
      width: "280px",
      render: (template) => (
        <div className="templates-cell-main">
          <strong>{template.name}</strong>
          <span className="templates-table-cell-subtle">
            Couleur {normalizeTemplateColor(template.color) ?? DEFAULT_COLOR} • {template.requiredVehicleType ?? "Vehicule libre"}
          </span>
        </div>
      ),
    },
    {
      key: "category",
      header: "Categorie",
      width: "120px",
      render: (template) => <StatusBadge variant="info">{template.category}</StatusBadge>,
    },
    {
      key: "staff",
      header: "Composition",
      width: "300px",
      render: (template) => {
        const staffCount = resolveTemplateMinStaffCount(template.minStaffCount, template.category);
        const firstSlotRoles = getAllowedRolesForFirstSlot(template);
        const secondSlotRoles = getAllowedRolesForSecondSlot(template);

        return (
          <div className="templates-cell-main">
            <span>{staffCount} personne(s)</span>
            <span className="templates-table-cell-subtle">
              Slot 1: {firstSlotRoles.join(", ") || "libre"}
              {staffCount === 2 ? ` | Slot 2: ${secondSlotRoles.join(", ") || "libre"}` : ""}
            </span>
          </div>
        );
      },
    },
    {
      key: "time",
      header: "Horaires",
      width: "170px",
      render: (template) => getTimeLabel(template),
    },
    {
      key: "status",
      header: "Statut",
      width: "130px",
      render: (template) => <StatusBadge variant={getStatusVariant(template)}>{getStatusLabel(template)}</StatusBadge>,
    },
    {
      key: "updatedAt",
      header: "Mise a jour",
      width: "180px",
      render: (template) => formatDateTime(template.updatedAt),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      width: "280px",
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
        <StatCard title="Total templates" value={templateStats.total} hint="Catalogue global de la societe" />
        <StatCard title="Actifs" value={templateStats.active} hint="Disponibles a la generation" tone="success" />
        <StatCard title="Desactives" value={templateStats.inactive} hint="Conserves sans activation" tone="warning" />
        <StatCard title="Archives" value={templateStats.archived} hint="Historique non modifiable" tone="neutral" />
      </div>

      {error ? <ErrorMessage title="Erreur module templates" message={error} /> : null}
      {successMessage ? <div className="templates-alert templates-alert--success">{successMessage}</div> : null}

      <section className="templates-card">
        <div className="templates-card__head">
          <h2 className="templates-card__title">Creer un template</h2>
          <p className="templates-card__description">
            Les presets de categorie pre-remplissent la composition minimale la plus courante. Vous pouvez ensuite ajuster le detail.
          </p>
        </div>

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
      </section>

      <section className="templates-card">
        <div className="templates-card__head">
          <h2 className="templates-card__title">Liste des templates</h2>
          <p className="templates-card__description">
            Consultation, filtrage simple, activation, edition et archivage logique des templates de shifts.
          </p>
        </div>

        <FilterBar
          summary={`Filtres actifs : ${searchInput.trim() ? `recherche "${searchInput.trim()}"` : "aucune recherche"}${categoryFilter ? `, categorie ${categoryFilter}` : ""}${statusFilter ? `, statut ${statusFilter}` : ""}${showArchived ? ", archives visibles" : ", archives masquees"}`}
          actions={(
            <div className="templates-actions">
              <label className="templates-checkbox">
                <input
                  type="checkbox"
                  checked={showArchived}
                  onChange={(event) => setShowArchived(event.target.checked)}
                />
                <span>Afficher les archives</span>
              </label>
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
              placeholder="Nom, categorie, role, vehicule ou statut"
            />
          </label>

          <label className="templates-field">
            <span className="templates-field__label">Categorie</span>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value as CategoryOption | "")}
            >
              <option value="">Toutes les categories</option>
              {CATEGORY_OPTIONS.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

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
          minWidth={1460}
          caption="Templates de shifts de la societe courante"
        />
      </section>

      {selectedTemplate ? (
        <section className="templates-selection-card">
          <strong>Selection actuelle</strong>
          <span>
            <strong>{selectedTemplate.name}</strong>
          </span>
          <div className="templates-inline-status">
            <StatusBadge variant="info">{selectedTemplate.category}</StatusBadge>
            <StatusBadge variant={getStatusVariant(selectedTemplate)}>{getStatusLabel(selectedTemplate)}</StatusBadge>
            <StatusBadge variant="neutral">{getTimeLabel(selectedTemplate)}</StatusBadge>
          </div>
        </section>
      ) : null}

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
