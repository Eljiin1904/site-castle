import { Database } from "@server/services/database";
import { Validation } from "@core/services/validation";
import { UserLinkedElsewhereError } from "#app/services/http";
import { Security } from "@server/services/security";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { Users } from "#app/services/users";
import { HandledError } from "@server/services/errors";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { LOG_MODULE_CONSTANTS } from "@core/services/logging/constants/LogConstant";
import config from "@core/config";
import { checkProfanityByField } from "#app/services/site/Site";

const rateLimiter = Security.createRateLimiter({
  keyPrefix: "local-register",
  points: 3,
  durationSeconds: 60 * 60 * 1,
  errorMessage: "errors.rateLimit",
});

const logger = getServerLogger({ module: LOG_MODULE_CONSTANTS.LOG_SHARED_BACKEND });
const { env } = config;

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
    const { username, email, password, referralCode } = req.body;
    logger.debug("adding new user via email (local)");

    if (env === "development") {
      try {
        await checkProfanityByField("username", username);
      } catch (err: any) {
        logger.error(`Unable to register User due to the following error ${err}`);

        if (err.toString().includes("Unable to register user due to profanity found"))
          throw new HandledError(err);
        throw new HandledError("Unable to register user at this time");
      }
    }

    const existingUserByEmail = await Database.collection("users").findOne(
      { email },
      { collation: { locale: "en", strength: 2 } },
    );
    if (existingUserByEmail) {
      logger.error(
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

    if (env != "development") await rateLimiter.consume(req.trueIP, 1);

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
