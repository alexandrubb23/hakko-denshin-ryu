import { execSync } from "child_process";
import path from "path";

import { loadEnvFile } from "./helpers/env";

const SERVER_DIR = path.join(process.cwd(), "server");

export default async function globalTeardown() {
  const testEnv = loadEnvFile(path.join(SERVER_DIR, ".env.test"));
  const env = { ...process.env, NODE_ENV: "test", ...testEnv };

  // Reset the test database so the next run starts from a clean state
  execSync("bun run db:reset:test", { cwd: SERVER_DIR, env, stdio: "inherit" });
}
