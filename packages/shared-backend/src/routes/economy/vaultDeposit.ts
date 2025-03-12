import { Validation } from "@core/services/validation";
import { Transactions } from "@server/services/transactions";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/vault-deposit",
  restricted: true,
  secure: true,
  transaction: true,
  body: Validation.object({
    tokenAmount: Validation.currency("Token amount"),
  }),
  callback: async (req, res) => {
    const { tokenAmount } = req.body;
    const user = req.user;

    await Site.validateTokenBalance(user, tokenAmount);

    await Transactions.createTransaction({
      user,
      autoComplete: true,
      kind: "vault-deposit",
      amount: -tokenAmount,
    });

    await Database.collection("users").updateOne(
      { _id: user._id },
      { $inc: { vaultBalance: tokenAmount } },
    );

    res.json({});
  },
});
