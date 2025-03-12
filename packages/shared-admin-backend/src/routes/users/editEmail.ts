import { HandledError } from "@server/services/errors";
import { Users } from "@server/services/users";
import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Admin } from "@server/services/admin";
import { Http } from "#app/services/http";
import { CustomerIO } from "@server/services/customer-io";

export default Http.createApiRoute({
  type: "post",
  path: "/edit-email",
  body: Validation.object({
    userId: Validation.string().required("User ID is required."),
    newEmail: Validation.string().required("New email is required."),
  }),
  callback: async (req, res) => {
    const { userId, newEmail } = req.body;
    const admin = req.user;

    if (
      await Database.exists(
        "users",
        { email: newEmail },
        { collation: { locale: "en", strength: 2 } },
      )
    ) {
      throw new HandledError("Email already registered.");
    }

    const user = await Database.collection("users").findOneAndUpdate(
      { _id: userId },
      { $set: { email: newEmail, emailConfirmed: false } },
    );

    if (!user) {
      throw new HandledError("Target user not found.");
    }

    await Admin.log({
      kind: "user-email",
      admin: Users.getBasicUser(admin),
      user: Users.getBasicUser(user),
      newEmail,
    });

    await CustomerIO.updateUser(user._id, { email_verified: false });

    res.json({});
  },
});
