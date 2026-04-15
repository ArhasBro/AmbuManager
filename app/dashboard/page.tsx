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
  GERANT: "Gérance",
  BUREAU: "Bureau",
  ADE: "Ambulancier diplômé d'État",
  AA: "Auxiliaire ambulancier",
  TAXI: "Taxi",
  REGULATEUR: "Régulation",
};

function getProfileLabel(role?: string | null, platformRole?: string | null): string {
  if (platformRole === "SUPPORT") return "Support global";
  if (!role) return "Profil non renseigné";
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
        border: "1px solid #d0d7de",
        borderRadius: 12,
        color: "inherit",
        textDecoration: "none",
        background: "#fff",
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
        { label: "Véhicules actifs", value: activeVehiclesCount },
        { label: "Dépôts actifs", value: activeDepotsCount },
        { label: "Templates actifs", value: activeTemplatesCount },
      ]
    : [];

  const terrainLinks: DashboardLink[] = planningAllowed
    ? [
        {
          href: "/planning",
          title: planningGlobalAllowed ? "Planning global" : "Mon planning",
          description: planningGlobalAllowed
            ? "Consulter le planning de la société selon vos droits réels."
            : "Accéder à votre planning sans exposer les modules d'administration.",
        },
      ]
    : [];

  const adminLinks: DashboardLink[] = [];

  if (companyScopedSession && (companyProfileAllowed || companyRulesAllowed)) {
    adminLinks.push({
      href: "/company",
      title: "Société",
      description: companyProfileAllowed
        ? "Profil société et règles métier de la société courante."
        : "Accès aux règles métier réellement déléguées sur la société courante.",
    });
  }

  if (companyScopedSession && depotsAllowed) {
    adminLinks.push({
      href: "/depots",
      title: "Bases / dépôts",
      description: "Gérer les dépôts actifs de la société courante.",
    });
  }

  if (companyScopedSession && usersAllowed) {
    adminLinks.push({
      href: "/users",
      title: "Utilisateurs",
      description: "Créer, modifier, archiver et administrer les comptes de la société.",
    });
  }

  if (companyScopedSession && vehiclesAllowed) {
    adminLinks.push({
      href: "/vehicles",
      title: "Véhicules",
      description: "Consulter et gérer la flotte réellement autorisée.",
    });
  }

  if (companyScopedSession && templatesAllowed) {
    adminLinks.push({
      href: "/templates",
      title: "Templates",
      description: "Gérer les templates de shifts déjà disponibles dans le dépôt.",
    });
  }

  const showTerrainSection = terrainDashboardAllowed || terrainLinks.length > 0;
  const showAdminSection = adminDashboardAllowed;

  return (
    <div style={{ padding: 16, display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0 }}>Portail d&apos;accueil</h1>
          <p style={{ margin: "8px 0 0 0", opacity: 0.82 }}>
            Dashboard ALPHA centré sur l&apos;orientation vers les modules réellement accessibles.
          </p>
        </div>
        <LogoutButton />
      </div>

      <section
        style={{
          display: "grid",
          gap: 8,
          padding: 16,
          border: "1px solid #d0d7de",
          borderRadius: 12,
          background: "#fff",
        }}
      >
        <strong>Bienvenue {user.name ?? user.email ?? "Utilisateur"}</strong>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span style={{ padding: "6px 10px", borderRadius: 999, background: "#f3f4f6" }}>
            Profil : {getProfileLabel(user.role, user.platformRole)}
          </span>
          <span style={{ padding: "6px 10px", borderRadius: 999, background: "#f3f4f6" }}>
            Société : {companyScopedSession ? "rattachée" : "non rattachée"}
          </span>
        </div>
        <p style={{ margin: 0, opacity: 0.82 }}>
          Les liens ci-dessous sont filtrés pour éviter d&apos;afficher des entrées qui ne débouchent pas sur un accès réellement exploitable.
        </p>
      </section>

      {!companyScopedSession ? (
        <section
          style={{
            display: "grid",
            gap: 8,
            padding: 16,
            border: "1px solid #f59e0b",
            borderRadius: 12,
            background: "#fffbeb",
          }}
        >
          <strong>Compte sans société courante</strong>
          <p style={{ margin: 0, opacity: 0.85 }}>
            Cette session n&apos;est pas rattachée à une société cliente. Le portail ALPHA n&apos;expose donc aucun module société tant qu&apos;un contexte société n&apos;est pas disponible.
          </p>
        </section>
      ) : null}

      {showTerrainSection ? (
        <section
          style={{
            display: "grid",
            gap: 12,
            padding: 16,
            border: "1px solid #d0d7de",
            borderRadius: 12,
            background: "#fff",
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>Vue terrain</h2>
            <p style={{ margin: "8px 0 0 0", opacity: 0.82 }}>
              Orientation simple vers les accès opérationnels, sans exposition des modules d&apos;administration.
            </p>
          </div>

          {terrainLinks.length > 0 ? (
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              {terrainLinks.map((link) => (
                <SectionCard key={link.href} {...link} />
              ))}
            </div>
          ) : (
            <p style={{ margin: 0, opacity: 0.82 }}>
              Aucun module terrain supplémentaire n&apos;est actuellement exploitable depuis cette session.
            </p>
          )}
        </section>
      ) : null}

      {showAdminSection ? (
        <section
          style={{
            display: "grid",
            gap: 12,
            padding: 16,
            border: "1px solid #d0d7de",
            borderRadius: 12,
            background: "#fff",
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>Vue admin / gérance</h2>
            <p style={{ margin: "8px 0 0 0", opacity: 0.82 }}>
              Distribution des accès administratifs selon les permissions réellement consommées par les pages cibles.
            </p>
          </div>

          {metrics.length > 0 ? (
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  style={{
                    display: "grid",
                    gap: 6,
                    padding: 16,
                    border: "1px solid #d0d7de",
                    borderRadius: 12,
                    background: "#f8fafc",
                  }}
                >
                  <span style={{ opacity: 0.78 }}>{metric.label}</span>
                  <strong style={{ fontSize: 28, lineHeight: 1 }}>{metric.value}</strong>
                </div>
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
            <p style={{ margin: 0, opacity: 0.82 }}>
              Aucun module administratif supplémentaire n&apos;est réellement accessible depuis cette session.
            </p>
          )}
        </section>
      ) : null}

      {!showTerrainSection && !showAdminSection && companyScopedSession ? (
        <section
          style={{
            display: "grid",
            gap: 8,
            padding: 16,
            border: "1px solid #d0d7de",
            borderRadius: 12,
            background: "#fff",
          }}
        >
          <strong>Aucun accès module exploitable</strong>
          <p style={{ margin: 0, opacity: 0.82 }}>
            Aucun module n&apos;est actuellement publié sur le dashboard pour cette session au regard des permissions et rôles réellement détectés.
          </p>
        </section>
      ) : null}

      {process.env.NODE_ENV !== "production" ? (
        <div style={{ padding: 12, border: "1px solid #333", borderRadius: 8 }}>
          <h2 style={{ marginTop: 0 }}>Session (debug)</h2>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{JSON.stringify(session, null, 2)}</pre>
        </div>
      ) : null}
    </div>
  );
}
