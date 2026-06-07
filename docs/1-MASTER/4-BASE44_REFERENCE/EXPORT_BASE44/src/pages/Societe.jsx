import React, { useState, useEffect } from "react";
import { Building2, Save, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { can } from "@/lib/userPermissions";
import { writeAuditLog } from "@/lib/auditLogger";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyField from "@/components/societe/CompanyField";
import CompanyContactsPanel from "@/components/societe/CompanyContactsPanel";
import CompanyAdminPanel from "@/components/societe/CompanyAdminPanel";

export default function Societe() {
  const { user } = useAuth();
  const canManage = can(user, "COMPANY_MANAGE");
  const qc = useQueryClient();
  const [tab, setTab] = useState("general");
  const [form, setForm] = useState({});

  const { data: companies = [], isLoading } = useQuery({
    queryKey: ["company"],
    queryFn: () => base44.entities.Company.list("created_date", 1),
  });
  const company = companies[0] || null;

  useEffect(() => {
    if (company) setForm(company);
  }, [company]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const saveMutation = useMutation({
    mutationFn: (payload) =>
      company
        ? base44.entities.Company.update(company.id, payload)
        : base44.entities.Company.create({ name: payload.name || "Ma société", ...payload }),
    onSuccess: (_, payload) => {
      qc.invalidateQueries({ queryKey: ["company"] });
      const isCreate = !company;
      writeAuditLog({
        action: isCreate ? "Création société" : "Modification société",
        actionType: isCreate ? "create" : "update",
        module: "Société",
        resource: `Société : ${payload.name || form.name || "—"}`,
        details: isCreate ? "Fiche société créée" : "Fiche société modifiée",
        actor: user,
      });
    },
  });

  if (isLoading) {
    return <div className="flex items-center justify-center py-24 text-muted-foreground"><Loader2 className="animate-spin mr-2" size={18} />Chargement...</div>;
  }

  return (
    <div className="p-6 space-y-5 max-w-[900px] mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Société</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Informations générales, réglementaires et préférences.</p>
        </div>
        {canManage && (
          <Button className="gap-1.5" onClick={() => saveMutation.mutate(form)} disabled={saveMutation.isPending}>
            {saveMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saveMutation.isSuccess && !saveMutation.isPending ? "Enregistré" : "Enregistrer"}
          </Button>
        )}
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="h-9 bg-muted/50 border border-border">
          <TabsTrigger value="general" className="text-xs px-3 h-7">Général</TabsTrigger>
          <TabsTrigger value="contacts" className="text-xs px-3 h-7">Contacts</TabsTrigger>
          <TabsTrigger value="reglementaire" className="text-xs px-3 h-7">Réglementaire</TabsTrigger>
          <TabsTrigger value="preferences" className="text-xs px-3 h-7">Préférences</TabsTrigger>
          <TabsTrigger value="administration" className="text-xs px-3 h-7">Administration</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4">
          <div className="bg-card border border-border rounded-xl p-5 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl bg-muted border border-border flex items-center justify-center overflow-hidden">
                {form.logo_url ? <img src={form.logo_url} alt="Logo" className="w-full h-full object-cover" /> : <Building2 size={32} className="text-muted-foreground" />}
              </div>
              <CompanyField label="URL du logo" value={form.logo_url} onChange={(v) => set("logo_url", v)} placeholder="https://..." disabled={!canManage} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <CompanyField label="Raison sociale" value={form.name} onChange={(v) => set("name", v)} disabled={!canManage} />
              <CompanyField label="Nom commercial" value={form.commercial_name} onChange={(v) => set("commercial_name", v)} disabled={!canManage} />
              <CompanyField label="SIRET" value={form.siret} onChange={(v) => set("siret", v)} disabled={!canManage} />
              <CompanyField label="Téléphone" value={form.phone} onChange={(v) => set("phone", v)} disabled={!canManage} />
              <CompanyField label="Email de contact" value={form.email} onChange={(v) => set("email", v)} disabled={!canManage} />
              <CompanyField label="Site web" value={form.website} onChange={(v) => set("website", v)} disabled={!canManage} />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <CompanyField label="Adresse" value={form.address} onChange={(v) => set("address", v)} disabled={!canManage} />
              <div className="grid grid-cols-3 gap-4">
                <CompanyField label="Code postal" value={form.postal_code} onChange={(v) => set("postal_code", v)} disabled={!canManage} />
                <CompanyField label="Ville" value={form.city} onChange={(v) => set("city", v)} disabled={!canManage} />
                <CompanyField label="Pays" value={form.country} onChange={(v) => set("country", v)} disabled={!canManage} />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="mt-4">
          <CompanyContactsPanel companyId={company?.id} canManage={canManage} />
        </TabsContent>

        <TabsContent value="reglementaire" className="mt-4">
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <CompanyField label="N° agrément sanitaire (ARS)" value={form.ars_number} onChange={(v) => set("ars_number", v)} disabled={!canManage} />
              <CompanyField label="ARS de rattachement" value={form.ars_region} onChange={(v) => set("ars_region", v)} disabled={!canManage} />
              <CompanyField label="Département principal" value={form.department} onChange={(v) => set("department", v)} disabled={!canManage} />
              <CompanyField label="Zone d'activité" value={form.activity_zone} onChange={(v) => set("activity_zone", v)} disabled={!canManage} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Commentaire réglementaire interne</label>
              <textarea
                value={form.regulatory_comment ?? ""}
                onChange={(e) => set("regulatory_comment", e.target.value)}
                disabled={!canManage}
                className="w-full h-24 px-3 py-2 rounded-lg border border-input text-sm resize-none bg-background focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="mt-4">
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <CompanyField label="Fuseau horaire" value={form.timezone} onChange={(v) => set("timezone", v)} disabled={!canManage} />
              <CompanyField label="Format de date" value={form.date_format} onChange={(v) => set("date_format", v)} disabled={!canManage} />
              <CompanyField label="Format d'heure" value={form.time_format} onChange={(v) => set("time_format", v)} disabled={!canManage} />
              <CompanyField label="Langue" value={form.language} onChange={(v) => set("language", v)} disabled={!canManage} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="administration" className="mt-4">
          <CompanyAdminPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}