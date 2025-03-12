import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Users } from "#app/services/users";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/enable",
  secure: true,
  body: Validation.object({
    tfac: Validation.tfac(),
  }),
  callback: async (req, res) => {
    const { tfac } = req.body;
    const user = req.user;

    if (user.tfa.enabled) {
      throw new HandledError("Authenticator already enabled.");
    }

    await Site.validateAuthenticatorCode({ user, tfac, requireEnabled: false });

    await Database.collection("users").updateOne(
      { _id: user._id },
      { $set: { "tfa.enabled": true } },
    );

    await Users.trackAction({
      user,
      kind: "tfa-enable",
      ip: req.trueIP,
    });

    res.json({});
  },
});
