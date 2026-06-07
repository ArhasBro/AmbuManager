import React, { useState } from "react";
import { Plus, Search, Pencil, Truck, Archive, RotateCcw, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { can } from "@/lib/userPermissions";
import { writeAuditLog } from "@/lib/auditLogger";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatusBadge from "@/components/ui/StatusBadge";
import VehicleFormDialog from "@/components/vehicules/VehicleFormDialog";

const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("fr-FR", { month: "short", year: "numeric" }) : "—");

export default function Vehicules() {
  const { user } = useAuth();
  const canManage = can(user, "VEHICLES_MANAGE");
  const canEditAvailability = can(user, "VEHICLES_AVAILABILITY");
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("Tous");
  const [filterStatus, setFilterStatus] = useState("Tous");
  const [filterAdmin, setFilterAdmin] = useState("Tous");
  const [filterDepot, setFilterDepot] = useState("Tous");
  const [showArchived, setShowArchived] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => base44.entities.Vehicle.list("-created_date", 500),
  });

  const { data: depots = [] } = useQuery({
    queryKey: ["depots"],
    queryFn: () => base44.entities.Depot.list("name", 500),
  });

  const saveMutation = useMutation({
    mutationFn: (payload) =>
      editing
        ? base44.entities.Vehicle.update(editing.id, payload)
        : base44.entities.Vehicle.create(payload),
    onSuccess: (_, payload) => {
      qc.invalidateQueries({ queryKey: ["vehicles"] });
      const isEdit = !!editing;
      // Détecter un changement de disponibilité
      const availChanged = isEdit && editing.availability !== payload.availability;
      if (availChanged) {
        writeAuditLog({ action: "Changement disponibilité véhicule", actionType: "update", module: "Véhicules", resource: `Véhicule : ${payload.name || editing.name} (${payload.immatriculation || editing.immatriculation})`, details: `${editing.availability} → ${payload.availability}${payload.availability_reason ? ` · Motif : ${payload.availability_reason}` : ""}`, actor: user });
      } else {
        writeAuditLog({ action: isEdit ? "Modification véhicule" : "Création véhicule", actionType: isEdit ? "update" : "create", module: "Véhicules", resource: `Véhicule : ${payload.name} (${payload.immatriculation})`, details: `Type : ${payload.type} · Dépôt : ${payload.depot_name || "—"}`, actor: user });
      }
      setDialogOpen(false);
      setEditing(null);
    },
  });

  const archiveMutation = useMutation({
    mutationFn: ({ id, is_archived, vehicle }) => base44.entities.Vehicle.update(id, { is_archived }),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["vehicles"] });
      const action = vars.is_archived ? "Archivage véhicule" : "Restauration véhicule";
      writeAuditLog({ action, actionType: "update", module: "Véhicules", resource: `Véhicule : ${vars.vehicle?.name || vars.id} (${vars.vehicle?.immatriculation || ""})`, actor: user });
    },
  });

  const openCreate = () => { setEditing(null); setDialogOpen(true); };
  const openEdit = (v) => { setEditing(v); setDialogOpen(true); };

  const filtered = vehicles.filter((v) => {
    if (!!v.is_archived !== showArchived) return false;
    const q = search.toLowerCase();
    const match = !q || (v.name || "").toLowerCase().includes(q) || (v.immatriculation || "").toLowerCase().includes(q);
    const matchT = filterType === "Tous" || v.type === filterType;
    const matchS = filterStatus === "Tous" || v.availability === filterStatus;
    const matchA = filterAdmin === "Tous" || (v.admin_status || "Actif") === filterAdmin;
    const matchD = filterDepot === "Tous" || (v.depot_name || "") === filterDepot;
    return match && matchT && matchS && matchA && matchD;
  });

  const active = vehicles.filter((v) => !v.is_archived);
  const stats = [
    { label: "Véhicules actifs", value: active.length, sub: "dans la flotte", color: "text-primary" },
    { label: "Disponibles", value: active.filter(v => v.availability === "Disponible").length, sub: "opérationnels", color: "text-green-600" },
    { label: "Indisponibles", value: active.filter(v => v.availability === "Indisponible").length, sub: "hors service", color: "text-red-600" },
    { label: "Archivés", value: vehicles.filter(v => v.is_archived).length, sub: "masqués", color: "text-muted-foreground" },
  ];

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Véhicules</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Gestion de la flotte et documents réglementaires.</p>
        </div>
        {canManage && <Button className="gap-1.5" onClick={openCreate}><Plus size={14} />Ajouter un véhicule</Button>}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((k, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4">
            <div className={`text-2xl font-bold ${k.color}`}>{k.value}</div>
            <div className="text-xs font-medium text-foreground mt-0.5">{k.label}</div>
            <div className="text-xs text-muted-foreground">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-36 h-9 text-sm"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>{["Tous", "AMBULANCE", "VSL", "TAXI", "TPMR"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-36 h-9 text-sm"><SelectValue placeholder="Disponibilité" /></SelectTrigger>
          <SelectContent>{["Tous", "Disponible", "Indisponible"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={filterAdmin} onValueChange={setFilterAdmin}>
          <SelectTrigger className="w-32 h-9 text-sm"><SelectValue placeholder="Statut" /></SelectTrigger>
          <SelectContent>{["Tous", "Actif", "Inactif"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={filterDepot} onValueChange={setFilterDepot}>
          <SelectTrigger className="w-40 h-9 text-sm"><SelectValue placeholder="Dépôt" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Tous">Tous les dépôts</SelectItem>
            {depots.filter(d => !d.is_archived).map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}
          </SelectContent>
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
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3"><Truck size={22} className="text-muted-foreground" /></div>
            <p className="text-sm font-medium text-foreground">{showArchived ? "Aucun véhicule archivé" : "Aucun véhicule"}</p>
            {!showArchived && <p className="text-xs text-muted-foreground mt-1">Ajoutez votre premier véhicule pour démarrer.</p>}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Véhicule", "Type", "Dépôt", "Kilométrage", "Contrôle technique", "Assurance", "Statut", "Disponibilité", "Actions"].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <Truck size={14} className="text-muted-foreground" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{v.name}</div>
                        <div className="text-xs text-muted-foreground font-mono">{v.immatriculation}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={v.type} /></td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{v.depot_name || "—"}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{v.mileage ? `${v.mileage.toLocaleString("fr-FR")} km` : "—"}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{fmtDate(v.technical_inspection_expires_at)}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{fmtDate(v.insurance_expires_at)}</td>
                  <td className="px-4 py-3"><StatusBadge status={v.admin_status || "Actif"} /></td>
                  <td className="px-4 py-3"><StatusBadge status={v.availability} withDot /></td>
                  <td className="px-4 py-3">
                    {canManage && (
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => openEdit(v)}><Pencil size={13} /></Button>
                        {v.is_archived ? (
                          <Button variant="ghost" size="icon" className="w-7 h-7" title="Restaurer" onClick={() => archiveMutation.mutate({ id: v.id, is_archived: false, vehicle: v })}><RotateCcw size={13} /></Button>
                        ) : (
                          <Button variant="ghost" size="icon" className="w-7 h-7" title="Archiver" onClick={() => archiveMutation.mutate({ id: v.id, is_archived: true, vehicle: v })}><Archive size={13} /></Button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {canManage && (
        <VehicleFormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          vehicle={editing}
          depots={depots.filter(d => !d.is_archived)}
          onSave={(payload) => saveMutation.mutate(payload)}
          saving={saveMutation.isPending}
          canEditAvailability={canEditAvailability}
        />
      )}
    </div>
  );
}