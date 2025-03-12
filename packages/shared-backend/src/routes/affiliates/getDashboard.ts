import { AffiliateLeader } from "@core/types/affiliates/AffiliateLeader";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { Users } from "#app/services/users";

export default Http.createApiRoute({
  type: "post",
  path: "/get-dashboard",
  secure: true,
  callback: async (req, res) => {
    const users = await Database.collection("users")
      .find(
        {},
        {
          sort: {
            "affiliate.commissionTotal": -1,
            _id: 1,
          },
          limit: 5,
          projection: {
            username: 1,
            avatarIndex: 1,
            avatarId: 1,
            xp: 1,
            affiliate: 1,
          },
        },
      )
      .toArray();

    const leaders: AffiliateLeader[] = users.map((x) => ({
      user: Users.getBasicUser(x),
      affiliate: x.affiliate,
    }));

    res.json({ leaders });
  },
});
