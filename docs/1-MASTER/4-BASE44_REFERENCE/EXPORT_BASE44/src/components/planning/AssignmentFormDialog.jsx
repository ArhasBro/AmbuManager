import React, { useState, useEffect } from "react";
import { Loader2, Ban, RotateCcw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TYPE_BADGES, COVERAGE_STATUSES, getISOWeek, getYear, parseISO } from "@/lib/planningUtils";

const empty = {
  employee_id: "", shift_date: "", type_badge: "AMB", start_time: "", end_time: "",
  vehicle_id: "", annotation: "", coverage_status: "À vérifier", publication_status: "Brouillon",
  cancellation_reason: "",
};

export default function AssignmentFormDialog({ open, onOpenChange, entry, defaultDate, defaultEmployeeId = "", employees = [], vehicles = [], onSave, onCancelEntry, onRestoreEntry, saving, lockEmployee = false, weekContext = null }) {
  const [form, setForm] = useState(empty);
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (open) {
      setForm(entry
        ? { ...empty, ...entry }
        : { ...empty, shift_date: defaultDate || "", employee_id: defaultEmployeeId || "" });
      setReason("");
    }
  }, [open, entry, defaultDate, defaultEmployeeId]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const isCancelled = entry && form.publication_status === "Annulé";

  const handleSubmit = () => {
    const emp = employees.find((e) => e.id === form.employee_id);
    const veh = vehicles.find((v) => v.id === form.vehicle_id);
    const d = form.shift_date ? parseISO(form.shift_date) : null;
    // Si l'affectation était déjà publiée, toute modification la marque "Modifié après publication"
    let publication_status = form.publication_status;
    if (entry && (entry.publication_status === "Publié" || entry.publication_status === "Modifié après publication")) {
      publication_status = "Modifié après publication";
    }
    onSave({
      ...form,
      publication_status,
      employee_name: emp?.full_name || form.employee_name || "",
      employee_initials: emp?.initials || form.employee_initials || "",
      employee_role: emp?.business_role || form.employee_role || "",
      vehicle_name: veh?.name || (form.vehicle_id ? form.vehicle_name : ""),
      vehicle_type: veh?.type || (form.vehicle_id ? form.vehicle_type : ""),
      week_number: d ? getISOWeek(d) : undefined,
      year: d ? getYear(d) : undefined,
    });
  };

  const valid = form.employee_id && form.shift_date;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{entry ? "Modifier l'affectation" : "Nouvelle affectation"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-1">
          {weekContext && (
            <div className="text-xs text-muted-foreground bg-muted/40 rounded-md px-3 py-2">
              Semaine <span className="font-semibold text-foreground">{weekContext}</span>
            </div>
          )}
          {isCancelled && (
            <div className="text-xs bg-red-50 text-red-600 rounded-md px-3 py-2">
              Affectation annulée{form.cancellation_reason ? ` — ${form.cancellation_reason}` : ""}.
            </div>
          )}
          <div>
            <Label className="text-xs">Utilisateur *</Label>
            {employees.length === 0 ? (
              <div className="h-9 flex items-center px-3 rounded-md border border-input bg-muted/40 text-xs text-muted-foreground">
                Aucun utilisateur actif et disponible trouvé pour cette date.
              </div>
            ) : (
              <Select value={form.employee_id} onValueChange={(v) => set("employee_id", v)} disabled={lockEmployee || isCancelled}>
                <SelectTrigger className="h-9"><SelectValue placeholder="Sélectionner un utilisateur" /></SelectTrigger>
                <SelectContent>
                  {employees.map((e) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.full_name || [e.first_name, e.last_name].filter(Boolean).join(" ") || e.email || e.id}
                      {e.business_role ? ` · ${e.business_role}` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Date *</Label>
              <Input type="date" value={form.shift_date || ""} onChange={(e) => set("shift_date", e.target.value)} className="h-9" disabled={isCancelled} />
            </div>
            <div>
              <Label className="text-xs">Type</Label>
              <Select value={form.type_badge} onValueChange={(v) => set("type_badge", v)} disabled={isCancelled}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>{TYPE_BADGES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Début</Label>
              <Input type="time" value={form.start_time || ""} onChange={(e) => set("start_time", e.target.value)} className="h-9" disabled={isCancelled} />
            </div>
            <div>
              <Label className="text-xs">Fin</Label>
              <Input type="time" value={form.end_time || ""} onChange={(e) => set("end_time", e.target.value)} className="h-9" disabled={isCancelled} />
            </div>
          </div>
          <div>
            <Label className="text-xs">Véhicule</Label>
            <Select value={form.vehicle_id || "none"} onValueChange={(v) => set("vehicle_id", v === "none" ? "" : v)} disabled={isCancelled}>
              <SelectTrigger className="h-9"><SelectValue placeholder="Aucun" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Aucun</SelectItem>
                {vehicles.map((v) => <SelectItem key={v.id} value={v.id}>{v.name} · {v.immatriculation}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">État de couverture</Label>
            <Select value={form.coverage_status} onValueChange={(v) => set("coverage_status", v)} disabled={isCancelled}>
              <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
              <SelectContent>{COVERAGE_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Annotation</Label>
            <Input value={form.annotation || ""} onChange={(e) => set("annotation", e.target.value)} className="h-9" placeholder="Note (optionnel)" disabled={isCancelled} />
          </div>

          {/* Annulation logique (remplace la suppression physique) */}
          {entry && !isCancelled && onCancelEntry && (
            <div className="border-t border-border pt-3">
              <Label className="text-xs text-red-600">Annuler l'affectation (annulation logique, pas de suppression)</Label>
              <Input value={reason} onChange={(e) => setReason(e.target.value)} className="h-9 mt-1" placeholder="Motif d'annulation" />
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          {entry && isCancelled && onRestoreEntry ? (
            <Button variant="outline" className="mr-auto gap-1.5" onClick={() => onRestoreEntry(entry)} disabled={saving}>
              <RotateCcw size={14} />Restaurer
            </Button>
          ) : entry && onCancelEntry ? (
            <Button variant="outline" className="mr-auto gap-1.5 text-red-600 border-red-200 hover:bg-red-50" onClick={() => onCancelEntry(entry, reason)} disabled={saving}>
              <Ban size={14} />Annuler l'affectation
            </Button>
          ) : null}
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>Fermer</Button>
          {!isCancelled && (
            <Button onClick={handleSubmit} disabled={!valid || saving}>
              {saving && <Loader2 size={14} className="animate-spin mr-1.5" />}{entry ? "Enregistrer" : "Créer"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}