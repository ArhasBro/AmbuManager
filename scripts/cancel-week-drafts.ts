import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function parseISODateOnlyToLocalMidnight(dayStr: string) {
  // "YYYY-MM-DD" -> Date local 00:00
  const [Y, M, D] = dayStr.split("-").map(Number);
  return new Date(Y, M - 1, D, 0, 0, 0, 0);
}

async function main() {
  const companyId = "8b607001-560d-4852-bbb4-c7ecc15286da";

  // ⚠️ mets ici la semaine que tu es en train de générer dans l'UI
  // (dans ton JSON: weekStart = 2026-02-22T23:00:00.000Z => semaine affichée)
  // On part du même param UI "weekStart=YYYY-MM-DD".
  const weekStartStr = "2026-02-23"; // <-- mets le monday affiché dans l’UI si besoin

  const monday = parseISODateOnlyToLocalMidnight(weekStartStr);

  const toCancel = await prisma.autoScheduleRun.findMany({
    where: { companyId, scope: "WEEK", status: "DRAFT", weekStart: monday },
    select: { id: true, createdAt: true, weekStart: true },
    orderBy: { createdAt: "asc" },
  });

  console.log("Found DRAFT WEEK runs to cancel:", toCancel);

  const res = await prisma.autoScheduleRun.updateMany({
    where: { companyId, scope: "WEEK", status: "DRAFT", weekStart: monday },
    data: { status: "CANCELLED" },
  });

  console.log("✅ Cancelled count:", res.count);
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