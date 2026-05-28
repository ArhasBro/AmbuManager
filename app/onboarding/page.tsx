import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { PageHeader } from "@/app/ui";
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
    <section className="page-wrap onboarding-page">
      <PageHeader
        title="Mise en route société pilote"
        description="Préparez les données nécessaires avant la première exploitation réelle."
      />

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
    </section>
  );
}

