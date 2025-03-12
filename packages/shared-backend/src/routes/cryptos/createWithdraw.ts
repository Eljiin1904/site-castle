import { Validation } from "@core/services/validation";
import { Cryptos } from "@server/services/cryptos";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Security } from "@server/services/security";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

const rateLimiter = Security.createRateLimiter({
  keyPrefix: "create-crypto-withdraw",
  points: 1,
  durationSeconds: 2,
  errorMessage: "You are creating crypto withdraws too often.",
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
    quoteId: Validation.string().required("Quote ID is required."),
  }),
  callback: async (req, res) => {
    const { quoteId } = req.body;
    const user = req.user;

    await Site.validateToggle("cryptoWithdrawsEnabled");
    await Site.validatePermission(user, "withdraw");
    await Site.validateConfirmed(user);
    await Site.validateWagerRequirement(user);

    const quote = await Database.collection("crypto-quotes").findOne({
      _id: quoteId,
    });

    if (!quote) {
      throw new HandledError("Quote is invalid or expired. Please try again.");
    }

    await Site.validateTokenBalance(user, quote.tokenAmount);

    await rateLimiter.consume(req.user._id, 1);

    await Cryptos.createWithdraw({ user, quote });

    res.json({});
  },
});
