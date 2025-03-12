import serverConfig, { ServerConfig, loadSecrets } from "@server/config";

export interface AffiliateApiConfig extends ServerConfig {
  port: number;
}

const config = serverConfig as AffiliateApiConfig;

config.system = "shared-affiliate-api";
config.port = process.env.PORT ? Number.parseInt(process.env.PORT) : 5003;

export async function initConfig() {
  await loadSecrets();
}

export default config as Readonly<AffiliateApiConfig>;
