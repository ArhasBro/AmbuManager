import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import {
  canAccessAdminDashboard,
  canAccessTerrainDashboard,
  canManageCompanyRules,
  canManageTemplates,
  canManageUsers,
  canManageVehicles,
  canViewGlobalPlanning,
  canViewSelfPlanning,
} from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { EmptyState, PageHeader, StatCard, StatusBadge } from "@/app/ui";

import LogoutButton from "./logout-button";

type DashboardLink = {
  href: string;
  title: string;
  description: string;
};

type DashboardMetric = {
  label: string;
  value: number;
};

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Administration",
  GERANT: "Gerance",
  BUREAU: "Bureau",
  ADE: "Ambulancier diplome d'Etat",
  AA: "Auxiliaire ambulancier",
  TAXI: "Taxi",
  REGULATEUR: "Regulation",
};

function getProfileLabel(role?: string | null, platformRole?: string | null): string {
  if (platformRole === "SUPPORT") return "Support global";
  if (!role) return "Profil non renseigne";
  return ROLE_LABELS[role] ?? role;
}

function SectionCard({ title, description, href }: DashboardLink) {
  return (
    <Link
      href={href}
      style={{
        display: "grid",
        gap: 8,
        padding: 16,
        border: "1px solid var(--ui-border)",
        borderRadius: 12,
        color: "inherit",
        textDecoration: "none",
        background: "var(--ui-surface)",
        minHeight: 112,
      }}
    >
      <strong style={{ fontSize: 16 }}>{title}</strong>
      <span style={{ opacity: 0.82, lineHeight: 1.45 }}>{description}</span>
      <span style={{ fontWeight: 600 }}>Ouvrir</span>
    </Link>
  );
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const user = session.user;

  if (!user.id) redirect("/login");

  const [
    adminDashboardAllowed,
    terrainDashboardAllowed,
    planningSelfAllowed,
    planningGlobalAllowed,
    usersAllowed,
    vehiclesAllowed,
    templatesAllowed,
    companyRulesAllowed,
  ] = await Promise.all([
    canAccessAdminDashboard(user.id, user.role, user.platformRole),
    canAccessTerrainDashboard(user.id, user.role, user.platformRole),
    canViewSelfPlanning(user.id, user.role, user.platformRole),
    canViewGlobalPlanning(user.id, user.role, user.platformRole),
    canManageUsers(user.id, user.role, user.platformRole),
    canManageVehicles(user.id, user.role, user.platformRole),
    canManageTemplates(user.id, user.role, user.platformRole),
    canManageCompanyRules(user.id, user.role, user.platformRole),
  ]);

  const companyId = user.companyId ?? null;
  const companyProfileAllowed = user.role === "ADMIN" || user.role === "GERANT";
  const depotsAllowed = companyProfileAllowed;
  const companyScopedSession = Boolean(companyId);
  const planningAllowed = companyScopedSession && (planningSelfAllowed || planningGlobalAllowed);
  const nativeAdminMetricsAllowed = Boolean(companyId) && companyProfileAllowed;

  const [activeUsersCount, activeVehiclesCount, activeDepotsCount, activeTemplatesCount] =
    nativeAdminMetricsAllowed && companyId
      ? await Promise.all([
          prisma.user.count({
            where: {
              companyId,
              isActive: true,
              platformRole: null,
            },
          }),
          prisma.vehicle.count({
            where: {
              companyId,
              isActive: true,
            },
          }),
          prisma.depot.count({
            where: {
              companyId,
              isActive: true,
            },
          }),
          prisma.shiftTemplate.count({
            where: {
              companyId,
              isActive: true,
              archivedAt: null,
            },
          }),
        ])
      : [0, 0, 0, 0];

  const metrics: DashboardMetric[] = nativeAdminMetricsAllowed
    ? [
        { label: "Utilisateurs actifs", value: activeUsersCount },
        { label: "Vehicules actifs", value: activeVehiclesCount },
        { label: "Depots actifs", value: activeDepotsCount },
        { label: "Templates actifs", value: activeTemplatesCount },
      ]
    : [];

  const terrainLinks: DashboardLink[] = planningAllowed
    ? [
        {
          href: "/planning",
          title: planningGlobalAllowed ? "Planning global" : "Mon planning",
          description: planningGlobalAllowed
            ? "Consulter le planning de la societe selon vos droits reels."
            : "Acceder a votre planning sans exposer les modules d'administration.",
        },
      ]
    : [];

  const adminLinks: DashboardLink[] = [];

  if (companyScopedSession && (companyProfileAllowed || companyRulesAllowed)) {
    adminLinks.push({
      href: "/company",
      title: "Societe",
      description: companyProfileAllowed
        ? "Profil societe et regles metier de la societe courante."
        : "Acces aux regles metier deleguees sur la societe courante.",
    });
  }

  if (companyScopedSession && companyProfileAllowed) {
    adminLinks.push({
      href: "/onboarding",
      title: "Onboarding societe pilote",
      description: "Parcours manuel guide et imports initiaux simples pour demarrer.",
    });
  }

  if (companyScopedSession && depotsAllowed) {
    adminLinks.push({
      href: "/depots",
      title: "Bases / depots",
      description: "Gerer les depots actifs de la societe courante.",
    });
  }

  if (companyScopedSession && usersAllowed) {
    adminLinks.push({
      href: "/users",
      title: "Utilisateurs",
      description: "Creer, modifier, archiver et administrer les comptes de la societe.",
    });
  }

  if (companyScopedSession && vehiclesAllowed) {
    adminLinks.push({
      href: "/vehicles",
      title: "Vehicules",
      description: "Consulter et gerer la flotte reellement autorisee.",
    });
  }

  if (companyScopedSession && templatesAllowed) {
    adminLinks.push({
      href: "/templates",
      title: "Templates",
      description: "Gerer les templates de shifts disponibles dans le depot.",
    });
  }

  const showTerrainSection = terrainDashboardAllowed || terrainLinks.length > 0;
  const showAdminSection = adminDashboardAllowed;

  return (
    <div className="page-wrap">
      <PageHeader
        title="Portail d'accueil"
        description="Vue metier des acces modules filtres par role et permissions."
        actions={<LogoutButton />}
      />

      <section className="panel" style={{ display: "grid", gap: 8 }}>
        <strong>Bienvenue {user.name ?? user.email ?? "Utilisateur"}</strong>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <StatusBadge variant="info">
            Profil : {getProfileLabel(user.role, user.platformRole)}
          </StatusBadge>
          <StatusBadge variant={companyScopedSession ? "success" : "warning"}>
            Societe : {companyScopedSession ? "rattachee" : "non rattachee"}
          </StatusBadge>
        </div>
        <p style={{ margin: 0, opacity: 0.82 }}>
          Les liens ci-dessous sont filtres pour eviter les entrees qui ne debouchent pas sur un acces reel.
        </p>
      </section>

      {!companyScopedSession ? (
        <section className="panel status-warning" style={{ display: "grid", gap: 8 }}>
          <strong>Compte sans societe courante</strong>
          <p style={{ margin: 0, opacity: 0.85 }}>
            La session n&apos;est pas rattachee a une societe cliente. Les modules societe restent masques.
          </p>
        </section>
      ) : null}

      {showTerrainSection ? (
        <section className="panel" style={{ display: "grid", gap: 12 }}>
          <div>
            <h2 style={{ margin: 0 }}>Vue terrain</h2>
            <p style={{ margin: "8px 0 0 0", opacity: 0.82 }}>
              Orientation vers les acces operationnels sans exposition des modules d&apos;administration.
            </p>
          </div>

          {terrainLinks.length > 0 ? (
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              {terrainLinks.map((link) => (
                <SectionCard key={link.href} {...link} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Aucun module terrain disponible"
              message="Aucun module terrain supplementaire n'est actuellement exploitable."
            />
          )}
        </section>
      ) : null}

      {showAdminSection ? (
        <section className="panel" style={{ display: "grid", gap: 12 }}>
          <div>
            <h2 style={{ margin: 0 }}>Vue admin / gerance</h2>
            <p style={{ margin: "8px 0 0 0", opacity: 0.82 }}>
              Distribution des acces administratifs selon les permissions reellement consommees.
            </p>
          </div>

          {metrics.length > 0 ? (
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
              {metrics.map((metric) => (
                <StatCard
                  key={metric.label}
                  title={metric.label}
                  value={metric.value}
                  hint="Elements actifs"
                />
              ))}
            </div>
          ) : null}

          {adminLinks.length > 0 ? (
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              {adminLinks.map((link) => (
                <SectionCard key={link.href} {...link} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Aucun module administratif disponible"
              message="Aucun module administratif supplementaire n'est reellement accessible."
            />
          )}
        </section>
      ) : null}

      {!showTerrainSection && !showAdminSection && companyScopedSession ? (
        <EmptyState
          title="Aucun acces module exploitable"
          message="Aucun module n'est actuellement publie sur le dashboard pour cette session."
        />
      ) : null}

      {process.env.NODE_ENV !== "production" ? (
        <div className="panel-soft">
          <h2 style={{ marginTop: 0 }}>Session (debug)</h2>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{JSON.stringify(session, null, 2)}</pre>
        </div>
      ) : null}
    </div>
  );
}
