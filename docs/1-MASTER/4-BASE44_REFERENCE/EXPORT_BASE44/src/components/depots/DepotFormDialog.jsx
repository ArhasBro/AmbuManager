import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EMPTY = {
  name: "", code: "", address: "", postal_code: "", city: "",
  local_manager: "", status: "Actif",
};

export default function DepotFormDialog({ open, onOpenChange, depot, existingDepots = [], onSave, saving }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) { setForm(depot ? { ...EMPTY, ...depot } : EMPTY); setError(""); }
  }, [open, depot]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) { setError("Le nom du dépôt est obligatoire."); return; }
    // Nom unique dans la société (insensible à la casse, hors dépôt en cours d'édition)
    const dup = existingDepots.some(
      (d) => d.id !== depot?.id && (d.name || "").trim().toLowerCase() === name.toLowerCase()
    );
    if (dup) { setError("Un dépôt portant ce nom existe déjà."); return; }
    setError("");
    onSave({ ...form, name });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{depot ? "Modifier le dépôt" : "Ajouter un dépôt"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5 col-span-2">
              <Label>Nom *</Label>
              <Input value={form.name} onChange={(e) => set("name", e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label>Code</Label>
              <Input value={form.code} onChange={(e) => set("code", e.target.value)} placeholder="Ex: BA-001" />
            </div>
            <div className="space-y-1.5">
              <Label>Statut</Label>
              <Select value={form.status} onValueChange={(v) => set("status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{["Actif", "Inactif"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>Adresse <span className="text-muted-foreground font-normal">(recommandée)</span></Label>
              <Input value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Recommandée mais non obligatoire" />
            </div>
            <div className="space-y-1.5">
              <Label>Code postal</Label>
              <Input value={form.postal_code} onChange={(e) => set("postal_code", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Ville</Label>
              <Input value={form.city} onChange={(e) => set("city", e.target.value)} />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>Responsable local <span className="text-muted-foreground font-normal">(optionnel)</span></Label>
              <Input value={form.local_manager} onChange={(e) => set("local_manager", e.target.value)} />
            </div>
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