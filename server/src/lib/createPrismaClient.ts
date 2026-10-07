import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "../generated/prisma/client.js";

type ClientOptions = {
  /** Defaults to DATABASE_URL */
  connectionString?: string;
  log?: Prisma.LogLevel[];
};

// Prisma 7 talks to Postgres through a driver adapter instead of a bundled engine
export function createPrismaClient({
  connectionString = process.env.DATABASE_URL,
  log,
}: ClientOptions = {}) {
  if (!connectionString) throw new Error("DATABASE_URL is not set");
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter, log });
}
