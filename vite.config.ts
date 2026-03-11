import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    target: "node20",
    outDir: "dist",
    lib: {
      entry: resolve(__dirname, "src/cli.ts"),
      formats: ["es"],
      fileName: "cli",
    },
    rollupOptions: {
      external: ["commander"],
    },
  },
});
