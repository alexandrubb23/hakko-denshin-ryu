import { execSync } from "child_process";
import path from "path";

import { loadEnvFile } from "./helpers/env";

const SERVER_DIR = path.join(process.cwd(), "server");

export default async function globalSetup() {
  const testEnv = loadEnvFile(path.join(SERVER_DIR, ".env.test"));
  const env = { ...process.env, NODE_ENV: "test", ...testEnv };

  // Apply any pending migrations to the test database
  execSync("bun run db:migrate:deploy", {
    cwd: SERVER_DIR,
    env,
    stdio: "inherit",
  });

  // Seed the admin user (idempotent — skips if already exists)
  execSync("bun run db:seed", { cwd: SERVER_DIR, env, stdio: "inherit" });
}
