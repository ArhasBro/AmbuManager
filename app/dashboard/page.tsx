import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import {
  canAccessAdminDashboard,
  canManageUsers,
  canManageVehicles,
} from "@/lib/permissions";
import LogoutButton from "./logout-button";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const user = session.user;
  const userId = user.id;

  const [adminDashboardAllowed, usersAllowed, vehiclesAllowed] = userId
    ? await Promise.all([
        canAccessAdminDashboard(userId, user.role),
        canManageUsers(userId, user.role),
        canManageVehicles(userId, user.role),
      ])
    : [false, false, false];

  const companyProfileAllowed = user.role === "ADMIN" || user.role === "GERANT";
  const depotsAllowed = user.role === "ADMIN" || user.role === "GERANT";

  return (
    <div style={{ padding: 16, display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>Dashboard</h1>
        <LogoutButton />
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link href="/planning">Planning</Link>
      </div>

      {adminDashboardAllowed ? (
        <div style={{ display: "grid", gap: 8, padding: 12, border: "1px solid #333", borderRadius: 8 }}>
          <h2 style={{ margin: 0 }}>Dashboard admin</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {companyProfileAllowed ? <Link href="/company">Profil société</Link> : null}
            {depotsAllowed ? <Link href="/depots">Bases / dépôts</Link> : null}
            {usersAllowed ? <Link href="/users">Réinitialisation mot de passe</Link> : null}
            {vehiclesAllowed ? <Link href="/vehicles">Véhicules</Link> : null}
          </div>
        </div>
      ) : null}

      {process.env.NODE_ENV !== "production" ? (
        <div style={{ padding: 12, border: "1px solid #333", borderRadius: 8 }}>
          <h2 style={{ marginTop: 0 }}>Session (debug)</h2>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  );
}
