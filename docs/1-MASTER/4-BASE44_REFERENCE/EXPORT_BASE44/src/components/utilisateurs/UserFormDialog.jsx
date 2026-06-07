import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PERMISSION_CATALOG, BUSINESS_ROLES, BUSINESS_ROLE_LABELS } from "@/lib/userPermissions";

const MAX_SECONDARY_ROLES = 2;

export default function UserFormDialog({ open, onOpenChange, user, depots = [], onCreate, onUpdate, saving, canEditRoles = false }) {
  const isEdit = !!user;
  const [form, setForm] = useState({});

  useEffect(() => {
    if (open) {
      setForm(
        user
          ? {
              business_role: user.business_role || "ADE",
              secondary_roles: user.secondary_roles || [],
              permissions: user.permissions || [],
              psc1: !!user.psc1,
              phone: user.phone || "",
              initials: user.initials || "",
              depot_name: user.depot_name || "",
              status: user.status || "Actif",
              operational_status: user.operational_status || "Non planifié",
              first_name: user.first_name || "",
              last_name: user.last_name || "",
            }
          : {
              first_name: "",
              last_name: "",
              email: "",
              phone: "",
              business_role: "ADE",
              secondary_roles: [],
              permissions: [],
              psc1: false,
              status: "Actif",
              operational_status: "Non planifié",
              initials: "",
              depot_name: "",
            }
      );
    }
  }, [open, user]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleSecondary = (r) =>
    setForm((f) => {
      const cur = f.secondary_roles || [];
      if (cur.includes(r)) return { ...f, secondary_roles: cur.filter(x => x !== r) };
      if (cur.length >= MAX_SECONDARY_ROLES) return f;
      return { ...f, secondary_roles: [...cur, r] };
    });
  const togglePermission = (code) =>
    setForm((f) => {
      const cur = f.permissions || [];
      return { ...f, permissions: cur.includes(code) ? cur.filter(x => x !== code) : [...cur, code] };
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      onUpdate({
        business_role: form.business_role,
        secondary_roles: form.secondary_roles,
        permissions: form.permissions,
        psc1: form.psc1,
        phone: form.phone,
        initials: form.initials,
        depot_name: form.depot_name,
        status: form.status,
        operational_status: form.operational_status,
        first_name: form.first_name,
        last_name: form.last_name,
      });
    } else {
      onCreate({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        business_role: form.business_role,
        secondary_roles: form.secondary_roles,
        permissions: form.permissions,
        psc1: form.psc1,
        status: form.status,
        operational_status: form.operational_status,
        initials: form.initials,
        depot_name: form.depot_name,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}</DialogTitle>
          <DialogDescription>
            {isEdit ? user.full_name || user.email : "Créez une fiche utilisateur / RH. L'accès applicatif peut être ajouté séparément."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isEdit && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Prénom *</Label>
                <Input value={form.first_name || ""} onChange={(e) => set("first_name", e.target.value)} required placeholder="Jean" />
              </div>
              <div className="space-y-1.5">
                <Label>Nom *</Label>
                <Input value={form.last_name || ""} onChange={(e) => set("last_name", e.target.value)} required placeholder="Dupont" />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label>Email (optionnel)</Label>
                <Input type="email" value={form.email || ""} onChange={(e) => set("email", e.target.value)} placeholder="prenom.nom@societe.fr" />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label>Téléphone (optionnel)</Label>
                <Input value={form.phone || ""} onChange={(e) => set("phone", e.target.value)} placeholder="+33 6 ..." />
              </div>
            </div>
          )}

          {!isEdit && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Rôle métier</Label>
                <Select value={form.business_role} onValueChange={(v) => set("business_role", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{BUSINESS_ROLES.map(o => <SelectItem key={o} value={o}>{BUSINESS_ROLE_LABELS[o] || o}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Dépôt (optionnel)</Label>
                <Select value={form.depot_name || "none"} onValueChange={(v) => set("depot_name", v === "none" ? "" : v)}>
                  <SelectTrigger><SelectValue placeholder="Aucun" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Aucun</SelectItem>
                    {depots.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>État opérationnel</Label>
                <Select value={form.operational_status} onValueChange={(v) => set("operational_status", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{["Présent", "Absent", "Indisponible", "Non planifié"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Statut compte</Label>
                <Select value={form.status} onValueChange={(v) => set("status", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{["Actif", "Inactif"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <label className="flex items-center gap-2 text-sm cursor-pointer col-span-2">
                <Checkbox checked={form.psc1} onCheckedChange={(v) => set("psc1", !!v)} />
                Titulaire du PSC1
              </label>
            </div>
          )}

          {isEdit && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Rôle métier principal</Label>
                  {canEditRoles ? (
                    <Select value={form.business_role} onValueChange={(v) => set("business_role", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{BUSINESS_ROLES.map(o => <SelectItem key={o} value={o}>{BUSINESS_ROLE_LABELS[o] || o}</SelectItem>)}</SelectContent>
                    </Select>
                  ) : (
                    <div className="h-9 flex items-center px-3 rounded-md border border-input bg-muted text-sm text-muted-foreground">
                      {BUSINESS_ROLE_LABELS[form.business_role] || form.business_role || "—"}
                    </div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Statut</Label>
                  <Select value={form.status} onValueChange={(v) => set("status", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{["Actif", "Inactif"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>État opérationnel</Label>
                  <Select value={form.operational_status || "Non planifié"} onValueChange={(v) => set("operational_status", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{["Présent", "Absent", "Indisponible", "Non planifié"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Initiales</Label>
                  <Input maxLength={2} value={form.initials} onChange={(e) => set("initials", e.target.value.toUpperCase())} />
                </div>
                <div className="space-y-1.5">
                  <Label>Téléphone</Label>
                  <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                </div>
                <div className="space-y-1.5 col-span-2">
                  <Label>Dépôt</Label>
                  <Select value={form.depot_name || "none"} onValueChange={(v) => set("depot_name", v === "none" ? "" : v)}>
                    <SelectTrigger><SelectValue placeholder="Aucun" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Aucun</SelectItem>
                      {depots.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {canEditRoles && (
                <div className="space-y-2">
                  <Label>Rôles secondaires (max {MAX_SECONDARY_ROLES})</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {BUSINESS_ROLES.filter(r => r !== form.business_role).map(r => {
                     const checked = (form.secondary_roles || []).includes(r);
                     const disabled = !checked && (form.secondary_roles || []).length >= MAX_SECONDARY_ROLES;
                     return (
                       <label key={r} className={`flex items-center gap-2 text-sm ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}>
                         <Checkbox checked={checked} disabled={disabled} onCheckedChange={() => toggleSecondary(r)} />
                         {BUSINESS_ROLE_LABELS[r] || r}
                       </label>
                     );
                    })}
                  </div>
                </div>
              )}

              {canEditRoles && (
                <div className="space-y-2">
                  <Label>Permissions fines</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {PERMISSION_CATALOG.map((p) => (
                      <label key={p.code} className="flex items-center gap-2 text-sm cursor-pointer">
                        <Checkbox checked={(form.permissions || []).includes(p.code)} onCheckedChange={() => togglePermission(p.code)} />
                        {p.label}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox checked={form.psc1} onCheckedChange={(v) => set("psc1", !!v)} />
                Titulaire du PSC1
              </label>
            </>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
            <Button type="submit" disabled={saving}>{saving ? "..." : isEdit ? "Enregistrer" : "Créer la fiche"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}