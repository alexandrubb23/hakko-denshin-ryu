import { hashPassword } from "@better-auth/utils/password";
import { RANKS } from "@hakko/core";
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { Role } from "../src/generated/prisma/enums.js";

const prisma = new PrismaClient();

async function seedRanks() {
  for (const rank of RANKS) {
    await prisma.rank.upsert({
      where: { name: rank.name },
      update: { belt: rank.belt },
      create: rank,
    });
  }
  console.log(`Seeded ${RANKS.length} ranks.`);
}

async function seedAdmin() {
  const name = process.env.SEED_ADMIN_NAME || "Admin";
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!name || !email || !password) {
    throw new Error(
      "SEED_ADMIN_NAME, SEED_ADMIN_EMAIL, and SEED_ADMIN_PASSWORD must be set in .env"
    );
  }

  if (password.length < 12) {
    throw new Error(
      "SEED_ADMIN_PASSWORD must be at least 12 characters. Please set a strong password in .env"
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    await prisma.user.update({ where: { email }, data: { name } });
    console.log(`Admin user updated: ${email}`);
    return;
  }

  const id = crypto.randomUUID();
  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      id,
      name,
      email,
      emailVerified: true,
      role: Role.admin,
      accounts: {
        create: {
          id: crypto.randomUUID(),
          accountId: id,
          providerId: "credential",
          password: hashedPassword,
        },
      },
    },
  });

  console.log(`Admin user created: ${email}`);
}

async function main() {
  await seedRanks();
  await seedAdmin();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
