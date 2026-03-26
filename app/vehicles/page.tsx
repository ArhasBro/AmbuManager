import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { canManageVehicles } from "@/lib/permissions";
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
    <div style={{ padding: 40 }}>
      <h1>Véhicules</h1>
      <p style={{ marginTop: 8, opacity: 0.8 }}>
        Gestion minimale des véhicules et rattachement optionnel à une base active de la société courante.
      </p>
      <VehiclesClient
        initialVehicles={serializeDates(vehicles)}
        availableDepots={depots}
        canCreateVehicle={user.role === "ADMIN"}
      />
    </div>
  );
}
