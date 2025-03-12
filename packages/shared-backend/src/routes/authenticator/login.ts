import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Security } from "@server/services/security";
import { Http } from "#app/services/http";
import { Users } from "#app/services/users";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/login",
  restricted: true,
  secure: false,
  body: Validation.object({
    tfac: Validation.tfac(),
    loginToken: Validation.token(),
  }),
  callback: async (req, res) => {
    const { tfac, loginToken } = req.body;

    const { userId, strategy } = await Security.getToken({
      kind: "otp-login",
      token: loginToken,
    });

    const user = await Database.collection("users").findOne({ _id: userId });

    if (!user) {
      throw new HandledError("User lookup failed.");
    }

    await Site.validateAuthenticatorCode({ user, tfac });

    await Users.loginUser(req, user);

    await Security.consumeToken({
      kind: "otp-login",
      token: loginToken,
    });

    await Users.trackAction({
      user,
      kind: "login",
      ip: req.trueIP,
      strategy,
      tfa: true,
    });

    res.json({ user: Users.getAuthenticatedUser(user) });
  },
});
