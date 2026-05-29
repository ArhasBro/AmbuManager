import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Ambulance, Building2, CalendarDays, Landmark, Save, UsersRound } from "lucide-react";

import { AccessDeniedState, ActionButton, PageHeader } from "@/app/ui";
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

  if (!canManageProfile && !canManageRules) {
    return (
      <main className="page-wrap">
        <AccessDeniedState />
      </main>
    );
  }

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
    : "Donnée non renseignée";

  const summaryItems = [
    {
      key: "company",
      label: "Société active",
      value: company?.name ?? "Donnée non renseignée",
      icon: <Building2 size={16} />,
      tone: "neutral",
    },
    {
      key: "depots",
      label: "Dépôts actifs",
      value: `${companyKpis.depots} dépôts`,
      icon: <Landmark size={16} />,
      tone: "info",
    },
    {
      key: "users",
      label: "Utilisateurs actifs",
      value: `${companyKpis.users} utilisateurs`,
      icon: <UsersRound size={16} />,
      tone: "info",
    },
    {
      key: "vehicles",
      label: "Véhicules actifs",
      value: `${companyKpis.vehicles} véhicules`,
      icon: <Ambulance size={16} />,
      tone: "success",
    },
    {
      key: "updated",
      label: "Dernière mise à jour",
      value: lastUpdatedLabel,
      icon: <CalendarDays size={16} />,
      tone: "neutral",
    },
  ] as const;

  return (
    <section className="company-section">
      <PageHeader
        title="Société"
        description="Gérez l'identité de la société et les paramètres métier principaux."
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
                <h2 className="company-card__title">Profil société</h2>
                <p className="company-card__description">
                  L&apos;édition du profil société reste réservée aux comptes ADMIN / GÉRANT.
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
                <h2 className="company-card__title">Paramètres métier</h2>
                <p className="company-card__description">
                  L&apos;accès aux règles métier est réservé aux comptes autorisés.
                </p>
              </div>
            </section>
          )}
        </div>

        <aside className="company-summary-rail">
          <section className="company-card company-summary-card">
            <div className="company-card__head">
              <h2 className="company-card__title">Résumé société</h2>
            </div>
            <div className="company-summary-items">
              {summaryItems.map((item) => (
                <article key={item.key} className={`company-summary-item company-summary-item--${item.tone}`}>
                  <span className="company-summary-item__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <div className="company-summary-item__copy">
                    <p className="company-summary-item__label">{item.label}</p>
                    <strong className="company-summary-item__value">{item.value}</strong>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {canManageProfile ? (
        <div className="company-page-footer-actions">
          <ActionButton type="reset" form="company-profile-form" variant="secondary">
            Annuler
          </ActionButton>
          <ActionButton type="submit" form="company-profile-form" variant="primary" leadingIcon={<Save size={16} />}>
            Enregistrer les modifications
          </ActionButton>
        </div>
      ) : null}
    </section>
  );
}
