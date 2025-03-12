import { Http } from "#app/services/http";
import { HandledError } from "@server/services/errors";
import { Users } from "@server/services/users";
import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Admin } from "@server/services/admin";
import { Transactions } from "@server/services/transactions";
import { Notifications } from "@server/services/notifications";

export default Http.createApiRoute({
  type: "post",
  path: "/debit-tokens",
  body: Validation.object({
    userId: Validation.string().required("User ID is required."),
    adjustment: Validation.string()
      .oneOf(Admin.debitAdjustments, "Invalid Adjustment.")
      .required("Adjustment is required."),
    tokenAmount: Validation.currency("Token amount"),
  }),
  callback: async (req, res) => {
    const { userId, adjustment, tokenAmount } = req.body;
    const admin = req.user;

    const user = await Database.collection("users").findOne({ _id: userId });

    if (!user) {
      throw new HandledError("Target user not found.");
    }

    await Transactions.createTransaction({
      user,
      autoComplete: true,
      kind: "admin-token-debit",
      amount: -tokenAmount,
      adjustment,
    });

    await Notifications.createNotification({
      userId: user._id,
      kind: "token-debit",
      amount: tokenAmount,
    });

    await Admin.log({
      kind: "token-debit",
      admin: Users.getBasicUser(admin),
      user: Users.getBasicUser(user),
      amount: tokenAmount,
      adjustment,
    });

    res.json({});
  },
});
