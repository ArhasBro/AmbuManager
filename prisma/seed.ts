import "dotenv/config";
import { PrismaClient, Role, PlanningTemplateCategory, VehicleType, VehicleStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcrypt";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


function readSeedPassword(envName: string, fallback: string): string {
  const value = process.env[envName];
  if (typeof value === "string" && value.length > 0) return value;

  if (process.env.ALLOW_INSECURE_SEED_DEFAULTS === "true") {
    console.warn(`⚠️  ${envName} absent: fallback de développement utilisé.`);
    return fallback;
  }

  throw new Error(
    `Missing ${envName}. Define it in the environment or set ALLOW_INSECURE_SEED_DEFAULTS=true for local demo data.`
  );
}

type SeedCompany = {
  name: string;
  admin: { email: string; password: string; name: string };
  users: Array<{ email: string; password: string; name: string; role: Role; permissions: string[] }>;
  vehicles: Array<{ plate: string; type: VehicleType; status: VehicleStatus }>;
  templates: Array<{
    name: string;
    category: PlanningTemplateCategory;
    startTime: string;
    endTime: string;
    crossesMidnight?: boolean;
    requiredRole?: Role | null;
    isActive?: boolean;
  }>;
};

async function upsertCompany(name: string) {
  const now = new Date();

  const existing = await prisma.company.findUnique({ where: { name } });
  if (!existing) {
    const created = await prisma.company.create({
      data: { name, createdAt: now, updatedAt: now },
    });
    console.log("✅ Company created:", name, created.id);
    return created;
  }

  const updated = await prisma.company.update({
    where: { id: existing.id },
    data: { updatedAt: now },
  });
  console.log("✅ Company found:", name, updated.id);
  return updated;
}

async function upsertUser(params: { email: string; password: string; name: string; role: Role; companyId: string }) {
  const hashedPassword = await bcrypt.hash(params.password, 10);

  const user = await prisma.user.upsert({
    where: { email: params.email },
    update: {
      name: params.name,
      role: params.role,
      companyId: params.companyId,
      password: hashedPassword,
    },
    create: {
      email: params.email,
      password: hashedPassword,
      name: params.name,
      role: params.role,
      companyId: params.companyId,
    },
  });

  return user;
}

async function ensurePermissions() {
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

  const created = [];
  for (const p of permissions) {
    const perm = await prisma.permission.upsert({
      where: { code: p.code },
      update: { label: p.label, description: p.description },
      create: { code: p.code, label: p.label, description: p.description },
    });
    created.push(perm);
  }

  console.log("✅ Permissions ensured:", created.map((p) => p.code).join(", "));
  return created;
}

async function setUserPermissions(userId: string, permissionCodes: string[]) {
  if (permissionCodes.length === 0) return;

  const perms = await prisma.permission.findMany({
    where: { code: { in: permissionCodes } },
    select: { id: true, code: true },
  });

  for (const perm of perms) {
    await prisma.userPermission.upsert({
      where: {
        userId_permissionId: {
          userId,
          permissionId: perm.id,
        },
      },
      update: {},
      create: { userId, permissionId: perm.id },
    });
  }
}

async function upsertTemplate(params: {
  companyId: string;
  name: string;
  category: PlanningTemplateCategory;
  startTime: string;
  endTime: string;
  crossesMidnight: boolean;
  requiredRole: Role | null;
  isActive: boolean;
}) {
  await prisma.shiftTemplate.upsert({
    where: { companyId_name: { companyId: params.companyId, name: params.name } },
    update: {
      category: params.category,
      startTime: params.startTime,
      endTime: params.endTime,
      crossesMidnight: params.crossesMidnight,
      requiredRole: params.requiredRole,
      isActive: params.isActive,
    },
    create: {
      companyId: params.companyId,
      name: params.name,
      category: params.category,
      startTime: params.startTime,
      endTime: params.endTime,
      crossesMidnight: params.crossesMidnight,
      requiredRole: params.requiredRole,
      isActive: params.isActive,
    },
  });
}

async function main() {
  // =========================
  // Global defaults
  // =========================
  const adminPasswordA = readSeedPassword("SEED_ADMIN_PASSWORD", "admin123");
  const adminPasswordB = process.env.SEED_ADMIN_B_PASSWORD ?? adminPasswordA;

  const userPassword = readSeedPassword("SEED_USER_PASSWORD", "user123");
  const now = new Date();

  // =========================
  // 1) Permissions (global)
  // =========================
  await ensurePermissions();

  // =========================
  // 2) Tenants A/B + users + vehicles + templates
  // =========================
  const companies: SeedCompany[] = [
    {
      name: "Ambulance Manager",
      admin: { email: "admin@ambulance.local", password: adminPasswordA, name: "Nathan" },
      users: [
        {
          email: "planner@ambulance.local",
          password: userPassword,
          name: "Planner",
          role: Role.BUREAU,
          permissions: ["PLANNING_AUTOSCHEDULE"], // ✅ autoschedule OK, publish KO (test 403 publish)
        },
        {
          email: "viewer@ambulance.local",
          password: userPassword,
          name: "Viewer",
          role: Role.BUREAU,
          permissions: [], // ✅ aucun droit (test 403 autoschedule)
        },
      ],
      vehicles: [{ plate: "AA-123-AA", type: VehicleType.AMBULANCE, status: VehicleStatus.ACTIVE }],
      templates: [
        {
          name: "AMB Jour 08:00-16:00",
          category: PlanningTemplateCategory.AMBULANCE,
          startTime: "08:00",
          endTime: "16:00",
          crossesMidnight: false,
          requiredRole: null,
          isActive: true,
        },
        {
          name: "AMB Nuit 16:00-00:00",
          category: PlanningTemplateCategory.AMBULANCE,
          startTime: "16:00",
          endTime: "00:00",
          crossesMidnight: true,
          requiredRole: null,
          isActive: true,
        },
      ],
    },
    {
      name: "Ambulance Manager - B",
      admin: { email: "admin-b@ambulance.local", password: adminPasswordB, name: "Admin B" },
      users: [
        {
          email: "planner-b@ambulance.local",
          password: userPassword,
          name: "Planner B",
          role: Role.BUREAU,
          permissions: ["PLANNING_AUTOSCHEDULE"],
        },
      ],
      vehicles: [{ plate: "BB-234-BB", type: VehicleType.AMBULANCE, status: VehicleStatus.ACTIVE }],
      templates: [
        {
          name: "AMB Jour 08:00-16:00",
          category: PlanningTemplateCategory.AMBULANCE,
          startTime: "08:00",
          endTime: "16:00",
          crossesMidnight: false,
          requiredRole: null,
          isActive: true,
        },
      ],
    },
  ];

  for (const cfg of companies) {
    const company = await upsertCompany(cfg.name);

    // ADMIN
    const admin = await upsertUser({
      email: cfg.admin.email,
      password: cfg.admin.password,
      name: cfg.admin.name,
      role: Role.ADMIN,
      companyId: company.id,
    });
    console.log("✅ Admin upserted:", cfg.name, admin.email, admin.id);

    await setUserPermissions(admin.id, ["PLANNING_AUTOSCHEDULE", "PLANNING_AUTOSCHEDULE_PUBLISH"]);

    // Other users
    for (const u of cfg.users) {
      const user = await upsertUser({
        email: u.email,
        password: u.password,
        name: u.name,
        role: u.role,
        companyId: company.id,
      });
      console.log("✅ User upserted:", cfg.name, user.email, user.id);

      await setUserPermissions(user.id, u.permissions);
    }

    // Vehicles
    for (const v of cfg.vehicles) {
      const existing = await prisma.vehicle.findUnique({
        where: { companyId_immatriculation: { companyId: company.id, immatriculation: v.plate } },
      });

      if (!existing) {
        await prisma.vehicle.create({
          data: { companyId: company.id, immatriculation: v.plate, type: v.type, status: v.status },
        });
        console.log("✅ Vehicle created:", cfg.name, v.plate);
      } else {
        await prisma.vehicle.update({
          where: { companyId_immatriculation: { companyId: company.id, immatriculation: v.plate } },
          data: { type: v.type, status: v.status },
        });
        console.log("✅ Vehicle updated:", cfg.name, v.plate);
      }
    }

    // Templates
    for (const t of cfg.templates) {
      await upsertTemplate({
        companyId: company.id,
        name: t.name,
        category: t.category,
        startTime: t.startTime,
        endTime: t.endTime,
        crossesMidnight: t.crossesMidnight ?? false,
        requiredRole: (t.requiredRole ?? null) as Role | null,
        isActive: t.isActive ?? true,
      });
    }
    console.log("✅ ShiftTemplates ensured:", cfg.name, cfg.templates.length);

    await prisma.company.update({ where: { id: company.id }, data: { updatedAt: now } });
  }

  console.log("✅ Seed OK (A/B ready for DoD 4.4 tests)");
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
