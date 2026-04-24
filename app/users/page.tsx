import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { canGovernCompanyRulesDelegation } from "@/lib/company-rules/governance";
import { canManageUsers } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";

import ResetPasswordClient from "./reset-password-client";
import UserCreationClient from "./user-creation-client";
import UserDepotAssignmentClient from "./user-depot-assignment-client";
import UserArchiveClient from "./user-archive-client";
import UserEditClient from "./user-edit-client";
import UserAbsenceClient from "./user-absence-client";
import UsersListClient from "./users-list-client";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id || !user.companyId) redirect("/login");
  if (!(await canManageUsers(user.id, user.role, user.platformRole))) redirect("/login");

  const canGovernCompanyRules = canGovernCompanyRulesDelegation(user.role, user.platformRole);

  const depots = await prisma.depot.findMany({
    where: { companyId: user.companyId },
    orderBy: [{ isActive: "desc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      isActive: true,
    },
  });

  return (
    <div className="page-wrap">
      <div className="page-head">
        <div>
          <h1 className="page-title">Utilisateurs</h1>
          <p className="page-description">
            Administration des comptes de la societe avec recherche, edition, archivage, absences et reinitialisation.
          </p>
        </div>

        <Link className="page-back" href="/dashboard">
          Retour dashboard
        </Link>
      </div>

      <UserCreationClient canGovernCompanyRules={canGovernCompanyRules} availableDepots={depots} />
      <UsersListClient />
      <UserAbsenceClient />
      <UserEditClient canGovernCompanyRules={canGovernCompanyRules} />
      <UserArchiveClient actorUserId={user.id} />
      <UserDepotAssignmentClient availableDepots={depots} />
      <ResetPasswordClient actorUserId={user.id} />
    </div>
  );
}
