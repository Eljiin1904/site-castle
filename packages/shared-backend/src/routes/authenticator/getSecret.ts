import { authenticator } from "otplib";
import bcrypt from "bcrypt";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Ids } from "@server/services/ids";
import { Http } from "#app/services/http";
import config from "#app/config";

export default Http.createApiRoute({
  type: "post",
  path: "/get-secret",
  secure: true,
  callback: async (req, res) => {
    const user = req.user;

    if (user.tfa.enabled) {
      throw new HandledError("Authenticator already enabled.");
    }

    const secret = authenticator.generateSecret();
    const uri = authenticator.keyuri(user.username, config.siteName, secret);
    const recoveryKey = Ids.ticket();

    await Database.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          "tfa.secret": secret,
          "tfa.recoveryHash": await bcrypt.hash(recoveryKey, 8),
        },
      },
    );

    res.json({ secret, uri, recoveryKey });
  },
});
