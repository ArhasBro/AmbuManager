import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { canManageTemplates, canManageUsers, canManageVehicles } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

import OnboardingClient from "./onboarding-client";

function canManageCompanyProfile(role?: string | null) {
  return role === "ADMIN" || role === "GERANT";
}

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id || !user.companyId) redirect("/login");
  if (!canManageCompanyProfile(user.role)) redirect("/dashboard");

  const [company, depotsCount, usersCount, vehiclesCount, templatesCount, absencesCount, usersAllowed, vehiclesAllowed, templatesAllowed] = await Promise.all([
    prisma.company.findUnique({
      where: { id: user.companyId },
      select: { id: true, name: true, managerNames: true, address: true, phone: true, siret: true },
    }),
    prisma.depot.count({ where: { companyId: user.companyId, isActive: true } }),
    prisma.user.count({ where: { companyId: user.companyId, isActive: true, platformRole: null, role: { not: null } } }),
    prisma.vehicle.count({ where: { companyId: user.companyId, isActive: true } }),
    prisma.shiftTemplate.count({ where: { companyId: user.companyId, archivedAt: null, isActive: true } }),
    prisma.userAbsence.count({ where: { companyId: user.companyId } }),
    canManageUsers(user.id, user.role, user.platformRole),
    canManageVehicles(user.id, user.role, user.platformRole),
    canManageTemplates(user.id, user.role, user.platformRole),
  ]);

  if (!company) redirect("/dashboard");

  const profileComplete = Boolean(company.name && company.managerNames && company.address && company.phone && company.siret);

  return (
    <main style={{ padding: 16, display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0 }}>Onboarding société pilote</h1>
          <p style={{ margin: "8px 0 0 0", opacity: 0.8 }}>
            Parcours manuel guidé + imports initiaux simples ALPHA, sans import obligatoire.
          </p>
        </div>
        <Link href="/dashboard">Retour dashboard</Link>
      </div>

      <OnboardingClient
        checklist={{
          profileComplete,
          depotsCount,
          usersCount,
          vehiclesCount,
          templatesCount,
          absencesCount,
        }}
        links={{
          company: "/company",
          depots: "/depots",
          users: usersAllowed ? "/users" : "/dashboard",
          vehicles: vehiclesAllowed ? "/vehicles" : "/dashboard",
          templates: templatesAllowed ? "/templates" : "/dashboard",
        }}
      />
    </main>
  );
}
