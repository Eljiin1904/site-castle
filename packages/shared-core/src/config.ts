import { SystemEnvironment } from "./types/system/SystemEnvironment";
import { SystemKind } from "./types/system/SystemKind";

export interface CoreConfig {
  env: SystemEnvironment;
  system: SystemKind;
  siteName: string;
  domain: string;
  siteURL: string;
  siteAPI: string;
  adminURL: string;
  adminAPI: string;
  staticURL: string;
}

const domain = "brickrax.com";

const config = {
  env: "development",
  system: "Unknown" as SystemKind,
  siteName: "Castle.com",
  domain,
  siteURL: "",
  siteAPI: "",
  adminURL: "",
  adminAPI: "",
  staticURL: `https://font.${domain}`,

  // convenience
  get isDev() {
    return this.env === "development" || this.env === "devcloud";
  },
};

export function setEnvironment(env: SystemEnvironment) {
  console.log(`[Core Config] setEnvironment called with: ${env}`);
  const oldEnv = config.env;
  config.env = env;
  if (env === "development") {
    config.siteURL = "http://127.0.0.1:3000";
    config.siteAPI = "http://127.0.0.1:5000";
    config.adminURL = "http://127.0.0.1:3001";
    config.adminAPI = "http://127.0.0.1:5001";
  } else if (env === "devcloud") {
    config.siteURL = `https://dev.${domain}`;
    config.siteAPI = `https://api.dev.${domain}`;
    config.adminURL = `https://admin.dev.${domain}`;
    config.adminAPI = `https://aapi.dev.${domain}`;
  } else if (env === "staging") {
    config.siteURL = `https://stage.${domain}`;
    config.siteAPI = `https://api.stage.${domain}`;
    config.adminURL = `https://admin.stage.${domain}`;
    config.adminAPI = `https://aapi.stage.${domain}`;
  } else if (env === "production") {
    config.siteURL = `https://${domain}`;
    config.siteAPI = `https://api.${domain}`;
    config.adminURL = `https://admin.${domain}`;
    config.adminAPI = `https://aapi.${domain}`;
  }
  console.log(`[Core Config] Environment changed from ${oldEnv} to ${config.env}. Current siteAPI: ${config.siteAPI}`);
}

export function setRuntimeOverrides(overrides: Partial<Pick<CoreConfig, 'siteURL' | 'siteAPI' | 'adminURL' | 'adminAPI' | 'staticURL'>>) {
  console.log('[Core Config] Applying runtime overrides:', overrides);
  if (overrides.siteURL) config.siteURL = overrides.siteURL;
  if (overrides.siteAPI) config.siteAPI = overrides.siteAPI;
  if (overrides.adminURL) config.adminURL = overrides.adminURL;
  if (overrides.adminAPI) config.adminAPI = overrides.adminAPI;
  if (overrides.staticURL) config.staticURL = overrides.staticURL;
  console.log(`[Core Config] Config after runtime overrides. Current siteAPI: ${config.siteAPI}`);
}

export default config as Readonly<CoreConfig>;
