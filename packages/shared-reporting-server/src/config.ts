import serverConfig, { ServerConfig, loadSecrets } from "@server/config";

export interface MasterServerConfig extends ServerConfig {}

const config = serverConfig as MasterServerConfig;

config.system = "shared-reporting-server";

export async function initConfig() {
  await loadSecrets();
}

export default config as Readonly<MasterServerConfig>;
