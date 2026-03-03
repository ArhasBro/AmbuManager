import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import VehiclesClient from "./vehicles-client";

type AppSessionUser = {
  role?: string;
  companyId?: string;
};

export default async function VehiclesPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const user = session.user as AppSessionUser;

  if (user.role !== "ADMIN") redirect("/login");
  if (!user.companyId) redirect("/login");

  const companyId = user.companyId;

  const vehicles = await prisma.vehicle.findMany({
    where: { companyId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      immatriculation: true,
      type: true,
      status: true,
      createdAt: true,
    },
  });

  return (
    <div style={{ padding: 40 }}>
      <h1>Véhicules</h1>
      <VehiclesClient
        initialVehicles={vehicles.map((v) => ({
          ...v,
          createdAt: v.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}