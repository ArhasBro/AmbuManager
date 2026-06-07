import React, { useState } from "react";
import { Plus, Search, Pencil, MapPin, Archive, RotateCcw, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { can } from "@/lib/userPermissions";
import { writeAuditLog } from "@/lib/auditLogger";
import { Input } from "@/components/ui/input";
import StatusBadge from "@/components/ui/StatusBadge";
import DepotFormDialog from "@/components/depots/DepotFormDialog";

export default function Depots() {
  const { user } = useAuth();
  const canManage = can(user, "DEPOTS_MANAGE");
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const { data: depots = [], isLoading } = useQuery({
    queryKey: ["depots"],
    queryFn: () => base44.entities.Depot.list("name", 500),
  });
  const { data: vehicles = [] } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => base44.entities.Vehicle.list("-created_date", 500),
  });
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: () => base44.entities.User.list("-created_date", 500),
  });

  const countVehicles = (name) => vehicles.filter(v => !v.is_archived && v.depot_name === name).length;
  const countUsers = (name) => users.filter(u => !u.is_archived && u.depot_name === name).length;

  const saveMutation = useMutation({
    mutationFn: (payload) =>
      editing
        ? base44.entities.Depot.update(editing.id, payload)
        : base44.entities.Depot.create(payload),
    onSuccess: (_, payload) => {
      qc.invalidateQueries({ queryKey: ["depots"] });
      const isEdit = !!editing;
      writeAuditLog({ action: isEdit ? "Modification dépôt" : "Création dépôt", actionType: isEdit ? "update" : "create", module: "Dépôts", resource: `Dépôt : ${payload.name}`, details: payload.city ? `Ville : ${payload.city}` : undefined, actor: user });
      setDialogOpen(false);
      setEditing(null);
    },
  });

  const archiveMutation = useMutation({
    mutationFn: ({ id, is_archived, depot }) => base44.entities.Depot.update(id, { is_archived }),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["depots"] });
      const action = vars.is_archived ? "Archivage dépôt" : "Restauration dépôt";
      writeAuditLog({ action, actionType: "update", module: "Dépôts", resource: `Dépôt : ${vars.depot?.name || vars.id}`, actor: user });
    },
  });

  const openCreate = () => { setEditing(null); setDialogOpen(true); };
  const openEdit = (d) => { setEditing(d); setDialogOpen(true); };

  const filtered = depots.filter((d) => {
    if (!!d.is_archived !== showArchived) return false;
    const q = search.toLowerCase();
    return !q || (d.name || "").toLowerCase().includes(q) || (d.city || "").toLowerCase().includes(q) || (d.code || "").toLowerCase().includes(q);
  });

  const active = depots.filter(d => !d.is_archived);
  const stats = [
    { label: "Dépôts actifs", value: active.length, color: "text-primary" },
    { label: "Véhicules total", value: vehicles.filter(v => !v.is_archived).length, color: "text-green-600" },
    { label: "Utilisateurs total", value: users.filter(u => !u.is_archived).length, color: "text-violet-600" },
    { label: "Archivés", value: depots.filter(d => d.is_archived).length, color: "text-muted-foreground" },
  ];

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dépôts</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Gestion des bases et dépôts opérationnels.</p>
        </div>
        {canManage && <Button className="gap-1.5" onClick={openCreate}><Plus size={14} />Ajouter un dépôt</Button>}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((k, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4">
            <div className={`text-2xl font-bold ${k.color}`}>{k.value}</div>
            <div className="text-xs font-medium text-foreground mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <Button variant={showArchived ? "default" : "outline"} size="sm" className="h-9 gap-1.5" onClick={() => setShowArchived(s => !s)}>
          <Archive size={14} />{showArchived ? "Voir actifs" : "Voir archivés"}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground"><Loader2 className="animate-spin mr-2" size={18} />Chargement...</div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-card border border-border rounded-xl">
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3"><MapPin size={22} className="text-muted-foreground" /></div>
          <p className="text-sm font-medium text-foreground">{showArchived ? "Aucun dépôt archivé" : "Aucun dépôt"}</p>
          {!showArchived && <p className="text-xs text-muted-foreground mt-1">Ajoutez votre première base pour démarrer.</p>}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filtered.map((d) => (
            <div key={d.id} className="bg-card border border-border rounded-xl p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-muted">
                    <MapPin size={18} className="text-muted-foreground" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-foreground">{d.name}</span>
                    <div className="text-xs text-muted-foreground">{d.code || "—"}{d.city ? ` · ${d.city}` : ""}</div>
                  </div>
                </div>
                {canManage && (
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => openEdit(d)}><Pencil size={13} /></Button>
                    {d.is_archived ? (
                    <Button variant="ghost" size="icon" className="w-7 h-7" title="Restaurer" onClick={() => archiveMutation.mutate({ id: d.id, is_archived: false, depot: d })}><RotateCcw size={13} /></Button>
                    ) : (
                    <Button variant="ghost" size="icon" className="w-7 h-7" title="Archiver" onClick={() => archiveMutation.mutate({ id: d.id, is_archived: true, depot: d })}><Archive size={13} /></Button>
                    )}
                  </div>
                )}
              </div>
              <div className="text-xs text-muted-foreground">{d.address || "Adresse non renseignée"}</div>
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">{countVehicles(d.name)}</div>
                  <div className="text-xs text-muted-foreground">Véhicules</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-foreground">{countUsers(d.name)}</div>
                  <div className="text-xs text-muted-foreground">Agents</div>
                </div>
                <div className="text-center">
                  <StatusBadge status={d.status} withDot />
                  <div className="text-xs text-muted-foreground mt-0.5">Statut</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1 border-t border-border">
                <span>Responsable :</span>
                <span className="font-medium text-foreground">{d.local_manager || "—"}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {canManage && (
        <DepotFormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          depot={editing}
          existingDepots={depots}
          onSave={(payload) => saveMutation.mutate(payload)}
          saving={saveMutation.isPending}
        />
      )}
    </div>
  );
}