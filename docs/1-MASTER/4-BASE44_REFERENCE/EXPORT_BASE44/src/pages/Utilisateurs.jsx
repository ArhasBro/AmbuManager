import React, { useState } from "react";
import { Plus, Search, Pencil, Users, Archive, RotateCcw, Loader2, KeyRound, CalendarOff, LogIn, AlertCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { BUSINESS_ROLES, BUSINESS_ROLE_SHORT, can } from "@/lib/userPermissions";
import { useAuth } from "@/lib/AuthContext";
import { writeAuditLog } from "@/lib/auditLogger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatusBadge from "@/components/ui/StatusBadge";
import UserFormDialog from "@/components/utilisateurs/UserFormDialog";
import ApplicationAccessDialog from "@/components/utilisateurs/ApplicationAccessDialog";
import PasswordResetDialog from "@/components/utilisateurs/PasswordResetDialog";
import AbsencePanelDialog from "@/components/utilisateurs/AbsencePanelDialog";

const initialsOf = (u) => u.initials || (u.full_name || u.email || "?").split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase();

export default function Utilisateurs() {
  const { user: currentUser } = useAuth();
  const canManageUsers   = can(currentUser, "USERS_MANAGE");
  const canEditRoles     = can(currentUser, "USERS_ROLES_EDIT");
  const canResetPwd      = can(currentUser, "USERS_PASSWORD_RESET");
  const qc = useQueryClient();
  
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("Tous");
  const [filterStatus, setFilterStatus] = useState("Tous");
  const [showArchived, setShowArchived] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [accessDialogOpen, setAccessDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [userForAccess, setUserForAccess] = useState(null);
  const [pwdUser, setPwdUser] = useState(null);
  const [absenceUser, setAbsenceUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => base44.entities.User.list("-created_date", 500),
  });

  const { data: depots = [] } = useQuery({
    queryKey: ["depots"],
    queryFn: () => base44.entities.Depot.list("name", 500),
  });

  // Créer une fiche utilisateur/RH (sans compte applicatif)
  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.User.create(data),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["users"] });
      setDialogOpen(false);
      setEditing(null);
      setErrorMsg("");
      const userName = vars.first_name && vars.last_name ? `${vars.first_name} ${vars.last_name}` : (vars.email || "Utilisateur");
      writeAuditLog({
        action: "Création fiche utilisateur/RH",
        actionType: "create",
        module: "Utilisateurs",
        resource: `User : ${userName}`,
        details: `Rôle : ${vars.business_role}, Statut : ${vars.status}`,
        actor: currentUser
      });
    },
    onError: (e) => setErrorMsg(e?.message || "Échec de la création."),
  });

  // Modifier une fiche utilisateur/RH
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.User.update(id, data),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["users"] });
      setDialogOpen(false);
      const target = editing;
      setEditing(null);
      setErrorMsg("");
      const hasRoleChange = vars.data.business_role !== undefined && vars.data.business_role !== target?.business_role;
      const action = hasRoleChange ? "Modification rôle utilisateur" : "Modification fiche utilisateur/RH";
      const details = hasRoleChange ? `Nouveau rôle : ${vars.data.business_role}` : undefined;
      writeAuditLog({
        action,
        actionType: "update",
        module: "Utilisateurs",
        resource: `User : ${target?.full_name || target?.email}`,
        details,
        actor: currentUser
      });
    },
  });

  // Créer/associer un compte applicatif (Base44 invitation)
  const createAccessMutation = useMutation({
    mutationFn: async ({ userId, email, role }) => {
      // Créer l'invitation Base44
      await base44.users.inviteUser(email, role);
      // Mettre à jour la fiche User avec l'accès applicatif
      return base44.entities.User.update(userId, {
        has_app_access: true,
        app_access_email: email,
        app_access_created_at: new Date().toISOString(),
      });
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["users"] });
      setAccessDialogOpen(false);
      const target = userForAccess;
      setUserForAccess(null);
      setErrorMsg("");
      writeAuditLog({
        action: "Création compte applicatif",
        actionType: "create",
        module: "Utilisateurs",
        resource: `User : ${target?.full_name || target?.email}`,
        details: `Email invitation : ${vars.email}`,
        actor: currentUser
      });
    },
    onError: (e) => setErrorMsg(e?.message || "Échec de la création du compte applicatif."),
  });

  // Archiver/restaurer utilisateur
  const archiveMutation = useMutation({
    mutationFn: ({ id, is_archived, targetUser }) => base44.entities.User.update(id, { is_archived }),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["users"] });
      const action = vars.is_archived ? "Archivage utilisateur" : "Restauration utilisateur";
      writeAuditLog({
        action,
        actionType: "update",
        module: "Utilisateurs",
        resource: `User : ${vars.targetUser?.full_name || vars.targetUser?.email || vars.id}`,
        actor: currentUser
      });
    },
  });

  // Réinitialiser mot de passe
  const passwordMutation = useMutation({
    mutationFn: ({ id, password }) => base44.entities.User.update(id, { password }),
    onSuccess: () => {
      writeAuditLog({
        action: "Réinitialisation mot de passe",
        actionType: "update",
        module: "Utilisateurs",
        resource: `User : ${pwdUser?.full_name || pwdUser?.email}`,
        actor: currentUser
      });
      setPwdUser(null);
      setErrorMsg("");
    },
    onError: (e) => setErrorMsg(e?.message || "Échec de la réinitialisation."),
  });

  const getFullName = (u) => {
    if (u.full_name) return u.full_name;
    const parts = [u.first_name, u.last_name].filter(Boolean);
    if (parts.length > 0) return parts.join(" ");
    return u.email || "—";
  };

  const openCreate = () => { setEditing(null); setErrorMsg(""); setDialogOpen(true); };
  const openEdit = (u) => { setEditing(u); setErrorMsg(""); setDialogOpen(true); };
  const openAccess = (u) => { setUserForAccess(u); setErrorMsg(""); setAccessDialogOpen(true); };

  const filtered = users.filter((u) => {
    if (!!u.is_archived !== showArchived) return false;
    const q = search.toLowerCase();
    const match = !q || (u.full_name || "").toLowerCase().includes(q) || (u.email || "").toLowerCase().includes(q);
    const matchR = filterRole === "Tous" || u.business_role === filterRole;
    const matchS = filterStatus === "Tous" || (u.status || "Actif") === filterStatus;
    return match && matchR && matchS;
  });

  const active = users.filter((u) => !u.is_archived);
  const stats = [
    { label: "Fiches utilisateur/RH", value: active.length, sub: "actives", color: "text-primary" },
    { label: "Avec accès applicatif", value: active.filter(u => u.has_app_access).length, sub: "compte actif", color: "text-green-600" },
    { label: "Admins / Gérants", value: active.filter(u => u.business_role === "ADMIN" || u.business_role === "GERANT").length, sub: "accès total", color: "text-violet-600" },
    { label: "Archivés", value: users.filter(u => u.is_archived).length, sub: "masqués", color: "text-muted-foreground" },
  ];

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Utilisateurs / RH</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Fiches utilisateurs et gestion des comptes de connexion.</p>
        </div>
        {canManageUsers && <Button className="gap-1.5" onClick={openCreate}><Plus size={14} />Ajouter un utilisateur</Button>}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((k, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4">
            <div className={`text-2xl font-bold ${k.color}`}>{k.value}</div>
            <div className="text-xs font-medium text-foreground mt-0.5">{k.label}</div>
            <div className="text-xs text-muted-foreground">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-36 h-9 text-sm"><SelectValue placeholder="Rôle" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Tous">Tous les rôles</SelectItem>
            {BUSINESS_ROLES.map(o => <SelectItem key={o} value={o}>{BUSINESS_ROLE_SHORT[o] || o}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-32 h-9 text-sm"><SelectValue placeholder="Statut" /></SelectTrigger>
          <SelectContent>{["Tous", "Actif", "Inactif"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
        </Select>
        <Button variant={showArchived ? "default" : "outline"} size="sm" className="h-9 gap-1.5" onClick={() => setShowArchived(s => !s)}>
          <Archive size={14} />{showArchived ? "Voir actifs" : "Voir archivés"}
        </Button>
      </div>

      {errorMsg && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive flex gap-2 items-start">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground"><Loader2 className="animate-spin mr-2" size={18} />Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3"><Users size={22} className="text-muted-foreground" /></div>
            <p className="text-sm font-medium text-foreground">{showArchived ? "Aucun utilisateur archivé" : "Aucun utilisateur"}</p>
            {!showArchived && <p className="text-xs text-muted-foreground mt-1">Ajoutez une fiche utilisateur pour démarrer.</p>}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Utilisateur", "Email", "Rôle", "Dépôt", "PSC1", "Statut", "Accès", "Actions"].map(h => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => {
                const hasAppAccess = u.has_app_access === true;
                const displayName = getFullName(u);
                return (
                  <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <span className="text-[9px] font-bold text-white">{initialsOf(u)}</span>
                        </div>
                        <span className="text-sm font-medium text-foreground">{displayName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{u.email || "—"}</td>
                    <td className="px-4 py-3">{u.business_role ? <StatusBadge status={BUSINESS_ROLE_SHORT[u.business_role] || u.business_role} /> : <span className="text-xs text-muted-foreground">—</span>}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{u.depot_name || "—"}</td>
                    <td className="px-4 py-3 text-sm">{u.psc1 ? <span className="text-green-600 font-medium text-xs">Oui</span> : <span className="text-muted-foreground text-xs">Non</span>}</td>
                    <td className="px-4 py-3"><StatusBadge status={u.status || "Actif"} withDot /></td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${hasAppAccess ? "bg-green-50 text-green-700" : "bg-slate-50 text-slate-600"}`}>
                        {hasAppAccess ? "Accès actif" : "Sans accès"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {canManageUsers && <Button variant="ghost" size="icon" className="w-7 h-7" title="Modifier" onClick={() => openEdit(u)}><Pencil size={13} /></Button>}
                        <Button variant="ghost" size="icon" className="w-7 h-7" title="Absences / indisponibilités" onClick={() => setAbsenceUser(u)}><CalendarOff size={13} /></Button>
                        {!hasAppAccess && canManageUsers && <Button variant="ghost" size="icon" className="w-7 h-7" title="Créer accès applicatif" onClick={() => openAccess(u)}><LogIn size={13} /></Button>}
                        {canResetPwd && hasAppAccess && <Button variant="ghost" size="icon" className="w-7 h-7" title="Réinitialiser le mot de passe" onClick={() => { setErrorMsg(""); setPwdUser(u); }}><KeyRound size={13} /></Button>}
                        {u.is_archived ? (
                          canManageUsers && <Button variant="ghost" size="icon" className="w-7 h-7" title="Restaurer" onClick={() => archiveMutation.mutate({ id: u.id, is_archived: false, targetUser: u })}><RotateCcw size={13} /></Button>
                        ) : (
                          canManageUsers && <Button variant="ghost" size="icon" className="w-7 h-7" title="Archiver" onClick={() => archiveMutation.mutate({ id: u.id, is_archived: true, targetUser: u })}><Archive size={13} /></Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <UserFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        user={editing}
        depots={depots.filter(d => !d.is_archived)}
        onCreate={(data) => createMutation.mutate(data)}
        onUpdate={(data) => updateMutation.mutate({ id: editing.id, data })}
        saving={createMutation.isPending || updateMutation.isPending}
        canEditRoles={canEditRoles}
      />

      <ApplicationAccessDialog
        open={accessDialogOpen}
        onOpenChange={setAccessDialogOpen}
        user={userForAccess}
        onConfirm={(email) => createAccessMutation.mutate({ userId: userForAccess?.id, email, role: "user" })}
        saving={createAccessMutation.isPending}
        existingEmail={userForAccess?.email}
      />

      <PasswordResetDialog
        open={!!pwdUser}
        onOpenChange={(o) => !o && setPwdUser(null)}
        user={pwdUser}
        onConfirm={(password) => passwordMutation.mutate({ id: pwdUser.id, password })}
        saving={passwordMutation.isPending}
      />

      <AbsencePanelDialog
        open={!!absenceUser}
        onOpenChange={(o) => !o && setAbsenceUser(null)}
        user={absenceUser}
      />
    </div>
  );
}