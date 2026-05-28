import { getServerSession } from "next-auth/next";
import {
  Ambulance,
  ArrowRight,
  Building2,
  CalendarDays,
  Mail,
  FileText,
  GraduationCap,
  Landmark,
  ShieldCheck,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { EmptyState, PageHeader, StatusBadge, type StatusBadgeVariant } from "@/app/ui";
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
  Icon: LucideIcon;
  hintLabel: string;
};

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Administrateur",
  GERANT: "Gérant",
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

  const [
    activeUsersCount,
    totalUsersCount,
    activeVehiclesCount,
    totalVehiclesCount,
    activeDepotsCount,
    totalDepotsCount,
    activeTemplatesCount,
    totalTemplatesCount,
    companyName,
  ] = nativeAdminMetricsAllowed && companyId
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
        prisma.company
          .findUnique({
            where: { id: companyId },
            select: { name: true },
          })
          .then((item) => item?.name ?? "Société non renseignée"),
      ])
    : [0, 0, 0, 0, 0, 0, 0, 0, "Société non renseignée"];

  const metrics: DashboardMetric[] = nativeAdminMetricsAllowed
    ? [
        { label: "Utilisateurs actifs", value: activeUsersCount, total: totalUsersCount, Icon: UsersRound, hintLabel: "utilisateurs" },
        { label: "Véhicules actifs", value: activeVehiclesCount, total: totalVehiclesCount, Icon: Ambulance, hintLabel: "véhicules" },
        { label: "Dépôts actifs", value: activeDepotsCount, total: totalDepotsCount, Icon: Landmark, hintLabel: "dépôts" },
        { label: "Modèles horaires actifs", value: activeTemplatesCount, total: totalTemplatesCount, Icon: FileText, hintLabel: "modèles horaires" },
      ]
    : [];

  const terrainLinks: DashboardLink[] = planningAllowed
    ? [
        {
          href: "/planning",
          title: "Planning",
          description: "Consultez le planning de la société selon vos droits.",
          Icon: CalendarDays,
          tone: "blue",
          statusLabel: "Disponible",
          statusVariant: "success",
        },
      ]
    : [];

  const adminLinks: DashboardLink[] = [];

  if (companyScopedSession && usersAllowed) {
    adminLinks.push({
      href: "/users",
      title: "Utilisateurs / RH",
      description: "Gérez les équipes, rôles et affectations.",
      Icon: UsersRound,
      tone: "teal",
      statusLabel: "Disponible",
      statusVariant: "success",
    });
  }

  if (companyScopedSession && vehiclesAllowed) {
    adminLinks.push({
      href: "/vehicles",
      title: "Véhicules",
      description: "Consultez et gérez la flotte ambulancière.",
      Icon: Ambulance,
      tone: "blue",
      statusLabel: "Disponible",
      statusVariant: "success",
    });
  }

  if (companyScopedSession && templatesAllowed) {
    adminLinks.push({
      href: "/templates",
      title: "Modèles horaires",
      description: "Gérez les modèles horaires disponibles.",
      Icon: FileText,
      tone: "amber",
      statusLabel: "Disponible",
      statusVariant: "success",
    });
  }

  if (companyScopedSession && (companyProfileAllowed || companyRulesAllowed)) {
    adminLinks.push({
      href: "/company",
      title: "Société",
      description: "Consultez le profil et les règles de la société courante.",
      Icon: Building2,
      tone: "slate",
      statusLabel: "Disponible",
      statusVariant: "success",
    });
  }

  if (companyScopedSession && depotsAllowed) {
    adminLinks.push({
      href: "/depots",
      title: "Dépôts",
      description: "Gérez les dépôts et leurs informations opérationnelles.",
      Icon: Landmark,
      tone: "violet",
      statusLabel: "Disponible",
      statusVariant: "success",
    });
  }

  if (companyScopedSession && companyProfileAllowed) {
    adminLinks.push({
      href: "/onboarding",
      title: "Mise en route",
      description: "Parcours guidé de démarrage de la société.",
      Icon: GraduationCap,
      tone: "violet",
      statusLabel: "Selon permissions",
      statusVariant: "warning",
    });
  }

  if ((companyScopedSession || supportActor) && auditAllowed) {
    adminLinks.push({
      href: "/audit",
      title: "Audit",
      description: "Consultez les journaux d’audit et exports des droits.",
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

  const profileLabel = getProfileLabel(user.role, user.platformRole);
  const userLabel = user.name ?? user.email ?? "Utilisateur";
  const companyLabel = companyScopedSession ? companyName : "Société non rattachée";

  return (
    <div className="page-wrap">
      <PageHeader
        title="Tableau de bord"
        description="Portail d’accès aux modules de gestion de votre société ambulancière."
      />

      <section className="panel dashboard-profile-card">
        <div className="dashboard-profile-card__head">
          <span className="dashboard-profile-card__avatar" aria-hidden="true">
            <UserRound size={34} strokeWidth={2} />
            <span className="dashboard-profile-card__online-dot" />
          </span>
          <div className="dashboard-profile-card__copy">
            <h2 className="dashboard-profile-card__title">Connecté en tant que {userLabel}</h2>
            <div className="dashboard-profile-card__meta">
              <span className="dashboard-profile-card__meta-item dashboard-profile-card__meta-item--plain">
                <Mail size={16} />
                {user.email ?? "Email non renseigné"}
              </span>
              <span className="dashboard-profile-card__meta-separator" aria-hidden="true" />
              <span className="dashboard-profile-card__meta-item">
                <span className="dashboard-profile-card__meta-chip">Rôle</span>
                <span>{profileLabel}</span>
              </span>
              <span className="dashboard-profile-card__meta-separator" aria-hidden="true" />
              <span className="dashboard-profile-card__meta-item">
                <span className="dashboard-profile-card__meta-chip">Société</span>
                <span>{companyLabel}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {!companyScopedSession ? (
        <section className="panel status-warning dashboard-warning">
          <strong>Compte sans société courante</strong>
          <p>La session n&apos;est pas rattachée à une société cliente. Les modules société restent masqués.</p>
        </section>
      ) : null}

      {showTerrainSection || showAdminSection ? (
        <section className="dashboard-content-stack">
          {metrics.length > 0 ? (
            <div className="dashboard-metrics-grid">
              {metrics.map((metric, index) => (
                <article key={metric.label} className={`dashboard-kpi-card dashboard-kpi-card--${index}`}>
                  <span className="dashboard-kpi-card__icon" aria-hidden="true">
                    <metric.Icon size={18} strokeWidth={2.1} />
                  </span>
                  <div className="dashboard-kpi-card__copy">
                    <p className="dashboard-kpi-card__label">{metric.label}</p>
                    <strong className="dashboard-kpi-card__value">{metric.value}</strong>
                    <p className="dashboard-kpi-card__hint">sur {metric.total} {metric.hintLabel}</p>
                  </div>
                </article>
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
              message="Aucun module supplémentaire n&apos;est réellement accessible."
            />
          )}
        </section>
      ) : null}

      {!showTerrainSection && !showAdminSection && companyScopedSession ? (
        <EmptyState
          title="Aucun accès module exploitable"
          message="Aucun module n&apos;est actuellement publié sur le dashboard pour cette session."
        />
      ) : null}
    </div>
  );
}
