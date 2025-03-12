import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { Users } from "#app/services/users";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/disable",
  secure: true,
  body: Validation.object({
    tfac: Validation.tfac(),
  }),
  callback: async (req, res) => {
    const { tfac } = req.body;
    const user = req.user;

    await Site.validateAuthenticatorCode({ user, tfac });

    await Database.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          "tfa.enabled": false,
          "tfa.secret": null,
          "tfa.recoveryHash": null,
        },
      },
    );

    await Users.trackAction({
      user,
      kind: "tfa-disable",
      ip: req.trueIP,
    });

    res.json({});
  },
});
