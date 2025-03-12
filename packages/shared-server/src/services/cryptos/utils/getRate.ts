import { CryptoSymbol } from "@core/types/cryptos/CryptoSymbol";
import { Database } from "#server/services/database";

export async function getRate(symbol: CryptoSymbol) {
  const rateDocument = await Database.collection("crypto-rates").findOne({
    _id: symbol,
  });

  if (!rateDocument) {
    throw new Error("Rate lookup failed.");
  }

  return rateDocument.usdRate;
}
