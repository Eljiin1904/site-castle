import { Database } from "@server/services/database";
import { Validation } from "@core/services/validation";
import { HandledError } from "@server/services/errors";
import { Security } from "@server/services/security";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { Users } from "#app/services/users";

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
    const { username, email, password, referralCode } = req.body;

    if (
      await Database.exists(
        "users",
        { email },
        { collation: { locale: "en", strength: 2 } },
      )
    ) {
      throw new HandledError("errors.email.taken");
    }
    if (
      await Database.exists(
        "users",
        { username },
        { collation: { locale: "en", strength: 2 } },
      )
    ) {
      throw new HandledError("errors.username.taken");
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
