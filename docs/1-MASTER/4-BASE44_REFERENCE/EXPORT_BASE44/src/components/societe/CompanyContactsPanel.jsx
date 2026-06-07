import React, { useState } from "react";
import { Plus, Pencil, Archive, RotateCcw, Mail, Phone, Loader2, Contact } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { writeAuditLog } from "@/lib/auditLogger";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import StatusBadge from "@/components/ui/StatusBadge";

const CONTACT_TYPES = ["Représentant légal", "Administratif", "Facturation", "Exploitation", "Autre"];
const EMPTY = { full_name: "", contact_type: "Autre", email: "", phone: "", notes: "" };

export default function CompanyContactsPanel({ companyId, canManage = false }) {
  const { user: currentUser } = useAuth();
  const qc = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [showArchived, setShowArchived] = useState(false);

  const { data: allContacts = [], isLoading } = useQuery({
    queryKey: ["company-contacts", companyId],
    queryFn: () => base44.entities.CompanyContact.filter({ company_id: companyId }, "full_name", 200),
    enabled: !!companyId,
  });

  const contacts = allContacts.filter((c) => !!c.is_archived === showArchived);

  const saveMutation = useMutation({
    mutationFn: (payload) =>
      editing
        ? base44.entities.CompanyContact.update(editing.id, payload)
        : base44.entities.CompanyContact.create({ ...payload, company_id: companyId }),
    onSuccess: (_, payload) => {
      qc.invalidateQueries({ queryKey: ["company-contacts", companyId] });
      const isEdit = !!editing;
      writeAuditLog({ action: isEdit ? "Modification contact société" : "Création contact société", actionType: isEdit ? "update" : "create", module: "Société", resource: `Contact : ${payload.full_name}`, details: `Type : ${payload.contact_type}`, actor: currentUser });
      setDialogOpen(false);
      setEditing(null);
    },
  });

  const archiveMutation = useMutation({
    mutationFn: ({ id, is_archived }) => base44.entities.CompanyContact.update(id, { is_archived }),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["company-contacts", companyId] });
      // Récupérer le contact depuis allContacts pour avoir son nom
      const contact = allContacts.find((c) => c.id === vars.id);
      const action = vars.is_archived ? "Archivage contact société" : "Restauration contact société";
      writeAuditLog({ action, actionType: "update", module: "Société", resource: `Contact : ${contact?.full_name || vars.id}`, actor: currentUser });
    },
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const openCreate = () => { setEditing(null); setForm(EMPTY); setDialogOpen(true); };
  const openEdit = (c) => { setEditing(c); setForm({ ...EMPTY, ...c }); setDialogOpen(true); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canManage) return;
    saveMutation.mutate(form);
  };

  if (!companyId) {
    return <div className="bg-card border border-border rounded-xl p-5 text-sm text-muted-foreground">Enregistrez d'abord la société pour gérer ses contacts.</div>;
  }

  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Contacts société</h3>
        <div className="flex items-center gap-2">
          {canManage && (
            <button onClick={() => setShowArchived((s) => !s)} className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline">
              {showArchived ? "Voir actifs" : "Voir archivés"}
            </button>
          )}
          {canManage && !showArchived && <Button size="sm" className="gap-1.5 h-8" onClick={openCreate}><Plus size={14} />Ajouter un contact</Button>}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8 text-muted-foreground"><Loader2 className="animate-spin mr-2" size={16} />Chargement...</div>
      ) : contacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center mb-3"><Contact size={20} className="text-muted-foreground" /></div>
          <p className="text-sm font-medium text-foreground">Aucun contact</p>
          <p className="text-xs text-muted-foreground mt-1">Ajoutez les contacts de la société (représentant légal, facturation...).</p>
        </div>
      ) : (
        <div className="space-y-2">
          {contacts.map((c) => (
            <div key={c.id} className="flex items-center justify-between border border-border rounded-lg p-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{c.full_name}</span>
                  <StatusBadge status={c.contact_type} />
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {c.email && <span className="flex items-center gap-1"><Mail size={12} />{c.email}</span>}
                  {c.phone && <span className="flex items-center gap-1"><Phone size={12} />{c.phone}</span>}
                </div>
                {c.notes && <p className="text-xs text-muted-foreground">{c.notes}</p>}
              </div>
              {canManage && (
                <div className="flex items-center gap-1">
                  {!showArchived && <Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => openEdit(c)}><Pencil size={13} /></Button>}
                  {showArchived ? (
                    <Button variant="ghost" size="icon" className="w-7 h-7" title="Restaurer" onClick={() => archiveMutation.mutate({ id: c.id, is_archived: false })}><RotateCcw size={13} /></Button>
                  ) : (
                    <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground" title="Archiver" onClick={() => archiveMutation.mutate({ id: c.id, is_archived: true })}><Archive size={13} /></Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Modifier le contact" : "Ajouter un contact"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5 col-span-2">
                <Label>Nom complet *</Label>
                <Input value={form.full_name} onChange={(e) => set("full_name", e.target.value)} required />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label>Type de contact *</Label>
                <Select value={form.contact_type} onValueChange={(v) => set("contact_type", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{CONTACT_TYPES.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input value={form.email} onChange={(e) => set("email", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Téléphone</Label>
                <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label>Notes</Label>
                <Input value={form.notes} onChange={(e) => set("notes", e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Annuler</Button>
              <Button type="submit" disabled={saveMutation.isPending}>{saveMutation.isPending ? "Enregistrement..." : "Enregistrer"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}