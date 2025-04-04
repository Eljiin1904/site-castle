import serverConfig, { ServerConfig, loadSecrets } from "@server/config";

export interface SiteBackendConfig extends ServerConfig {
  port: number;
}

const config = serverConfig as SiteBackendConfig;

config.system = "shared-backend";
config.port = process.env.PORT ? Number.parseInt(process.env.PORT) : 5000;

export async function initConfig(overrides: Record<string, string> = {}) {
  await loadSecrets(overrides);
}

export default config as Readonly<SiteBackendConfig>;
