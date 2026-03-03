import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const companyId = "8b607001-560d-4852-bbb4-c7ecc15286da";

  // ✅ On cible par name + companyId (car l'id est vide/corrompu)
  const targetName = "Journée";

  const before = await prisma.shiftTemplate.findMany({
    where: { companyId, name: targetName },
    select: { id: true, name: true, isActive: true, createdAt: true, updatedAt: true },
  });

  console.log("Found templates matching target BEFORE:", before);

  const res = await prisma.shiftTemplate.updateMany({
    where: { companyId, name: targetName },
    data: { isActive: false },
  });

  console.log("✅ Disabled count:", res.count);

  const after = await prisma.shiftTemplate.findMany({
    where: { companyId, name: targetName },
    select: { id: true, name: true, isActive: true, createdAt: true, updatedAt: true },
  });

  console.log("Found templates matching target AFTER:", after);
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