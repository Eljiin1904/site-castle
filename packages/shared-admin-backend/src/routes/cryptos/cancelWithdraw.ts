import { Validation } from "@core/services/validation";
import { Cryptos } from "@server/services/cryptos";
import { Admin } from "@server/services/admin";
import { Users } from "@server/services/users";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/cancel-withdraw",
  body: Validation.object({
    transactionId: Validation.string().required("Transaction ID is required."),
  }),
  callback: async (req, res) => {
    const { transactionId } = req.body;
    const admin = req.user;

    await Cryptos.cancelWithdraw({
      transactionId,
      cancelReason: "Cancelled by admin.",
    });

    await Admin.log({
      kind: "crypto-withdraw-cancel",
      admin: Users.getBasicUser(admin),
      transactionId,
    });

    res.json({});
  },
});
