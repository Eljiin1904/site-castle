import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-withdraws",
  body: Validation.object({
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { limit, page } = req.body;

    const transactions = await Database.collection("transactions")
      .find(
        {
          kind: "withdraw-skin",
          status: "pending",
        },
        {
          sort: { timestamp: 1, _id: 1 },
          skip: (page - 1) * limit,
          limit,
          projection: { bet: 0 },
        },
      )
      .toArray();

    res.json({ transactions });
  },
});
