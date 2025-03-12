import serverConfig, { ServerConfig, loadSecrets } from "@server/config";

export interface GameServerConfig extends ServerConfig {}

const config = serverConfig as GameServerConfig;

config.system = "shared-game-server";

export async function initConfig() {
  await loadSecrets();
}

export default config as Readonly<GameServerConfig>;
