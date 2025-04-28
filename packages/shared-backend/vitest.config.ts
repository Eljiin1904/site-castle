import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

process.env.NODE_ENV = "development"; // force development mode

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ["**/*.test.ts"],
    exclude: [
      ...configDefaults.exclude,
      "**/ignore/**",
      "./__tests__/integration/listeners/**",
      // "./__tests__/integration/register/register-local.test.ts",
    ],
    setupFiles: ["./__tests__/vitest.setup.ts"],
    globalSetup: ["./__tests__/global-setup.ts"],
    globals: true,
    sequence: {
      concurrent: false,
    },
    poolOptions: {
      threads: {
        singleThread: true,
        minThreads: 1,
        maxThreads: 1,
      },
    },
  },
});
