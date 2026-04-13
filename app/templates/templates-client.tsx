"use client";

import { useMemo, useState } from "react";

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
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("fr-FR");
}

function getTimeLabel(template: Template) {
  if (!template.isTimeDefined) return "Non horodaté";
  return `${template.startTime ?? "—"} → ${template.endTime ?? "—"}${template.crossesMidnight ? " (+1j)" : ""}`;
}

function getStatusLabel(template: Template) {
  if (template.archivedAt) return "Archivé";
  return template.isActive ? "Actif" : "Désactivé";
}

function getStatusStyle(template: Template): React.CSSProperties {
  if (template.archivedAt) {
    return {
      display: "inline-flex",
      alignItems: "center",
      padding: "4px 10px",
      borderRadius: 999,
      border: "1px solid #d1d5db",
      backgroundColor: "#f3f4f6",
      color: "#374151",
      fontSize: 12,
      fontWeight: 700,
    };
  }

  if (template.isActive) {
    return {
      display: "inline-flex",
      alignItems: "center",
      padding: "4px 10px",
      borderRadius: 999,
      border: "1px solid #bbf7d0",
      backgroundColor: "#f0fdf4",
      color: "#166534",
      fontSize: 12,
      fontWeight: 700,
    };
  }

  return {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 10px",
    borderRadius: 999,
    border: "1px solid #fde68a",
    backgroundColor: "#fffbeb",
    color: "#92400e",
    fontSize: 12,
    fontWeight: 700,
  };
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
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {ROLE_OPTIONS.map((role) => {
        const checked = selected.includes(role);
        return (
          <label
            key={role}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.12)",
              background: checked ? "rgba(29, 78, 216, 0.08)" : "transparent",
            }}
          >
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
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "grid", gap: 6 }}>
        <label>Nom</label>
        <input
          value={form.name}
          disabled={disabled}
          onChange={(e) => onChange((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Ex. Journée ambulance"
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        <div style={{ display: "grid", gap: 6 }}>
          <label>Catégorie</label>
          <select
            value={form.category}
            disabled={disabled}
            onChange={(e) => onChange((prev) => updateFormForCategory(e.target.value as CategoryOption, prev))}
          >
            {CATEGORY_OPTIONS.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label>Véhicule requis</label>
          <select
            value={form.requiredVehicleType}
            disabled={disabled}
            onChange={(e) => onChange((prev) => ({ ...prev, requiredVehicleType: e.target.value as VehicleTypeOption | "" }))}
          >
            <option value="">Aucun</option>
            {VEHICLE_TYPE_OPTIONS.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label>Personnes requises</label>
          <select
            value={String(form.minStaffCount)}
            disabled={disabled}
            onChange={(e) => onChange((prev) => ({ ...prev, minStaffCount: Number(e.target.value) as 1 | 2 }))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label>Couleur</label>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="color"
              value={normalizeTemplateColor(form.color) ?? DEFAULT_COLOR}
              disabled={disabled}
              onChange={(e) => onChange((prev) => ({ ...prev, color: e.target.value }))}
            />
            <input
              value={form.color}
              disabled={disabled}
              onChange={(e) => onChange((prev) => ({ ...prev, color: e.target.value }))}
              placeholder="#1D4ED8"
            />
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        <div style={{ display: "grid", gap: 6 }}>
          <label>Rôle obligatoire slot 1</label>
          <select
            value={form.requiredRole}
            disabled={disabled}
            onChange={(e) => onChange((prev) => ({ ...prev, requiredRole: e.target.value as RoleOption | "" }))}
          >
            <option value="">Aucun</option>
            {ROLE_OPTIONS.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label>Statut</label>
          <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <input
              type="checkbox"
              checked={form.isActive}
              disabled={disabled}
              onChange={(e) => onChange((prev) => ({ ...prev, isActive: e.target.checked }))}
            />
            Actif pour les nouvelles générations
          </label>
        </div>
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>Rôles autorisés pour les autres slots</label>
        <RoleCheckboxGroup
          selected={form.secondaryAllowedRoles}
          disabled={disabled}
          onChange={(next) => onChange((prev) => ({ ...prev, secondaryAllowedRoles: next }))}
        />
        <div style={{ fontSize: 12, opacity: 0.72 }}>
          Slot 1 autorisé : {firstSlotRoles.length > 0 ? firstSlotRoles.join(", ") : "libre"}
          {form.minStaffCount === 2
            ? ` • Slot 2 autorisé : ${secondSlotRoles.length > 0 ? secondSlotRoles.join(", ") : "libre"}`
            : " • Slot 2 non utilisé"}
        </div>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={form.isTimeDefined}
            disabled={disabled}
            onChange={(e) => onChange((prev) => ({ ...prev, isTimeDefined: e.target.checked, crossesMidnight: e.target.checked ? prev.crossesMidnight : false }))}
          />
          Template horodaté
        </label>

        {form.isTimeDefined ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
            <div style={{ display: "grid", gap: 6 }}>
              <label>Début</label>
              <input
                type="time"
                value={form.startTime}
                disabled={disabled}
                onChange={(e) => onChange((prev) => ({ ...prev, startTime: e.target.value }))}
              />
            </div>

            <div style={{ display: "grid", gap: 6 }}>
              <label>Fin</label>
              <input
                type="time"
                value={form.endTime}
                disabled={disabled}
                onChange={(e) => onChange((prev) => ({ ...prev, endTime: e.target.value }))}
              />
            </div>

            <div style={{ display: "grid", gap: 6, alignContent: "end" }}>
              <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <input
                  type="checkbox"
                  checked={form.crossesMidnight}
                  disabled={disabled}
                  onChange={(e) => onChange((prev) => ({ ...prev, crossesMidnight: e.target.checked }))}
                />
                Passe minuit
              </label>
            </div>
          </div>
        ) : (
          <div style={{ fontSize: 13, opacity: 0.72 }}>
            Le template est conservé sans horaire. Il n’est pas utilisable par l’autoschedule dans l’état actuel du lot.
          </div>
        )}
      </div>
    </div>
  );
}

export default function TemplatesClient({ initialTemplates }: { initialTemplates: Template[] }) {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [createForm, setCreateForm] = useState<TemplateFormState>(() => createDefaultForm());
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<TemplateFormState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [savingTemplateId, setSavingTemplateId] = useState<string | null>(null);
  const [archivingTemplateId, setArchivingTemplateId] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(true);

  const displayTemplates = useMemo(() => {
    const sorted = [...templates].sort(compareTemplates);
    return showArchived ? sorted : sorted.filter((template) => !template.archivedAt);
  }, [showArchived, templates]);

  function clearFeedback() {
    setError(null);
    setSuccessMessage(null);
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
        setError(getApiError(payload, "Impossible de créer le template."));
        return;
      }

      setTemplates((prev) => [...prev, payload.data]);
      setCreateForm(createDefaultForm());
      setSuccessMessage("Template créé ✅");
    } finally {
      setIsCreating(false);
    }
  }

  function openEdit(template: Template) {
    clearFeedback();
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
        setError(getApiError(payload, "Impossible d’enregistrer le template."));
        return;
      }

      setTemplates((prev) => prev.map((template) => (template.id === templateId ? payload.data : template)));
      setSuccessMessage("Template mis à jour ✅");
      closeEdit();
    } finally {
      setSavingTemplateId(null);
    }
  }

  async function handleArchive(templateId: string) {
    const confirmed = window.confirm("Archiver ce template ? Il restera visible dans l’historique mais ne sera plus actif.");
    if (!confirmed) return;

    setArchivingTemplateId(templateId);
    clearFeedback();

    try {
      const response = await fetch(`/api/templates/${templateId}/archive`, { method: "POST" });
      const payload = (await response.json().catch(() => null)) as ApiResponse<Template> | null;

      if (!response.ok || !payload?.ok) {
        setError(getApiError(payload, "Impossible d’archiver le template."));
        return;
      }

      setTemplates((prev) => prev.map((template) => (template.id === templateId ? payload.data : template)));
      setSuccessMessage("Template archivé ✅");
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
      setSuccessMessage(payload.data.isActive ? "Template activé ✅" : "Template désactivé ✅");
    } finally {
      setSavingTemplateId(null);
    }
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <section style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 12, padding: 16, display: "grid", gap: 12 }}>
        <div>
          <h2 style={{ margin: 0 }}>Créer un template</h2>
          <p style={{ margin: "8px 0 0 0", opacity: 0.72 }}>
            Les presets de catégorie pré-remplissent la composition minimale la plus courante. Vous pouvez ensuite ajuster le détail.
          </p>
        </div>

        <TemplateFormFields form={createForm} disabled={isCreating} onChange={(updater) => setCreateForm((prev) => updater(prev))} />

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="button" onClick={handleCreate} disabled={isCreating}>
            {isCreating ? "Création…" : "Créer le template"}
          </button>
        </div>
      </section>

      {error ? (
        <div style={{ padding: 12, borderRadius: 10, border: "1px solid #fecaca", backgroundColor: "#fef2f2", color: "#991b1b" }}>{error}</div>
      ) : null}
      {successMessage ? (
        <div style={{ padding: 12, borderRadius: 10, border: "1px solid #bbf7d0", backgroundColor: "#f0fdf4", color: "#166534" }}>
          {successMessage}
        </div>
      ) : null}

      <section style={{ display: "grid", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <h2 style={{ margin: 0 }}>Templates existants</h2>
          <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" checked={showArchived} onChange={(e) => setShowArchived(e.target.checked)} />
            Afficher les archivés
          </label>
        </div>

        {displayTemplates.length === 0 ? (
          <div style={{ opacity: 0.7 }}>Aucun template à afficher.</div>
        ) : null}

        {displayTemplates.map((template) => {
          const isEditing = editingTemplateId === template.id && editForm !== null;
          const isBusy = savingTemplateId === template.id || archivingTemplateId === template.id;

          return (
            <article
              key={template.id}
              style={{
                border: "1px solid rgba(0,0,0,0.12)",
                borderLeft: `10px solid ${normalizeTemplateColor(template.color) ?? DEFAULT_COLOR}`,
                borderRadius: 12,
                padding: 16,
                display: "grid",
                gap: 12,
                opacity: template.archivedAt ? 0.82 : 1,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div style={{ display: "grid", gap: 6 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <h3 style={{ margin: 0 }}>{template.name}</h3>
                    <span style={getStatusStyle(template)}>{getStatusLabel(template)}</span>
                  </div>
                  <div style={{ fontSize: 13, opacity: 0.76 }}>
                    {template.category} • {getTimeLabel(template)} • Couleur {template.color ?? DEFAULT_COLOR}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {!template.archivedAt ? (
                    <button type="button" onClick={() => handleToggleActive(template)} disabled={isBusy}>
                      {savingTemplateId === template.id ? "Enregistrement…" : template.isActive ? "Désactiver" : "Réactiver"}
                    </button>
                  ) : null}
                  {!template.archivedAt ? (
                    <button type="button" onClick={() => openEdit(template)} disabled={isBusy}>
                      Modifier
                    </button>
                  ) : null}
                  {!template.archivedAt ? (
                    <button type="button" onClick={() => handleArchive(template.id)} disabled={isBusy}>
                      {archivingTemplateId === template.id ? "Archivage…" : "Archiver"}
                    </button>
                  ) : null}
                </div>
              </div>

              {!isEditing ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 12, opacity: 0.65 }}>Composition</div>
                    <div>
                      {resolveTemplateMinStaffCount(template.minStaffCount, template.category)} personne(s), slot 1 : {getAllowedRolesForFirstSlot(template).join(", ") || "libre"}
                      {resolveTemplateMinStaffCount(template.minStaffCount, template.category) === 2
                        ? `, slot 2 : ${getAllowedRolesForSecondSlot(template).join(", ") || "libre"}`
                        : ""}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, opacity: 0.65 }}>Véhicule requis</div>
                    <div>{template.requiredVehicleType ?? "Aucun"}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, opacity: 0.65 }}>Créé / mis à jour</div>
                    <div>
                      {formatDateTime(template.createdAt)} / {formatDateTime(template.updatedAt)}
                    </div>
                  </div>
                  {template.archivedAt ? (
                    <div>
                      <div style={{ fontSize: 12, opacity: 0.65 }}>Archivé le</div>
                      <div>{formatDateTime(template.archivedAt)}</div>
                    </div>
                  ) : null}
                </div>
              ) : editForm ? (
                <div style={{ display: "grid", gap: 12 }}>
                  <TemplateFormFields form={editForm} disabled={isBusy} onChange={(updater) => setEditForm((prev) => (prev ? updater(prev) : prev))} />
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, flexWrap: "wrap" }}>
                    <button type="button" onClick={closeEdit} disabled={isBusy}>
                      Annuler
                    </button>
                    <button type="button" onClick={() => handleSave(template.id)} disabled={isBusy}>
                      {savingTemplateId === template.id ? "Enregistrement…" : "Enregistrer"}
                    </button>
                  </div>
                </div>
              ) : null}
            </article>
          );
        })}
      </section>
    </div>
  );
}
