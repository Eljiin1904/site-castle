import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Users } from "@server/services/users";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-actions",
  body: Validation.object({
    userId: Validation.string().required(),
    kind: Validation.string().oneOf(Users.actionKinds, "Invalid Kind."),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { userId, kind, limit, page } = req.body;

    const actions = await Database.collection("user-actions")
      .find(
        {
          ...(kind ? { kind } : {}),
          "user.id": userId,
        },
        {
          sort: { timestamp: -1, _id: 1 },
          skip: (page - 1) * limit,
          limit,
        },
      )
      .toArray();

    res.json({ actions });
  },
});
