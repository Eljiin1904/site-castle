import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const appEnv = env.NODE_ENV || "development";
  
  console.log("Vite mode:", mode);
  console.log("App environment:", appEnv);

  return defineConfig({
    server: {
      host: "127.0.0.1",
      port: 3000,
    },
    define: {
      "process.env": { APP_ENV: appEnv,REACT_APP_GIPHY_API_KEY:
        mode === "production"
          ? undefined
          : "0Z8HMFWZifQhhNBk09IRsVqA1uHQg2Dg" },
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
