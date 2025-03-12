import { MarketProvider } from "@core/types/market/MarketProvider";
import { SkinWithdraw } from "@core/types/market/SkinWithdraw";
import { Utility } from "@core/services/utility";
import { System } from "@server/services/system";
import { Database } from "@server/services/database";
import { Market } from "@server/services/market";

export default () => System.tryCatch(main)();

async function main() {
  while (true) {
    await Promise.all([
      System.tryCatch(handleProvider)("skinify"),
      System.tryCatch(handleProvider)("skinsback"),
    ]);

    await Utility.wait(3000);
  }
}

async function handleProvider(provider: MarketProvider) {
  const manager = Market.getManager(provider);

  const txs = (await Database.collection("transactions")
    .find({
      kind: "withdraw-skin",
      status: "processing",
      provider,
      externalId: { $exists: true },
    })
    .toArray()) as Array<SkinWithdraw & { externalId: string }>;

  if (txs.length === 0) {
    return;
  }

  const { purchases } = await manager.getWithdrawInfo({
    purchaseIds: txs.map((x) => x.externalId),
  });

  for (const purchase of purchases) {
    const tx = txs.find((x) => x.externalId === purchase.id);

    if (!tx) {
      continue;
    }

    if (purchase.isCompleted) {
      await Market.completeWithdraw({
        transactionId: tx._id,
      });
    } else if (purchase.isCanceled) {
      await Market.cancelWithdraw({
        transactionId: tx._id,
        cancelReason: purchase.status,
      });
    } else if (purchase.tradeOfferId && !tx.tradeOfferId) {
      await Market.setWithdrawSent({
        transactionId: tx._id,
        tradeOfferId: purchase.tradeOfferId,
      });
    }
  }
}
