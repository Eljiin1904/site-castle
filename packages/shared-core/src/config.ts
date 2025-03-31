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
  config.env = env;
  if (env === "development") {
    config.siteURL = "http://127.0.0.1:3000";
    config.siteAPI = "http://127.0.0.1:5000";
    config.adminURL = "http://127.0.0.1:3001";
    config.adminAPI = "http://127.0.0.1:5001";
  } else if (env === "devcloud") {
    config.siteURL = `http://castle-frontend.front-end.svc.cluster.local:80`;
    config.siteAPI = `http://castle-backend.shared-backend.svc.cluster.local:3000`;
    config.adminURL = `http://castle-admin-frontend.shared-admin-frontend.svc.cluster.local:80`;
    config.adminAPI = `http://castle-admin-be-castle-admin-backend.shared-admin-backend.svc.cluster.local:3000`;
  } else if (env === "staging") {
    config.siteURL = `https://staging.${domain}`;
    config.siteAPI = `https://api.staging.${domain}`;
    config.adminURL = `https://admin.staging.${domain}`;
    config.adminAPI = `https://aapi.staging.${domain}`;
  } else if (env === "production") {
    config.siteURL = `http://castle-frontend.front-end.svc.cluster.local:80`;
    config.siteAPI = `http://castle-backend.shared-backend.svc.cluster.local:3000`;
    config.adminURL = `http://castle-admin-frontend.shared-admin-frontend.svc.cluster.local:80`;
    config.adminAPI = `http://castle-admin-be-castle-admin-backend.shared-admin-backend.svc.cluster.local:3000`;
  }
}

export default config as Readonly<CoreConfig>;
