import "dotenv/config";
import { PrismaClient, Role } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcrypt";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const COMPANY_NAME = "Ambulance Manager";
  const ADMIN_EMAIL = "admin@ambulance.local";
  const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? "admin123";
  const VEHICLE_PLATE = "AA-123-AA";

  const now = new Date();

  // =========================
  // 1) COMPANY (find -> update/create)
  // =========================
  let company = await prisma.company.findUnique({
    where: { name: COMPANY_NAME },
  });

  if (!company) {
    company = await prisma.company.create({
      data: {
        name: COMPANY_NAME,
        createdAt: now,
        updatedAt: now,
      },
    });
    console.log("✅ Company created:", company.id);
  } else {
    company = await prisma.company.update({
      where: { id: company.id },
      data: { updatedAt: now },
    });
    console.log("✅ Company found:", company.id);
  }

  // =========================
  // 2) ADMIN USER (upsert email)
  // =========================
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      name: "Nathan",
      role: Role.ADMIN,
      companyId: company.id,
      password: hashedPassword,
    },
    create: {
      email: ADMIN_EMAIL,
      password: hashedPassword,
      name: "Nathan",
      role: Role.ADMIN,
      companyId: company.id,
    },
  });

  console.log("✅ Admin upserted:", admin.id);

  // =========================
  // 3) VEHICLE (unique composé: companyId + immatriculation)
  // =========================
  const existingVehicle = await prisma.vehicle.findUnique({
    where: {
      companyId_immatriculation: {
        companyId: company.id,
        immatriculation: VEHICLE_PLATE,
      },
    },
  });

  if (!existingVehicle) {
    await prisma.vehicle.create({
      data: {
        immatriculation: VEHICLE_PLATE,
        type: "AMBULANCE",
        status: "ACTIVE",
        companyId: company.id,
      },
    });
    console.log("✅ Vehicle created");
  } else {
    await prisma.vehicle.update({
      where: {
        companyId_immatriculation: {
          companyId: company.id,
          immatriculation: VEHICLE_PLATE,
        },
      },
      data: {
        type: "AMBULANCE",
        status: "ACTIVE",
      },
    });
    console.log("✅ Vehicle updated");
  }

  // =========================
  // 4) PERMISSIONS (4.1.3)
  // =========================
  const permissions = [
    {
      code: "PLANNING_AUTOSCHEDULE",
      label: "Automatisation planning",
      description: "Permet de générer un planning en brouillon (Jour/Semaine).",
    },
    {
      code: "PLANNING_AUTOSCHEDULE_PUBLISH",
      label: "Publication planning auto",
      description: "Permet de publier un planning généré (passage DRAFT -> PUBLISHED).",
    },
  ] as const;

  const createdPermissions = [];
  for (const p of permissions) {
    const perm = await prisma.permission.upsert({
      where: { code: p.code },
      update: {
        label: p.label,
        description: p.description,
      },
      create: {
        code: p.code,
        label: p.label,
        description: p.description,
      },
    });
    createdPermissions.push(perm);
  }

  // Assignation à l’admin (idempotent)
  for (const perm of createdPermissions) {
    await prisma.userPermission.upsert({
      where: {
        userId_permissionId: {
          userId: admin.id,
          permissionId: perm.id,
        },
      },
      update: {},
      create: {
        userId: admin.id,
        permissionId: perm.id,
      },
    });
  }

  console.log(
    "✅ Permissions ensured:",
    createdPermissions.map((p) => p.code).join(", ")
  );

  console.log("✅ Seed OK");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });