import { Database } from "@server/services/database";
import { Discord } from "#app/services/discord";

export async function crawlLinked() {
  const role = await Discord.getRole("Linked");
  const removes = [];

  for (const [discordId, member] of role.members) {
    const exists = await Database.exists("users", { discordId });

    if (!exists) {
      removes.push(member);
    }
  }

  for (const member of removes) {
    await Discord.removeRole(member, "Linked");

    const current = member.roles.cache.filter((x) =>
      x.name.startsWith("Level "),
    );

    for (const role of current) {
      await member.roles.remove(role);
    }

    await Discord.removeRole(member, "Chicken Club");
    await Discord.removeRole(member, "Active Player");
    await Discord.removeRole(member, "Active High Roller");

    member.setNickname(null);
  }
}
