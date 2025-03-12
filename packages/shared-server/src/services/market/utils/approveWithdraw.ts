import { isAxiosError } from "axios";
import { BasicUser } from "@core/types/users/BasicUser";
import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";
import { getManager } from "./getProvider";
import { cancelWithdraw } from "./cancelWithdraw";

export async function approveWithdraw({
  transactionId,
  approvedBy,
}: {
  transactionId: string;
  approvedBy: "auto" | BasicUser;
}) {
  const transaction = await Database.collection(
    "transactions",
  ).findOneAndUpdate(
    {
      _id: transactionId,
      status: "pending",
    },
    {
      $set: {
        status: "processing",
        approvedBy,
        approvedDate: new Date(),
      },
    },
  );

  if (!transaction || transaction.kind !== "withdraw-skin") {
    return;
  }

  const item = transaction.item;
  const manager = getManager(item.provider);

  try {
    const { purchaseId } = await manager.createWithdraw({
      tradeUrl: transaction.tradeUrl,
      steamId: transaction.steamId,
      withdrawId: transaction._id,
      externalItemId: item.externalId,
      priceUsd: item.usdValue,
      reference: item.reference,
    });

    await Database.collection("transactions").updateOne(
      {
        _id: transactionId,
      },
      {
        $set: {
          externalId: purchaseId,
        },
      },
    );
  } catch (err) {
    if (isAxiosError(err)) {
      console.error(`AxiosError: ${err.message}`);
      console.error(err.response?.data);
    } else {
      console.error(err);
    }

    await cancelWithdraw({
      transactionId: transaction._id,
      cancelReason: "Failed to create external transaction.",
    });

    throw new HandledError("Failed to create external transaction.");
  }
}
