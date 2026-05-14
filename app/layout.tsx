import "./globals.css";
import "./a24-vehicles-templates.css";
import "./a24-complementary-pages.css";
import "./a24-users-rh.css";
import { getServerSession } from "next-auth/next";

import AppShell, { type AppShellContext, type AppShellNavLink } from "./app-shell";
import Providers from "./providers";
import { authOptions } from "@/lib/auth";
import {
  canManageCompanyRules,
  canManageTemplates,
  canManageUsers,
  canManageVehicles,
  canViewAudit,
  canViewGlobalPlanning,
  canViewSelfPlanning,
} from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Administration",
  GERANT: "Gérance",
  BUREAU: "Bureau",
  ADE: "Ambulancier diplômé d'État",
  AA: "Auxiliaire ambulancier",
  TAXI: "Taxi",
  REGULATEUR: "Régulation",
};

function getRoleLabel(role?: string | null, platformRole?: string | null): string {
  if (platformRole === "SUPPORT") return "Support global";
  if (!role) return "Profil non renseigné";
  return ROLE_LABELS[role] ?? role;
}

function canManageCompanyProfile(role?: string | null): boolean {
  return role === "ADMIN" || role === "GERANT";
}

export const metadata = {
  title: "Ambulance Manager",
  description: "Gestion multi-entreprise",
};

async function getAppShellData(): Promise<{ navLinks: AppShellNavLink[]; context: AppShellContext }> {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const fallbackContext: AppShellContext = {
    companyLabel: "Session non connectée",
    userLabel: "Non connecté",
    roleLabel: "Aucun profil",
    canLogout: false,
  };

  if (!user?.id) {
    return { navLinks: [], context: fallbackContext };
  }

  const navLinks: AppShellNavLink[] = [{ href: "/dashboard", label: "Dashboard" }];
  const companyScopedSession = Boolean(user.companyId);
  const supportActor = user.platformRole === "SUPPORT";

  const companyProfileAllowed = canManageCompanyProfile(user.role);

  const [
    planningSelfAllowed,
    planningGlobalAllowed,
    usersAllowed,
    vehiclesAllowed,
    templatesAllowed,
    companyRulesAllowed,
    auditAllowed,
    company,
  ] = await Promise.all([
    canViewSelfPlanning(user.id, user.role, user.platformRole),
    canViewGlobalPlanning(user.id, user.role, user.platformRole),
    canManageUsers(user.id, user.role, user.platformRole),
    canManageVehicles(user.id, user.role, user.platformRole),
    canManageTemplates(user.id, user.role, user.platformRole),
    canManageCompanyRules(user.id, user.role, user.platformRole),
    canViewAudit(user.id, user.role, user.platformRole),
    user.companyId
      ? prisma.company.findUnique({
          where: { id: user.companyId },
          select: { name: true },
        })
      : Promise.resolve(null),
  ]);

  if (companyScopedSession && (planningSelfAllowed || planningGlobalAllowed)) navLinks.push({ href: "/planning", label: "Planning" });
  if (companyScopedSession && usersAllowed) navLinks.push({ href: "/users", label: "Utilisateurs / RH" });
  if (companyScopedSession && vehiclesAllowed) navLinks.push({ href: "/vehicles", label: "Véhicules" });
  if (companyScopedSession && templatesAllowed) navLinks.push({ href: "/templates", label: "Templates" });
  if (companyScopedSession && (companyProfileAllowed || companyRulesAllowed)) navLinks.push({ href: "/company", label: "Société" });
  if (companyScopedSession && companyProfileAllowed) navLinks.push({ href: "/depots", label: "Dépôts / bases" });
  if (companyScopedSession && companyProfileAllowed) navLinks.push({ href: "/onboarding", label: "Onboarding" });
  if ((companyScopedSession || supportActor) && auditAllowed) navLinks.push({ href: "/audit", label: "Audit" });

  const context: AppShellContext = {
    companyLabel: company?.name ?? (companyScopedSession ? "Société courante" : "Société non rattachée"),
    userLabel: user.name ?? user.email ?? "Utilisateur",
    roleLabel: getRoleLabel(user.role, user.platformRole),
    canLogout: true,
  };

  return { navLinks, context };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { navLinks, context } = await getAppShellData();

  return (
    <html lang="fr" data-theme="light" suppressHydrationWarning>
      <body>
        <Providers>
          <AppShell navLinks={navLinks} context={context}>
            {children}
          </AppShell>
        </Providers>
      </body>
    </html>
  );
}
