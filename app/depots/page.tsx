import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Ambulance, FileArchive, Landmark, UsersRound } from "lucide-react";

import { PageHeader, StatCard } from "@/app/ui";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import DepotsClient from "./depots-client";

function canManageDepots(role?: string) {
  return role === "ADMIN" || role === "GERANT";
}

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

  return (
    <section className="depots-section">
      <PageHeader
        title="Depots / bases"
        description="Gerez les bases de rattachement de vos equipes et vehicules."
      />

      <div className="depots-grid-stats">
        <StatCard
          title="Depots actifs"
          value={activeCount}
          hint={`sur ${depots.length} depots`}
          tone="warning"
          icon={<Landmark size={16} />}
        />
        <StatCard
          title="Archives"
          value={archivedCount}
          hint={`sur ${depots.length} depots`}
          tone="neutral"
          icon={<FileArchive size={16} />}
        />
        <StatCard
          title="Vehicules rattaches"
          value={attachedVehicleCount}
          hint="au total"
          tone="success"
          icon={<Ambulance size={16} />}
        />
        <StatCard
          title="Utilisateurs rattaches"
          value={attachedUserCount}
          hint="au total"
          tone="info"
          icon={<UsersRound size={16} />}
        />
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
