import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Market } from "@server/services/market";
import { Http } from "#app/services/http";
import { Users } from "#app/services/users";

export default Http.createApiRoute({
  type: "post",
  path: "/set-trade-url",
  secure: true,
  restricted: true,
  body: Validation.object({
    tradeUrl: Validation.string().required("Trade URL is required."),
  }),
  callback: async (req, res) => {
    const { tradeUrl } = req.body;
    const user = req.user;

    if (!Market.tradeUrlRegex.test(tradeUrl)) {
      throw new Error("Invalid trade url format.");
    }

    await Database.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          "meta.steamTradeUrl": tradeUrl,
        },
      },
    );

    await Users.trackAction({
      user,
      kind: "set-trade-url",
      ip: req.trueIP,
      tradeUrl,
    });

    res.json({});
  },
});
