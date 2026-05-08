import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Archive, CalendarX, GraduationCap, Plus, UsersRound } from "lucide-react";

import { authOptions } from "@/lib/auth";
import { canGovernCompanyRulesDelegation } from "@/lib/company-rules/governance";
import { canManageUsers } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { ActionButton, PageHeader, StatCard } from "@/app/ui";

import ResetPasswordClient from "./reset-password-client";
import UserCreationClient from "./user-creation-client";
import UserDepotAssignmentClient from "./user-depot-assignment-client";
import UserArchiveClient from "./user-archive-client";
import UserEditClient from "./user-edit-client";
import UserAbsenceClient from "./user-absence-client";
import UsersListClient from "./users-list-client";
import UsersSidePanelClient from "./users-side-panel-client";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id || !user.companyId) redirect("/login");
  if (!(await canManageUsers(user.id, user.role, user.platformRole))) redirect("/login");

  const canGovernCompanyRules = canGovernCompanyRulesDelegation(user.role, user.platformRole);

  const [depots, usersStats, absencesCount] = await Promise.all([
    prisma.depot.findMany({
      where: { companyId: user.companyId },
      orderBy: [{ isActive: "desc" }, { name: "asc" }],
      select: {
        id: true,
        name: true,
        isActive: true,
      },
    }),
    prisma.user.groupBy({
      by: ["isActive", "isTrainee"],
      where: { companyId: user.companyId, platformRole: null },
      _count: { _all: true },
    }),
    prisma.userAbsence.count({
      where: { companyId: user.companyId },
    }),
  ]);

  const activeUsers = usersStats.filter((item) => item.isActive).reduce((sum, item) => sum + item._count._all, 0);
  const trainees = usersStats.filter((item) => item.isActive && item.isTrainee).reduce((sum, item) => sum + item._count._all, 0);
  const archivedUsers = usersStats.filter((item) => !item.isActive).reduce((sum, item) => sum + item._count._all, 0);

  return (
    <div className="page-wrap users-page">
      <PageHeader
        title="Utilisateurs / RH"
        description="Gestion des salaries, roles, permissions, rattachements, horaires et absences."
        actions={(
          <ActionButton variant="primary" leadingIcon={<Plus size={16} />}>
            Creer un utilisateur
          </ActionButton>
        )}
      />

      <section className="users-kpi-grid users-kpi-grid--a24">
        <StatCard
          title="Utilisateurs actifs"
          value={activeUsers}
          hint="Comptes actifs"
          tone="info"
          icon={<UsersRound size={18} />}
        />
        <StatCard
          title="Stagiaires"
          value={trainees}
          hint="Actifs"
          tone="success"
          icon={<GraduationCap size={18} />}
        />
        <StatCard
          title="Absences en cours"
          value={absencesCount}
          hint="Dossier RH"
          tone="warning"
          icon={<CalendarX size={18} />}
        />
        <StatCard
          title="Comptes archives"
          value={archivedUsers}
          hint="Inactifs"
          tone="neutral"
          icon={<Archive size={18} />}
        />
      </section>

      <section className="users-workspace">
        <UsersListClient />
        <UsersSidePanelClient />
      </section>

      <details className="users-advanced" open>
        <summary>Operations RH detaillees : creation, edition, absences, rattachement, securite</summary>
        <div className="users-advanced__content">
          <UserCreationClient canGovernCompanyRules={canGovernCompanyRules} availableDepots={depots} />
          <UserAbsenceClient />
          <UserEditClient canGovernCompanyRules={canGovernCompanyRules} />
          <UserArchiveClient actorUserId={user.id} />
          <UserDepotAssignmentClient availableDepots={depots} />
          <ResetPasswordClient actorUserId={user.id} />
        </div>
      </details>
    </div>
  );
}
