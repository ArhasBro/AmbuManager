import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Ambulance, FileArchive, Landmark, Plus, UsersRound, type LucideIcon } from "lucide-react";

import { PageHeader } from "@/app/ui";
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
  if (!canManageDepots(user.role)) redirect("/login");

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
        title="Dépôts / bases"
        description="Gérez les bases de rattachement de vos équipes et véhicules."
        actions={
          <a href="#depots-create-form" className="ui-action-button ui-action-button--primary ui-action-button--md">
            <span className="ui-action-button__icon" aria-hidden="true">
              <Plus size={16} />
            </span>
            <span className="ui-action-button__label">Créer un dépôt</span>
          </a>
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
