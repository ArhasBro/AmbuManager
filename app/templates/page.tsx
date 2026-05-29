import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { AccessDeniedState } from "@/app/ui";
import { authOptions } from "@/lib/auth";
import { canManageTemplates } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { serializeDates } from "@/lib/serializers";

import TemplatesClient from "./templates-client";

export default async function TemplatesPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id || !user.companyId) redirect("/login");
  if (!(await canManageTemplates(user.id, user.role, user.platformRole))) {
    return (
      <main className="page-wrap">
        <AccessDeniedState />
      </main>
    );
  }

  const templates = await prisma.shiftTemplate.findMany({
    where: { companyId: user.companyId },
    orderBy: [{ archivedAt: "asc" }, { isActive: "desc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      category: true,
      requiredRole: true,
      secondaryAllowedRoles: true,
      minStaffCount: true,
      requiredVehicleType: true,
      isActive: true,
      archivedAt: true,
      isTimeDefined: true,
      startTime: true,
      endTime: true,
      crossesMidnight: true,
      color: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return (
    <div className="page-wrap">
      <TemplatesClient initialTemplates={serializeDates(templates)} />
    </div>
  );
}

