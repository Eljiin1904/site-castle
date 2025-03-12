import frontendConfig, { FrontendConfig } from "@client/config";

export interface AdminFrontendConfig extends FrontendConfig {
  version: string;
}

const config = frontendConfig as AdminFrontendConfig;

config.system = "shared-admin-frontend";
config.apiURL = config.adminAPI;
config.version = "0.0.1";

export default config as Readonly<AdminFrontendConfig>;
