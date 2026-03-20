import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { canManageUsers } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

import ResetPasswordClient from "./reset-password-client";
import UserCreationClient from "./user-creation-client";
import UserDepotAssignmentClient from "./user-depot-assignment-client";
import UserArchiveClient from "./user-archive-client";
import UserEditClient from "./user-edit-client";
import UsersListClient from "./users-list-client";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id || !user.companyId) redirect("/login");
  if (!(await canManageUsers(user.id, user.role, user.platformRole))) redirect("/login");

  const depots = await prisma.depot.findMany({
    where: { companyId: user.companyId },
    orderBy: [{ isActive: "desc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      isActive: true,
    },
  });

  return (
    <div style={{ padding: 16, display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0 }}>Utilisateurs</h1>
          <p style={{ margin: "8px 0 0 0", opacity: 0.8, maxWidth: 960 }}>
            Base ALPHA d&apos;administration des utilisateurs de société. Cette page fournit une vraie liste exploitable pour consulter les comptes clients, rechercher un utilisateur, filtrer par rôle, puis utiliser les actions minimales déjà disponibles, dont l’archivage logique, sans exposer les comptes support globaux.
          </p>
        </div>

        <Link href="/dashboard">Retour dashboard</Link>
      </div>

      <UserCreationClient />
      <UsersListClient />
      <UserEditClient />
      <UserArchiveClient actorUserId={user.id} />
      <UserDepotAssignmentClient availableDepots={depots} />
      <ResetPasswordClient actorUserId={user.id} />
    </div>
  );
}
