import serverConfig, { ServerConfig, loadSecrets } from "@server/config";

export interface DiscordBotConfig extends ServerConfig {
  discordAppId: string;
  discordGuildId: string;
  botToken: string;
}

const config = serverConfig as DiscordBotConfig;

config.system = "shared-discord-bot";
config.botToken = process.env.DISCORD_BOT_TOKEN;

if (config.env === "development" || config.env === "devcloud") {
  config.discordAppId = "1274122281798602815";
  config.discordGuildId = "1270811454576001034";
} else if (config.env === "staging") {
  config.discordAppId = "1274122281798602815";
  config.discordGuildId = "1270811454576001034";
} else if (config.env === "production") {
  config.discordAppId = "1217170610292260926";
  config.discordGuildId = "1215342946249867294";
}

export async function initConfig() {
  await loadSecrets();
}

export default config as Readonly<DiscordBotConfig>;
