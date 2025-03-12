import { PeerType } from "fireblocks-sdk";
import { addSeconds } from "date-fns";
import { Validation } from "@core/services/validation";
import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";
import { CryptoQuoteDocument } from "@core/types/cryptos/CryptoQuoteDocument";
import { Cryptos } from "@server/services/cryptos";
import { HandledError } from "@server/services/errors";
import { Ids } from "@server/services/ids";
import { Database } from "@server/services/database";
import { Security } from "@server/services/security";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import config from "#app/config";

const rateLimiter = Security.createRateLimiter({
  keyPrefix: "quote-crypto-withdraw",
  points: 1,
  durationSeconds: 2,
  errorMessage: "You are requesting withdraws too often.",
});

export default Http.createApiRoute({
  type: "post",
  path: "/quote-withdraw",
  restricted: true,
  secure: true,
  transaction: true,
  body: Validation.object({
    kind: Validation.string().oneOf(Cryptos.kinds).required("Kind is required."),
    tokenAmount: Validation.currency("Token amount"),
    destinationAddress: Validation.string().required("Destination address is required."),
  }),
  callback: async (req, res) => {
    const { kind, tokenAmount, destinationAddress } = req.body;
    const user = req.user;

    await Site.validateToggle("cryptoWithdrawsEnabled");
    await Site.validatePermission(user, "withdraw");
    await Site.validateConfirmed(user);
    await Site.validateKycTier(user, 1);
    await Site.validateWagerRequirement(user);

    await rateLimiter.consume(req.user._id, 1);

    const crypto = Cryptos.getInfo(kind);

    if (tokenAmount < crypto.minWithdrawTokens) {
      throw new HandledError("Withdraw amount is below the minimum.");
    }

    const usdRate = await Cryptos.getRate(crypto.symbol);
    const usdAmount = Numbers.floor(Intimal.toDecimal(tokenAmount) / 2, 2);
    const cryptoAmount = Numbers.floor(usdAmount / usdRate, crypto.decimals);

    const { feeAmount, feeUsdAmount } = await Cryptos.estimateFee({
      kind,
      amount: cryptoAmount,
      source: {
        type: PeerType.VAULT_ACCOUNT,
        id: config.fireblocksWithdrawId,
      },
      destination: {
        type: PeerType.ONE_TIME_ADDRESS,
        oneTimeAddress: { address: destinationAddress },
      },
    });

    if (feeUsdAmount / usdAmount > 0.5) {
      throw new HandledError("The estimated network fee is more than 50% of the amount.");
    }

    const quote: CryptoQuoteDocument = {
      _id: Ids.object(),
      timestamp: new Date(),
      destinationAddress,
      cryptoKind: crypto.kind,
      tokenAmount,
      usdRate,
      cryptoAmount,
      usdAmount,
      feeAmount,
      feeUsdAmount,
      expires: addSeconds(Date.now(), 60),
    };

    await Database.collection("crypto-quotes").insertOne(quote);

    res.json({ quote });
  },
});
