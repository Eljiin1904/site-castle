import { Validation } from "@core/services/validation";
import { Market } from "@server/services/market";
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

    await Market.cancelWithdraw({
      transactionId,
      cancelReason: "Cancelled by admin.",
    });

    await Admin.log({
      kind: "skin-withdraw-cancel",
      admin: Users.getBasicUser(admin),
      transactionId,
    });

    res.json({});
  },
});
