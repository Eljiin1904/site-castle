import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/update-settings",
  secure: true,
  body: Validation.object({
    login2fa: Validation.boolean().required(),
    bet2fa: Validation.boolean().required(),
    withdraw2fa: Validation.boolean().required(),
    tfac: Validation.tfac(),
  }),
  callback: async (req, res) => {
    const { login2fa, bet2fa, withdraw2fa, tfac } = req.body;
    const user = req.user;

    await Site.validateAuthenticatorCode({ user, tfac });

    await Database.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          "settings.login2fa": login2fa,
          "settings.bet2fa": bet2fa,
          "settings.withdraw2fa": withdraw2fa,
        },
      },
    );

    res.json({});
  },
});
