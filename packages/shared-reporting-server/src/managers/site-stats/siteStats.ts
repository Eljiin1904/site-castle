import { minutesToMilliseconds, subDays } from "date-fns";
import { SiteStatsDocument } from "@core/types/site/SiteStatsDocument";
import { System } from "@server/services/system";
import { Transactions } from "@server/services/transactions";
import { Ids } from "@server/services/ids";
import { Database } from "@server/services/database";
import { Users } from "@server/services/users";

export default () =>
  setInterval(System.tryCatch(main), minutesToMilliseconds(5));

async function main() {
  const maxDate = new Date();
  const minDate = subDays(maxDate, 7);

  const users = await Users.aggregateGlobalReport({ minDate, maxDate });
  const txs = await Transactions.aggregateReport({ minDate, maxDate });

  const stats: SiteStatsDocument = {
    _id: Ids.object(),
    timestamp: new Date(),
    newUsers: users.newUsers,
    activeUsers: users.activeUsers,
    betCount: txs.totalBetCount,
    betAmount: txs.totalBetAmount,
    commissionAmount: txs.affiliateCommissionTokens,
    rewardAmount: txs.totalRewardAmount,
    biggestWin: txs.biggestWin,
    rainAmount: txs.rainClaimTokens,
    depositAmount: txs.totalDepositAmount,
    withdrawAmount: txs.totalWithdrawAmount,
    depositSkinAmount: txs.depositSkinTokens,
    withdrawSkinAmount: txs.withdrawSkinTokens,
  };

  await Database.collection("site-stats").insertOne(stats);
}
