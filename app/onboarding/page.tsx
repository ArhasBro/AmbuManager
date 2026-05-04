import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { PageHeader, StatCard, StatusBadge } from "@/app/ui";
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
  const completedSteps = [
    profileComplete,
    depotsCount > 0,
    usersCount > 0,
    vehiclesCount > 0,
    templatesCount > 0,
    absencesCount > 0,
  ].filter(Boolean).length;

  return (
    <section className="page-wrap onboarding-page">
      <PageHeader
        title="Onboarding societe pilote"
        description="Parcours manuel guide et imports initiaux simples ALPHA, sans import obligatoire."
      />

      <section className="panel onboarding-summary">
        <div className="onboarding-summary__head">
          <h2 className="onboarding-summary__title">Etat global du demarrage</h2>
          <p className="onboarding-summary__description">
            Le parcours reste non destructeur : chaque etape peut etre executee manuellement selon l&apos;ordre recommande.
          </p>
        </div>

        <div className="onboarding-summary__badges">
          <StatusBadge variant={completedSteps === 6 ? "success" : "warning"}>
            {completedSteps === 6 ? "Parcours complet" : "Parcours en cours"}
          </StatusBadge>
          <StatusBadge variant="neutral">{completedSteps}/6 etapes completees</StatusBadge>
        </div>

        <div className="onboarding-summary__stats">
          <StatCard title="Depots actifs" value={depotsCount} hint="Etape 2" tone={depotsCount > 0 ? "success" : "warning"} />
          <StatCard title="Utilisateurs actifs" value={usersCount} hint="Etape 3" tone={usersCount > 0 ? "success" : "warning"} />
          <StatCard title="Vehicules actifs" value={vehiclesCount} hint="Etape 4" tone={vehiclesCount > 0 ? "success" : "warning"} />
          <StatCard title="Templates actifs" value={templatesCount} hint="Etape 5" tone={templatesCount > 0 ? "success" : "warning"} />
        </div>
      </section>

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

