import { HandledError } from "@server/services/errors";
import config from "#app/config";
import { client } from "../constants/client";

export async function getGuild() {
  const guild = await client.guilds.fetch(config.discordGuildId);

  if (!guild) {
    throw new HandledError(`Invalid guild id: ${config.discordGuildId}`);
  }

  return guild;
}
