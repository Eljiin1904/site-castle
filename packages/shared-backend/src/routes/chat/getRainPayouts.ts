import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-rain-payouts",
  secure: false,
  body: Validation.object({
    rainId: Validation.string().required("Rain ID is required"),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { rainId, limit, page } = req.body;

    const payouts = await Database.collection("chat-rain-tickets")
      .find(
        {
          rainId,
          processed: true,
        },
        {
          sort: { splitAmount: -1, _id: 1 },
          skip: (page - 1) * limit,
          limit,
          projection: { _id: 0, user: 1, splitAmount: 1 },
        },
      )
      .toArray();

    res.json({ payouts });
  },
});
