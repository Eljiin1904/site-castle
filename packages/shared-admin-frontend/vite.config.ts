import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const appEnv = env.NODE_ENV || "development";

  return defineConfig({
    server: {
      host: "127.0.0.1",
      port: 3001,
    },
    define: {
      "process.env": { APP_ENV: appEnv },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
      },
    },
    build: {
      outDir: "build",
      chunkSizeWarningLimit: 2000,
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
        { find: "#app", replacement: path.resolve(__dirname, "src") },
      ],
    },
    plugins: [react()],
  });
};
