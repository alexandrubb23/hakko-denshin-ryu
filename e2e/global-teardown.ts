import { execSync } from "child_process";
import { readFileSync } from "fs";
import path from "path";

const SERVER_DIR = path.join(process.cwd(), "server");

function loadEnvFile(filePath: string): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const line of readFileSync(filePath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    vars[key] = val;
  }
  return vars;
}

export default async function globalTeardown() {
  const testEnv = loadEnvFile(path.join(SERVER_DIR, ".env.test"));
  const env = { ...process.env, NODE_ENV: "test", ...testEnv };

  // Reset the test database so the next run starts from a clean state
  execSync("bun run db:reset:test", { cwd: SERVER_DIR, env, stdio: "inherit" });
}
