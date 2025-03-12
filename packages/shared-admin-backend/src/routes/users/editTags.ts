import { HandledError } from "@server/services/errors";
import { Users } from "@server/services/users";
import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Admin } from "@server/services/admin";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/edit-tags",
  body: Validation.object({
    userId: Validation.string().required("User ID is required."),
    newTags: Validation.array()
      .of(Validation.string().required().oneOf(Users.tags, "Contains invalid tag."))
      .required("Tags is required."),
  }),
  callback: async (req, res) => {
    const { userId, newTags } = req.body;
    const admin = req.user;

    const user = await Database.collection("users").findOneAndUpdate(
      { _id: userId },
      { $set: { tags: newTags } },
    );

    if (!user) {
      throw new HandledError("Target user not found.");
    }

    await Admin.log({
      kind: "user-tags",
      admin: Users.getBasicUser(admin),
      user: Users.getBasicUser(user),
      newTags,
    });

    res.json({});
  },
});
