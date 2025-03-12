import { SwappedWalletDocument } from "@core/types/economy/SwappedWalletDocument";
import { Cryptos } from "#server/services/cryptos";
import { Database } from "#server/services/database";
import { Ids } from "#server/services/ids";
import config from "#server/config";

export async function getSwappedWallet({ userId }: { userId: string }) {
  if (config.env !== "production") {
    return {
      currencyCode: "BTC",
      walletAddress: "tb1quyd4uul5tvrq486quhe0qsk63xxsxzaa9xhz36",
    };
  }

  const currencyCode = "LTC";

  const existing = await Database.collection("swapped-wallets").findOne({
    userId,
    currencyCode,
  });

  if (existing) {
    return existing;
  }

  const crypto = Cryptos.getInfo(currencyCode);

  const wallet = await Cryptos.fireblocks().generateNewAddress(
    config.fireblocksSwappedId,
    crypto.assetId,
    `User_${userId}`,
    userId,
  );

  const document: SwappedWalletDocument = {
    _id: Ids.object(),
    timestamp: new Date(),
    userId,
    currencyCode,
    walletAddress: wallet.address,
  };

  await Database.collection("swapped-wallets").insertOne(document);

  return document;
}
