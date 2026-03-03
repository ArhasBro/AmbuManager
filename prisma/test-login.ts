import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const email = "admin@ambulance.local";
  const password = "admin123";

  const user = await prisma.user.findUnique({ where: { email } });

  console.log("Found user:", !!user);
  if (user) {
    console.log("DB email:", user.email);
    console.log("Password is hashed:", user.password.startsWith("$2"));
    const ok = await bcrypt.compare(password, user.password);
    console.log("bcrypt.compare:", ok);
  }

  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});