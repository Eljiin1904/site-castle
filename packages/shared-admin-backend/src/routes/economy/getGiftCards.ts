import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-gift-cards",
  body: Validation.object({
    batchId: Validation.string().required("Batch ID is required"),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { batchId, limit, page } = req.body;

    const cards = await Database.collection("gift-cards")
      .find(
        { batchId },
        {
          sort: { createDate: -1, _id: 1 },
          skip: (page - 1) * limit,
          limit,
        },
      )
      .toArray();

    res.json({ cards });
  },
});
