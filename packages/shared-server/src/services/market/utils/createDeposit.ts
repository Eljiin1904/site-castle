import { MarketProvider } from "@core/types/market/MarketProvider";
import { UserDocument } from "@core/types/users/UserDocument";
import { Market } from "@core/services/market";
import { HandledError } from "#server/services/errors";
import { Database } from "#server/services/database";
import { Transactions } from "#server/services/transactions";
import { getManager } from "./getProvider";

export async function createDeposit({
  user,
  steamId,
  tradeUrl,
  inventoryId,
  assetId,
  provider,
}: {
  user: UserDocument;
  steamId: string;
  tradeUrl: string;
  inventoryId: string;
  assetId: string;
  provider: MarketProvider;
}) {
  const inventory = await Database.collection("market-inventories").findOne({
    _id: inventoryId,
    userId: user._id,
  });

  if (!inventory) {
    throw new HandledError("Inventory expired, please refresh and try again.");
  }

  const item = inventory.items.find((x) => x.assetId === assetId);

  if (!item) {
    throw new HandledError("Asset ID not found in inventory.");
  }

  const price = item.prices.find((x) => x.provider === provider);

  if (!price) {
    throw new HandledError("Provider not found in item prices.");
  }

  if (price.tokenValue < Market.minDeposit) {
    throw new HandledError("Value below minimum.");
  }

  const manager = getManager(provider);
  const transactionId = await Transactions.getTransactionId();

  const { externalId, tradeOfferId } = await manager.createDeposit({
    depositId: transactionId,
    assetId,
    steamId,
    tradeUrl,
    priceUsd: price.usdValue,
    reference: price.reference,
  });

  await Transactions.createTransaction({
    transactionId,
    user,
    autoComplete: false,
    kind: "deposit-skin",
    amount: price.tokenValue,
    assetId,
    provider,
    item,
    externalId,
    steamId,
    usdAmount: price.usdValue,
    tradeOfferId,
  });

  return { tradeOfferId };
}
