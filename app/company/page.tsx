import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

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
    <div style={{ padding: 16, display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0 }}>Profil société</h1>
          <p style={{ margin: "8px 0 0 0", opacity: 0.8 }}>
            Consultation et édition minimales de la société courante sur le périmètre ALPHA.
          </p>
        </div>

        <Link href="/dashboard">Retour dashboard</Link>
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
        <section
          style={{
            display: "grid",
            gap: 8,
            padding: 16,
            border: "1px solid #ddd",
            borderRadius: 10,
            maxWidth: 720,
          }}
        >
          <strong>Profil société</strong>
          <p style={{ margin: 0, opacity: 0.8 }}>
            L’édition du profil société reste réservée aux comptes ADMIN / GERANT.
          </p>
        </section>
      )}

      {canManageRules ? <CompanyRulesPanel /> : null}
    </div>
  );
}
