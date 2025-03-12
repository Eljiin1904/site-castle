import { Request } from "express";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import config from "#app/config";
import { UnknownUserError } from "../errors/UnknownUserError";
import { ExistingUserError } from "../errors/ExistingUserError";

export function googleStrategy() {
  const { siteURL, googleClientId, googleClientSecret } = config;

  const strategy = new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: `${siteURL}/auth/google`,
      scope: ["email", "profile"],
      passReqToCallback: true,
    },
    verify,
  );

  return strategy;
}

interface Profile {
  id: string;
  emails: {
    value: string;
    verified: boolean;
  }[];
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

    const googleId = profile.id;
    const email = profile.emails[0].value;

    if (req.isAuthenticated()) {
      if (await Database.exists("users", { googleId })) {
        throw new HandledError("Google id is already linked.");
      }

      await Database.collection("users").updateOne(
        { _id: req.user._id },
        { $set: { googleId } },
      );

      throw new ExistingUserError();
    } else {
      const user = await Database.collection("users").findOne({ googleId });

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
          throw new HandledError("Email is already registered.");
        }

        if (await Database.exists("users", { googleId })) {
          throw new HandledError("Google id is already linked.");
        }

        throw new UnknownUserError(googleId, email);
      }
    }
  } catch (err) {
    done(err);
  }
}
