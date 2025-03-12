import { GuildMember } from "discord.js";
import { hasRole } from "./hasRole";
import { getRole } from "./getRole";

export async function addRole(member: GuildMember, roleName: string) {
  if (!hasRole(member, roleName)) {
    const role = await getRole(roleName);
    await member.roles.add(role);
  }
}
