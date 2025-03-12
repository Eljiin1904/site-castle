import { Database } from "@server/services/database";

interface DepositSkinifyData {
  kind: "deposit-skinify";
  ticketId: string;
  externalId: string;
  usdAmount: number;
  steamId: string;
}

export async function refactorSkinData() {
  const txs = Database.collection("transactions").find({
    kind: "deposit-skinify" as any,
  });

  for await (const tx of txs) {
    const data = tx as unknown as DepositSkinifyData;

    await Database.collection("transactions").updateOne(
      {
        _id: tx._id,
      },
      {
        $set: {
          kind: "deposit-skin",
          assetId: null as any,
          provider: "skinify",
          item: {} as any,
          usdAmount: Number.parseFloat(`${data.usdAmount}`),
          tradeOfferId: null as any,
        },
        $unset: {
          ticketId: 1,
        },
      },
    );
  }
}
