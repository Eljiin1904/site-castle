import { UserReport } from "@core/types/users/UserReport";
import { Database } from "#server/services/database";

export async function aggregateReport({
  userId,
  minDate,
  maxDate,
}: {
  userId: string;
  minDate: Date;
  maxDate: Date;
}): Promise<UserReport> {
  const pipeline = createPipeline({ userId, minDate, maxDate });
  const collection = Database.collection("user-reports");
  const cursor = collection.aggregate<UserReport>(pipeline);
  const result = await cursor.toArray();

  const report = getDefaultReport();
  const aggregate = result[0];

  for (const str in aggregate) {
    const key = str as keyof UserReport;
    report[key] = aggregate[key];
  }

  return report;
}

function createPipeline({
  userId,
  minDate,
  maxDate,
}: {
  userId: string;
  minDate: Date;
  maxDate: Date;
}) {
  const pipeline = [
    {
      $match: {
        userId,
        timeframe: { $gte: minDate, $lt: maxDate },
      },
    },
    {
      $group: {
        _id: null,
        xpGained: {
          $sum: "$xpGained",
        },
        gemsSpent: {
          $sum: "$gemsSpent",
        },
        holidaySpent: {
          $sum: "$holidaySpent",
        },
        profitLoss: {
          $sum: "$profitLoss",
        },
        depositCount: {
          $sum: "$depositCount",
        },
        depositAmount: {
          $sum: "$depositAmount",
        },
        withdrawCount: {
          $sum: "$withdrawCount",
        },
        withdrawAmount: {
          $sum: "$withdrawAmount",
        },
        tipSentAmount: {
          $sum: "$tipSentAmount",
        },
        tipReceiveAmount: {
          $sum: "$tipReceiveAmount",
        },
        vaultDepositAmount: {
          $sum: "$vaultDepositAmount",
        },
        vaultWithdrawAmount: {
          $sum: "$vaultWithdrawAmount",
        },
        rewardAmount: {
          $sum: "$rewardAmount",
        },
        promotionAmount: {
          $sum: "$promotionAmount",
        },
        promotionCodeCount: {
          $sum: "$promotionCodeCount",
        },
        promotionCodeAmount: {
          $sum: "$promotionCodeAmount",
        },
        promotionCardCount: {
          $sum: "$promotionCardCount",
        },
        promotionCardAmount: {
          $sum: "$promotionCardAmount",
        },
        boostDailyCount: {
          $sum: "$boostDailyCount",
        },
        boostDailyAmount: {
          $sum: "$boostDailyAmount",
        },
        boostWeeklyCount: {
          $sum: "$boostWeeklyCount",
        },
        boostWeeklyAmount: {
          $sum: "$boostWeeklyAmount",
        },
        boostMonthlyCount: {
          $sum: "$boostMonthlyCount",
        },
        boostMonthlyAmount: {
          $sum: "$boostMonthlyAmount",
        },
        gemStoreAmount: {
          $sum: "$gemStoreAmount",
        },
        levelCaseAmount: {
          $sum: "$levelCaseAmount",
        },
        rewardCreditCount: {
          $sum: "$rewardCreditCount",
        },
        rewardCreditAmount: {
          $sum: "$rewardCreditAmount",
        },
        raceCount: {
          $sum: "$raceCount",
        },
        raceAmount: {
          $sum: "$raceAmount",
        },
        raffleCount: {
          $sum: "$raffleCount",
        },
        raffleAmount: {
          $sum: "$raffleAmount",
        },
        rainCount: {
          $sum: "$rainCount",
        },
        rainAmount: {
          $sum: "$rainAmount",
        },
        adventCount: {
          $sum: "$adventCount",
        },
        adventAmount: {
          $sum: "$adventAmount",
        },
        betCount: {
          $sum: "$betCount",
        },
        evAmount: {
          $sum: "$evAmount",
        },
        wagerAmount: {
          $sum: "$wagerAmount",
        },
        wagerProfitLoss: {
          $sum: "$wagerProfitLoss",
        },
        wonAmount: {
          $sum: "$wonAmount",
        },
        duelBetCount: {
          $sum: "$duelBetCount",
        },
        duelWagerAmount: {
          $sum: "$duelWagerAmount",
        },
        caseBattleBetCount: {
          $sum: "$caseBattleBetCount",
        },
        caseBattleWagerAmount: {
          $sum: "$caseBattleWagerAmount",
        },
        crashBetCount: {
          $sum: "$crashBetCount",
        },
        crashWagerAmount: {
          $sum: "$crashWagerAmount",
        },
        diceBetCount: {
          $sum: "$diceBetCount",
        },
        diceWagerAmount: {
          $sum: "$diceWagerAmount",
        },
        limboBetCount: {
          $sum: "$limboBetCount",
        },
        limboWagerAmount: {
          $sum: "$limboWagerAmount",
        },
        blackjackBetCount: {
          $sum: "$blackjackBetCount",
        },
        blackjackWagerAmount: {
          $sum: "$blackjackWagerAmount",
        },
        minesBetCount: {
          $sum: "$minesBetCount",
        },
        minesWagerAmount: {
          $sum: "$minesWagerAmount",
        },
        doubleBetCount: {
          $sum: "$doubleBetCount",
        },
        doubleWagerAmount: {
          $sum: "$doubleWagerAmount",
        },
        caseBetCount: {
          $sum: "$caseBetCount",
        },
        caseWagerAmount: {
          $sum: "$caseWagerAmount",
        }
      },
    },
    {
      $project: { _id: 0 },
    },
  ];

  return pipeline;
}

function getDefaultReport(): UserReport {
  return {
    xpGained: 0,
    gemsSpent: 0,
    holidaySpent: 0,
    profitLoss: 0,
    depositCount: 0,
    depositAmount: 0,
    withdrawCount: 0,
    withdrawAmount: 0,
    tipSentAmount: 0,
    tipReceiveAmount: 0,
    vaultDepositAmount: 0,
    vaultWithdrawAmount: 0,
    rewardAmount: 0,
    promotionAmount: 0,
    promotionCodeCount: 0,
    promotionCodeAmount: 0,
    promotionCardCount: 0,
    promotionCardAmount: 0,
    boostDailyCount: 0,
    boostDailyAmount: 0,
    boostWeeklyCount: 0,
    boostWeeklyAmount: 0,
    boostMonthlyCount: 0,
    boostMonthlyAmount: 0,
    gemStoreAmount: 0,
    levelCaseAmount: 0,
    holidayCaseAmount: 0,
    raceCount: 0,
    raceAmount: 0,
    raffleCount: 0,
    raffleAmount: 0,
    rainCount: 0,
    rainAmount: 0,
    adventCount: 0,
    adventAmount: 0,
    betCount: 0,
    evAmount: 0,
    wagerAmount: 0,
    wagerProfitLoss: 0,
    wonAmount: 0,
    duelBetCount: 0,
    duelWagerAmount: 0,
    crashBetCount: 0,
    crashWagerAmount: 0,
    caseBattleBetCount: 0,
    caseBattleWagerAmount: 0,
    diceBetCount: 0,
    diceWagerAmount: 0,
    limboBetCount: 0,
    limboWagerAmount: 0,
    blackjackBetCount: 0,
    blackjackWagerAmount: 0,
    minesBetCount: 0,
    minesWagerAmount: 0,
    doubleBetCount: 0,
    doubleWagerAmount: 0,
    caseBetCount: 0,
    caseWagerAmount: 0,
    rewardCreditCount: 0,
    rewardCreditAmount: 0,
  };
}
