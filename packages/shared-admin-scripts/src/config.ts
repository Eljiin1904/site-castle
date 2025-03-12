import serverConfig, { ServerConfig, loadSecrets } from "@server/config";

export interface ScriptsConfig extends ServerConfig {
  csgoToken: string;
}

const config = serverConfig as ScriptsConfig;

config.system = "shared-admin-scripts";
config.csgoToken = process.env.CSGO_TOKEN;

export async function initConfig() {
  await loadSecrets();
}

export default config as Readonly<ScriptsConfig>;
