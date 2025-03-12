import { getGuild } from "./getGuild";

export async function getMember(userId: string) {
  const guild = await getGuild();
  const member = guild.members.cache.get(userId);

  return member;
}
