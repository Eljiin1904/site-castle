import { Validation } from "@core/services/validation";
import { Transactions } from "@server/services/transactions";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/vault-withdraw",
  restricted: true,
  secure: true,
  tfa: true,
  transaction: true,
  body: Validation.object({
    tokenAmount: Validation.currency("Token amount"),
  }),
  callback: async (req, res) => {
    const { tokenAmount } = req.body;
    const user = req.user;

    if ((user.vaultBalance || 0) < tokenAmount) {
      throw new HandledError("You do not have enough tokens in your vault.");
    }

    const { matchedCount } = await Database.collection("users").updateOne(
      {
        _id: user._id,
        vaultBalance: { $gte: tokenAmount },
      },
      { $inc: { vaultBalance: -tokenAmount } },
    );

    if (matchedCount !== 1) {
      throw new HandledError("Vault transfer failed.");
    }

    await Transactions.createTransaction({
      user,
      autoComplete: true,
      kind: "vault-withdraw",
      amount: tokenAmount,
    });

    res.json({});
  },
});
