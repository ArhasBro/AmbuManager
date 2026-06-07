import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Circle, ChevronRight, Rocket, Users, Truck, MapPin, Building2, CalendarDays, Clock, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/StatusBadge";

export default function MiseEnRoute() {
  const { data: companies = [], isLoading: l1 } = useQuery({ queryKey: ["company"], queryFn: () => base44.entities.Company.list("created_date", 1) });
  const { data: depots = [], isLoading: l2 } = useQuery({ queryKey: ["depots"], queryFn: () => base44.entities.Depot.list("name", 500) });
  const { data: users = [], isLoading: l3 } = useQuery({ queryKey: ["users"], queryFn: () => base44.entities.User.list("-created_date", 500) });
  const { data: vehicles = [], isLoading: l4 } = useQuery({ queryKey: ["vehicles"], queryFn: () => base44.entities.Vehicle.list("-created_date", 500) });
  const { data: templates = [], isLoading: l5 } = useQuery({ queryKey: ["shift-templates"], queryFn: () => base44.entities.ShiftTemplate.list("name", 500) });
  const { data: planning = [], isLoading: l6 } = useQuery({ queryKey: ["planning-entries"], queryFn: () => base44.entities.PlanningEntry.list("-created_date", 1) });

  const isLoading = l1 || l2 || l3 || l4 || l5 || l6;

  const company = companies[0] || null;
  const activeDepots = depots.filter((d) => !d.is_archived);
  const activeVehicles = vehicles.filter((v) => !v.is_archived);
  const activeTemplates = templates.filter((t) => !t.is_archived);

  const companyComplete = !!(company && company.name && company.address);

  const STEPS = [
    {
      num: 1, icon: Building2, color: "bg-blue-100", iconColor: "text-blue-600",
      title: "Configuration de la société",
      desc: "Renseignez les informations générales, l'adresse et les contacts de la société.",
      done: companyComplete,
      detail: companyComplete ? "Profil société renseigné" : "Profil société incomplet (nom + adresse requis)",
      to: "/societe", cta: "Configurer la société",
    },
    {
      num: 2, icon: MapPin, color: "bg-green-100", iconColor: "text-green-600",
      title: "Création des dépôts / bases",
      desc: "Ajoutez vos dépôts opérationnels.",
      done: activeDepots.length > 0,
      detail: `${activeDepots.length} dépôt(s) actif(s)`,
      to: "/depots", cta: "Gérer les dépôts",
    },
    {
      num: 3, icon: Users, color: "bg-violet-100", iconColor: "text-violet-600",
      title: "Ajout des utilisateurs",
      desc: "Créez les comptes utilisateurs et assignez les rôles.",
      done: users.length > 1,
      detail: `${users.length} utilisateur(s)`,
      to: "/utilisateurs", cta: "Gérer les utilisateurs",
    },
    {
      num: 4, icon: Truck, color: "bg-sky-100", iconColor: "text-sky-600",
      title: "Saisie de la flotte véhicules",
      desc: "Saisissez vos véhicules et associez-les aux dépôts.",
      done: activeVehicles.length > 0,
      detail: `${activeVehicles.length} véhicule(s) actif(s)`,
      to: "/vehicules", cta: "Gérer les véhicules",
    },
    {
      num: 5, icon: Clock, color: "bg-amber-100", iconColor: "text-amber-600",
      title: "Création des modèles horaires",
      desc: "Définissez vos journées types pour guider le planning.",
      done: activeTemplates.length > 0,
      detail: `${activeTemplates.length} modèle(s) actif(s)`,
      to: "/modeles-horaires", cta: "Gérer les modèles",
    },
    {
      num: 6, icon: CalendarDays, color: "bg-pink-100", iconColor: "text-rose-500",
      title: "Premier planning",
      desc: "Générez votre premier planning et publiez-le pour vos équipes.",
      done: planning.length > 0,
      detail: planning.length > 0 ? "Planning démarré" : "Aucune affectation pour l'instant",
      to: "/planning", cta: "Ouvrir le planning",
    },
  ];

  const done = STEPS.filter((s) => s.done).length;
  const pct = Math.round((done / STEPS.length) * 100);

  if (isLoading) {
    return <div className="flex items-center justify-center py-24 text-muted-foreground"><Loader2 className="animate-spin mr-2" size={18} />Chargement...</div>;
  }

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mise en route</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Suivez les étapes clés pour activer votre environnement Ambulance Manager.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Rocket size={15} />{done === STEPS.length ? "Configuration terminée" : "Configuration en cours"}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm font-semibold text-foreground">Progression globale</div>
            <div className="text-xs text-muted-foreground">{done} étape{done > 1 ? "s" : ""} terminée{done > 1 ? "s" : ""} sur {STEPS.length}</div>
          </div>
          <div className="text-3xl font-bold text-primary">{pct}%</div>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="space-y-3">
        {STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.num} className={`bg-card border rounded-xl p-5 transition-all ${!step.done ? "border-primary/40" : "border-border"}`}>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="text-xs font-bold text-muted-foreground">#{step.num}</div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${step.color}`}>
                    <Icon size={20} className={step.iconColor} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    {step.done ? <CheckCircle2 size={18} className="text-green-600" /> : <Circle size={18} className="text-muted-foreground" />}
                    <span className="text-sm font-semibold text-foreground">{step.title}</span>
                    <StatusBadge status={step.done ? "Terminé" : "À faire"} />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{step.desc}</p>
                  <p className="text-xs font-medium text-foreground">{step.detail}</p>
                </div>

                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <Link to={step.to}>
                    <Button size="sm" variant={step.done ? "outline" : "default"} className="gap-1 text-xs">
                      {step.cta} <ChevronRight size={12} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}