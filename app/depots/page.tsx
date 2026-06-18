import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Ambulance, FileArchive, Landmark, Plus, UsersRound, type LucideIcon } from "lucide-react";

import { AccessDeniedState, ActionButton, PageHeader, StatusBadge } from "@/app/ui";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import DepotsClient from "./depots-client";

function canManageDepots(role?: string) {
  return role === "ADMIN" || role === "GERANT";
}

type DepotKpi = {
  label: string;
  value: number;
  hint: string;
  Icon: LucideIcon;
  toneClass: string;
};

export default async function DepotsPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id || !user.companyId) redirect("/login");
  if (!canManageDepots(user.role)) {
    return (
      <main className="page-wrap">
        <AccessDeniedState />
      </main>
    );
  }

  const depots = await prisma.depot.findMany({
    where: { companyId: user.companyId },
    orderBy: [{ isActive: "desc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      address: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          vehicles: true,
          users: true,
        },
      },
    },
  });

  const activeCount = depots.filter((depot) => depot.isActive).length;
  const archivedCount = depots.length - activeCount;
  const attachedVehicleCount = depots.reduce((total, depot) => total + depot._count.vehicles, 0);
  const attachedUserCount = depots.reduce((total, depot) => total + depot._count.users, 0);
  const kpis: DepotKpi[] = [
    {
      label: "Dépôts actifs",
      value: activeCount,
      hint: `sur ${depots.length} dépôts`,
      Icon: Landmark,
      toneClass: "depots-kpi-card--violet",
    },
    {
      label: "Archivés",
      value: archivedCount,
      hint: `sur ${depots.length} dépôts`,
      Icon: FileArchive,
      toneClass: "depots-kpi-card--orange",
    },
    {
      label: "Véhicules rattachés",
      value: attachedVehicleCount,
      hint: "au total",
      Icon: Ambulance,
      toneClass: "depots-kpi-card--turquoise",
    },
    {
      label: "Utilisateurs rattachés",
      value: attachedUserCount,
      hint: "au total",
      Icon: UsersRound,
      toneClass: "depots-kpi-card--blue",
    },
  ];

  return (
    <section className="depots-section">
      <PageHeader
        eyebrow="Référentiel société"
        title="Dépôts / Bases"
        description="Gérez les bases de rattachement de vos équipes et véhicules."
        meta={
          <StatusBadge variant="info" icon={<Landmark size={12} strokeWidth={2.1} />}>
            {depots.length} dépôt{depots.length > 1 ? "s" : ""}
          </StatusBadge>
        }
        actions={
          <ActionButton href="#depots-create-form" variant="primary" leadingIcon={<Plus size={16} />}>
            Créer un dépôt
          </ActionButton>
        }
      />

      <div className="depots-grid-stats">
        {kpis.map((kpi) => (
          <article key={kpi.label} className={`depots-kpi-card ${kpi.toneClass}`}>
            <span className="depots-kpi-card__icon" aria-hidden="true">
              <kpi.Icon size={18} strokeWidth={2.1} />
            </span>
            <div className="depots-kpi-card__copy">
              <p className="depots-kpi-card__label">{kpi.label}</p>
              <strong className="depots-kpi-card__value">{kpi.value}</strong>
              <p className="depots-kpi-card__hint">{kpi.hint}</p>
            </div>
          </article>
        ))}
      </div>

      <DepotsClient
        initialDepots={depots.map((depot) => ({
          id: depot.id,
          name: depot.name,
          address: depot.address,
          isActive: depot.isActive,
          vehicleCount: depot._count.vehicles,
          userCount: depot._count.users,
          createdAt: depot.createdAt.toISOString(),
          updatedAt: depot.updatedAt.toISOString(),
        }))}
      />
    </section>
  );
}
