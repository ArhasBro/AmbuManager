import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

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
    },
  });

  const activeCount = depots.filter((depot) => depot.isActive).length;
  const archivedCount = depots.length - activeCount;

  return (
    <section className="depots-section">
      <PageHeader
        title="Bases / depots"
        description="Gestion ALPHA des depots de la societe courante : creation, edition et archivage logique."
        actions={<Link href="/dashboard" className="depots-page__back-link">Retour dashboard</Link>}
      />

      <div className="depots-grid-stats">
        <StatCard title="Depots actifs" value={activeCount} hint="Disponibles a l'exploitation" tone="success" />
        <StatCard title="Depots archives" value={archivedCount} hint="Historique conserve" tone="neutral" />
        <StatCard title="Total depots" value={depots.length} hint="Perimetre societe courante" tone="info" />
      </div>

      <DepotsClient
        initialDepots={depots.map((depot) => ({
          ...depot,
          createdAt: depot.createdAt.toISOString(),
          updatedAt: depot.updatedAt.toISOString(),
        }))}
      />
    </section>
  );
}
