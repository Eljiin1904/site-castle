import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Database } from "#server/services/database";

export async function creditCampaignCommission(tx: TransactionDocument) {
  if (!("bet" in tx) || !tx.affiliate) {
    return;
  }

  if (tx.referer.kind != "campaign") return;

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

  await Database.collection("user-campaigns").updateOne(
    { _id: tx.referer.id },
    {
      $inc: {
        referralXp: tx.bet.xp || 0,
        commissionBalance: tx.bet.commissionAmount,
        commissionTotal: tx.bet.commissionAmount,
      },
    },
  );
}
