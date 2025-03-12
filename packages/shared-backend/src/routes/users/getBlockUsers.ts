import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { Users } from "#app/services/users";

export default Http.createApiRoute({
  type: "post",
  path: "/get-blocked-users",
  secure: true,
  callback: async (req, res) => {
    const user = req.user;

    const documents = await Database.collection("users")
      .find(
        {
          _id: { $in: user.blockedUsers },
        },
        {
          projection: {
            _id: 1,
            username: 1,
            role: 1,
            tags: 1,
            avatarIndex: 1,
            avatarId: 1,
            xp: 1,
          },
        },
      )
      .toArray();

    const users = documents.map((x) => Users.getBasicUser(x));

    res.json({ users });
  },
});
