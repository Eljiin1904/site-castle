import { Database } from "@server/services/database";
import { Validation } from "@core/services/validation";
import { HandledError } from "@server/services/errors";
import { Security } from "@server/services/security";
import { Http } from "#app/services/http";
import { Users } from "#app/services/users";

export default Http.createApiRoute({
  type: "post",
  path: "/twitch",
  secure: false,
  body: Validation.object({
    username: Validation.username(),
    password: Validation.password(),
    referralCode: Validation.string(),
    linkToken: Validation.token(),
  }),
  callback: async (req, res) => {
    const { username, password, referralCode, linkToken } = req.body;

    if (
      await Database.exists("users", { username }, { collation: { locale: "en", strength: 2 } })
    ) {
      throw new HandledError("Username is already taken.");
    }

    const { twitchId, email } = await Security.getToken({
      kind: "link-twitch",
      token: linkToken,
    });

    const user = await Users.registerUser(req, {
      strategy: "twitch",
      username,
      twitchId,
      email,
      emailConfirmed: true,
      password,
      referralCode,
    });

    await Security.consumeToken({
      kind: "link-twitch",
      token: linkToken,
    });

    res.json({ user });
  },
});
