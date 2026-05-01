import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { PageHeader, StatCard } from "@/app/ui";
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

  if (canManageProfile) {
    const rows = await prisma.$queryRaw<CompanyProfileRow[]>`
      SELECT
        "name",
        "managerNames",
        "address",
        "phone",
        "siret"
      FROM "Company"
      WHERE "id" = ${user.companyId}
      LIMIT 1
    `;

    company = rows[0] ?? null;
    if (!company) redirect("/login");
  }

  return (
    <section className="company-section">
      <PageHeader
        title="Profil societe"
        description="Consultation et edition minimales de la societe courante sur le perimetre ALPHA."
        actions={<Link href="/dashboard" className="company-page__back-link">Retour dashboard</Link>}
      />

      <div className="company-grid-stats">
        <StatCard
          title="Edition profil"
          value={canManageProfile ? "Autorisee" : "Restreinte"}
          hint={canManageProfile ? "Comptes ADMIN / GERANT" : "Lecture seule"}
          tone={canManageProfile ? "success" : "warning"}
        />
        <StatCard
          title="Regles metier"
          value={canManageRules ? "Accessible" : "Restreint"}
          hint={canManageRules ? "Parametres visibles" : "Permission requise"}
          tone={canManageRules ? "info" : "neutral"}
        />
      </div>

      {canManageProfile && company ? (
        <CompanyProfileForm
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

      {canManageRules ? <CompanyRulesPanel /> : null}
    </section>
  );
}
