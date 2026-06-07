import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const ALL_WIDGETS = [
  { id: "ma_journee", label: "Ma journée" },
  { id: "heure_debut", label: "Mon heure de début" },
  { id: "prochains_creneaux", label: "Mes prochains créneaux" },
  { id: "planning_global", label: "Planning global" },
  { id: "equipes_jour", label: "Équipes du jour" },
  { id: "creneaux_semaine", label: "Créneaux de la semaine" },
];

export const DEFAULT_WIDGETS = ALL_WIDGETS.map((w) => w.id);

export default function DashboardCustomizeDialog({ open, onOpenChange, visibleWidgets, onSave, saving }) {
  const [selected, setSelected] = useState(visibleWidgets);

  // Resynchroniser quand le dialogue s'ouvre ou quand les préférences changent
  useEffect(() => {
    if (open) setSelected(visibleWidgets);
  }, [open, visibleWidgets]);

  const toggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!saving) onOpenChange(v); }}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Personnaliser le tableau de bord</DialogTitle>
        </DialogHeader>
        <p className="text-xs text-muted-foreground">
          Choisissez les widgets à afficher dans la section "Planning et activités".
        </p>
        <div className="space-y-3 py-1">
          {ALL_WIDGETS.map((w) => (
            <label key={w.id} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={selected.includes(w.id)}
                onCheckedChange={() => toggle(w.id)}
              />
              <span className="text-sm">{w.label}</span>
            </label>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            Annuler
          </Button>
          <Button onClick={() => onSave(selected)} disabled={saving}>
            {saving ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}