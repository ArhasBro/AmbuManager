import React from "react";
import { Truck, CalendarDays, Activity, Users, ShieldCheck } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";

const BENEFITS = [
  { icon: CalendarDays, title: "Planning intelligent", desc: "Organisez vos équipes et vos interventions" },
  { icon: Activity, title: "Flotte optimisée", desc: "Suivez vos véhicules et équipements" },
  { icon: Users, title: "Équipes connectées", desc: "Gérez vos utilisateurs et compétences" },
  { icon: ShieldCheck, title: "Conformité & sécurité", desc: "Données sécurisées et tracées" },
];

export default function Login() {
  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Zone visuelle gauche */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 text-white overflow-hidden bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1400&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-blue-950/80" />

        {/* Identité produit */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
              <Truck size={22} className="text-cyan-300" />
            </div>
            <div className="leading-tight">
              <div className="text-lg font-bold">Ambulance</div>
              <div className="text-lg font-bold text-cyan-300 -mt-1">Manager</div>
            </div>
          </div>
          <span className="inline-block text-[10px] font-semibold tracking-wider bg-cyan-400/20 text-cyan-200 px-2 py-0.5 rounded">
            ALPHA
          </span>
        </div>

        {/* Promesse + bénéfices */}
        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl font-bold leading-snug mb-8">
            Simplifiez la gestion opérationnelle de votre société de transport sanitaire.
          </h2>
          <div className="space-y-5">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-cyan-300" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{title}</div>
                  <div className="text-sm text-slate-300">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carte de réassurance */}
        <div className="relative z-10 bg-white/10 backdrop-blur rounded-xl p-4 max-w-md border border-white/10">
          <div className="flex items-center gap-2 font-semibold text-sm mb-1">
            <ShieldCheck size={16} className="text-cyan-300" />
            Accès réservé aux utilisateurs autorisés
          </div>
          <p className="text-xs text-slate-300">
            Vos données sont hébergées en France et protégées conformément au RGPD.
          </p>
        </div>
      </div>

      {/* Zone formulaire droite */}
      <div className="flex-1 flex items-center justify-center p-6">
        <LoginForm />
      </div>
    </div>
  );
}