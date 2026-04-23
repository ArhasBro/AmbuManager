import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { canManageVehicles } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { serializeDates } from "@/lib/serializers";

import VehiclesClient from "./vehicles-client";

export default async function VehiclesPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const user = session.user;

  if (!user.id || !(await canManageVehicles(user.id, user.role, user.platformRole))) redirect("/login");
  if (!user.companyId) redirect("/login");

  const companyId = user.companyId;

  const [vehicles, depots] = await Promise.all([
    prisma.vehicle.findMany({
      where: { companyId, isActive: true },
      orderBy: { immatriculation: "asc" },
      select: {
        id: true,
        immatriculation: true,
        type: true,
        status: true,
        depotId: true,
        insuranceExpiresAt: true,
        technicalInspectionExpiresAt: true,
        registrationDocumentPresent: true,
        sanitaryApprovalExpiresAt: true,
        createdAt: true,
        updatedAt: true,
        depot: {
          select: {
            id: true,
            name: true,
            isActive: true,
          },
        },
      },
    }),
    prisma.depot.findMany({
      where: { companyId, isActive: true },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        isActive: true,
      },
    }),
  ]);

  return (
    <div className="page-wrap">
      <div className="page-head">
        <div>
          <h1 className="page-title">Vehicules</h1>
          <p className="page-description">
            Gestion de la flotte active et rattachement optionnel a une base de la societe courante.
          </p>
        </div>

        <Link className="page-back" href="/dashboard">
          Retour dashboard
        </Link>
      </div>

      <VehiclesClient
        initialVehicles={serializeDates(vehicles)}
        availableDepots={depots}
        canCreateVehicle={user.role === "ADMIN"}
      />
    </div>
  );
}
