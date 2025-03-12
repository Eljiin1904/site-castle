import { Request } from "express";
import { Strategy as LocalStrategy } from "passport-local";
import { HandledError } from "@server/services/errors";
import { Database } from "@server/services/database";
import { validatePassword } from "../../site/validators/validatePassword";

export function localStrategy() {
  const strategy = new LocalStrategy(
    {
      passReqToCallback: true,
    },
    verify,
  );

  return strategy;
}

async function verify(
  req: Request,
  lookup: string,
  password: string,
  done: (error: any, user?: any) => void,
) {
  try {
    const user = await Database.collection("users").findOne(
      { $or: [{ email: lookup }, { username: lookup }] },
      { collation: { locale: "en", strength: 2 } },
    );

    if (!user) {
      throw new HandledError("User not found.");
    }

    if (!user.passwordSet) {
      throw new HandledError(
        'You have not set a password. Please click "Forgot Password" to set one.',
      );
    }

    await validatePassword(user, password);

    done(null, user);
  } catch (err) {
    done(err);
  }
}
