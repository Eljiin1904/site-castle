import { Filter } from "mongodb";
import { Validation } from "@core/services/validation";
import { Transactions } from "@core/services/transactions";
import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-transactions",
  secure: true,
  body: Validation.object({
    category: Validation.string().oneOf(Transactions.categories, "Invalid Category."),
    game: Validation.boolean().required("Game is required."),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { category, game, limit, page } = req.body;
    const userId = req.user._id;

    const filter: Filter<TransactionDocument> = {
      "user.id": userId,
    };

    if (category) {
      filter.category = category;
    }

    if (game) {
      filter.tags = { $eq: "game" };
    } else {
      filter.tags = { $ne: "game" };
    }

    const transactions = await Database.collection("transactions")
      .find(filter, {
        sort: { timestamp: -1 },
        skip: (page - 1) * limit,
        limit,
        projection: { bet: 0 },
      })
      .toArray();

    res.json({ transactions });
  },
});
