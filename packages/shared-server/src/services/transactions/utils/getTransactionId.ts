import { Ids } from "#server/services/ids";

export async function getTransactionId() {
  const transactionId = await Ids.incremental({
    key: "transactionId",
    baseValue: 1000000,
    batchSize: 100,
  });

  return transactionId;
}
