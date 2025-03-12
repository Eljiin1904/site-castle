import { HandledError } from "@server/services/errors";
import { getGuild } from "./getGuild";

export async function getEmoji(emojiName: string) {
  const guild = await getGuild();

  await guild.emojis.fetch();

  const emoji = guild.emojis.cache.find((x) => x.name === emojiName);

  if (!emoji) {
    throw new HandledError(`No "${emojiName}" emoji in guild.`);
  }

  return emoji;
}
