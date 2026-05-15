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
  const totalUsers = activeUsers + archivedUsers;

  return (
    <div className="page-wrap users-page">
      <section className="users-layout">
        <div className="users-layout__main">
          <PageHeader
            className="users-page-header"
            title="Utilisateurs / RH"
            description="Gérez les salariés, rôles, permissions, rattachements, horaires et absences."
            actions={(
              <ActionButton variant="primary" leadingIcon={<Plus size={16} />}>
                Créer un utilisateur
              </ActionButton>
            )}
          />

          <section className="users-kpi-grid users-kpi-grid--a24">
            <StatCard
              title="Utilisateurs actifs"
              value={activeUsers}
              hint={`sur ${totalUsers} utilisateurs`}
              tone="info"
              icon={<UsersRound size={18} />}
            />
            <StatCard
              title="Stagiaires"
              value={trainees}
              hint={`sur ${totalUsers} utilisateurs`}
              tone="success"
              icon={<GraduationCap size={18} />}
            />
            <StatCard
              title="Absences en cours"
              value={absencesCount}
              hint={`utilisateur${absencesCount > 1 ? "s" : ""}`}
              tone="warning"
              icon={<CalendarX size={18} />}
            />
            <StatCard
              title="Comptes archivés"
              value={archivedUsers}
              hint="Inactifs"
              tone="neutral"
              icon={<Archive size={18} />}
            />
          </section>

          <section className="users-workspace">
            <UsersListClient />
          </section>

          <details className="users-advanced">
            <summary>Opérations avancées RH (repliées par défaut)</summary>
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

        <div className="users-layout__side">
          <UsersSidePanelClient />
        </div>
      </section>
    </div>
  );
}
