import { UserDocument } from "@core/types/users/UserDocument";
import { Intimal } from "@core/services/intimal";
import { Cryptos } from "@core/services/cryptos";
import { Numbers } from "@core/services/numbers";
import { Transactions } from "#server/services/transactions";
import { Notifications } from "#server/services/notifications";
import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";
import { getRate } from "./getRate";

export async function createDeposit({
  user,
  feeAmount,
  ...options
}: {
  user: UserDocument;
  externalId: string;
  sourceAddress: string;
  destinationAddress: string;
  txHash: string;
  assetId: string;
  cryptoAmount: number;
  feeAmount: number;
}) {
  const exists = await Database.exists("transactions", {
    externalId: options.externalId,
    kind: "deposit-crypto",
  });

  if (exists) {
    throw new HandledError("Deposit already exists.");
  }

  const crypto = Cryptos.getInfoFromAssetId(options.assetId);
  const cryptoAmount = options.cryptoAmount;

  const usdRate = await getRate(crypto.symbol);
  const usdAmount = cryptoAmount * usdRate;
  const tokenAmount = Intimal.fromDecimal(usdAmount * 2);

  let feeUsdAmount;

  if (crypto.isToken && crypto.networkCoin) {
    const coinUsdRate = await getRate(crypto.networkCoin);
    feeUsdAmount = Numbers.ceil(feeAmount * coinUsdRate, 2);
    feeAmount = Numbers.ceil(feeUsdAmount / usdRate, crypto.decimals);
  } else {
    feeUsdAmount = Numbers.ceil(feeAmount * usdRate, 2);
  }

  await Transactions.createTransaction({
    user,
    autoComplete: false,
    kind: "deposit-crypto",
    amount: tokenAmount,
    cryptoKind: crypto.kind,
    ...options,
    usdAmount,
    feeAmount,
    feeUsdAmount,
    confirmations: 0,
    requiredConfirmations: crypto.confirms,
  });

  await Notifications.createNotification({
    userId: user._id,
    kind: "crypto-deposit-pending",
    cryptoKind: crypto.kind,
    cryptoAmount,
    tokenAmount,
  });
}
