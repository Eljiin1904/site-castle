import { Validation } from "@core/services/validation";
import { Market } from "@server/services/market";
import { Users } from "@server/services/users";
import { Admin } from "@server/services/admin";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/approve-withdraw",
  body: Validation.object({
    transactionId: Validation.string().required("Transaction ID is required."),
  }),
  callback: async (req, res) => {
    const { transactionId } = req.body;
    const admin = req.user;

    await Market.approveWithdraw({
      transactionId,
      approvedBy: Users.getBasicUser(admin),
    });

    await Admin.log({
      kind: "skin-withdraw-approve",
      admin: Users.getBasicUser(admin),
      transactionId,
    });

    res.json({});
  },
});
