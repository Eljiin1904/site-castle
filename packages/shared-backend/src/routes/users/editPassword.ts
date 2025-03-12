import bcrypt from "bcrypt";
import { Database } from "@server/services/database";
import { Validation } from "@core/services/validation";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { Users } from "#app/services/users";

export default Http.createApiRoute({
  type: "post",
  path: "/edit-password",
  secure: true,
  captcha: true,
  body: Validation.object({
    currentPassword: Validation.string(),
    newPassword: Validation.password("New password"),
  }),
  callback: async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = req.user;

    if (user.passwordHash) {
      if (!currentPassword) {
        throw new HandledError("Current password is required.");
      }
      await Site.validatePassword(user, currentPassword);
    }

    const passwordHash = await bcrypt.hash(newPassword, 8);

    await Database.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          passwordSet: true,
          passwordHash,
        },
      },
    );

    await Users.clearSessions(user, req.session.id);

    await Users.trackAction({
      user,
      kind: "password-edit",
      ip: req.trueIP,
    });

    res.json({});
  },
});
