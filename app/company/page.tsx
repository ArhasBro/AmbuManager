import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import CompanyProfileForm from "./company-profile-form";

function canManageCompanyProfile(role?: string) {
  return role === "ADMIN" || role === "GERANT";
}

export default async function CompanyPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id || !user.companyId) redirect("/login");
  if (!canManageCompanyProfile(user.role)) redirect("/login");

  const company = await prisma.company.findUnique({
    where: { id: user.companyId },
    select: {
      name: true,
      managerNames: true,
      address: true,
      phone: true,
      siret: true,
    },
  });

  if (!company) redirect("/login");

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

      <CompanyProfileForm
        initialProfile={{
          name: company.name ?? "",
          managerNames: company.managerNames ?? "",
          address: company.address ?? "",
          phone: company.phone ?? "",
          siret: company.siret ?? "",
        }}
      />
    </div>
  );
}
