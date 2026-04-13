import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { canManageTemplates } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { serializeDates } from "@/lib/serializers";

import TemplatesClient from "./templates-client";

export default async function TemplatesPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id || !user.companyId) redirect("/login");
  if (!(await canManageTemplates(user.id, user.role, user.platformRole))) redirect("/login");

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
    <div style={{ padding: 16, display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0 }}>Templates de shifts</h1>
          <p style={{ margin: "8px 0 0 0", opacity: 0.8 }}>
            Gestion minimale ALPHA des templates de la société courante : création, édition, désactivation,
            archivage logique, couleur, composition d’équipe et templates non horodatés.
          </p>
        </div>

        <Link href="/dashboard">Retour dashboard</Link>
      </div>

      <TemplatesClient initialTemplates={serializeDates(templates)} />
    </div>
  );
}
