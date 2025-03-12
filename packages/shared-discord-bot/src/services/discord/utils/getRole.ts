import { HandledError } from "@server/services/errors";
import { getGuild } from "./getGuild";

export async function getRole(roleName: string) {
  const guild = await getGuild();

  await guild.roles.fetch();

  const role = guild.roles.cache.find((x) => x.name === roleName);

  if (!role) {
    throw new HandledError(`No "${roleName}" role in guild.`);
  }

  return role;
}
