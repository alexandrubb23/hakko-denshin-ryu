import { readFileSync } from "fs";

/** Parses a `.env`-style file and returns its key/value pairs. */
export function loadEnvFile(filePath: string): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const line of readFileSync(filePath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed
      .slice(eqIdx + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    vars[key] = val;
  }
  return vars;
}
