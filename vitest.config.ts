import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
  test: {
    environment: "node",
    setupFiles: ["./vitest.setup.ts"],
    testTimeout: 20_000,
    // Les tests écrivent dans le même projet Supabase (chacun sur son
    // propre commerce isolé) : on les exécute en série pour éviter
    // d'ouvrir trop de connexions à la fois sur le plan gratuit.
    fileParallelism: false,
  },
});
