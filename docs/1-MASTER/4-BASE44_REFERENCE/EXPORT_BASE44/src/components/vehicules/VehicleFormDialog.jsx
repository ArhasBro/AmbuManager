import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const EMPTY = {
  name: "", immatriculation: "", type: "AMBULANCE",
  admin_status: "Actif", availability: "Disponible", availability_reason: "",
  depot_id: "", depot_name: "", seats: "", mileage: "",
  insurance_expires_at: "", technical_inspection_expires_at: "",
  sanitary_approval_expires_at: "", registration_document_present: false, notes: "",
};

export default function VehicleFormDialog({ open, onOpenChange, vehicle, depots = [], onSave, saving, canEditAvailability = true }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (open) setForm(vehicle ? { ...EMPTY, ...vehicle } : EMPTY);
  }, [open, vehicle]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const setDepot = (depotId) => {
    if (depotId === "none") { setForm((f) => ({ ...f, depot_id: "", depot_name: "" })); return; }
    const d = depots.find((x) => x.id === depotId);
    setForm((f) => ({ ...f, depot_id: depotId, depot_name: d ? d.name : "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      immatriculation: (form.immatriculation || "").toUpperCase().trim(),
      seats: form.seats ? Number(form.seats) : undefined,
      mileage: form.mileage ? Number(form.mileage) : undefined,
    };
    if (payload.availability === "Disponible") payload.availability_reason = "";
    // Protéger availability si pas la permission
    if (!canEditAvailability && vehicle) {
      payload.availability = vehicle.availability;
      payload.availability_reason = vehicle.availability_reason;
    }
    onSave(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{vehicle ? "Modifier le véhicule" : "Ajouter un véhicule"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Nom / Modèle *</Label>
              <Input value={form.name} onChange={(e) => set("name", e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label>Immatriculation *</Label>
              <Input value={form.immatriculation} onChange={(e) => set("immatriculation", e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label>Type *</Label>
              <Select value={form.type} onValueChange={(v) => set("type", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{["AMBULANCE", "VSL", "TAXI", "TPMR"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Dépôt / base principale</Label>
              <Select value={form.depot_id || "none"} onValueChange={setDepot}>
                <SelectTrigger><SelectValue placeholder="Aucun" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Aucun</SelectItem>
                  {depots.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Statut administratif</Label>
              <Select value={form.admin_status} onValueChange={(v) => set("admin_status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{["Actif", "Inactif"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Disponibilité</Label>
              <Select value={form.availability} onValueChange={(v) => set("availability", v)} disabled={!canEditAvailability}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{["Disponible", "Indisponible"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>

          {form.availability === "Indisponible" && (
            <div className="space-y-1.5">
              <Label>Motif d'indisponibilité *</Label>
              <Input value={form.availability_reason} onChange={(e) => set("availability_reason", e.target.value)} required={canEditAvailability} disabled={!canEditAvailability} placeholder="Ex: maintenance, panne..." />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Places</Label>
              <Input type="number" value={form.seats} onChange={(e) => set("seats", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Kilométrage</Label>
              <Input type="number" value={form.mileage} onChange={(e) => set("mileage", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Assurance (expire le)</Label>
              <Input type="date" value={form.insurance_expires_at} onChange={(e) => set("insurance_expires_at", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Contrôle technique (expire le)</Label>
              <Input type="date" value={form.technical_inspection_expires_at} onChange={(e) => set("technical_inspection_expires_at", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Agrément sanitaire (expire le)</Label>
              <Input type="date" value={form.sanitary_approval_expires_at} onChange={(e) => set("sanitary_approval_expires_at", e.target.value)} />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox checked={form.registration_document_present} onCheckedChange={(v) => set("registration_document_present", !!v)} />
            Carte grise présente
          </label>

          {form.admin_status === "Inactif" && (
            <p className="text-xs text-amber-600">Véhicule inactif : non proposé au planning.</p>
          )}

          <div className="space-y-1.5">
            <Label>Notes</Label>
            <Textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={2} />
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