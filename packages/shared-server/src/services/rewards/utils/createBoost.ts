import { subDays } from "date-fns";
import { Numbers } from "@core/services/numbers";
import { UserDocument } from "@core/types/users/UserDocument";
import { Intimal } from "@core/services/intimal";
import { RewardBoostTimeframe } from "@core/types/rewards/RewardBoostTimeframe";
import { Rewards } from "@core/services/rewards";
import { Ids } from "#server/services/ids";
import { Database } from "#server/services/database";
import { Users } from "#server/services/users";
import { Transactions } from "#server/services/transactions";
import { Site } from "#server/services/site";

export async function createBoost({
  user,
  timeframe,
  eventId,
}: {
  user: UserDocument;
  timeframe: RewardBoostTimeframe;
  eventId: string | undefined;
}) {
  const level = Users.getLevel(user.xp);
  const maxDate = new Date();
  const minDate = subDays(maxDate, 45);

  const { holiday } = await Site.meta.cache();

  const { backRate, minAmount, maxAmount } = Rewards.getBoostInfo({
    timeframe,
    level,
    backRateMultiplier: holiday?.boostRate,
  });

  const report = await Users.aggregateReport({
    userId: user._id,
    minDate,
    maxDate,
  });

  const totalBetAmount = report.wagerAmount;
  const totalEv = report.evAmount;
  const totalRewardAmount = report.rewardAmount;
  const totalWonAmount = report.wonAmount;

  const ngrAmount = totalBetAmount - (totalWonAmount + totalRewardAmount);

  const evBack = Math.floor(totalEv * backRate);
  const ngrBack = Math.floor(ngrAmount > 0 ? ngrAmount * backRate : 0);
  const backAmount = evBack + ngrBack;

  let amount = backAmount;

  if (amount < minAmount) {
    amount = Numbers.randomInt(minAmount, maxAmount);
  }

  if (amount < Intimal.fromDecimal(0.01)) {
    return 0;
  }

  await Database.collection("reward-boost-tickets").insertOne({
    _id: Ids.object(),
    timestamp: new Date(),
    timeframe,
    userId: user._id,
    eventId,
  });

  await Transactions.createTransaction({
    user,
    autoComplete: true,
    kind: "reward-boost",
    amount,
    timeframe,
    eventId,
    backRate,
    minAmount,
    maxAmount,
    evBack,
    ngrBack,
    backAmount,
  });

  await Site.trackActivity({
    kind: "reward-boost",
    user: Users.getBasicUser(user),
    timeframe,
    amount,
  });

  return amount;
}
