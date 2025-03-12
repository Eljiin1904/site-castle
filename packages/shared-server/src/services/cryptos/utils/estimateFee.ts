import { isAxiosError } from "axios";
import { TransactionArguments } from "fireblocks-sdk";
import { Numbers } from "@core/services/numbers";
import { CryptoKind } from "@core/types/cryptos/CryptoKind";
import { Cryptos } from "@core/services/cryptos";
import { HandledError } from "#server/services/errors";
import { fireblocks } from "./fireblocks";
import { getRate } from "./getRate";

export async function estimateFee({
  kind,
  amount,
  source,
  destination,
}: {
  kind: CryptoKind;
  amount: string | number;
  source: TransactionArguments["source"];
  destination: TransactionArguments["destination"];
}) {
  const crypto = Cryptos.getInfo(kind);

  let fees;

  if (crypto.kind === "TRX") {
    fees = await fireblocks().getFeeForAsset(crypto.assetId);
  } else {
    try {
      fees = await fireblocks().estimateFeeForTransaction({
        assetId: crypto.assetId,
        amount,
        source,
        destination,
      });
    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response?.data.code === 1409) {
          throw new HandledError("Invalid destination address.");
        }
      }
      throw err;
    }
  }

  let feeAmount = Number.parseFloat(fees.high.networkFee ?? "0");

  if (!feeAmount) {
    throw new HandledError("Fee estimate failed.");
  }
  const usdRate = await getRate(crypto.symbol);

  let feeUsdAmount;

  if (crypto.isToken && crypto.networkCoin) {
    const coinUsdRate = await getRate(crypto.networkCoin);
    feeUsdAmount = Numbers.ceil(feeAmount * coinUsdRate, 2);
    feeAmount = Numbers.ceil(feeUsdAmount / usdRate, crypto.decimals);
  } else {
    feeUsdAmount = Numbers.ceil(feeAmount * usdRate, 2);
  }

  return { feeAmount, feeUsdAmount };
}
