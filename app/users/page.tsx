import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { canManageUsers } from "@/lib/permissions";

import ResetPasswordClient from "./reset-password-client";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id || !user.companyId) redirect("/login");
  if (!(await canManageUsers(user.id, user.role))) redirect("/login");

  return (
    <div style={{ padding: 16, display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0 }}>Utilisateurs — réinitialisation mot de passe</h1>
          <p style={{ margin: "8px 0 0 0", opacity: 0.8 }}>
            Action réservée à l&apos;admin / gérant ou à un profil disposant de la permission fine de gestion utilisateurs.
          </p>
        </div>

        <Link href="/dashboard">Retour dashboard</Link>
      </div>

      <ResetPasswordClient actorUserId={user.id} />
    </div>
  );
}
