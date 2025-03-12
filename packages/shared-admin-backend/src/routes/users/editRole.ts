import { HandledError } from "@server/services/errors";
import { Users } from "@server/services/users";
import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Admin } from "@server/services/admin";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/edit-role",
  body: Validation.object({
    userId: Validation.string().required("User ID is required."),
    newRole: Validation.string().oneOf(Users.roles, "Invalid role.").required("Role is required."),
  }),
  callback: async (req, res) => {
    const { userId, newRole } = req.body;
    const admin = req.user;

    const user = await Database.collection("users").findOneAndUpdate(
      { _id: userId },
      { $set: { role: newRole } },
    );

    if (!user) {
      throw new HandledError("Target user not found.");
    }

    await Admin.log({
      kind: "user-role",
      admin: Users.getBasicUser(admin),
      user: Users.getBasicUser(user),
      newRole,
    });

    res.json({});
  },
});
