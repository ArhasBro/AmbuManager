import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EMPTY = { vehicle_id: "", anomaly_ref: "", source: "Déclaration manuelle", declared_at: "", declared_by: "", criticality: "Non bloquante", status: "Ouverte", description: "" };

export default function AnomalyFormDialog({ open, onOpenChange, anomaly, vehicles, onSave, saving }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (open) setForm(anomaly ? { ...EMPTY, ...anomaly } : EMPTY);
  }, [open, anomaly]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = vehicles.find((x) => x.id === form.vehicle_id);
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
        <DialogHeader><DialogTitle>{anomaly ? "Modifier l'anomalie" : "Déclarer une anomalie"}</DialogTitle></DialogHeader>
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
              <Label>Référence</Label>
              <Input value={form.anomaly_ref} onChange={(e) => set("anomaly_ref", e.target.value)} placeholder="Ex: ANG-001-AB" />
            </div>
            <div className="space-y-1.5">
              <Label>Source</Label>
              <Select value={form.source} onValueChange={(v) => set("source", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{["Déclaration manuelle", "Vérification", "Désinfection", "Autre"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Criticité *</Label>
              <Select value={form.criticality} onValueChange={(v) => set("criticality", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{["Bloquante", "Majeure", "Non bloquante"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Statut</Label>
              <Select value={form.status} onValueChange={(v) => set("status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{["Ouverte", "En cours de traitement", "Résolue", "Annulée/Classée sans suite"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Constaté le</Label>
              <Input value={form.declared_at} onChange={(e) => set("declared_at", e.target.value)} placeholder="16 mai 2025 08:45" />
            </div>
            <div className="space-y-1.5">
              <Label>Déclaré par</Label>
              <Input value={form.declared_by} onChange={(e) => set("declared_by", e.target.value)} />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>Description</Label>
              <Input value={form.description} onChange={(e) => set("description", e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
            <Button type="submit" disabled={saving}>{saving ? "Enregistrement..." : "Enregistrer"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}