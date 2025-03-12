import { subDays } from "date-fns";
import { Validation } from "@core/services/validation";
import { Cryptos } from "@server/services/cryptos";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/rotate-deposit-address",
  restricted: true,
  secure: true,
  transaction: true,
  body: Validation.object({
    kind: Validation.string().oneOf(Cryptos.kinds).required("Kind is required."),
  }),
  callback: async (req, res) => {
    const { kind } = req.body;
    const user = req.user;

    await Site.validatePermission(user, "deposit");
    await Site.validateConfirmed(user);
    await Site.validateSuspension(user);

    if (
      await Database.exists("crypto-wallets", {
        userId: user._id,
        timestamp: { $gt: subDays(Date.now(), 1) },
      })
    ) {
      throw new HandledError("Deposit addresses may only be generated once every 24 hours.");
    }

    const address = await Cryptos.getDepositAddress({
      userId: user._id,
      kind,
      rotate: true,
    });

    res.json({ address });
  },
});
