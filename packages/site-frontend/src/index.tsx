import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import coreConfig, { setEnvironment, setRuntimeOverrides } from "@core/config";
import { SystemEnvironment } from "@core/types/system/SystemEnvironment";
import "@client/styles/defaults.scss";
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

// Now we need to make sure the frontend config gets the updated values from core config
// This is a critical fix to ensure WebSockets work correctly!
// Import the config module after runtime configuration is applied
import frontendConfig from "@client/config";
// Force update apiURL in shared-client config
(frontendConfig as any).apiURL = coreConfig.siteAPI;
console.log(`[Runtime Config] Ensuring apiURL is set to siteAPI: ${coreConfig.siteAPI}`);

// Now import our app config which extends the frontend config
import "./config";
import { App } from "./App";

const container = document.getElementById("root");
const root = createRoot(container as HTMLDivElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);