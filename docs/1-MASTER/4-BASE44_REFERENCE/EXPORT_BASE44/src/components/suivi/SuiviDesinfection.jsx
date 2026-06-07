import React, { useState } from "react";
import { Plus, Search, Pencil, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { writeAuditLog } from "@/lib/auditLogger";
import { format, isToday, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StatusBadge from "@/components/ui/StatusBadge";
import KpiCard from "@/components/ui/KpiCard";
import DisinfectionFormDialog from "@/components/suivi/DisinfectionFormDialog";

const fmtDate = (d) => { try { return format(parseISO(d), "d MMM yyyy", { locale: fr }); } catch { return d || "—"; } };

/**
 * SuiviDesinfection — Gestion des désinfections véhicules.
 * PERMISSIONS : Tous les utilisateurs ayant accès à la page peuvent créer/modifier des désinfections.
 * Aucun contrôle de permission via can() n'est appliqué — ceci est volontaire et conforme à la règle métier :
 * un agent d'exploitation, un préposé ou un tiers doit pouvoir saisir rapidement le résultat d'une désinfection terrain.
 * L'audit enregistre chaque opération pour la traçabilité ARS.
 */
export default function SuiviDesinfection() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const { data: records = [], isLoading } = useQuery({
    queryKey: ["disinfections"],
    queryFn: () => base44.entities.Disinfection.list("-disinfection_date", 500),
  });
  const { data: vehicles = [] } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => base44.entities.Vehicle.list("-created_date", 500),
  });

  const saveMutation = useMutation({
    mutationFn: (payload) =>
      editing ? base44.entities.Disinfection.update(editing.id, payload) : base44.entities.Disinfection.create(payload),
    onSuccess: (_, payload) => {
      const isCreate = !editing;
      writeAuditLog({
        action: isCreate ? "Création désinfection véhicule" : "Modification désinfection véhicule",
        actionType: isCreate ? "create" : "update",
        module: "Suivi véhicules",
        resource: `Désinfection : ${payload.vehicle_name || editing?.vehicle_name || "—"}`,
        details: `Résultat : ${payload.result || "—"}`,
        actor: user,
      });
      qc.invalidateQueries({ queryKey: ["disinfections"] }); setDialogOpen(false); setEditing(null);
    },
  });

  const openCreate = () => { setEditing(null); setDialogOpen(true); };
  const openEdit = (r) => { setEditing(r); setDialogOpen(true); };

  const filtered = records.filter((r) => {
    const q = search.toLowerCase();
    return !q || (r.vehicle_name || "").toLowerCase().includes(q) || (r.performed_by || "").toLowerCase().includes(q);
  });

  const todayCount = records.filter((r) => { try { return isToday(parseISO(r.disinfection_date)); } catch { return false; } }).length;
  const validated = records.filter((r) => r.counter_checked).length;
  const pending = records.filter((r) => r.result === "Réalisée" && !r.counter_checked).length;
  const redo = records.filter((r) => r.result === "À refaire").length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <KpiCard icon={() => <span className="text-lg">🧴</span>} iconBg="bg-teal-100" iconColor="text-teal-600" label="Désinfections aujourd'hui" value={todayCount} sub={`${records.length} au total`} />
        <KpiCard icon={() => <span className="text-lg">✅</span>} iconBg="bg-green-100" iconColor="text-green-600" label="Contre-vérifiées" value={validated} />
        <KpiCard icon={() => <span className="text-lg">⏳</span>} iconBg="bg-amber-100" iconColor="text-amber-600" label="À contre-vérifier" value={pending} />
        <KpiCard icon={() => <span className="text-lg">🔁</span>} iconBg="bg-red-100" iconColor="text-red-600" label="À refaire" value={redo} />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <Button className="gap-1.5 ml-auto" onClick={openCreate}><Plus size={13} />Enregistrer désinfection</Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <span className="text-sm font-semibold text-foreground">Registre des désinfections ({filtered.length})</span>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground"><Loader2 className="animate-spin mr-2" size={18} />Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted-foreground">Aucune désinfection enregistrée.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Véhicule", "Date", "Produit", "Réalisée par", "Résultat", "Contre-vérif. par", "Actions"].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-foreground">{r.vehicle_name || "—"}</div>
                    <div className="text-xs text-muted-foreground font-mono">{r.depot_name || ""}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{fmtDate(r.disinfection_date)}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{r.product_type || "—"}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{r.performed_by || "—"}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.result} withDot /></td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{r.counter_checked ? (r.counter_checked_by || "Oui") : "—"}</td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => openEdit(r)}><Pencil size={13} /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <DisinfectionFormDialog
    open={dialogOpen}
    onOpenChange={setDialogOpen}
    record={editing}
    vehicles={vehicles}
    onSave={(p) => saveMutation.mutate(p)}
    saving={saveMutation.isPending}
    onDeclareAnomaly={(vehicleId) => {
      const v = vehicles.find((x) => x.id === vehicleId);
      setDialogOpen(false);
      if (v) sessionStorage.setItem("anomaly_prefill_vehicle", JSON.stringify({ id: v.id, name: v.name, type: v.type, depot_name: v.depot_name }));
      window.dispatchEvent(new CustomEvent("open-anomaly-dialog", { detail: { vehicleId } }));
    }}
  />
    </div>
  );
}