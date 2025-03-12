import { Validation } from "@core/services/validation";
import { Security } from "@server/services/security";
import { HandledError } from "@server/services/errors";
import { Market } from "@server/services/market";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

const rateLimiter = Security.createRateLimiter({
  keyPrefix: "create-withdraw-skin",
  points: 1,
  durationSeconds: 5,
  errorMessage: "You are creating skin withdraws too often.",
});

export default Http.createApiRoute({
  type: "post",
  path: "/create-withdraw",
  restricted: true,
  secure: true,
  transaction: true,
  tfa: {
    settingKey: "withdraw2fa",
  },
  body: Validation.object({
    itemId: Validation.string().required("Item ID is required."),
  }),
  callback: async (req, res) => {
    const { itemId } = req.body;
    const user = req.user;
    const steamId = user.steamId;
    const tradeUrl = user.meta.steamTradeUrl;

    await Site.validateToggle("skinWithdrawsEnabled");
    await Site.validatePermission(user, "withdraw");
    await Site.validateConfirmed(user);
    await Site.validateWagerRequirement(user);

    if (!steamId) {
      throw new HandledError("Steam not linked.");
    }
    if (!tradeUrl) {
      throw new HandledError("Trade URL not set.");
    }

    const item = await Database.collection("market-items").findOne({
      _id: itemId,
    });

    if (!item) {
      throw new HandledError("Item no longer available.");
    }

    await Site.validateTokenBalance(user, item.tokenValue);

    await rateLimiter.consume(req.user._id, 1);

    await Market.createWithdraw({
      user,
      steamId,
      tradeUrl,
      item: Market.getItem(item),
    });

    res.json({});
  },
});
