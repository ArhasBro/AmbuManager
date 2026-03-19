import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { canManageUsers } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

import ResetPasswordClient from "./reset-password-client";
import UserDepotAssignmentClient from "./user-depot-assignment-client";

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
          <p style={{ margin: "8px 0 0 0", opacity: 0.8 }}>
            Gestion minimale ALPHA des utilisateurs de société : réinitialisation de mot de passe et rattachement à une base. Les comptes support globaux sont exclus de ces flux client.
          </p>
        </div>

        <Link href="/dashboard">Retour dashboard</Link>
      </div>

      <UserDepotAssignmentClient availableDepots={depots} />
      <ResetPasswordClient actorUserId={user.id} />
    </div>
  );
}
