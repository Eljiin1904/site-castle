import config, { initConfig } from "./config";
import { ActivityType } from "discord.js";
import { Database } from "@server/services/database";
import { Discord } from "./services/discord";
import * as Managers from "./managers";

main();

async function main() {
  console.log("Starting discord bot...");

  await initConfig();

  console.log("Initialized config.");

  await Database.manager.init();

  console.log("Initialized database.");

  await Discord.client.login(config.botToken);

  Discord.client.user?.setPresence({
    status: "online",
    activities: [
      {
        type: ActivityType.Watching,
        name: "Castle.com",
      },
    ],
  });

  console.log(`Logged in as ${Discord.client.user?.tag}.`);

  Managers.crawl();

  console.log("Initialized managers.");

  console.log("Discord bot running.");
}
