import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BUSINESS_ROLES, BUSINESS_ROLE_SHORT, normalizeRoles } from "@/lib/userPermissions";
const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const VEHICLE_TYPES = ["AMBULANCE", "VSL", "TAXI", "TPMR", "Aucun"];

const EMPTY = {
  name: "",
  short_label: "",
  allowed_roles: [],
  vehicle_type: "AMBULANCE",
  active_days: [],
  start_time: "",
  end_time: "",
  crosses_midnight: false,
  status: "Actif",
};

export default function TemplateFormDialog({ open, onOpenChange, template, onSave, saving }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(template ? { ...EMPTY, ...template, allowed_roles: normalizeRoles(template.allowed_roles || []), active_days: template.active_days || [] } : EMPTY);
      setError("");
    }
  }, [open, template]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleIn = (k, val) => setForm((f) => ({ ...f, [k]: (f[k] || []).includes(val) ? f[k].filter((x) => x !== val) : [...(f[k] || []), val] }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setError("Le nom du modèle est obligatoire."); return; }
    if (form.allowed_roles.length === 0) { setError("Sélectionnez au moins un rôle autorisé."); return; }
    if (form.active_days.length === 0) { setError("Sélectionnez au moins un jour actif."); return; }
    if (form.start_time && form.end_time && !form.crosses_midnight && form.end_time <= form.start_time) {
      setError("L'heure de fin doit être après l'heure de début (sauf passage minuit)."); return;
    }
    if ((form.start_time && !form.end_time) || (!form.start_time && form.end_time)) {
      setError("Les deux horaires doivent être renseignés ou tous deux vides."); return;
    }
    setError("");
    onSave({ ...form, short_label: form.short_label?.trim() || form.name.trim().slice(0, 6).toUpperCase() });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{template ? "Modifier le modèle horaire" : "Nouveau modèle horaire"}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Nom du modèle *</Label>
              <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex : Journée standard AMB" />
            </div>
            <div className="space-y-1.5">
              <Label>Libellé court (planning)</Label>
              <Input value={form.short_label} onChange={(e) => set("short_label", e.target.value)} placeholder="Ex : JOUR-A" maxLength={12} />
            </div>
            <div className="space-y-1.5">
              <Label>Type de véhicule attendu</Label>
              <Select value={form.vehicle_type} onValueChange={(v) => set("vehicle_type", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{VEHICLE_TYPES.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Statut</Label>
              <Select value={form.status} onValueChange={(v) => set("status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{["Actif", "Inactif"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Rôles autorisés *</Label>
            <div className="flex flex-wrap gap-2">
              {BUSINESS_ROLES.map((r) => (
                <button key={r} type="button" onClick={() => toggleIn("allowed_roles", r)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${form.allowed_roles.includes(r) ? "bg-primary text-primary-foreground border-primary" : "bg-transparent border-border text-muted-foreground hover:bg-muted"}`}>
                  {BUSINESS_ROLE_SHORT[r]}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Jours actifs *</Label>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((d) => (
                <button key={d} type="button" onClick={() => toggleIn("active_days", d)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${form.active_days.includes(d) ? "bg-primary text-primary-foreground border-primary" : "bg-transparent border-border text-muted-foreground hover:bg-muted"}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Heure de début (optionnel)</Label>
              <Input type="time" value={form.start_time} onChange={(e) => set("start_time", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Heure de fin (optionnel)</Label>
              <Input type="time" value={form.end_time} onChange={(e) => set("end_time", e.target.value)} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="midnight" checked={form.crosses_midnight} onCheckedChange={(v) => set("crosses_midnight", !!v)} />
            <Label htmlFor="midnight" className="cursor-pointer">L'horaire passe minuit (fin le lendemain)</Label>
          </div>

          {error && <p className="text-xs text-destructive">{error}</p>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
            <Button type="submit" disabled={saving}>{saving ? "Enregistrement..." : "Enregistrer"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}