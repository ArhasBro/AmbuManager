import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle } from "lucide-react";

const today = () => new Date().toISOString().slice(0, 10);
const EMPTY = { vehicle_id: "", disinfection_date: today(), product_type: "", performed_by: "", result: "Réalisée", counter_checked: false, counter_checked_by: "", notes: "" };

const REQUIRES_REASON = ["Réalisée avec réserve", "Non réalisée", "À refaire"];

export default function DisinfectionFormDialog({ open, onOpenChange, record, vehicles, onSave, saving, onDeclareAnomaly }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) { setForm(record ? { ...EMPTY, ...record } : EMPTY); setError(""); }
  }, [open, record]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const needsReason = REQUIRES_REASON.includes(form.result);

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = vehicles.find((x) => x.id === form.vehicle_id);
    // Motif obligatoire pour réserve / non réalisée / à refaire
    if (needsReason && !form.notes?.trim()) {
      setError("Un motif / point à surveiller est obligatoire pour ce résultat.");
      return;
    }
    // Contre-vérification : validation du tiers différent.
    // LIMITE TECHNIQUE : Le système valide uniquement que le nom saisi en "Contre-vérifiée par" est différent
    // (insensible à la casse) du nom en "Réalisée par". Aucune vérification d'habilitation d'un utilisateur métier
    // n'est effectuée — cette responsabilité reste entièrement auprès de l'opérateur terrain et de l'audit régulementaire ARS.
    if (form.counter_checked) {
      if (!form.counter_checked_by?.trim()) { setError("Le contre-vérificateur est obligatoire."); return; }
      if (form.performed_by?.trim() && form.counter_checked_by.trim().toLowerCase() === form.performed_by.trim().toLowerCase()) {
        setError("Le contre-vérificateur doit être différent de la personne ayant réalisé la désinfection.");
        return;
      }
    }
    setError("");
    onSave({
      ...form,
      vehicle_name: v?.name || form.vehicle_name,
      vehicle_type: v?.type || form.vehicle_type,
      depot_name: v?.depot_name || form.depot_name,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>{record ? "Modifier la désinfection" : "Enregistrer une désinfection"}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5 col-span-2">
              <Label>Véhicule *</Label>
              <Select value={form.vehicle_id} onValueChange={(v) => set("vehicle_id", v)} required>
                <SelectTrigger><SelectValue placeholder="Sélectionner un véhicule" /></SelectTrigger>
                <SelectContent>{vehicles.map((v) => <SelectItem key={v.id} value={v.id}>{v.name} · {v.immatriculation}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Date *</Label>
              <Input type="date" value={form.disinfection_date} onChange={(e) => set("disinfection_date", e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label>Résultat *</Label>
              <Select value={form.result} onValueChange={(v) => set("result", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{["Réalisée", "Réalisée avec réserve", "Non réalisée", "À refaire"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Produit utilisé</Label>
              <Input value={form.product_type} onChange={(e) => set("product_type", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Réalisée par</Label>
              <Input value={form.performed_by} onChange={(e) => set("performed_by", e.target.value)} />
            </div>
            <div className="flex items-center gap-2 col-span-2 pt-1">
              <Checkbox id="cc" checked={form.counter_checked} onCheckedChange={(v) => set("counter_checked", !!v)} />
              <Label htmlFor="cc" className="cursor-pointer">Contre-vérifiée par un tiers</Label>
            </div>
            {form.counter_checked && (
              <div className="space-y-1.5 col-span-2">
                <Label>Contre-vérifiée par</Label>
                <Input value={form.counter_checked_by} onChange={(e) => set("counter_checked_by", e.target.value)} />
              </div>
            )}
            <div className="space-y-1.5 col-span-2">
              <Label>{needsReason ? "Motif / point à surveiller *" : "Notes"}</Label>
              <Input value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder={needsReason ? "Obligatoire pour ce résultat" : ""} />
            </div>
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          {["Réalisée avec réserve", "Non réalisée", "À refaire"].includes(form.result) && onDeclareAnomaly && (
            <div className="rounded-md bg-amber-50 border border-amber-200 px-3 py-2 flex items-center justify-between gap-3">
              <span className="text-xs text-amber-700">Résultat problématique détecté.</span>
              <Button type="button" size="sm" variant="outline" className="h-7 gap-1.5 text-xs border-amber-300 text-amber-700 hover:bg-amber-100"
                onClick={() => { onOpenChange(false); onDeclareAnomaly(form.vehicle_id); }}>
                <AlertTriangle size={12} />Déclarer une anomalie
              </Button>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
            <Button type="submit" disabled={saving}>{saving ? "Enregistrement..." : "Enregistrer"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}