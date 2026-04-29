import "dotenv/config";
import { hashPassword } from "@better-auth/utils/password";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { Role } from "../src/generated/prisma/enums.js";

const STUDENT_EMAIL = "student@test.com";
const STUDENT_PASSWORD = "student-test-password-123";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findUnique({ where: { email: STUDENT_EMAIL } });
  if (existing) {
    console.log(`Test student already exists: ${STUDENT_EMAIL}`);
    return;
  }

  const id = crypto.randomUUID();
  const hashedPassword = await hashPassword(STUDENT_PASSWORD);

  await prisma.user.create({
    data: {
      id,
      name: "Test Student",
      email: STUDENT_EMAIL,
      emailVerified: true,
      role: Role.student,
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

  console.log(`Test student created: ${STUDENT_EMAIL}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
