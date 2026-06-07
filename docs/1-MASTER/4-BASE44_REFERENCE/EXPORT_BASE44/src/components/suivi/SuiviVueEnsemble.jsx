import React, { useState } from "react";
import { Search, Loader2, Truck, ClipboardCheck, SprayCan, AlertTriangle, Ban } from "lucide-react";
import { format, isToday, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatusBadge from "@/components/ui/StatusBadge";
import KpiCard from "@/components/ui/KpiCard";

const fmtDate = (d) => { try { return format(parseISO(d), "d MMM yyyy", { locale: fr }); } catch { return d || "—"; } };
const ACTIVE_ANO = ["Ouverte", "En cours de traitement"];

// État de suivi prioritaire d'un véhicule (cf. fiche §5.9)
function getSuiviState(v, lastCheck, openAnomalies) {
  if (v.availability === "Indisponible") return "Indisponible";
  if (openAnomalies > 0) return "Anomalie ouverte";
  if (!lastCheck || !isToday(safeParse(lastCheck.check_date))) return "À vérifier";
  return "OK";
}
function safeParse(d) { try { return parseISO(d); } catch { return new Date(0); } }

export default function SuiviVueEnsemble({ onGoTab }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("Tous");
  const [filterDepot, setFilterDepot] = useState("Tous");
  const [filterAvail, setFilterAvail] = useState("Tous");

  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => base44.entities.Vehicle.list("-created_date", 500),
  });
  const { data: checks = [] } = useQuery({
    queryKey: ["vehicleChecks"],
    queryFn: () => base44.entities.VehicleCheck.list("-check_date", 500),
  });
  const { data: anomalies = [] } = useQuery({
    queryKey: ["vehicleAnomalies"],
    queryFn: () => base44.entities.VehicleAnomaly.list("-created_date", 500),
  });

  // Véhicules suivis = actifs et non archivés
  const tracked = vehicles.filter((v) => (v.admin_status || "Actif") === "Actif" && !v.is_archived);

  const lastCheckByVehicle = (id) => checks.find((c) => c.vehicle_id === id);
  const openAnoByVehicle = (id) => anomalies.filter((a) => a.vehicle_id === id && ACTIVE_ANO.includes(a.status)).length;

  // Lignes enrichies
  const rows = tracked.map((v) => {
    const last = lastCheckByVehicle(v.id);
    const openAno = openAnoByVehicle(v.id);
    return { v, last, openAno, state: getSuiviState(v, last, openAno) };
  });

  // KPI
  const checksDoneToday = new Set(checks.filter((c) => { try { return isToday(parseISO(c.check_date)); } catch { return false; } }).map((c) => c.vehicle_id));
  const toVerify = tracked.filter((v) => !checksDoneToday.has(v.id)).length;
  const openAnomalies = anomalies.filter((a) => ACTIVE_ANO.includes(a.status)).length;
  const unavailable = tracked.filter((v) => v.availability === "Indisponible").length;

  // Tableau "Véhicules à traiter" = état différent de OK
  const filtered = rows
    .filter((r) => r.state !== "OK")
    .filter((r) => {
      const q = search.toLowerCase();
      const match = !q || (r.v.name || "").toLowerCase().includes(q) || (r.v.immatriculation || "").toLowerCase().includes(q);
      const matchT = filterType === "Tous" || r.v.type === filterType;
      const matchD = filterDepot === "Tous" || (r.v.depot_name || "") === filterDepot;
      const matchA = filterAvail === "Tous" || r.v.availability === filterAvail;
      return match && matchT && matchD && matchA;
    });

  const depots = [...new Set(tracked.map((v) => v.depot_name).filter(Boolean))];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={Truck} iconBg="bg-blue-100" iconColor="text-primary" label="Véhicules suivis" value={tracked.length} sub="actifs, non archivés" />
        <KpiCard icon={ClipboardCheck} iconBg="bg-amber-100" iconColor="text-amber-600" label="Vérifications à faire" value={toVerify} sub="aujourd'hui" />
        <KpiCard icon={AlertTriangle} iconBg="bg-red-100" iconColor="text-red-600" label="Anomalies ouvertes" value={openAnomalies} />
        <KpiCard icon={Ban} iconBg="bg-gray-100" iconColor="text-gray-500" label="Véhicules indisponibles" value={unavailable} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Rechercher (nom, immatriculation)..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-32 h-9 text-sm"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>{["Tous", "AMBULANCE", "VSL", "TAXI", "TPMR"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={filterDepot} onValueChange={setFilterDepot}>
          <SelectTrigger className="w-40 h-9 text-sm"><SelectValue placeholder="Dépôt" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Tous">Tous les dépôts</SelectItem>
            {depots.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterAvail} onValueChange={setFilterAvail}>
          <SelectTrigger className="w-36 h-9 text-sm"><SelectValue placeholder="Disponibilité" /></SelectTrigger>
          <SelectContent>{["Tous", "Disponible", "Indisponible"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <span className="text-sm font-semibold text-foreground">Véhicules à traiter ({filtered.length})</span>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground"><Loader2 className="animate-spin mr-2" size={18} />Chargement du suivi des véhicules...</div>
        ) : tracked.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted-foreground">Aucun véhicule à suivre.<br />Ajoutez ou réactivez un véhicule depuis la page Véhicules.</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted-foreground">Aucun élément à traiter.<br />Les véhicules suivis ne présentent pas d'action immédiate.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Véhicule", "Type", "Dépôt", "Dernière vérification", "Anomalie ouverte", "État de suivi", "Disponibilité"].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(({ v, last, openAno, state }) => (
                <tr key={v.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-foreground">{v.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">{v.immatriculation}</div>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={v.type === "AMBULANCE" ? "Ambulance" : v.type} /></td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{v.depot_name || "—"}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{last ? fmtDate(last.check_date) : "Jamais"}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{openAno > 0 ? `${openAno} anomalie${openAno > 1 ? "s" : ""}` : "—"}</td>
                  <td className="px-4 py-3"><StatusBadge status={state} /></td>
                  <td className="px-4 py-3"><StatusBadge status={v.availability} withDot /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}