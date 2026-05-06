import { getServerSession } from "next-auth/next";
import {
  Ambulance,
  ArrowRight,
  Building2,
  CalendarDays,
  FileText,
  GraduationCap,
  Landmark,
  Mail,
  ShieldCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
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
  canViewAudit,
  canViewGlobalPlanning,
  canViewSelfPlanning,
} from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { EmptyState, PageHeader, StatCard, StatusBadge, type StatusBadgeVariant } from "@/app/ui";


type DashboardCardTone = "blue" | "teal" | "violet" | "amber" | "slate";

type DashboardLink = {
  href: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  tone: DashboardCardTone;
  statusLabel: string;
  statusVariant: StatusBadgeVariant;
};

type DashboardMetric = {
  label: string;
  value: number;
  total: number;
  tone: "neutral" | "info" | "success" | "warning";
  Icon: LucideIcon;
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

function SectionCard({
  title,
  description,
  href,
  Icon,
  tone,
  statusLabel,
  statusVariant,
}: DashboardLink) {
  return (
    <Link href={href} className="dashboard-link-card">
      <div className="dashboard-link-card__head">
        <span className={`dashboard-link-card__icon dashboard-link-card__icon--${tone}`} aria-hidden="true">
          <Icon size={20} strokeWidth={2.2} />
        </span>
        <div className="dashboard-link-card__copy">
          <strong className="dashboard-link-card__title">{title}</strong>
          <span className="dashboard-link-card__description">{description}</span>
        </div>
      </div>

      <StatusBadge variant={statusVariant}>{statusLabel}</StatusBadge>

      <span className="dashboard-link-card__action">
        <span>Ouvrir</span>
        <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
      </span>
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
    auditAllowed,
  ] = await Promise.all([
    canAccessAdminDashboard(user.id, user.role, user.platformRole),
    canAccessTerrainDashboard(user.id, user.role, user.platformRole),
    canViewSelfPlanning(user.id, user.role, user.platformRole),
    canViewGlobalPlanning(user.id, user.role, user.platformRole),
    canManageUsers(user.id, user.role, user.platformRole),
    canManageVehicles(user.id, user.role, user.platformRole),
    canManageTemplates(user.id, user.role, user.platformRole),
    canManageCompanyRules(user.id, user.role, user.platformRole),
    canViewAudit(user.id, user.role, user.platformRole),
  ]);

  const companyId = user.companyId ?? null;
  const supportActor = user.platformRole === "SUPPORT";
  const companyProfileAllowed = user.role === "ADMIN" || user.role === "GERANT";
  const depotsAllowed = companyProfileAllowed;
  const companyScopedSession = Boolean(companyId);
  const planningAllowed = companyScopedSession && (planningSelfAllowed || planningGlobalAllowed);
  const nativeAdminMetricsAllowed = Boolean(companyId) && companyProfileAllowed;

  const [activeUsersCount, totalUsersCount, activeVehiclesCount, totalVehiclesCount, activeDepotsCount, totalDepotsCount, activeTemplatesCount, totalTemplatesCount] =
    nativeAdminMetricsAllowed && companyId
      ? await Promise.all([
          prisma.user.count({
            where: {
              companyId,
              isActive: true,
              platformRole: null,
            },
          }),
          prisma.user.count({
            where: {
              companyId,
              platformRole: null,
            },
          }),
          prisma.vehicle.count({
            where: {
              companyId,
              isActive: true,
            },
          }),
          prisma.vehicle.count({
            where: {
              companyId,
            },
          }),
          prisma.depot.count({
            where: {
              companyId,
              isActive: true,
            },
          }),
          prisma.depot.count({
            where: {
              companyId,
            },
          }),
          prisma.shiftTemplate.count({
            where: {
              companyId,
              isActive: true,
              archivedAt: null,
            },
          }),
          prisma.shiftTemplate.count({
            where: {
              companyId,
              archivedAt: null,
            },
          }),
        ])
      : [0, 0, 0, 0, 0, 0, 0, 0];

  const metrics: DashboardMetric[] = nativeAdminMetricsAllowed
    ? [
        {
          label: "Utilisateurs actifs",
          value: activeUsersCount,
          total: totalUsersCount,
          tone: "info",
          Icon: UsersRound,
        },
        {
          label: "Vehicules actifs",
          value: activeVehiclesCount,
          total: totalVehiclesCount,
          tone: "success",
          Icon: Ambulance,
        },
        {
          label: "Depots actifs",
          value: activeDepotsCount,
          total: totalDepotsCount,
          tone: "neutral",
          Icon: Landmark,
        },
        {
          label: "Templates actifs",
          value: activeTemplatesCount,
          total: totalTemplatesCount,
          tone: "warning",
          Icon: FileText,
        },
      ]
    : [];

  const terrainLinks: DashboardLink[] = planningAllowed
    ? [
        {
          href: "/planning",
          title: planningGlobalAllowed ? "Planning" : "Mon planning",
          description: planningGlobalAllowed
            ? "Consulter le planning de la societe selon vos droits reels."
            : "Acceder a votre planning sans exposer les modules d'administration.",
          Icon: CalendarDays,
          tone: "blue",
          statusLabel: "Disponible",
          statusVariant: "success",
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
      Icon: Building2,
      tone: "slate",
      statusLabel: companyProfileAllowed ? "Disponible" : "Selon permissions",
      statusVariant: companyProfileAllowed ? "success" : "warning",
    });
  }

  if (companyScopedSession && companyProfileAllowed) {
    adminLinks.push({
      href: "/onboarding",
      title: "Onboarding",
      description: "Parcours manuel guide et imports initiaux simples pour demarrer.",
      Icon: GraduationCap,
      tone: "violet",
      statusLabel: "Disponible",
      statusVariant: "success",
    });
  }

  if (companyScopedSession && depotsAllowed) {
    adminLinks.push({
      href: "/depots",
      title: "Depots / bases",
      description: "Gerer les depots actifs de la societe courante.",
      Icon: Landmark,
      tone: "violet",
      statusLabel: "Disponible",
      statusVariant: "success",
    });
  }

  if (companyScopedSession && usersAllowed) {
    adminLinks.push({
      href: "/users",
      title: "Utilisateurs / RH",
      description: "Creer, modifier, archiver et administrer les comptes de la societe.",
      Icon: UsersRound,
      tone: "teal",
      statusLabel: "Disponible",
      statusVariant: "success",
    });
  }

  if (companyScopedSession && vehiclesAllowed) {
    adminLinks.push({
      href: "/vehicles",
      title: "Vehicules",
      description: "Consulter et gerer la flotte reellement autorisee.",
      Icon: Ambulance,
      tone: "blue",
      statusLabel: "Disponible",
      statusVariant: "success",
    });
  }

  if (companyScopedSession && templatesAllowed) {
    adminLinks.push({
      href: "/templates",
      title: "Templates",
      description: "Gerer les templates de shifts disponibles dans le depot.",
      Icon: FileText,
      tone: "amber",
      statusLabel: "Disponible",
      statusVariant: "success",
    });
  }

  if ((companyScopedSession || supportActor) && auditAllowed) {
    adminLinks.push({
      href: "/audit",
      title: "Audit",
      description: "Consulter les evenements de securite, support et modifications recentes.",
      Icon: ShieldCheck,
      tone: "slate",
      statusLabel: "Disponible",
      statusVariant: "success",
    });
  }

  const showTerrainSection = terrainDashboardAllowed || terrainLinks.length > 0;
  const showAdminSection = adminDashboardAllowed || adminLinks.length > 0;
  const moduleLinks = [...terrainLinks, ...adminLinks].sort((a, b) => {
    const order = ["/planning", "/users", "/vehicles", "/templates", "/company", "/depots", "/onboarding", "/audit"];
    const rankA = order.indexOf(a.href);
    const rankB = order.indexOf(b.href);
    const safeA = rankA === -1 ? Number.MAX_SAFE_INTEGER : rankA;
    const safeB = rankB === -1 ? Number.MAX_SAFE_INTEGER : rankB;
    return safeA - safeB;
  });
  const visibleModuleCount = moduleLinks.length;

  return (
    <div className="page-wrap">
      <PageHeader
        title="Tableau de bord"
        description="Portail d'acces aux modules de gestion de votre societe ambulanciere."
      />

      <section className="panel dashboard-welcome">
        <div className="dashboard-profile">
          <span className="dashboard-profile__avatar" aria-hidden="true">
            {(user.name ?? user.email ?? "U").slice(0, 2).toUpperCase()}
          </span>
          <div className="dashboard-profile__copy">
            <h2 className="dashboard-welcome__title">
              Connecte en tant que {user.name ?? user.email ?? "Utilisateur"}
            </h2>
            <div className="dashboard-profile__meta">
              <span>
                <Mail size={14} strokeWidth={2.2} aria-hidden="true" />
                {user.email ?? "email non renseigne"}
              </span>
              <span>
                <Building2 size={14} strokeWidth={2.2} aria-hidden="true" />
                {companyScopedSession ? "Societe rattachee" : "Societe non rattachee"}
              </span>
            </div>
          </div>
        </div>

        <div className="dashboard-welcome__badges">
          <StatusBadge variant="info">Profil : {getProfileLabel(user.role, user.platformRole)}</StatusBadge>
          <StatusBadge variant={companyScopedSession ? "success" : "warning"}>Acces : {companyScopedSession ? "normal" : "limite"}</StatusBadge>
          <StatusBadge variant="neutral">Modules visibles : {visibleModuleCount}</StatusBadge>
        </div>
      </section>

      {!companyScopedSession ? (
        <section className="panel status-warning dashboard-warning">
          <strong>Compte sans societe courante</strong>
          <p>
            La session n&apos;est pas rattachee a une societe cliente. Les modules societe restent masques.
          </p>
        </section>
      ) : null}

      {showTerrainSection || showAdminSection ? (
        <section className="panel dashboard-section">
          <header className="dashboard-section__head">
            <h2 className="dashboard-section__title">Modules d&apos;acces</h2>
            <p className="dashboard-section__description">
              Les cartes ci-dessous respectent les permissions de la session active.
            </p>
          </header>

          {metrics.length > 0 ? (
            <div className="dashboard-metrics-grid">
              {metrics.map((metric) => (
                <StatCard
                  key={metric.label}
                  title={metric.label}
                  value={metric.value}
                  hint={`sur ${metric.total}`}
                  tone={metric.tone}
                  icon={<metric.Icon size={18} strokeWidth={2.1} />}
                />
              ))}
            </div>
          ) : null}

          {moduleLinks.length > 0 ? (
            <div className="dashboard-card-grid">
              {moduleLinks.map((link) => (
                <SectionCard key={link.href} {...link} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Aucun module disponible"
              message="Aucun module supplementaire n'est reellement accessible."
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

    </div>
  );
}
