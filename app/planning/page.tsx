import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import {
  canAutoSchedule,
  canEditPlanning,
  canExportPlanning,
  canManageCompanyRules,
  canViewAudit,
  canViewGlobalPlanning,
  canViewSelfPlanning,
} from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { ErrorMessage } from "@/app/ui";

import PlanningClient from "./planning-client";

export default async function PlanningPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id || !user.companyId) redirect("/login");

  const [
    canViewSelf,
    canViewGlobal,
    canManageMode,
    canManagePlanning,
    canRunAutoSchedule,
    canReadAudit,
    canExport,
    currentUser,
  ] = await Promise.all([
    canViewSelfPlanning(user.id, user.role, user.platformRole),
    canViewGlobalPlanning(user.id, user.role, user.platformRole),
    canManageCompanyRules(user.id, user.role, user.platformRole),
    canEditPlanning(user.id, user.role, user.platformRole),
    canAutoSchedule(user.id, user.role, user.platformRole),
    canViewAudit(user.id, user.role, user.platformRole),
    canExportPlanning(user.id, user.role, user.platformRole),
    prisma.user.findFirst({
      where: { id: user.id, companyId: user.companyId },
      select: { id: true, name: true, email: true },
    }),
  ]);

  if (!canViewSelf && !canViewGlobal) {
    return (
      <main className="page-wrap">
        <ErrorMessage
          title="Acces non autorise"
          message="Acces non autorise a la consultation du planning."
        />
      </main>
    );
  }

  const depots = await prisma.depot.findMany({
    where: { companyId: user.companyId, isActive: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true, isActive: true },
  });

  const fallbackCurrentUser = {
    id: user.id,
    name: user.name ?? user.email ?? "Utilisateur",
    email: user.email ?? "",
  };

  const accessibleUsers =
    canViewGlobal || canManagePlanning
      ? await prisma.user.findMany({
          where: { companyId: user.companyId, isActive: true, platformRole: null },
          orderBy: [{ name: "asc" }, { email: "asc" }],
          select: { id: true, name: true, email: true },
        })
      : [currentUser ?? fallbackCurrentUser];

  return (
    <main className="page-wrap">
      <PlanningClient
        availableDepots={depots}
        availableUsers={accessibleUsers}
        currentUser={currentUser ?? fallbackCurrentUser}
        canViewGlobal={canViewGlobal}
        canEditPlanning={canManagePlanning}
        canAutoSchedule={canRunAutoSchedule}
        canManageCompanyMode={canManageMode}
        canViewAudit={canReadAudit}
        canExportPlanning={canExport}
      />
    </main>
  );
}
