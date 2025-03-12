import { Validation } from "@core/services/validation";
import { Security } from "@server/services/security";
import { HandledError } from "@server/services/errors";
import { Market } from "@server/services/market";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

const rateLimiter = Security.createRateLimiter({
  keyPrefix: "create-deposit-skin",
  points: 1,
  durationSeconds: 5,
  errorMessage: "You are creating skin deposits too often.",
});

export default Http.createApiRoute({
  type: "post",
  path: "/create-deposit",
  restricted: true,
  secure: true,
  transaction: true,
  body: Validation.object({
    inventoryId: Validation.string().required("Inventory ID is required."),
    assetId: Validation.string().required("Asset ID is required."),
    provider: Validation.string().oneOf(Market.providers).required("Provider is required."),
  }),
  callback: async (req, res) => {
    const { inventoryId, assetId, provider } = req.body;
    const user = req.user;
    const steamId = user.steamId;
    const tradeUrl = user.meta.steamTradeUrl;

    await Site.validateToggle("skinDepositsEnabled");
    await Site.validatePermission(user, "deposit");
    await Site.validateConfirmed(user);
    await Site.validateSuspension(user);
    await Site.validateKycTier(user, 1);

    if (!steamId) {
      throw new HandledError("Steam not linked.");
    }
    if (!tradeUrl) {
      throw new HandledError("Trade URL not set.");
    }

    await rateLimiter.consume(req.user._id, 1);

    const { tradeOfferId } = await Market.createDeposit({
      user,
      steamId,
      tradeUrl,
      inventoryId,
      assetId,
      provider,
    });

    res.json({ tradeOfferId });
  },
});
