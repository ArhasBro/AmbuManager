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

  const templates = await prisma.shiftTemplate.findMany({
    where: { companyId },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      name: true,
      isActive: true,
      category: true,
      startTime: true,
      endTime: true,
      crossesMidnight: true,
      createdAt: true,
    },
  });

  console.log("✅ ShiftTemplates:", templates);
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