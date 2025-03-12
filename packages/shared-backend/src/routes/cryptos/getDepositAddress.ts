import { Validation } from "@core/services/validation";
import { Cryptos } from "@server/services/cryptos";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/get-deposit-address",
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

    const address = await Cryptos.getDepositAddress({
      userId: user._id,
      kind,
      rotate: false,
    });

    res.json({ address });
  },
});
