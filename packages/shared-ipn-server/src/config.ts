import serverConfig, { ServerConfig, loadSecrets } from "@server/config";

export interface IpnServerConfig extends ServerConfig {
  port: number;
}

const config = serverConfig as IpnServerConfig;

config.system = "shared-ipn-server";
config.port = process.env.PORT ? Number.parseInt(process.env.PORT) : 5002;

export async function initConfig() {
  await loadSecrets();
}

export default config as Readonly<IpnServerConfig>;
