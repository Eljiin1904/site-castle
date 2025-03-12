import { Numbers } from "@core/services/numbers";
import { UserDocument } from "@core/types/users/UserDocument";
import { Cryptos } from "@core/services/cryptos";
import { CryptoQuoteDocument } from "@core/types/cryptos/CryptoQuoteDocument";
import { CryptoWithdraw } from "@core/types/cryptos/CryptoWithdraw";
import { Transactions } from "#server/services/transactions";
import { Users } from "#server/services/users";
import { Slack } from "#server/services/slack";
import { Site } from "#server/services/site";
import { approveWithdraw } from "./approveWithdraw";

export async function createWithdraw({
  user,
  quote,
}: {
  user: UserDocument;
  quote: CryptoQuoteDocument;
}) {
  const crypto = Cryptos.getInfo(quote.cryptoKind);
  const settings = await Site.settings.cache();

  let autoApprove = true;

  if (user.tags.includes("cheeky")) {
    autoApprove = false;
  } else if (settings.manualCryptoWithdraw) {
    autoApprove = false;
  } else if (quote.usdAmount > settings.cryptoWithdrawSingleMax) {
    autoApprove = false;
  } else {
    autoApprove = await Users.canApproveWithdraw({
      userId: user._id,
      withdrawAmount: quote.tokenAmount,
      limitUsd: settings.cryptoWithdrawDailyMax,
    });
  }

  const transaction = (await Transactions.createTransaction({
    user,
    autoComplete: false,
    kind: "withdraw-crypto",
    amount: -quote.tokenAmount,
    destinationAddress: quote.destinationAddress,
    assetId: crypto.assetId,
    cryptoKind: crypto.kind,
    usdRate: quote.usdRate,
    cryptoAmount: quote.cryptoAmount,
    usdAmount: quote.usdAmount,
    feeAmount: quote.feeAmount,
    feeUsdAmount: quote.feeUsdAmount,
  })) as CryptoWithdraw;

  if (autoApprove) {
    await approveWithdraw({
      transactionId: transaction._id,
      approvedBy: "auto",
    });
  } else {
    const { user, cryptoAmount, usdAmount } = transaction;

    await Slack.ping(
      `:bank: Withdraw pending for \`${Numbers.round(
        cryptoAmount,
        crypto.decimals,
      )} ${crypto.kind.replace("_", " ")} ($${usdAmount.toFixed(2)})\` by \`${
        user.name
      }\`.`,
    );
  }
}
