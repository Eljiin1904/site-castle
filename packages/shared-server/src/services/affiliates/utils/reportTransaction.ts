import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Dates } from "@core/services/dates";
import { AffiliateReport } from "@core/types/affiliates/AffiliateReport";
import { Database } from "#server/services/database";

type ReportRecord = Partial<Record<keyof AffiliateReport, number>>;

export async function reportTransaction(tx: TransactionDocument) {
  if (!tx.affiliate) {
    return;
  }

  const timeframe = Dates.roundToHour(tx.timestamp);
  const timeId = Math.floor(timeframe.getTime() / 1000 / 60 / 60).toString();

  const $inc: ReportRecord = {};

  if ("bet" in tx) {
    $inc.commissionAmount = tx.bet.commissionAmount;
    $inc.commissionBalance = tx.bet.commissionAmount;
    $inc.xp = tx.bet.xp;
    $inc.wagerAmount = tx.value;
  }

  if (tx.stats?.depositAmount) {
    $inc.depositAmount = tx.stats.depositAmount;
  }

  if (tx.stats?.rewardAmount) {
    $inc.rewardAmount = tx.stats.rewardAmount;
  }

  await Database.collection("affiliate-reports").updateOne(
    {
      _id: `${timeId}_${tx.affiliate.id}_${tx.user.id}`,
    },
    {
      $setOnInsert: {
        timeframe,
        affiliateId: tx.affiliate.id,
        userId: tx.user.id,
      },
      $inc: $inc,
    },
    {
      upsert: true,
    },
  );
}
