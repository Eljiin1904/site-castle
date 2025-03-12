import { HandledError } from "@server/services/errors";
import { getGuild } from "./getGuild";

export async function getChannel(channelName: string) {
  const guild = await getGuild();

  await guild.channels.fetch();

  const channel = guild.channels.cache.find((x) => x.name === channelName);

  if (!channel || !channel.isTextBased()) {
    throw new HandledError(`No "${channelName}" channel in guild.`);
  }

  return channel;
}
