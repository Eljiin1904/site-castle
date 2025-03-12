import { Http } from "#app/services/http";
import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Transactions } from "@server/services/transactions";

export default Http.createApiRoute({
  type: "post",
  path: "/get-transactions",
  body: Validation.object({
    userId: Validation.string().required(),
    kind: Validation.string().oneOf(Transactions.kinds, "Invalid Kind."),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { userId, kind, limit, page } = req.body;

    const transactions = await Database.collection("transactions")
      .find(
        {
          "user.id": userId,
          ...(kind ? { kind } : {}),
        },
        {
          sort: { timestamp: -1 },
          skip: (page - 1) * limit,
          limit,
        },
      )
      .toArray();

    res.json({ transactions });
  },
});
