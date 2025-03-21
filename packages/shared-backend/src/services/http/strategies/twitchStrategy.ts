import { Request } from "express";
import { Strategy as TwitchStrategy } from "passport-twitch-strategy";
import { HandledError } from "@server/services/errors";
import { Database } from "@server/services/database";
import config from "#app/config";
import { UnknownUserError } from "../errors/UnknownUserError";
import { ExistingUserError } from "../errors/ExistingUserError";

export function twitchStrategy() {
  const { env, siteURL, twitchClientId, twitchClientSecret } = config;

  const callbackURL =
    env === "development"
      ? "http://localhost:3000/auth/twitch"
      : env === "devcloud"
        ? "http://site-frontend:3000/auth/twitch"
        : `${siteURL}/auth/twitch`;

  const strategy = new TwitchStrategy(
    {
      clientID: twitchClientId,
      clientSecret: twitchClientSecret,
      callbackURL,
      scope: "user:read:email",
      passReqToCallback: true,
    } as any,
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

    const twitchId = profile.id;
    const email = profile.email;

    if (req.isAuthenticated()) {
      if (await Database.exists("users", { twitchId })) {
        throw new HandledError("errors.twitch.taken");
      }

      await Database.collection("users").updateOne({ _id: req.user._id }, { $set: { twitchId } });

      throw new ExistingUserError();
    } else {
      const user = await Database.collection("users").findOne({ twitchId });

      if (user) {
        done(null, user);
      } else {
        if (
          await Database.exists("users", { email }, { collation: { locale: "en", strength: 2 } })
        ) {
          throw new HandledError("errors.email.taken");
        }

        if (await Database.exists("users", { twitchId })) {
          throw new HandledError("errors.twitch.taken");
        }

        throw new UnknownUserError(twitchId, email);
      }
    }
  } catch (err) {
    done(err);
  }
}
