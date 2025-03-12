import { Database } from "@server/services/database";
import { Discord } from "#app/services/discord";

export async function crawlActiveHighRollers() {
  const role = await Discord.getRole("Active High Roller");
  const removes = [];

  for (const [discordId, member] of role.members) {
    const user = await Database.collection("users").findOne(
      { discordId },
      { projection: { _id: 1 } },
    );

    if (!user) {
      continue;
    }

    const active = await Discord.isActiveHighRoller(user._id);

    if (!active) {
      removes.push(member);
    }
  }

  for (const member of removes) {
    await Discord.removeRole(member, "Active High Roller");
  }
}
