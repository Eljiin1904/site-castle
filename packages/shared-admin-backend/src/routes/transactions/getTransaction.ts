import { Http } from "#app/services/http";
import { HandledError } from "@server/services/errors";
import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";

export default Http.createApiRoute({
  type: "post",
  path: "/get-transaction",
  secure: true,
  body: Validation.object({
    transactionId: Validation.string().required("Transaction ID is required."),
  }),
  callback: async (req, res) => {
    const { transactionId } = req.body;

    const transaction = await Database.collection("transactions").findOne({
      _id: transactionId,
    });

    if (!transaction) {
      throw new HandledError("Transaction not found.");
    }

    res.json({ transaction });
  },
});
