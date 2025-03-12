import { Database } from "@server/services/database";
import { Validation } from "@core/services/validation";
import { HandledError } from "@server/services/errors";
import { Security } from "@server/services/security";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { Users } from "#app/services/users";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";

const rateLimiter = Security.createRateLimiter({
  keyPrefix: "local-register",
  points: 3,
  durationSeconds: 60 * 60 * 1,
  errorMessage: "Too many registration requests.",
});

export default Http.createApiRoute({
  type: "post",
  path: "/local",
  secure: false,
  captcha: true,
  body: Validation.object({
    username: Validation.username(),
    email: Validation.email(),
    password: Validation.password(),
    referralCode: Validation.string(),
  }),
  callback: async (req, res) => {
    const { username, email, password, referralCode } = req.body;
    const logger = getServerLogger({});

    if (await Database.exists("users", { email }, { collation: { locale: "en", strength: 2 } })) {
      logger.warn(email + " is already registered");
      throw new HandledError("Email is already registered.");
    }
    if (
      await Database.exists("users", { username }, { collation: { locale: "en", strength: 2 } })
    ) {
      logger.warn(username + " already exists in the database");
      throw new HandledError("Username is already taken.");
    }

    await rateLimiter.consume(req.trueIP, 1);

    await Site.validateEmail(email);

    const user = await Users.registerUser(req, {
      strategy: "local",
      username,
      email,
      emailConfirmed: false,
      password,
      referralCode,
    });

    res.json({ user });
  },
});
