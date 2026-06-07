import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatusBadge from "@/components/ui/StatusBadge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Plus, Loader2, CalendarOff } from "lucide-react";
import { ABSENCE_TYPES } from "@/lib/userPermissions";
import { writeAuditLog } from "@/lib/auditLogger";
import { useAuth } from "@/lib/AuthContext";

const fmt = (d) => (d ? new Date(d).toLocaleDateString("fr-FR") : "—");

// Demandes d'absence / indisponibilité avec statuts En attente / Validée / Refusée / Annulée
export default function AbsencePanelDialog({ open, onOpenChange, user }) {
  const { user: currentUser } = useAuth();
  const qc = useQueryClient();
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ type: "Absence", start_date: "", end_date: "", reason: "" });

  const { data: absences = [], isLoading } = useQuery({
    queryKey: ["absences", user?.id],
    queryFn: () => base44.entities.AbsenceRequest.filter({ employee_id: user.id }, "-start_date", 100),
    enabled: !!user?.id && open,
  });

  const createMut = useMutation({
    mutationFn: (data) => base44.entities.AbsenceRequest.create(data),
    onSuccess: (_, data) => {
      qc.invalidateQueries({ queryKey: ["absences", user?.id] });
      writeAuditLog({ action: "Demande d'absence créée", actionType: "create", module: "Utilisateurs", resource: `Agent : ${data.employee_name}`, details: `Type : ${data.type} · Du ${data.start_date} au ${data.end_date || data.start_date}${data.reason ? ` · Motif : ${data.reason}` : ""}`, actor: currentUser });
      setCreating(false);
      setForm({ type: "Absence", start_date: "", end_date: "", reason: "" });
    },
  });

  const statusMut = useMutation({
    mutationFn: ({ id, status, absence }) => base44.entities.AbsenceRequest.update(id, { status }),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["absences", user?.id] });
      const actionLabels = { "Validée": "Validation absence", "Refusée": "Refus absence", "Annulée": "Annulation absence" };
      const action = actionLabels[vars.status] || `Statut absence : ${vars.status}`;
      writeAuditLog({ action, actionType: "update", module: "Utilisateurs", resource: `Agent : ${user?.full_name || user?.email}`, details: `Absence du ${vars.absence?.start_date || "?"} · Nouveau statut : ${vars.status}`, actor: currentUser });
    },
  });

  const submit = (e) => {
    e.preventDefault();
    createMut.mutate({
      employee_id: user.id,
      employee_name: user.full_name || user.email,
      type: form.type,
      start_date: form.start_date,
      end_date: form.end_date || form.start_date,
      reason: form.reason,
      status: "En attente",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Absences / indisponibilités</DialogTitle>
          <DialogDescription>{user?.full_name || user?.email}</DialogDescription>
        </DialogHeader>

        <div className="flex justify-end">
          <Button size="sm" className="gap-1.5" onClick={() => setCreating((c) => !c)}>
            <Plus size={14} /> Nouvelle demande
          </Button>
        </div>

        {creating && (
          <form onSubmit={submit} className="bg-muted/30 border border-border rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Type</Label>
                <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{ABSENCE_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Motif</Label>
                <Input value={form.reason} onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label>Date de début</Label>
                <Input type="date" value={form.start_date} onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))} required />
              </div>
              <div className="space-y-1.5">
                <Label>Date de fin</Label>
                <Input type="date" value={form.end_date} onChange={(e) => setForm((f) => ({ ...f, end_date: e.target.value }))} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setCreating(false)}>Annuler</Button>
              <Button type="submit" size="sm" disabled={createMut.isPending}>{createMut.isPending ? "..." : "Créer"}</Button>
            </div>
          </form>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-10 text-muted-foreground"><Loader2 className="animate-spin mr-2" size={18} />Chargement...</div>
        ) : absences.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CalendarOff size={28} className="text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Aucune demande d'absence</p>
          </div>
        ) : (
          <div className="divide-y divide-border border border-border rounded-lg overflow-hidden">
            {absences.map((a) => (
              <div key={a.id} className="flex items-center justify-between px-4 py-3">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-foreground">{a.type}{a.reason ? ` · ${a.reason}` : ""}</div>
                  <div className="text-xs text-muted-foreground">{fmt(a.start_date)} → {fmt(a.end_date)}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <StatusBadge status={a.status} />
                  {a.status === "En attente" && (
                    <>
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => statusMut.mutate({ id: a.id, status: "Validée", absence: a })}>Valider</Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => statusMut.mutate({ id: a.id, status: "Refusée", absence: a })}>Refuser</Button>
                    </>
                  )}
                  {a.status !== "Annulée" && a.status !== "Refusée" && (
                    <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => statusMut.mutate({ id: a.id, status: "Annulée", absence: a })}>Annuler</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}