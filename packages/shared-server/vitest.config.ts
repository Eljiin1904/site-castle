import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

process.env.NODE_ENV = "development"; // force development mode

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    dir: "tests",
  },
  plugins: [tsconfigPaths()],
  resolve: {
    alias: [
      {
        find: "#core",
        replacement: path.resolve(__dirname, "../shared-core/build"),
      },
      {
        find: "#server",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
});
