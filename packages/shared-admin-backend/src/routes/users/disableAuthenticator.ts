import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Admin } from "@server/services/admin";
import { Users } from "@server/services/users";
import { Http } from "#app/services/http";
import { HandledError } from "@server/services/errors";

export default Http.createApiRoute({
  type: "post",
  path: "/disable-authenticator",
  body: Validation.object({
    userId: Validation.string().required("User ID is required."),
  }),
  callback: async (req, res) => {
    const { userId } = req.body;
    const admin = req.user;

    const user = await Database.collection("users").findOne({ _id: userId });

    if (!user) {
      throw new HandledError("Target user not found.");
    }

    await Database.collection("users").updateOne(
      { _id: userId },
      {
        $set: {
          "tfa.enabled": false,
          "tfa.secret": null,
          "tfa.recoveryHash": null,
        },
      },
    );

    await Admin.log({
      kind: "user-authenticator-disable",
      admin: Users.getBasicUser(admin),
      user: Users.getBasicUser(user),
    });

    res.json({});
  },
});
