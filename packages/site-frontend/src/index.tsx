import "./config";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import coreConfig, { setEnvironment, setRuntimeOverrides } from "@core/config";
import { SystemEnvironment } from "@core/types/system/SystemEnvironment";
import "@client/styles/defaults.scss";
import { App } from "./App";
import "@client/styles/styled.scss";

// --- BEGIN RUNTIME CONFIG INITIALIZATION ---
// Declare runtimeConfig on window for TypeScript
declare global {
  interface Window {
    runtimeConfig?: {
      envName: string;
      siteURL: string;
      siteAPI: string;
      adminURL: string;
      adminAPI: string;
      staticURL: string;
      // Add other expected properties from runtime-config.js
    };
  }
}

if (window.runtimeConfig) {
  const runtimeEnv = window.runtimeConfig.envName as SystemEnvironment;
  console.log("[Runtime Config] Initializing with envName:", runtimeEnv);
  setEnvironment(runtimeEnv); // This sets coreConfig.env and derived like coreConfig.isDev

  // Apply runtime URLs using the new function
  const urlOverrides = {
    siteURL: window.runtimeConfig.siteURL,
    siteAPI: window.runtimeConfig.siteAPI,
    adminURL: window.runtimeConfig.adminURL,
    adminAPI: window.runtimeConfig.adminAPI,
    staticURL: window.runtimeConfig.staticURL,
  };
  setRuntimeOverrides(urlOverrides);

  // The local site-frontend/src/config.ts will then pick these up as it aliases coreConfig.
  // And it sets its own config.apiURL = coreConfig.siteAPI;
  console.log("[Runtime Config] Core config after runtime init and overrides:", JSON.parse(JSON.stringify(coreConfig)));

} else {
  console.error(
    "[Runtime Config] ERROR: window.runtimeConfig is not defined! Falling back to coreConfig defaults (likely 'development'). Ensure runtime-config.js is loaded correctly."
  );
  // Optionally, call setEnvironment('development') here as a hard fallback
  // if coreConfig's default 'development' isn't desired for a failed load.
  // For now, it will use coreConfig's initial default.
}
// --- END RUNTIME CONFIG INITIALIZATION ---

const container = document.getElementById("root");
const root = createRoot(container as HTMLDivElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);