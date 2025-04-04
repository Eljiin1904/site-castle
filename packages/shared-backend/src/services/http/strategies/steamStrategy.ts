import { Request } from "express";
import { SteamOpenIdStrategy } from "passport-steam-openid";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import config from "#app/config";
import { UnknownUserError } from "../errors/UnknownUserError";
import { ExistingUserError } from "../errors/ExistingUserError";

export function steamStrategy() {
  const { siteURL } = config;

  const strategy = new SteamOpenIdStrategy(
    {
      returnURL: `${siteURL}/auth/steam`,
      profile: false,
    },
    verify,
  );

  strategy.name = "steam";

  return strategy;
}

async function verify(
  req: Request,
  identifier: string,
  profile: any,
  done: (error: any, user?: any) => void,
) {
  try {
    const steamId = identifier.replace("https://steamcommunity.com/openid/id/", "");

    if (req.isAuthenticated()) {
      if (await Database.exists("users", { steamId })) {
        throw new HandledError("errors.steam.taken");
      }

      await Database.collection("users").updateOne({ _id: req.user._id }, { $set: { steamId } });

      throw new ExistingUserError();
    } else {
      const user = await Database.collection("users").findOne({ steamId });

      if (user) {
        done(null, user);
      } else {
        if (await Database.exists("users", { steamId })) {
          throw new HandledError("errors.steam.taken");
        }

        throw new UnknownUserError(steamId);
      }
    }
  } catch (err) {
    done(err);
  }
}
