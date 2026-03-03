import "dotenv/config";
import { PrismaClient, PlanningTemplateCategory } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const companyId = "8b607001-560d-4852-bbb4-c7ecc15286da";

  // ✅ Nom volontairement unique pour éviter @@unique([companyId, name])
  const name = "Journée (clean)";

  // (optionnel) Check si déjà présent
  const existing = await prisma.shiftTemplate.findFirst({
    where: { companyId, name },
    select: { id: true, name: true, isActive: true },
  });

  if (existing) {
    console.log("ℹ️ ShiftTemplate already exists:", existing);
    return;
  }

  const created = await prisma.shiftTemplate.create({
    data: {
      companyId,
      name,
      category: PlanningTemplateCategory.AMBULANCE,
      requiredRole: null,
      isActive: true,
      startTime: "08:00",
      endTime: "16:00",
      crossesMidnight: false,
    },
    select: {
      id: true,
      companyId: true,
      name: true,
      category: true,
      requiredRole: true,
      isActive: true,
      startTime: true,
      endTime: true,
      crossesMidnight: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // ✅ Sécurité : refuser un id vide (ça ne devrait jamais arriver)
  if (!created.id || created.id.trim() === "") {
    throw new Error("Template created with empty id (unexpected).");
  }

  console.log("✅ Created ShiftTemplate (clean):", created);
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });