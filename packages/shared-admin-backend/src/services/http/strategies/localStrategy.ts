import { Request } from "express";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Users } from "@server/services/users";

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
    if (!Users.getPermissions(user.role).adminAccess) {
      throw new HandledError("You do not have admin access.");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.passwordHash || "",
    );

    if (!validPassword) {
      throw new HandledError("Password is incorrect.");
    }

    done(null, user);
  } catch (err) {
    done(err);
  }
}
