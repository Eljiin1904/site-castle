import { configDefaults, defineConfig } from "vitest/config";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

process.env.NODE_ENV = "development"; // force development mode

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ["./**/*.test.ts"],
    exclude: [...configDefaults.exclude],
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
    // sequence: {
    //   shuffle: false,
    // },
    // fileParallelism: false,
  },
  // resolve: {
  //   alias: [
  //     {
  //       find: "#core",
  //       replacement: path.resolve(__dirname, "../shared-core/build"),
  //     },
  //     {
  //       find: "@core",
  //       replacement: path.resolve(__dirname, "../shared-core/build"),
  //     },
  //     {
  //       find: "#client",
  //       replacement: path.resolve(__dirname, "../shared-client/build"),
  //     },
  //     {
  //       find: "@client",
  //       replacement: path.resolve(__dirname, "../shared-client/build"),
  //     },
  //     {
  //       find: "#server",
  //       replacement: path.resolve(__dirname, "../shared-server/build"),
  //     },
  //     {
  //       find: "@server",
  //       replacement: path.resolve(__dirname, "../shared-server/build"),
  //     },
  //     { find: "#app", replacement: path.resolve(__dirname, "src") },
  //   ],
  // },
});
