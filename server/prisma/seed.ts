import "dotenv/config";
import { hashPassword } from "@better-auth/utils/password";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { Role } from "../src/generated/prisma/enums.js";

const prisma = new PrismaClient();

async function main() {
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

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
