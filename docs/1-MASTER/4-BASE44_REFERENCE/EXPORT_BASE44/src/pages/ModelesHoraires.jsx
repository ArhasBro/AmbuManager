import React, { useState } from "react";
import { Plus, Search, Pencil, Clock, Archive, RotateCcw, Loader2, Copy } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatusBadge from "@/components/ui/StatusBadge";
import TemplateFormDialog from "@/components/modeles/TemplateFormDialog";
import { normalizeRoles, BUSINESS_ROLE_SHORT, can } from "@/lib/userPermissions";
import { useAuth } from "@/lib/AuthContext";
import { writeAuditLog } from "@/lib/auditLogger";

const fmtHours = (t) => {
  if (!t.start_time || !t.end_time) return "Horaire non défini";
  return `${t.start_time} – ${t.end_time}${t.crosses_midnight ? " (+1j)" : ""}`;
};

export default function ModelesHoraires() {
  const { user } = useAuth();
  const canCreate   = can(user, "TEMPLATES_CREATE");
  const canEdit     = can(user, "TEMPLATES_EDIT");
  const canArchive  = can(user, "TEMPLATES_ARCHIVE");
  const canRestore  = can(user, "TEMPLATES_RESTORE");
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("Tous");
  const [filterStatus, setFilterStatus] = useState("Tous");
  const [showArchived, setShowArchived] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const { data: rawTemplates = [], isLoading } = useQuery({
    queryKey: ["shiftTemplates"],
    queryFn: () => base44.entities.ShiftTemplate.list("-created_date", 500),
  });
  // Normalisation à la lecture : les anciens rôles accentués sont convertis ici une fois pour toutes
  const templates = rawTemplates.map((t) => ({ ...t, allowed_roles: normalizeRoles(t.allowed_roles || []) }));

  const saveMutation = useMutation({
    mutationFn: (payload) => {
      const normalized = { ...payload, allowed_roles: normalizeRoles(payload.allowed_roles) };
      return editing
        ? base44.entities.ShiftTemplate.update(editing.id, normalized)
        : base44.entities.ShiftTemplate.create({ ...normalized, usage_count: 0 });
    },
    onSuccess: (_, payload) => {
      qc.invalidateQueries({ queryKey: ["shiftTemplates"] });
      const isEdit = !!editing;
      writeAuditLog({ action: isEdit ? "Modification modèle horaire" : "Création modèle horaire", actionType: isEdit ? "update" : "create", module: "Modèles horaires", resource: `Modèle : ${payload.name}`, details: `Type véhicule : ${payload.vehicle_type || "—"} · Statut : ${payload.status || "Actif"}`, actor: user });
      setDialogOpen(false);
      setEditing(null);
    },
  });

  const archiveMutation = useMutation({
    mutationFn: ({ id, is_archived, template }) => base44.entities.ShiftTemplate.update(id, { is_archived }),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["shiftTemplates"] });
      const action = vars.is_archived ? "Archivage modèle horaire" : "Restauration modèle horaire";
      writeAuditLog({ action, actionType: "update", module: "Modèles horaires", resource: `Modèle : ${vars.template?.name || vars.id}`, actor: user });
    },
  });

  const duplicateMutation = useMutation({
    mutationFn: (t) => {
      const { id, created_date, updated_date, created_by_id, ...rest } = t;
      return base44.entities.ShiftTemplate.create({ ...rest, name: `${t.name} (copie)`, allowed_roles: normalizeRoles(rest.allowed_roles || []), usage_count: 0, is_archived: false });
    },
    onSuccess: (_, t) => {
      qc.invalidateQueries({ queryKey: ["shiftTemplates"] });
      writeAuditLog({ action: "Duplication modèle horaire", actionType: "create", module: "Modèles horaires", resource: `Modèle : ${t.name} (copie)`, actor: user });
    },
  });

  const openCreate = () => { setEditing(null); setDialogOpen(true); };
  const openEdit = (t) => { setEditing(t); setDialogOpen(true); };

  const filtered = templates.filter((t) => {
    if (!!t.is_archived !== showArchived) return false;
    const q = search.toLowerCase();
    const match = !q || (t.name || "").toLowerCase().includes(q) || (t.short_label || "").toLowerCase().includes(q);
    const matchT = filterType === "Tous" || (t.vehicle_type || "") === filterType;
    const matchS = filterStatus === "Tous" || (t.status || "Actif") === filterStatus;
    return match && matchT && matchS;
  });

  const active = templates.filter((t) => !t.is_archived);
  const stats = [
    { label: "Modèles actifs", value: active.filter(t => t.status === "Actif").length, color: "text-primary" },
    { label: "Ambulance", value: active.filter(t => t.vehicle_type === "AMBULANCE").length, color: "text-green-600" },
    { label: "VSL", value: active.filter(t => t.vehicle_type === "VSL").length, color: "text-blue-600" },
    { label: "Archivés", value: templates.filter(t => t.is_archived).length, color: "text-muted-foreground" },
  ];

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Modèles horaires</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Définissez vos journées types. Les modèles guident le planning sans modifier les affectations existantes.</p>
        </div>
        {canCreate && <Button className="gap-1.5" onClick={openCreate}><Plus size={14} />Nouveau modèle</Button>}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((k, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4">
            <div className={`text-2xl font-bold ${k.color}`}>{k.value}</div>
            <div className="text-xs font-medium text-foreground mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-40 h-9 text-sm"><SelectValue placeholder="Type véhicule" /></SelectTrigger>
          <SelectContent>{["Tous", "AMBULANCE", "VSL", "TAXI", "TPMR", "Aucun"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-32 h-9 text-sm"><SelectValue placeholder="Statut" /></SelectTrigger>
          <SelectContent>{["Tous", "Actif", "Inactif"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
        </Select>
        <Button variant={showArchived ? "default" : "outline"} size="sm" className="h-9 gap-1.5" onClick={() => setShowArchived(s => !s)}>
          <Archive size={14} />{showArchived ? "Voir actifs" : "Voir archivés"}
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground"><Loader2 className="animate-spin mr-2" size={18} />Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3"><Clock size={22} className="text-muted-foreground" /></div>
            <p className="text-sm font-medium text-foreground">{showArchived ? "Aucun modèle archivé" : "Aucun modèle horaire"}</p>
            {!showArchived && <p className="text-xs text-muted-foreground mt-1">Créez votre premier modèle pour structurer le planning.</p>}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Modèle", "Type véhicule", "Rôles autorisés", "Jours actifs", "Horaires", "Utilisations", "Statut", "Actions"].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <Clock size={13} className="text-muted-foreground" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{t.name}</div>
                        {t.short_label && <div className="text-xs text-muted-foreground font-mono">{t.short_label}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{t.vehicle_type ? <StatusBadge status={t.vehicle_type} /> : "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {(t.allowed_roles || []).length ? t.allowed_roles.map((r) => (
                        <span key={r} className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{BUSINESS_ROLE_SHORT[r] || r}</span>
                      )) : <span className="text-sm text-muted-foreground">—</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{(t.active_days || []).length ? `${t.active_days.length} j` : "—"}</td>
                  <td className="px-4 py-3 text-sm font-mono text-foreground">{fmtHours(t)}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{t.usage_count || 0}</td>
                  <td className="px-4 py-3"><StatusBadge status={t.status || "Actif"} withDot /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {canEdit && <Button variant="ghost" size="icon" className="w-7 h-7" title="Modifier" onClick={() => openEdit(t)}><Pencil size={13} /></Button>}
                      {canCreate && <Button variant="ghost" size="icon" className="w-7 h-7" title="Dupliquer" onClick={() => duplicateMutation.mutate(t)}><Copy size={13} /></Button>}
                      {t.is_archived ? (
                        canRestore && <Button variant="ghost" size="icon" className="w-7 h-7" title="Restaurer" onClick={() => archiveMutation.mutate({ id: t.id, is_archived: false, template: t })}><RotateCcw size={13} /></Button>
                      ) : (
                        canArchive && <Button variant="ghost" size="icon" className="w-7 h-7" title="Archiver" onClick={() => archiveMutation.mutate({ id: t.id, is_archived: true, template: t })}><Archive size={13} /></Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <TemplateFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        template={editing}
        onSave={(payload) => saveMutation.mutate(payload)}
        saving={saveMutation.isPending}
      />
    </div>
  );
}