import React, { useState, useEffect } from "react";
import { Plus, Search, Pencil, AlertTriangle, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { writeAuditLog } from "@/lib/auditLogger";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatusBadge from "@/components/ui/StatusBadge";
import KpiCard from "@/components/ui/KpiCard";
import AnomalyFormDialog from "@/components/suivi/AnomalyFormDialog";

const ACTIVE = ["Ouverte", "En cours de traitement"];

/**
 * SuiviAnomalies — Gestion des anomalies véhicules.
 * PERMISSIONS : Tous les utilisateurs ayant accès à la page peuvent déclarer/modifier des anomalies.
 * Aucun contrôle de permission via can() n'est appliqué — ceci est volontaire et conforme à la règle métier.
 * IMPORTANT : La criticité (Bloquante/Majeure/Non bloquante) est un indicateur visuel et opérationnel.
 * Elle ne déclenche JAMAIS une indisponibilité automatique du véhicule. L'immobilisation reste une action explicite
 * autorisée uniquement via la page Véhicules (permission VEHICLES_AVAILABILITY requise) et doit être justifiée par un motif formel.
 */
export default function SuiviAnomalies() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [filterCrit, setFilterCrit] = useState("Tous");
  const [filterStatus, setFilterStatus] = useState("Tous");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // Écoute l'événement émis depuis SuiviVerifications / SuiviDesinfection
  useEffect(() => {
    const handler = () => {
      const prefill = sessionStorage.getItem("anomaly_prefill_vehicle");
      if (prefill) {
        try {
          const v = JSON.parse(prefill);
          setEditing({ vehicle_id: v.id, vehicle_name: v.name, vehicle_type: v.type, depot_name: v.depot_name, source: "Vérification" });
        } catch {}
        sessionStorage.removeItem("anomaly_prefill_vehicle");
      } else {
        setEditing(null);
      }
      setDialogOpen(true);
    };
    window.addEventListener("open-anomaly-dialog", handler);
    return () => window.removeEventListener("open-anomaly-dialog", handler);
  }, []);

  const { data: anomalies = [], isLoading } = useQuery({
    queryKey: ["vehicleAnomalies"],
    queryFn: () => base44.entities.VehicleAnomaly.list("-created_date", 500),
  });
  const { data: vehicles = [] } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => base44.entities.Vehicle.list("-created_date", 500),
  });

  const saveMutation = useMutation({
    mutationFn: (payload) =>
      editing ? base44.entities.VehicleAnomaly.update(editing.id, payload) : base44.entities.VehicleAnomaly.create(payload),
    onSuccess: (_, payload) => {
      const isCreate = !editing;
      writeAuditLog({
        action: isCreate ? "Déclaration anomalie véhicule" : "Modification anomalie véhicule",
        actionType: isCreate ? "create" : "update",
        module: "Suivi véhicules",
        resource: `Anomalie : ${payload.vehicle_name || editing?.vehicle_name || "—"} (${payload.anomaly_ref || editing?.anomaly_ref || "—"})`,
        details: `Criticité : ${payload.criticality || "—"} — Statut : ${payload.status || "—"}`,
        actor: user,
      });
      qc.invalidateQueries({ queryKey: ["vehicleAnomalies"] }); setDialogOpen(false); setEditing(null);
    },
  });

  const openCreate = () => { setEditing(null); setDialogOpen(true); };
  const openEdit = (a) => { setEditing(a); setDialogOpen(true); };

  const filtered = anomalies.filter((a) => {
    const q = search.toLowerCase();
    const match = !q || (a.vehicle_name || "").toLowerCase().includes(q) || (a.anomaly_ref || "").toLowerCase().includes(q);
    const matchC = filterCrit === "Tous" || a.criticality === filterCrit;
    const matchS = filterStatus === "Tous" || a.status === filterStatus;
    return match && matchC && matchS;
  });

  const active = anomalies.filter((a) => ACTIVE.includes(a.status));
  const bloquantes = active.filter((a) => a.criticality === "Bloquante").length;
  const majeures = active.filter((a) => a.criticality === "Majeure").length;
  const resolues = anomalies.filter((a) => a.status === "Résolue").length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <KpiCard icon={AlertTriangle} iconBg="bg-amber-100" iconColor="text-amber-600" label="Anomalies actives" value={active.length} />
        <KpiCard icon={() => <span className="text-lg">🔴</span>} iconBg="bg-red-100" iconColor="text-red-600" label="Bloquantes" value={bloquantes} sub="véhicules immobilisés" />
        <KpiCard icon={() => <span className="text-lg">🟠</span>} iconBg="bg-amber-100" iconColor="text-amber-600" label="Majeures" value={majeures} sub="à traiter" />
        <KpiCard icon={() => <span className="text-lg">✅</span>} iconBg="bg-green-100" iconColor="text-green-600" label="Résolues" value={resolues} />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <span className="text-xs text-muted-foreground">Criticité</span>
        <Select value={filterCrit} onValueChange={setFilterCrit}>
          <SelectTrigger className="w-36 h-9 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>{["Tous", "Bloquante", "Majeure", "Non bloquante"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground">Statut</span>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40 h-9 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>{["Tous", "Ouverte", "En cours de traitement", "Résolue", "Annulée/Classée sans suite"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
        </Select>
        <Button className="gap-1.5 ml-auto" onClick={openCreate}><Plus size={13} />Déclarer anomalie</Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <span className="text-sm font-semibold text-foreground">Anomalies ({filtered.length})</span>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground"><Loader2 className="animate-spin mr-2" size={18} />Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted-foreground">Aucune anomalie enregistrée.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Référence", "Véhicule", "Source", "Déclaré par", "Criticité", "Statut", "Actions"].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3 text-xs font-mono font-medium text-foreground">{a.anomaly_ref || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-foreground">{a.vehicle_name || "—"}</div>
                    <div className="text-xs text-muted-foreground">{a.depot_name || ""}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{a.source}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{a.declared_by || "—"}</td>
                  <td className="px-4 py-3"><StatusBadge status={a.criticality} /></td>
                  <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => openEdit(a)}><Pencil size={13} /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AnomalyFormDialog open={dialogOpen} onOpenChange={setDialogOpen} anomaly={editing} vehicles={vehicles} onSave={(p) => saveMutation.mutate(p)} saving={saveMutation.isPending} />
    </div>
  );
}