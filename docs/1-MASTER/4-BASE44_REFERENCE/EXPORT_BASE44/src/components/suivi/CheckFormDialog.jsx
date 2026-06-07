import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";

const today = () => new Date().toISOString().slice(0, 10);
const EMPTY = { vehicle_id: "", check_date: today(), checker_1: "", checker_2: "", result: "À vérifier", anomaly_linked: "", notes: "" };

export default function CheckFormDialog({ open, onOpenChange, check, vehicles, onSave, saving, onDeclareAnomaly }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) { setForm(check ? { ...EMPTY, ...check } : EMPTY); setError(""); }
  }, [open, check]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const selectedVehicle = vehicles.find((x) => x.id === form.vehicle_id);
  const isAmbulance = selectedVehicle?.type === "AMBULANCE";

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = vehicles.find((x) => x.id === form.vehicle_id);
    // Règle : AMBULANCE = 2 vérificateurs ; autres = 1
    if (!form.checker_1?.trim()) { setError("Le vérificateur 1 est obligatoire."); return; }
    if (v?.type === "AMBULANCE" && !form.checker_2?.trim()) {
      setError("Une vérification d'ambulance nécessite 2 vérificateurs.");
      return;
    }
    setError("");
    onSave({
      ...form,
      vehicle_name: v?.name || form.vehicle_name,
      vehicle_type: v?.type || form.vehicle_type,
      immatriculation: v?.immatriculation || form.immatriculation,
      depot_name: v?.depot_name || form.depot_name,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>{check ? "Modifier la vérification" : "Nouvelle vérification"}</DialogTitle></DialogHeader>
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
              <Input type="date" value={form.check_date} onChange={(e) => set("check_date", e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label>Résultat</Label>
              <Select value={form.result} onValueChange={(v) => set("result", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{["Conforme", "Non conforme", "Sous réserve", "À vérifier"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Vérificateur 1 *</Label>
              <Input value={form.checker_1} onChange={(e) => set("checker_1", e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label>Vérificateur 2{isAmbulance ? " *" : ""}</Label>
              <Input value={form.checker_2} onChange={(e) => set("checker_2", e.target.value)} placeholder={isAmbulance ? "Obligatoire (ambulance)" : "Facultatif"} />
              {isAmbulance && <p className="text-[11px] text-muted-foreground">Ambulance : 2 vérificateurs requis.</p>}
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>Anomalie liée (réf.)</Label>
              <Input value={form.anomaly_linked} onChange={(e) => set("anomaly_linked", e.target.value)} placeholder="Ex: ANG-002-EF" />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>Notes</Label>
              <Input value={form.notes} onChange={(e) => set("notes", e.target.value)} />
            </div>
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          {["Non conforme", "Sous réserve"].includes(form.result) && onDeclareAnomaly && (
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