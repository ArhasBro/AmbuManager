import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Ambulance, Building2, CalendarDays, Landmark, Save, UsersRound } from "lucide-react";

import { ActionButton, PageHeader, StatCard } from "@/app/ui";
import { authOptions } from "@/lib/auth";
import { canManageCompanyRules } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

import CompanyProfileForm from "./company-profile-form";
import CompanyRulesPanel from "./company-rules-panel";

type CompanyProfileRow = {
  name: string;
  managerNames: string | null;
  address: string | null;
  phone: string | null;
  siret: string | null;
  updatedAt: Date;
};

function canManageCompanyProfile(role?: string) {
  return role === "ADMIN" || role === "GERANT";
}

export default async function CompanyPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id || !user.companyId) redirect("/login");

  const canManageProfile = canManageCompanyProfile(user.role);
  const canManageRules = await canManageCompanyRules(user.id, user.role, user.platformRole);

  if (!canManageProfile && !canManageRules) redirect("/login");

  let company: CompanyProfileRow | null = null;
  let companyKpis = {
    depots: 0,
    users: 0,
    vehicles: 0,
  };
  let lastUpdatedAt: Date | null = null;

  if (canManageProfile) {
    const [rows, depots, users, vehicles] = await Promise.all([
      prisma.$queryRaw<CompanyProfileRow[]>`
      SELECT
        "name",
        "managerNames",
        "address",
        "phone",
        "siret",
        "updatedAt"
      FROM "Company"
      WHERE "id" = ${user.companyId}
      LIMIT 1
    `,
      prisma.depot.count({ where: { companyId: user.companyId, isActive: true } }),
      prisma.user.count({ where: { companyId: user.companyId, isActive: true, platformRole: null } }),
      prisma.vehicle.count({ where: { companyId: user.companyId, isActive: true } }),
    ]);

    company = rows[0] ?? null;
    if (!company) redirect("/login");
    companyKpis = { depots, users, vehicles };
    lastUpdatedAt = company.updatedAt;
  }

  const lastUpdatedLabel = lastUpdatedAt
    ? new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(lastUpdatedAt)
    : "N/A";

  return (
    <section className="company-section">
      <PageHeader
        title="Societe"
        description="Gerez l'identite de la societe et les parametres metier principaux."
        actions={
          canManageProfile ? (
            <ActionButton type="submit" form="company-profile-form" variant="primary" leadingIcon={<Save size={16} />}>
              Enregistrer
            </ActionButton>
          ) : null
        }
      />

      <div className="company-layout">
        <div className="company-layout__column company-layout__column--left">
          {canManageProfile && company ? (
            <CompanyProfileForm
              formId="company-profile-form"
              initialProfile={{
                name: company.name ?? "",
                managerNames: company.managerNames ?? "",
                address: company.address ?? "",
                phone: company.phone ?? "",
                siret: company.siret ?? "",
              }}
            />
          ) : (
            <section className="company-card company-card--soft">
              <div className="company-card__head">
                <h2 className="company-card__title">Profil societe</h2>
                <p className="company-card__description">
                  L&apos;edition du profil societe reste reservee aux comptes ADMIN / GERANT.
                </p>
              </div>
            </section>
          )}
        </div>

        <div className="company-layout__column company-layout__column--center">
          {canManageRules ? (
            <CompanyRulesPanel />
          ) : (
            <section className="company-card company-card--soft">
              <div className="company-card__head">
                <h2 className="company-card__title">Parametres metier</h2>
                <p className="company-card__description">
                  L&apos;acces aux regles metier est reserve aux comptes autorises.
                </p>
              </div>
            </section>
          )}
        </div>

        <aside className="company-summary-rail">
          <section className="company-card">
            <div className="company-card__head">
              <h2 className="company-card__title">Resume societe</h2>
            </div>
            <div className="company-summary-stack">
              <StatCard
                title="Societe active"
                value={<span className="company-summary-value">{company?.name ?? "N/A"}</span>}
                tone="neutral"
                icon={<Building2 size={16} />}
              />
              <StatCard
                title="Depots actifs"
                value={companyKpis.depots}
                hint="depots"
                tone="warning"
                icon={<Landmark size={16} />}
              />
              <StatCard
                title="Utilisateurs actifs"
                value={companyKpis.users}
                hint="utilisateurs"
                tone="info"
                icon={<UsersRound size={16} />}
              />
              <StatCard
                title="Vehicules actifs"
                value={companyKpis.vehicles}
                hint="vehicules"
                tone="success"
                icon={<Ambulance size={16} />}
              />
              <StatCard
                title="Derniere mise a jour"
                value={<span className="company-summary-value">{lastUpdatedLabel}</span>}
                tone="neutral"
                icon={<CalendarDays size={16} />}
              />
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
