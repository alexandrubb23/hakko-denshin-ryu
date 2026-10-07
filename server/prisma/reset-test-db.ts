import "dotenv/config";
import { createPrismaClient } from "../src/lib/createPrismaClient.js";

const prisma = createPrismaClient();

async function main() {
  // Delete in dependency order to respect FK constraints
  await prisma.$transaction([
    prisma.session.deleteMany(),
    prisma.account.deleteMany(),
    prisma.verification.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  console.log("Test database reset successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
