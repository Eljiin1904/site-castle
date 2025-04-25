import { Database } from "@server/services/database";
import { Validation } from "@core/services/validation";
import { UserLinkedElsewhereError } from "#app/services/http";
import { Security } from "@server/services/security";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { Users } from "#app/services/users";
import { HandledError } from "@server/services/errors";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";

const rateLimiter = Security.createRateLimiter({
  keyPrefix: "local-register",
  points: 3,
  durationSeconds: 60 * 60 * 1,
  errorMessage: "errors.rateLimit",
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
  callback: async (req, res, next) => {
    const log = getServerLogger({});
    const { username, email, password, referralCode } = req.body;
    log.debug("adding new user via email (local)");

    const existingUserByEmail = await Database.collection("users").findOne(
      { email },
      { collation: { locale: "en", strength: 2 } },
    );
    if (existingUserByEmail) {
      log.error(
        "user already linked - email: " + email + " username: " + existingUserByEmail.username,
      );
      throw new HandledError();
      throw new UserLinkedElsewhereError(existingUserByEmail._id, email);
    }

    const existingUserByUsername = await Database.collection("users").findOne(
      { username },
      { collation: { locale: "en", strength: 2 } },
    );
    if (existingUserByUsername) {
      throw new HandledError();
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

    log.info("username added: " + user.username);

    res.json({ user });
  },
});
