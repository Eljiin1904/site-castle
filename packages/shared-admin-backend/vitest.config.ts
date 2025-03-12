import { defineConfig } from "vitest/config";
import path from "path";

process.env.NODE_ENV = "development"; // force development mode

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    testTimeout: 10000,
    include: ["./**/*.test.ts", "./**/*.test.js"],
    setupFiles: ["./setupTests.ts"],
    sequence: {
      shuffle: false,
    },
    fileParallelism: false,
  },
  resolve: {
    alias: [
      {
        find: "#core",
        replacement: path.resolve(__dirname, "../shared-core/build"),
      },
      {
        find: "@core",
        replacement: path.resolve(__dirname, "../shared-core/build"),
      },
      {
        find: "#client",
        replacement: path.resolve(__dirname, "../shared-client/build"),
      },
      {
        find: "@client",
        replacement: path.resolve(__dirname, "../shared-client/build"),
      },
      {
        find: "#server",
        replacement: path.resolve(__dirname, "../shared-server/build"),
      },
      {
        find: "@server",
        replacement: path.resolve(__dirname, "../shared-server/build"),
      },
      { find: "#app", replacement: path.resolve(__dirname, "src") },
    ],
  },
});
