import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

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

  return (
    <div style={{ padding: 16, display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0 }}>Bases / dépôts</h1>
          <p style={{ margin: "8px 0 0 0", opacity: 0.8 }}>
            Gestion minimale ALPHA des dépôts de la société courante : création, édition de nom/adresse et archivage logique.
          </p>
        </div>

        <Link href="/dashboard">Retour dashboard</Link>
      </div>

      <DepotsClient
        initialDepots={depots.map((depot) => ({
          ...depot,
          createdAt: depot.createdAt.toISOString(),
          updatedAt: depot.updatedAt.toISOString(),
        }))}
      />
    </div>
  );
}
