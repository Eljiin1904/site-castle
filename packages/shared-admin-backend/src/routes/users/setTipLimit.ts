import { Validation } from "@core/services/validation";
import { HandledError } from "@server/services/errors";
import { Database } from "@server/services/database";
import { Admin } from "@server/services/admin";
import { Users } from "@server/services/users";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/set-tip-limit",
  body: Validation.object({
    userId: Validation.string().required("User ID is required."),
    tipLimit: Validation.currency("Tip limit").optional(),
  }),
  callback: async (req, res) => {
    const { userId, tipLimit } = req.body;
    const admin = req.user;

    const user = await Database.collection("users").findOneAndUpdate(
      { _id: userId },
      tipLimit ? { $set: { "meta.tipLimit": tipLimit } } : { $unset: { "meta.tipLimit": true } },
    );

    if (!user) {
      throw new HandledError("User not found.");
    }

    await Admin.log({
      kind: "user-tip-limit",
      admin: Users.getBasicUser(admin),
      user: Users.getBasicUser(user),
      tipLimit,
    });

    res.json({});
  },
});
