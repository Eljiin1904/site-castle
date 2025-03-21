import { Database } from "@server/services/database";
import { Validation } from "@core/services/validation";
import { HandledError } from "@server/services/errors";
import { Security } from "@server/services/security";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { Users } from "#app/services/users";

export default Http.createApiRoute({
  type: "post",
  path: "/steam",
  secure: false,
  body: Validation.object({
    username: Validation.username(),
    email: Validation.email(),
    password: Validation.password(),
    referralCode: Validation.string(),
    linkToken: Validation.token(),
  }),
  callback: async (req, res) => {
    const { username, email, password, referralCode, linkToken } = req.body;

    if (await Database.exists("users", { email }, { collation: { locale: "en", strength: 2 } })) {
      throw new HandledError("errors.email.taken");
    }
    if (
      await Database.exists("users", { username }, { collation: { locale: "en", strength: 2 } })
    ) {
      throw new HandledError("errors.username.taken");
    }

    await Site.validateEmail(email);

    const { steamId } = await Security.getToken({
      kind: "link-steam",
      token: linkToken,
    });

    const user = await Users.registerUser(req, {
      strategy: "steam",
      username,
      steamId,
      email,
      emailConfirmed: false,
      password,
      referralCode,
    });

    await Security.consumeToken({
      kind: "link-steam",
      token: linkToken,
    });

    res.json({ user });
  },
});
