import bcrypt from "bcrypt";
import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Users } from "#app/services/users";

export default Http.createApiRoute({
  type: "post",
  path: "/recover",
  secure: false,
  body: Validation.object({
    userId: Validation.string().required("User ID is required."),
    backupKey: Validation.string().required("Backup key is required."),
  }),
  callback: async (req, res) => {
    const { userId, backupKey } = req.body;

    const user = await Database.collection("users").findOne({
      _id: userId,
    });

    if (!user) {
      throw new HandledError("User not found.");
    }
    if (!user.tfa.enabled) {
      throw new HandledError("Authenticator not enabled.");
    }

    const isValid = await bcrypt.compare(backupKey, user.tfa.recoveryHash);

    if (!isValid) {
      throw new HandledError("Invalid backup key.");
    }

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
