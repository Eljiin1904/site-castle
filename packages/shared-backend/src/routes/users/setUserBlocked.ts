import { Validation } from "@core/services/validation";
import { HandledError } from "@server/services/errors";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/set-user-blocked",
  restricted: true,
  secure: true,
  body: Validation.object({
    userId: Validation.string().required(),
    block: Validation.boolean().required(),
  }),
  callback: async (req, res) => {
    const { userId, block } = req.body;
    const user = req.user;

    const targetUser = await Database.collection("users").findOne({
      _id: userId,
    });

    if (!targetUser) {
      throw new HandledError("Target user not found.");
    }

    await Database.collection("users").updateOne(
      { _id: user._id },
      block
        ? { $addToSet: { blockedUsers: targetUser._id } }
        : { $pull: { blockedUsers: targetUser._id } },
    );

    res.json({});
  },
});
