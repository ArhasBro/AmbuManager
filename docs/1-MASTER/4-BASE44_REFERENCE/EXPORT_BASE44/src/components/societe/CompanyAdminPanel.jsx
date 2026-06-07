import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/StatusBadge";

// Responsables applicatifs : lecture seule, dérivés des utilisateurs Admin / Gérant
export default function CompanyAdminPanel() {
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: () => base44.entities.User.list("-created_date", 500),
  });
  const { data: steps = [], isLoading: loadingSteps } = useQuery({
    queryKey: ["onboarding-steps"],
    queryFn: () => base44.entities.OnboardingStep.list("step_number", 100),
  });

  const managers = users.filter((u) => u.business_role === "ADMIN" || u.business_role === "GERANT");

  const total = steps.length;
  const done = steps.filter((s) => s.status === "Terminé").length;
  const allDone = total > 0 && done === total;

  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Responsables applicatifs</h3>
        </div>
        <p className="text-xs text-muted-foreground">Liste lecture seule, dérivée des utilisateurs avec rôle Administrateur ou Gérant. Gérée depuis la page Utilisateurs.</p>

        {loadingUsers ? (
          <div className="flex items-center justify-center py-6 text-muted-foreground"><Loader2 className="animate-spin mr-2" size={16} />Chargement...</div>
        ) : managers.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucun responsable applicatif (Admin / Gérant) trouvé.</p>
        ) : (
          <div className="space-y-2">
            {managers.map((u) => (
              <div key={u.id} className="flex items-center justify-between border border-border rounded-lg p-3">
                <div>
                  <div className="text-sm font-medium text-foreground">{u.full_name || u.email}</div>
                  <div className="text-xs text-muted-foreground">{u.email}</div>
                </div>
                <StatusBadge status={u.business_role === "ADMIN" ? "Administrateur" : "Gérant"} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Mise en route</h3>
        {loadingSteps ? (
          <div className="flex items-center justify-center py-6 text-muted-foreground"><Loader2 className="animate-spin mr-2" size={16} />Chargement...</div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              {allDone ? <CheckCircle2 size={18} className="text-green-600" /> : null}
              <div className="text-sm text-foreground">
                {total === 0 ? "Aucune étape définie" : `${done} / ${total} étapes terminées`}
              </div>
            </div>
            {total > 0 && (
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${Math.round((done / total) * 100)}%` }} />
              </div>
            )}
          </>
        )}
        <Link to="/mise-en-route">
          <Button variant="outline" className="gap-1.5 w-full sm:w-auto">
            Continuer la mise en route <ArrowRight size={14} />
          </Button>
        </Link>
      </div>
    </div>
  );
}