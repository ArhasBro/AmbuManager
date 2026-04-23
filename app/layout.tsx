import "./globals.css";
import { getServerSession } from "next-auth/next";

import AppShell, { type AppShellNavLink } from "./app-shell";
import Providers from "./providers";
import { authOptions } from "@/lib/auth";
import {
  canManageCompanyRules,
  canManageTemplates,
  canManageUsers,
  canManageVehicles,
  canViewGlobalPlanning,
  canViewSelfPlanning,
} from "@/lib/permissions";

function canManageCompanyProfile(role?: string | null): boolean {
  return role === "ADMIN" || role === "GERANT";
}

export const metadata = {
  title: "Ambulance Manager",
  description: "Gestion multi-entreprise",
};

async function getAppShellNavLinks(): Promise<AppShellNavLink[]> {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id) {
    return [];
  }

  const links: AppShellNavLink[] = [{ href: "/dashboard", label: "Dashboard" }];

  if (!user.companyId) {
    return links;
  }

  const [
    planningSelfAllowed,
    planningGlobalAllowed,
    usersAllowed,
    vehiclesAllowed,
    templatesAllowed,
    companyRulesAllowed,
  ] = await Promise.all([
    canViewSelfPlanning(user.id, user.role, user.platformRole),
    canViewGlobalPlanning(user.id, user.role, user.platformRole),
    canManageUsers(user.id, user.role, user.platformRole),
    canManageVehicles(user.id, user.role, user.platformRole),
    canManageTemplates(user.id, user.role, user.platformRole),
    canManageCompanyRules(user.id, user.role, user.platformRole),
  ]);

  const companyProfileAllowed = canManageCompanyProfile(user.role);

  if (planningSelfAllowed || planningGlobalAllowed) links.push({ href: "/planning", label: "Planning" });
  if (usersAllowed) links.push({ href: "/users", label: "Utilisateurs" });
  if (vehiclesAllowed) links.push({ href: "/vehicles", label: "Vehicules" });
  if (templatesAllowed) links.push({ href: "/templates", label: "Templates" });
  if (companyProfileAllowed || companyRulesAllowed) links.push({ href: "/company", label: "Societe" });
  if (companyProfileAllowed) links.push({ href: "/depots", label: "Depots" });

  return links;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navLinks = await getAppShellNavLinks();

  return (
    <html lang="fr">
      <body>
        <Providers>
          <AppShell navLinks={navLinks}>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
