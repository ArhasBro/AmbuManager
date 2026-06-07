import React, { useMemo, useState } from "react";
import {
  Users, UserX, Truck, CalendarClock, RotateCcw, SlidersHorizontal,
  Sun, Clock, ListChecks, CalendarDays, UsersRound, CalendarRange,
  AlertTriangle, Wrench, Building2, MapPin, Rocket, Shield, Loader2
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { getCurrentBusinessRole, MODULE_ROLES } from "@/lib/userPermissions";
import { isoDate, weekStart, weekEnd } from "@/lib/planningUtils";
import DashboardKpiCard from "@/components/dashboard/DashboardKpiCard";
import DashboardWidgetCard from "@/components/dashboard/DashboardWidgetCard";
import DashboardAlertCard from "@/components/dashboard/DashboardAlertCard";
import DashboardShortcutCard from "@/components/dashboard/DashboardShortcutCard";
import DashboardCustomizeDialog, { DEFAULT_WIDGETS } from "@/components/dashboard/DashboardCustomizeDialog";

const today = new Date();
const todayStr = isoDate(today);
const weekFromStr = isoDate(weekStart(today));
const weekToStr = isoDate(weekEnd(today));

const ALL_SHORTCUTS = [
  { id: "planning",      icon: CalendarDays, iconColor: "text-violet-600", iconBg: "bg-violet-100", title: "Planning",         desc: "Gérez les affectations",       to: "/planning",          roles: MODULE_ROLES.planning },
  { id: "utilisateurs",  icon: Users,        iconColor: "text-blue-600",   iconBg: "bg-blue-100",   title: "Utilisateurs / RH", desc: "Équipes et compétences",       to: "/utilisateurs",      roles: MODULE_ROLES.utilisateurs },
  { id: "vehicules",     icon: Truck,        iconColor: "text-teal-600",   iconBg: "bg-teal-100",   title: "Véhicules",         desc: "Flotte et disponibilité",      to: "/vehicules" },
  { id: "modeles",       icon: Clock,        iconColor: "text-sky-600",    iconBg: "bg-sky-100",    title: "Modèles horaires",  desc: "Trames de planning",           to: "/modeles-horaires",  roles: MODULE_ROLES.modeles },
  { id: "societe",       icon: Building2,    iconColor: "text-indigo-600", iconBg: "bg-indigo-100", title: "Société",           desc: "Informations société",         to: "/societe",           roles: MODULE_ROLES.societe },
  { id: "depots",        icon: MapPin,       iconColor: "text-emerald-600",iconBg: "bg-emerald-100",title: "Dépôts / Bases",    desc: "Bases opérationnelles",        to: "/depots",            roles: MODULE_ROLES.depots },
  { id: "mise_en_route", icon: Rocket,       iconColor: "text-orange-600", iconBg: "bg-orange-100", title: "Mise en route",     desc: "Étapes de démarrage",          to: "/mise-en-route",     roles: MODULE_ROLES.mise_en_route },
  { id: "audit",         icon: Shield,       iconColor: "text-primary",    iconBg: "bg-blue-50",    title: "Audit",             desc: "Journal des actions",          to: "/audit",             roles: MODULE_ROLES.audit },
];

export default function Dashboard() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [customizeOpen, setCustomizeOpen] = useState(false);

  const userRole = getCurrentBusinessRole(user);

  // Filtrage des raccourcis selon le rôle
  const shortcuts = ALL_SHORTCUTS.filter(
    (s) => !s.roles || (userRole && s.roles.includes(userRole))
  );

  // ── Chargement des données ──────────────────────────────────────────────────

  const { data: allUsers = [], isLoading: loadingUsers, isError: errorUsers } = useQuery({
    queryKey: ["dashboard-users"],
    queryFn: () => base44.entities.User.list("full_name", 500),
  });

  const { data: allVehicles = [], isLoading: loadingVehicles, isError: errorVehicles } = useQuery({
    queryKey: ["dashboard-vehicles"],
    queryFn: () => base44.entities.Vehicle.list("name", 500),
  });

  const { data: weekEntries = [], isLoading: loadingWeek, isError: errorWeek } = useQuery({
    queryKey: ["dashboard-week-entries", weekFromStr, weekToStr],
    queryFn: () => base44.entities.PlanningEntry.filter(
      { shift_date: { $gte: weekFromStr, $lte: weekToStr } },
      "shift_date",
      1000
    ),
  });

  const { data: myTodayEntries = [], isLoading: loadingMyToday } = useQuery({
    queryKey: ["dashboard-my-today", user?.id, todayStr],
    queryFn: () => base44.entities.PlanningEntry.filter(
      { employee_id: user.id, shift_date: todayStr },
      "start_time",
      20
    ),
    enabled: !!user?.id,
  });

  const { data: myFutureEntries = [], isLoading: loadingMyFuture } = useQuery({
    queryKey: ["dashboard-my-future", user?.id, todayStr],
    queryFn: () => base44.entities.PlanningEntry.filter(
      { employee_id: user.id, shift_date: { $gt: todayStr } },
      "shift_date",
      10
    ),
    enabled: !!user?.id,
  });

  // ── Préférence Dashboard ────────────────────────────────────────────────────

  const { data: prefRecords = [] } = useQuery({
    queryKey: ["dashboard-pref", user?.id],
    queryFn: () => base44.entities.DashboardPreference.filter(
      { user_id: user.id },
      "-created_date",
      1
    ),
    enabled: !!user?.id,
  });

  const pref = prefRecords[0] || null;
  const visibleWidgets = pref?.visible_widgets ?? DEFAULT_WIDGETS;

  const savePrefMutation = useMutation({
    mutationFn: async (widgets) => {
      if (pref?.id) {
        return base44.entities.DashboardPreference.update(pref.id, { visible_widgets: widgets });
      }
      return base44.entities.DashboardPreference.create({ user_id: user.id, visible_widgets: widgets });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dashboard-pref", user?.id] });
      setCustomizeOpen(false);
    },
  });

  const handleReset = () => savePrefMutation.mutate(DEFAULT_WIDGETS);

  // ── Filtrage local (compatibilité anciens enregistrements) ──────────────────

  const activeUsers = useMemo(
    () => allUsers.filter((u) => u.is_archived !== true && u.status !== "Inactif"),
    [allUsers]
  );

  const activeVehicles = useMemo(
    () => allVehicles.filter((v) => v.is_archived !== true && v.admin_status !== "Inactif"),
    [allVehicles]
  );

  // ── Calculs KPI ─────────────────────────────────────────────────────────────

  const kpis = useMemo(() => {
    const presents = activeUsers.filter((u) => u.operational_status === "Présent").length;
    const absents = activeUsers.filter((u) => u.operational_status === "Absent").length;
    const disponibles = activeVehicles.filter((v) => v.availability === "Disponible").length;
    const nonAffectes = weekEntries.filter(
      (e) => !e.employee_id && e.publication_status !== "Annulé"
    ).length;
    return { presents, absents, disponibles, totalVehicles: activeVehicles.length, nonAffectes };
  }, [activeUsers, activeVehicles, weekEntries]);

  // ── Calculs alertes ─────────────────────────────────────────────────────────

  const alertsPlanning = useMemo(() => {
    const items = [];
    if (kpis.nonAffectes > 0)
      items.push(`${kpis.nonAffectes} créneau${kpis.nonAffectes > 1 ? "x" : ""} non affecté${kpis.nonAffectes > 1 ? "s" : ""} cette semaine.`);
    const aVerifier = weekEntries.filter((e) => e.coverage_status === "À vérifier").length;
    if (aVerifier > 0)
      items.push(`${aVerifier} affectation${aVerifier > 1 ? "s" : ""} à vérifier.`);
    return items;
  }, [kpis.nonAffectes, weekEntries]);

  const alertsVehicules = useMemo(() => {
    const items = [];
    const indispo = activeVehicles.filter((v) => v.availability === "Indisponible").length;
    if (indispo > 0)
      items.push(`${indispo} véhicule${indispo > 1 ? "s" : ""} indisponible${indispo > 1 ? "s" : ""}.`);
    const now = new Date();
    const in30 = new Date(now);
    in30.setDate(in30.getDate() + 30);
    const expiring = activeVehicles.filter((v) => {
      const dates = [v.insurance_expires_at, v.technical_inspection_expires_at, v.sanitary_approval_expires_at].filter(Boolean);
      return dates.some((d) => { const dt = new Date(d); return dt >= now && dt <= in30; });
    }).length;
    if (expiring > 0)
      items.push(`${expiring} véhicule${expiring > 1 ? "s" : ""} avec document(s) expirant sous 30 jours.`);
    return items;
  }, [activeVehicles]);

  // ── Widgets personnels ───────────────────────────────────────────────────────

  const activeMyToday = myTodayEntries.filter((e) => e.publication_status !== "Annulé");
  const firstToday = activeMyToday[0] || null;

  const nextShifts = myFutureEntries
    .filter((e) => e.publication_status !== "Annulé")
    .slice(0, 3);

  const equipesJour = useMemo(
    () => weekEntries.filter((e) => e.shift_date === todayStr && e.publication_status !== "Annulé").length,
    [weekEntries]
  );

  const totalSemaine = useMemo(
    () => weekEntries.filter((e) => e.publication_status !== "Annulé").length,
    [weekEntries]
  );

  const isWidgetVisible = (id) => visibleWidgets.includes(id);

  const isLoading = loadingUsers || loadingVehicles || loadingWeek;
  const hasError = errorUsers || errorVehicles || errorWeek;
  const isPersonalLoading = loadingMyToday || loadingMyFuture;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* En-tête */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Vue d'accueil opérationnelle selon vos droits et vos préférences.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs gap-1.5"
            onClick={() => setCustomizeOpen(true)}
          >
            <SlidersHorizontal size={13} /> Personnaliser
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs gap-1.5"
            onClick={handleReset}
            disabled={savePrefMutation.isPending}
          >
            {savePrefMutation.isPending
              ? <Loader2 size={13} className="animate-spin" />
              : <RotateCcw size={13} />
            }
            Réinitialiser
          </Button>
        </div>
      </div>

      {/* Erreur sobre */}
      {hasError && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          Certaines données n'ont pas pu être chargées. Veuillez rafraîchir la page.
        </div>
      )}

      {/* KPI dynamiques */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[0,1,2,3].map((i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 h-24 animate-pulse bg-muted/40" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardKpiCard
            icon={Users}
            iconBg="bg-blue-100"
            iconColor="text-primary"
            label="Utilisateurs présents"
            value={kpis.presents}
            sub="statut Présent aujourd'hui"
            to="/utilisateurs"
          />
          <DashboardKpiCard
            icon={UserX}
            iconBg="bg-red-100"
            iconColor="text-red-600"
            label="Utilisateurs absents"
            value={kpis.absents}
            sub="statut Absent aujourd'hui"
            to="/utilisateurs"
          />
          <DashboardKpiCard
            icon={Truck}
            iconBg="bg-teal-100"
            iconColor="text-teal-600"
            label="Véhicules disponibles"
            value={`${kpis.disponibles} / ${kpis.totalVehicles}`}
            sub="actifs et disponibles"
            to="/vehicules"
          />
          <DashboardKpiCard
            icon={CalendarClock}
            iconBg="bg-amber-100"
            iconColor="text-amber-600"
            label="Créneaux non affectés"
            value={kpis.nonAffectes}
            sub="cette semaine"
            to="/planning"
          />
        </div>
      )}

      {/* Planning et activités */}
      {visibleWidgets.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">Planning et activités</h2>
          {isPersonalLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {visibleWidgets.map((id) => (
                <div key={id} className="bg-card border border-border rounded-xl p-4 h-24 animate-pulse bg-muted/40" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">

              {isWidgetVisible("ma_journee") && (
                <DashboardWidgetCard icon={Sun} iconColor="text-amber-500" title="Ma journée" actionLabel="Voir mon planning" to="/planning">
                  {firstToday ? (
                    <>
                      <div className="font-semibold text-sm">{firstToday.type_badge || "—"}</div>
                      <div className="text-muted-foreground text-xs mt-0.5">
                        {firstToday.start_time && firstToday.end_time
                          ? `${firstToday.start_time} – ${firstToday.end_time}`
                          : "Horaire non défini"}
                        {firstToday.depot_name ? ` · ${firstToday.depot_name}` : ""}
                      </div>
                    </>
                  ) : (
                    <div className="text-xs text-muted-foreground">Aucun service planifié aujourd'hui.</div>
                  )}
                </DashboardWidgetCard>
              )}

              {isWidgetVisible("heure_debut") && (
                <DashboardWidgetCard icon={Clock} iconColor="text-sky-500" title="Mon heure de début">
                  {firstToday?.start_time ? (
                    <>
                      <div className="text-2xl font-bold">{firstToday.start_time}</div>
                      <div className="text-muted-foreground text-xs mt-0.5">Aujourd'hui</div>
                    </>
                  ) : (
                    <div className="text-xs text-muted-foreground">Non planifié aujourd'hui.</div>
                  )}
                </DashboardWidgetCard>
              )}

              {isWidgetVisible("prochains_creneaux") && (
                <DashboardWidgetCard icon={ListChecks} iconColor="text-violet-500" title="Mes prochains créneaux" actionLabel="Voir tous" to="/planning">
                  {nextShifts.length > 0 ? (
                    <ul className="space-y-1.5 text-xs">
                      {nextShifts.map((e) => (
                        <li key={e.id} className="flex justify-between gap-2">
                          <span className="truncate">{e.shift_date}</span>
                          <span className="text-muted-foreground flex-shrink-0">
                            {e.start_time && e.end_time ? `${e.start_time}–${e.end_time}` : e.type_badge || "—"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-xs text-muted-foreground">Aucun prochain créneau planifié.</div>
                  )}
                </DashboardWidgetCard>
              )}

              {isWidgetVisible("planning_global") && (
                <DashboardWidgetCard icon={CalendarDays} iconColor="text-primary" title="Planning global" actionLabel="Accéder au planning" to="/planning">
                  <div className="text-muted-foreground text-xs">Vue d'ensemble des affectations de la semaine.</div>
                </DashboardWidgetCard>
              )}

              {isWidgetVisible("equipes_jour") && (
                <DashboardWidgetCard icon={UsersRound} iconColor="text-emerald-500" title="Équipes du jour" actionLabel="Voir les équipes" to="/planning">
                  {equipesJour > 0 ? (
                    <>
                      <div className="text-2xl font-bold">{equipesJour}</div>
                      <div className="text-muted-foreground text-xs mt-0.5">
                        affectation{equipesJour > 1 ? "s" : ""} active{equipesJour > 1 ? "s" : ""} aujourd'hui
                      </div>
                    </>
                  ) : (
                    <div className="text-xs text-muted-foreground">Aucune affectation active aujourd'hui.</div>
                  )}
                </DashboardWidgetCard>
              )}

              {isWidgetVisible("creneaux_semaine") && (
                <DashboardWidgetCard icon={CalendarRange} iconColor="text-orange-500" title="Créneaux de la semaine" actionLabel="Voir le détail" to="/planning">
                  {totalSemaine > 0 ? (
                    <>
                      <div className="text-2xl font-bold">{totalSemaine}</div>
                      <div className="text-muted-foreground text-xs mt-0.5">
                        dont {kpis.nonAffectes} non affecté{kpis.nonAffectes !== 1 ? "s" : ""}
                      </div>
                    </>
                  ) : (
                    <div className="text-xs text-muted-foreground">Aucune affectation cette semaine.</div>
                  )}
                </DashboardWidgetCard>
              )}
            </div>
          )}
        </div>
      )}

      {/* Alertes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DashboardAlertCard
          icon={AlertTriangle}
          iconColor="text-amber-500"
          title="Alertes planning"
          items={loadingWeek ? [] : alertsPlanning}
          emptyLabel={loadingWeek ? "Chargement…" : "Aucune alerte planning cette semaine."}
        />
        <DashboardAlertCard
          icon={Wrench}
          iconColor="text-red-500"
          title="Alertes véhicules"
          items={loadingVehicles ? [] : alertsVehicules}
          emptyLabel={loadingVehicles ? "Chargement…" : "Aucune alerte véhicule."}
        />
      </div>

      {/* Raccourcis filtrés selon le rôle */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-3">Raccourcis</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8 gap-3">
          {shortcuts.map((s) => <DashboardShortcutCard key={s.id} {...s} />)}
        </div>
      </div>

      {/* Dialog personnalisation */}
      <DashboardCustomizeDialog
        open={customizeOpen}
        onOpenChange={setCustomizeOpen}
        visibleWidgets={visibleWidgets}
        onSave={(widgets) => savePrefMutation.mutate(widgets)}
        saving={savePrefMutation.isPending}
      />
    </div>
  );
}