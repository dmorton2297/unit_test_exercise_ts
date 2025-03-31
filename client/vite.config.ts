import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["**/*.spec.tsx", "**/*.spec.ts"],
    globals: true,
    setupFiles: ["./testSetup.ts"],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ["**/*index.ts", "**/**.config.**", '**/main.tsx', '**/App.tsx'],
    },
  },
});
