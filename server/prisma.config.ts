import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Load base .env first, then overlay the NODE_ENV-specific file so that
// e.g. .env.test overrides DATABASE_URL when NODE_ENV=test.
config();
if (process.env.NODE_ENV) {
  config({ path: `.env.${process.env.NODE_ENV}`, override: true });
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
