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
    userId: Validation.string().required("errors.users.idRequired"),
    backupKey: Validation.string().required("errors.auth.requiredBackupKey"),
  }),
  callback: async (req, res) => {
    const { userId, backupKey } = req.body;

    const user = await Database.collection("users").findOne({
      _id: userId,
    });

    if (!user) {
      throw new HandledError("validations:errors.users.notFound");
    }
    if (!user.tfa.enabled) {
      throw new HandledError("validations:errors.auth.notEnabled");
    }

    const isValid = await bcrypt.compare(backupKey, user.tfa.recoveryHash);

    if (!isValid) {
      throw new HandledError("validations:errors.auth.invalidBackupKey");
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
