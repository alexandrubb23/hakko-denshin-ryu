import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vitest/config";

const r = (...segments: string[]) => path.resolve(__dirname, ...segments);

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
  resolve: {
    alias: {
      "@hakko/core": r("../core/src"),
      "@test": r("src/test"),
      "@assets": r("src/assets"),
      "@api": r("src/api"),
      "@components": r("src/components"),
      "@hooks": r("src/hooks"),
      "@providers": r("src/providers"),
      "@utils": r("src/utils"),
      "@style": r("src/style"),
      "@routes": r("src/routes"),
      "@store": r("src/store"),
      "@types": r("src/types"),
      "@locales": r("src/locales"),
      "@pages": r("src/pages"),
      "@lib": r("src/lib"),
      "@constants": r("src/constants"),
    },
  },
});
