import { HandledError } from "#server/services/errors";
import { Database } from "#server/services/database";

export async function getTransactionId({ externalId }: { externalId: string }) {
  const transaction = await Database.collection("transactions").findOne(
    {
      externalId,
    },
    {
      projection: { _id: 1 },
    },
  );

  if (!transaction) {
    throw new HandledError("Invalid external id.");
  }

  return transaction._id;
}
