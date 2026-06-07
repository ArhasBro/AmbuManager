import React, { useState } from "react";
import { Plus, Search, Pencil, Activity, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { writeAuditLog } from "@/lib/auditLogger";
import { format, isToday, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatusBadge from "@/components/ui/StatusBadge";
import KpiCard from "@/components/ui/KpiCard";
import CheckFormDialog from "@/components/suivi/CheckFormDialog";

const fmtDate = (d) => { try { return format(parseISO(d), "d MMM yyyy", { locale: fr }); } catch { return d || "—"; } };

/**
 * SuiviVerifications — Gestion des vérifications véhicules.
 * PERMISSIONS : Tous les utilisateurs ayant accès à la page peuvent créer/modifier des vérifications.
 * Aucun contrôle de permission via can() n'est appliqué — ceci est volontaire et conforme à la règle métier :
 * un régulateur, un préposé bureau ou un tiers mandaté doit pouvoir saisir immédiatement un retour de fiche papier.
 * L'audit enregistre chaque opération (créateur, timestamp, détails) pour la traçabilité réglementaire ARS.
 */
export default function SuiviVerifications() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [filterResult, setFilterResult] = useState("Tous");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const { data: checks = [], isLoading } = useQuery({
    queryKey: ["vehicleChecks"],
    queryFn: () => base44.entities.VehicleCheck.list("-check_date", 500),
  });
  const { data: vehicles = [] } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => base44.entities.Vehicle.list("-created_date", 500),
  });

  const saveMutation = useMutation({
    mutationFn: (payload) =>
      editing ? base44.entities.VehicleCheck.update(editing.id, payload) : base44.entities.VehicleCheck.create(payload),
    onSuccess: (_, payload) => {
      const isCreate = !editing;
      writeAuditLog({
        action: isCreate ? "Création vérification véhicule" : "Modification vérification véhicule",
        actionType: isCreate ? "create" : "update",
        module: "Suivi véhicules",
        resource: `Vérification : ${payload.vehicle_name || editing?.vehicle_name || "—"}`,
        details: `Résultat : ${payload.result || "—"}`,
        actor: user,
      });
      qc.invalidateQueries({ queryKey: ["vehicleChecks"] }); setDialogOpen(false); setEditing(null);
    },
  });

  const openCreate = () => { setEditing(null); setDialogOpen(true); };
  const openEdit = (c) => { setEditing(c); setDialogOpen(true); };

  const filtered = checks.filter((c) => {
    const q = search.toLowerCase();
    const match = !q || (c.vehicle_name || "").toLowerCase().includes(q) || (c.immatriculation || "").toLowerCase().includes(q);
    const matchR = filterResult === "Tous" || c.result === filterResult;
    return match && matchR;
  });

  const todayChecks = checks.filter((c) => { try { return isToday(parseISO(c.check_date)); } catch { return false; } });
  const conforme = checks.filter((c) => c.result === "Conforme").length;
  const attention = checks.filter((c) => ["Sous réserve", "À vérifier"].includes(c.result)).length;
  const nonConforme = checks.filter((c) => c.result === "Non conforme").length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <KpiCard icon={Activity} iconBg="bg-blue-100" iconColor="text-primary" label="Vérifications aujourd'hui" value={todayChecks.length} sub={`${checks.length} au total`} />
        <KpiCard icon={() => <span className="text-lg">✅</span>} iconBg="bg-green-100" iconColor="text-green-600" label="Conformes" value={conforme} />
        <KpiCard icon={() => <span className="text-lg">⚠️</span>} iconBg="bg-amber-100" iconColor="text-amber-600" label="Sous réserve / À vérifier" value={attention} />
        <KpiCard icon={() => <span className="text-lg">❌</span>} iconBg="bg-red-100" iconColor="text-red-600" label="Non conformes" value={nonConforme} />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <span className="text-xs text-muted-foreground">Résultat</span>
        <Select value={filterResult} onValueChange={setFilterResult}>
          <SelectTrigger className="w-36 h-9 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>{["Tous", "Conforme", "Non conforme", "Sous réserve", "À vérifier"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
        </Select>
        <Button className="gap-1.5 ml-auto" onClick={openCreate}><Plus size={13} />Nouvelle vérification</Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <span className="text-sm font-semibold text-foreground">Vérifications ({filtered.length})</span>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground"><Loader2 className="animate-spin mr-2" size={18} />Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted-foreground">Aucune vérification enregistrée.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Véhicule", "Date", "Vérificateur 1", "Vérificateur 2", "Résultat", "Anomalie liée", "Actions"].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-foreground">{c.vehicle_name || "—"}</div>
                    <div className="text-xs text-muted-foreground font-mono">{c.immatriculation || ""}{c.depot_name ? ` · ${c.depot_name}` : ""}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{fmtDate(c.check_date)}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{c.checker_1 || "—"}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{c.checker_2 || "—"}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.result} /></td>
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{c.anomaly_linked || "—"}</td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => openEdit(c)}><Pencil size={13} /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <CheckFormDialog
    open={dialogOpen}
    onOpenChange={setDialogOpen}
    check={editing}
    vehicles={vehicles}
    onSave={(p) => saveMutation.mutate(p)}
    saving={saveMutation.isPending}
    onDeclareAnomaly={(vehicleId) => {
      const v = vehicles.find((x) => x.id === vehicleId);
      setEditing(null);
      setDialogOpen(false);
      // Ouvre directement SuiviAnomalies via navigation ou signal — ici on stocke dans sessionStorage pour le parent
      if (v) sessionStorage.setItem("anomaly_prefill_vehicle", JSON.stringify({ id: v.id, name: v.name, type: v.type, depot_name: v.depot_name }));
      window.dispatchEvent(new CustomEvent("open-anomaly-dialog", { detail: { vehicleId } }));
    }}
  />
    </div>
  );
}