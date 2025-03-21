import { Request } from "express";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Strategy as DiscordStrategy } from "passport-discord";
import config from "#app/config";
import { ExistingUserError } from "../errors/ExistingUserError";
import { UnknownUserError } from "../errors/UnknownUserError";

export function discordStrategy() {
  const { siteURL, discordClientId, discordClientSecret } = config;

  const strategy = new DiscordStrategy(
    {
      clientID: discordClientId,
      clientSecret: discordClientSecret,
      callbackURL: `${siteURL}/auth/discord`,
      scope: ["identify", "email"],
      passReqToCallback: true,
    },
    verify,
  );

  return strategy;
}

interface Profile {
  id: string;
  email: string;
}

async function verify(
  req: Request,
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: (error: any, user?: any) => void,
) {
  try {
    profile = profile as Profile;

    const discordId = profile.id;
    const email = profile.email;

    if (req.isAuthenticated()) {
      if (await Database.exists("users", { discordId })) {
        throw new HandledError("errors.discord.taken");
      }
      await Database.collection("users").updateOne(
        { _id: req.user._id },
        { $set: { discordId } },
      );

      throw new ExistingUserError();
    } else {
      const user = await Database.collection("users").findOne({ discordId });

      if (user) {
        done(null, user);
      } else {
        if (
          await Database.exists(
            "users",
            { email },
            { collation: { locale: "en", strength: 2 } },
          )
        ) {
          throw new HandledError("errors.email.taken");
        }

        if (await Database.exists("users", { discordId })) {
          throw new HandledError("errors.discord.taken");
        }

        throw new UnknownUserError(discordId, email);
      }
    }
  } catch (err) {
    done(err);
  }
}
