import { Intimal } from "@core/services/intimal";
import { Affiliates } from "@server/services/affiliates";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/claim-commission",
  restricted: true,
  secure: true,
  transaction: true,
  callback: async (req, res) => {
    const user = req.user;

    await Site.validateToggle("affiliatesEnabled");

    const amount = user.affiliate.commissionBalance;

    if (amount < Intimal.fromDecimal(0.01)) {
      throw new HandledError("Your balance is too low.");
    }

    const location = await Http.getLocation(req.trueIP);

    await Affiliates.debitCommission({ user, amount, location });

    res.json({ amount });
  },
});
