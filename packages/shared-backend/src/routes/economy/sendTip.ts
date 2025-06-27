import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Economy } from "@server/services/economy";
import { HandledError } from "@server/services/errors";
import { Security } from "@server/services/security";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

const rateLimiter = Security.createRateLimiter({
  keyPrefix: "send-tip",
  points: 1,
  durationSeconds: 2,
  errorMessage: "errors.tips.tooManyRequests",
});

export default Http.createApiRoute({
  type: "post",
  path: "/send-tip",
  restricted: true,
  secure: true,
  transaction: true,
  tfa: {
    settingKey: "withdraw2fa",
  },
  body: Validation.object({
    lookup: Validation.string().required("validations.tip.recipientRequired"),
    tipAmount: Validation.currency("fields:tip.amount"),
  }),
  callback: async (req, res) => {
    const { lookup, tipAmount } = req.body;
    const sender = req.user;

    await Site.validateToggle("tippingEnabled");
    await Site.validateConfirmed(sender);
    await Site.validateSuspension(sender);
    await Site.validateWagerRequirement(sender);
    await Site.validateTokenBalance(sender, tipAmount);

    await rateLimiter.consume(req.user._id, 1);

    if (sender.meta.tipLimit) {
      const tipUsage = await Economy.getTipUsage({ user: sender });
      const newUsage = tipUsage + tipAmount;

      if (newUsage > sender.meta.tipLimit) {
        throw new HandledError("errors.tips.dailyLimit");
      }
    }

    const receiver = await Database.collection("users").findOne(
      { username: lookup },
      { collation: { locale: "en", strength: 2 } },
    );

    if (!receiver) {
      throw new HandledError("errors.tips.recipientNotFound");
    }
    if (receiver._id === sender._id) {
      throw new HandledError("errors.tips.tipYourself");
    }
    if (!receiver.settings.receiveTips) {
      throw new HandledError("errors.tips.recipientBlocked");
    }

    const location = await Http.getLocation(req.trueIP);

    await Economy.createTip({ sender, receiver, tipAmount, location });

    res.json({});
  },
});
