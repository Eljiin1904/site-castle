import serverConfig, { ServerConfig, loadSecrets } from "@server/config";

export interface AdminBackendConfig extends ServerConfig {
  port: number;
}

const config = serverConfig as AdminBackendConfig;

config.system = "shared-admin-backend";
config.port = process.env.PORT ? Number.parseInt(process.env.PORT) : 5001;

export async function initConfig() {
  await loadSecrets();
}

export default config as Readonly<AdminBackendConfig>;
