import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL in environment");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Create demo user
  const demoUser = await prisma.user.upsert({
    where: { id: "demo" },
    update: {},
    create: {
      id: "demo",
      email: "demo@glialink.local",
      name: "Demo User",
    },
  });

  console.log("✓ Created demo user:", demoUser);
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
