import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Database } from "#server/services/database";

export async function creditCommission(tx: TransactionDocument) {
  if (!("bet" in tx) || !tx.affiliate) {
    return;
  }

  await Database.collection("users").updateOne(
    { _id: tx.affiliate.id },
    {
      $inc: {
        "affiliate.referralXp": tx.bet.xp,
        "affiliate.commissionBalance": tx.bet.commissionAmount,
        "affiliate.commissionTotal": tx.bet.commissionAmount,
      },
    },
  );
}
