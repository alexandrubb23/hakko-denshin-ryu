/**
 * Deletes all StudentAttendance records for a given date.
 * Used by E2E tests to isolate training-day-attendance tests from records
 * created by other specs that share the same DB.
 *
 * Requires:
 *   CLEAR_DATE — the date to clear in YYYY-MM-DD format (e.g. "2025-05-06")
 */
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";

const prisma = new PrismaClient();

async function main() {
  const rawDate = process.env.CLEAR_DATE;
  if (!rawDate || !/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
    throw new Error(
      "CLEAR_DATE env var is required and must be in YYYY-MM-DD format"
    );
  }

  const date = new Date(`${rawDate}T00:00:00.000Z`);
  const { count } = await prisma.studentAttendance.deleteMany({
    where: { date },
  });

  console.log(`Cleared ${count} StudentAttendance record(s) for ${rawDate}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
