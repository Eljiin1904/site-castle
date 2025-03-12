import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-promotion-tickets",
  body: Validation.object({
    promotionId: Validation.string().required("Promotion ID is required"),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { promotionId, limit, page } = req.body;

    const tickets = await Database.collection("transactions")
      .find(
        {
          kind: "promotion-code-redeem",
          promotionId,
        },
        {
          sort: { timestamp: -1, _id: 1 },
          projection: { user: 1, timestamp: 1 },
          skip: (page - 1) * limit,
          limit,
        },
      )
      .toArray();

    res.json({ tickets });
  },
});
