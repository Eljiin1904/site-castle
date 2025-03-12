import { GuildMember } from "discord.js";
import { UserDocument } from "@core/types/users/UserDocument";
import { System } from "@server/services/system";
import { Database } from "@server/services/database";
import { Users } from "@server/services/users";
import { Discord } from "#app/services/discord";

export async function crawlUsers() {
  const users = Database.collection("users").find(
    {
      discordId: { $ne: undefined },
    },
    {
      projection: {
        _id: 1,
        username: 1,
        discordId: 1,
        xp: 1,
      },
    },
  );

  for await (const user of users) {
    if (!user.discordId) {
      continue;
    }

    try {
      const member = await Discord.getMember(user.discordId);

      if (!member) {
        continue;
      }

      await handleNickname(member, user);
      await handleLinked(member);
      await handleLevel(member, user);
      await handleActivePlayer(member, user);
      await handleActiveHighRoller(member, user);
    } catch (err) {
      System.handleError(err);
    }
  }
}

async function handleNickname(member: GuildMember, user: UserDocument) {
  if (member.nickname !== user.username) {
    await member.setNickname(user.username);
  }
}

async function handleLinked(member: GuildMember) {
  await Discord.addRole(member, "Linked");
}

async function handleLevel(member: GuildMember, user: UserDocument) {
  const level = Users.getLevel(user.xp);
  const levelRoleName = Discord.getLevelRoleName(level);

  if (level >= 10) {
    await Discord.addRole(member, "Chicken Club");
  }

  if (!Discord.hasRole(member, levelRoleName)) {
    const current = member.roles.cache.filter((x) =>
      x.name.startsWith("Level "),
    );

    for (const role of current) {
      await member.roles.remove(role);
    }

    await Discord.addRole(member, levelRoleName);
  }
}

async function handleActivePlayer(member: GuildMember, user: UserDocument) {
  const active = await Discord.isActivePlayer(user._id);

  if (active) {
    await Discord.addRole(member, "Active Player");
  }
}

async function handleActiveHighRoller(member: GuildMember, user: UserDocument) {
  const active = await Discord.isActiveHighRoller(user._id);

  if (active) {
    await Discord.addRole(member, "Active High Roller");
  }
}
