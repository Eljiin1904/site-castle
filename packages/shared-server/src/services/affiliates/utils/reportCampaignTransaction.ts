import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Dates } from "@core/services/dates";
import { AffiliateReport } from "@core/types/affiliates/AffiliateReport";
import { Database } from "#server/services/database";

type ReportRecord = Partial<Record<keyof AffiliateReport, number>>;

export async function reportCampaignTransaction(tx: TransactionDocument) {
  if (!tx.affiliate) {
    return;
  }

  const timeframe = Dates.roundToHour(tx.timestamp);
  const timeId = Math.floor(timeframe.getTime() / 1000 / 60 / 60).toString();

  const $inc: ReportRecord = {};

  if ("bet" in tx) {
    $inc.commissionAmount = tx.bet.commissionAmount;
    $inc.xp = tx.bet.xp;
    $inc.wagerAmount = tx.value;
  }

  if (tx.stats?.depositAmount) {
    $inc.depositAmount = tx.stats.depositAmount;
  }

  if (tx.stats?.rewardAmount) {
    $inc.rewardAmount = tx.stats.rewardAmount;
  }

  if (tx.referer.kind == "campaign") {
    await Database.collection("affiliate-reports").updateOne(
      {
        _id: `${timeId}_${tx.referer.id}_${tx.user.id}`,
      },
      {
        $setOnInsert: {
          timeframe,
          affiliateId: tx.referer.id,
          userId: tx.user.id,
        },
        $inc: $inc,
      },
      {
        upsert: true,
      },
    );
  }
}
