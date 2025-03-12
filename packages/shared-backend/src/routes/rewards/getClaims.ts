import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-claims",
  secure: true,
  body: Validation.object({
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { limit, page } = req.body;
    const user = req.user;

    const claims = await Database.collection("reward-claims")
      .find(
        {
          userId: user._id,
        },
        {
          sort: { timestamp: -1 },
          skip: (page - 1) * limit,
          limit,
        },
      )
      .toArray();

    res.json({ claims });
  },
});
