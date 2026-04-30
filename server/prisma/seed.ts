import "dotenv/config";
import { hashPassword } from "@better-auth/utils/password";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { Role, Belt } from "../src/generated/prisma/enums.js";

const prisma = new PrismaClient();

const RANKS = [
  { order: 1, name: "6 Kyu", belt: Belt.white, minimumMonths: 0 },
  { order: 2, name: "5 Kyu", belt: Belt.yellow, minimumMonths: 6 },
  { order: 3, name: "4 Kyu", belt: Belt.orange, minimumMonths: 6 },
  { order: 4, name: "3 Kyu", belt: Belt.green, minimumMonths: 12 },
  { order: 5, name: "2 Kyu", belt: Belt.blue, minimumMonths: 12 },
  { order: 6, name: "1 Kyu", belt: Belt.brown, minimumMonths: 12 },
  { order: 7, name: "1 Dan", belt: Belt.black, minimumMonths: 12 },
];

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
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set in .env");
  }

  if (password.length < 12) {
    throw new Error(
      "SEED_ADMIN_PASSWORD must be at least 12 characters. Please set a strong password in .env"
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin user already exists: ${email}`);
    return;
  }

  const id = crypto.randomUUID();
  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      id,
      name: "Admin",
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
