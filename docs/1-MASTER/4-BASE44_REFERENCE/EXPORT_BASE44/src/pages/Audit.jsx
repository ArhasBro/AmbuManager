import React, { useState } from "react";
import { Search, RefreshCw, Shield, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatusBadge from "@/components/ui/StatusBadge";
import KpiCard from "@/components/ui/KpiCard";
import { useAuth } from "@/lib/AuthContext";
import { can } from "@/lib/userPermissions";
import AccessDeniedState from "@/components/shell/AccessDeniedState";

// Types d'actions sensibles réelles (V1) — aucune suppression physique métier
const TYPE_COLOR = {
  create: "bg-green-50 text-green-600",
  update: "bg-amber-50 text-amber-600",
  login: "bg-blue-50 text-blue-600",
  logout: "bg-blue-50 text-blue-600",
  export: "bg-purple-50 text-purple-600",
  view: "bg-gray-100 text-gray-500",
};
const TYPE_LABEL = {
  create: "Création",
  update: "Modification",
  login: "Connexion",
  logout: "Déconnexion",
  export: "Export",
  view: "Consultation",
};

const fmtTime = (d) => {
  if (!d) return "—";
  try { return format(new Date(d), "dd MMM yyyy HH:mm", { locale: fr }); } catch { return "—"; }
};

export default function Audit() {
  const { user } = useAuth();
  const canView = can(user, "AUDIT_VIEW");

  const [search, setSearch] = useState("");
  const [filterModule, setFilterModule] = useState("Tous");
  const [filterResult, setFilterResult] = useState("Tous");
  const [filterType, setFilterType] = useState("Tous");

  const { data: logs = [], isLoading, refetch, isFetching } = useQuery({
    queryKey: ["audit-logs"],
    queryFn: () => base44.entities.AuditLog.list("-created_date", 500),
  });

  const filtered = logs.filter((l) => {
    const q = search.toLowerCase();
    const actor = l.actor_name || "";
    const match = !q || actor.toLowerCase().includes(q) || (l.action || "").toLowerCase().includes(q) || (l.module || "").toLowerCase().includes(q) || (l.resource || "").toLowerCase().includes(q);
    const matchM = filterModule === "Tous" || l.module === filterModule;
    const matchR = filterResult === "Tous" || l.result === filterResult;
    const matchT = filterType === "Tous" || l.action_type === filterType;
    return match && matchM && matchR && matchT;
  });

  const total = logs.length;
  const success = logs.filter((l) => l.result === "Succès").length;
  const failures = logs.filter((l) => l.result === "Échec").length;
  const actors = new Set(logs.map((l) => l.actor_name).filter(Boolean)).size;
  const updates = logs.filter((l) => l.action_type === "update").length;

  if (!canView) return <div className="p-6"><AccessDeniedState /></div>;

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audit</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Traçabilité des actions sensibles réelles (création, modification, publication, changement de statut...).</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? <Loader2 size={13} className="animate-spin" /> : <RefreshCw size={13} />}Actualiser
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard icon={Shield} iconBg="bg-blue-100" iconColor="text-primary" label="Événements" value={total} sub="enregistrés" />
        <KpiCard icon={() => <span className="text-lg">✅</span>} iconBg="bg-green-100" iconColor="text-green-600" label="Succès" value={success} sub={total ? `${Math.round((success / total) * 100)}% de réussite` : "—"} />
        <KpiCard icon={() => <span className="text-lg">❌</span>} iconBg="bg-red-100" iconColor="text-red-600" label="Échecs" value={failures} sub={total ? `${Math.round((failures / total) * 100)}% des événements` : "—"} />
        <KpiCard icon={() => <span className="text-lg">✏️</span>} iconBg="bg-amber-100" iconColor="text-amber-600" label="Modifications" value={updates} sub="actions de modification" />
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Rechercher dans les logs..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        {[
          { label: "Module", val: filterModule, set: setFilterModule, opts: ["Tous", "Auth", "Planning", "Utilisateurs", "Véhicules", "Société", "Dépôts", "Modèles horaires"] },
          { label: "Résultat", val: filterResult, set: setFilterResult, opts: ["Tous", "Succès", "Échec", "Avertissement"] },
          { label: "Type", val: filterType, set: setFilterType, opts: ["Tous", "create", "update", "login", "logout", "export", "view"] },
        ].map(({ label, val, set, opts }) => (
          <React.Fragment key={label}>
            <span className="text-xs text-muted-foreground">{label}</span>
            <Select value={val} onValueChange={set}>
              <SelectTrigger className="w-36 h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>{opts.map((o) => <SelectItem key={o} value={o}>{TYPE_LABEL[o] || o}</SelectItem>)}</SelectContent>
            </Select>
          </React.Fragment>
        ))}
        <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground" onClick={() => { setSearch(""); setFilterModule("Tous"); setFilterResult("Tous"); setFilterType("Tous"); }}>
          <RefreshCw size={13} />Réinitialiser
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Journal d'audit</span>
          <span className="text-xs text-muted-foreground">{filtered.length} événement(s)</span>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground"><Loader2 className="animate-spin mr-2" size={18} />Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3"><Shield size={22} className="text-muted-foreground" /></div>
            <p className="text-sm font-medium text-foreground">Aucun événement d'audit</p>
            <p className="text-xs text-muted-foreground mt-1">Les actions sensibles tracées apparaîtront ici.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["ID Événement", "Utilisateur", "Action", "Module", "Ressource", "Résultat", "Date / Heure"].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr key={l.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{l.event_id || l.id?.slice(0, 8)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <span className="text-[9px] font-bold text-white">{l.actor_initials || "—"}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground leading-tight">{l.actor_name || "—"}</div>
                          <div className="text-[10px] text-muted-foreground">{l.actor_role || ""}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {l.action_type && (
                          <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${TYPE_COLOR[l.action_type] || "bg-gray-100 text-gray-500"}`}>
                            {TYPE_LABEL[l.action_type] || l.action_type}
                          </span>
                        )}
                        <span className="text-sm text-foreground">{l.action}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{l.module}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{l.resource || "—"}</td>
                    <td className="px-4 py-3"><StatusBadge status={l.result} withDot /></td>
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{fmtTime(l.created_date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}