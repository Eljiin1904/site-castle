import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

process.env.NODE_ENV = "development"; // force development mode

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ["**/*.test.ts"],
    exclude: [...configDefaults.exclude, "**/ignore/**"],
    setupFiles: ["./__tests__/vitest.setup.ts"],
  },
});
