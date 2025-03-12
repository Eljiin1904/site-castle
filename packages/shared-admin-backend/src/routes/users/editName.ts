import { Validation } from "@core/services/validation";
import { HandledError } from "@server/services/errors";
import { Users } from "@server/services/users";
import { Database } from "@server/services/database";
import { Admin } from "@server/services/admin";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/edit-name",
  body: Validation.object({
    userId: Validation.string().required("User ID is required."),
    newName: Validation.string().required("New name is required."),
  }),
  callback: async (req, res) => {
    const { userId, newName } = req.body;
    const admin = req.user;

    if (
      await Database.exists(
        "users",
        { username: newName },
        { collation: { locale: "en", strength: 2 } },
      )
    ) {
      throw new HandledError("Username already used.");
    }

    const user = await Database.collection("users").findOneAndUpdate(
      { _id: userId },
      { $set: { username: newName } },
    );

    if (!user) {
      throw new HandledError("Target user not found.");
    }

    await Admin.log({
      kind: "user-name",
      admin: Users.getBasicUser(admin),
      user: Users.getBasicUser(user),
      newName,
    });

    res.json({});
  },
});
