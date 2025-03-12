import { GuildMember } from "discord.js";

export function hasRole(member: GuildMember, roleName: string) {
  return member.roles.cache.some((x) => x.name === roleName);
}
