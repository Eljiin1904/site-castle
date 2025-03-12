import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Admin } from "@server/services/admin";
import { Users } from "@server/services/users";
import { Http } from "#app/services/http";
import { HandledError } from "@server/services/errors";

export default Http.createApiRoute({
  type: "post",
  path: "/set-base-tier",
  body: Validation.object({
    userId: Validation.string().required("User ID is required."),
    baseTier: Validation.number(),
  }),
  callback: async (req, res) => {
    const { userId, baseTier } = req.body;
    const admin = req.user;

    const user = await Database.collection("users").findOneAndUpdate(
      { _id: userId },
      baseTier
        ? { $set: { "affiliate.baseTier": baseTier } }
        : { $unset: { "affiliate.baseTier": true } },
    );

    if (!user) {
      throw new HandledError();
    }

    await Admin.log({
      kind: "affiliate-base-tier",
      admin: Users.getBasicUser(admin),
      user: Users.getBasicUser(user),
      baseTier,
    });

    res.json({});
  },
});
