import { getServerSession } from "next-auth/next";
import {
  Ambulance,
  ArrowRight,
  Building2,
  CalendarDays,
  FileText,
  GraduationCap,
  Landmark,
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
  hint: string;
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
        Ouvrir
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
        {
          label: "Utilisateurs actifs",
          value: activeUsersCount,
          hint: "Comptes en activite",
          tone: "info",
          Icon: UsersRound,
        },
        {
          label: "Vehicules actifs",
          value: activeVehiclesCount,
          hint: "Flotte operationnelle",
          tone: "success",
          Icon: Ambulance,
        },
        {
          label: "Depots actifs",
          value: activeDepotsCount,
          hint: "Bases en service",
          tone: "neutral",
          Icon: Landmark,
        },
        {
          label: "Templates actifs",
          value: activeTemplatesCount,
          hint: "Modeles disponibles",
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
      title: "Bases / depots",
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
      title: "Utilisateurs",
      description: "Creer, modifier, archiver et administrer les comptes de la societe.",
      Icon: UsersRound,
      tone: "blue",
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
      tone: "teal",
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
  const visibleModuleCount = terrainLinks.length + adminLinks.length;

  return (
    <div className="page-wrap">
      <PageHeader
        title="Tableau de bord"
        description="Portail d'acces aux modules de gestion de votre societe ambulanciere."
      />

      <section className="panel dashboard-welcome">
        <h2 className="dashboard-welcome__title">
          Connecte en tant que {user.name ?? user.email ?? "Utilisateur"}
        </h2>
        <div className="dashboard-welcome__badges">
          <StatusBadge variant="info">
            Profil : {getProfileLabel(user.role, user.platformRole)}
          </StatusBadge>
          <StatusBadge variant={companyScopedSession ? "success" : "warning"}>
            Societe : {companyScopedSession ? "rattachee" : "non rattachee"}
          </StatusBadge>
          <StatusBadge variant="neutral">Modules visibles : {visibleModuleCount}</StatusBadge>
        </div>
        <p className="dashboard-welcome__note">
          Les liens ci-dessous sont filtres pour eviter les entrees qui ne debouchent pas sur un acces reel.
        </p>
      </section>

      {!companyScopedSession ? (
        <section className="panel status-warning dashboard-warning">
          <strong>Compte sans societe courante</strong>
          <p>
            La session n&apos;est pas rattachee a une societe cliente. Les modules societe restent masques.
          </p>
        </section>
      ) : null}

      {showTerrainSection ? (
        <section className="panel dashboard-section">
          <header className="dashboard-section__head">
            <h2 className="dashboard-section__title">Acces terrain</h2>
            <p className="dashboard-section__description">
              Orientation vers les acces operationnels sans exposition des modules d&apos;administration.
            </p>
          </header>

          {terrainLinks.length > 0 ? (
            <div className="dashboard-card-grid">
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
        <section className="panel dashboard-section">
          <header className="dashboard-section__head">
            <h2 className="dashboard-section__title">Acces administration</h2>
            <p className="dashboard-section__description">
              Distribution des acces administratifs selon les permissions reellement consommees.
            </p>
          </header>

          {metrics.length > 0 ? (
            <div className="dashboard-metrics-grid">
              {metrics.map((metric) => (
                <StatCard
                  key={metric.label}
                  title={metric.label}
                  value={metric.value}
                  hint={metric.hint}
                  tone={metric.tone}
                  icon={<metric.Icon size={18} strokeWidth={2.1} />}
                />
              ))}
            </div>
          ) : null}

          {adminLinks.length > 0 ? (
            <div className="dashboard-card-grid">
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

    </div>
  );
}
