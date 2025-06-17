import { TransactionReport } from "@core/types/transactions/TransactionReport";
import { Database } from "#server/services/database";
import { getDefaultReport } from "../helpers/getDefaultReport";

export async function aggregateReport({
  minDate,
  maxDate,
}: {
  minDate: Date;
  maxDate: Date;
}): Promise<TransactionReport> {
  const result = await Database.collection("transaction-reports")
    .aggregate<TransactionReport>(createPipeline({ minDate, maxDate }))
    .toArray();

  const aggregate = result[0];
  const report = getDefaultReport();

  for (const str in aggregate) {
    const key = str as keyof TransactionReport;
    report[key] = aggregate[key];
  }

  return report;
}

function createPipeline({ minDate, maxDate }: { minDate: Date; maxDate: Date }) {
  const pipeline = [
    {
      $match: {
        timeframe: { $gte: minDate, $lt: maxDate },
      },
    },
    {
      $group: generateGroup({
        biggestWin: "max",
        totalDepositCount: "sum",
        totalDepositAmount: "sum",
        totalWithdrawCount: "sum",
        totalWithdrawAmount: "sum",
        totalBetCount: "sum",
        totalBetAmount: "sum",
        totalRewardAmount: "sum",
        depositGiftcardG2aCount: "sum",
        depositGiftcardG2aTokens: "sum",
        depositGiftcardKinguinCount: "sum",
        depositGiftcardKinguinTokens: "sum",
        depositGiftcardPulseCount: "sum",
        depositGiftcardPulseTokens: "sum",
        depositCryptoCount: "sum",
        depositCryptoTokens: "sum",
        depositCryptoBtcCount: "sum",
        depositCryptoBtcTokens: "sum",
        depositCryptoBtcCurrency: "sum",
        depositCryptoEthCount: "sum",
        depositCryptoEthTokens: "sum",
        depositCryptoEthCurrency: "sum",
        depositCryptoLtcCount: "sum",
        depositCryptoLtcTokens: "sum",
        depositCryptoLtcCurrency: "sum",
        depositCryptoTrxCount: "sum",
        depositCryptoTrxTokens: "sum",
        depositCryptoTrxCurrency: "sum",
        depositCryptoSolCount: "sum",
        depositCryptoSolTokens: "sum",
        depositCryptoSolCurrency: "sum",
        depositCryptoAdaCount: "sum",
        depositCryptoAdaTokens: "sum",
        depositCryptoAdaCurrency: "sum",
        depositCryptoDogeCount: "sum",
        depositCryptoDogeTokens: "sum",
        depositCryptoDogeCurrency: "sum",
        depositCryptoUsdcCount: "sum",
        depositCryptoUsdcTokens: "sum",
        depositCryptoUsdcCurrency: "sum",
        depositCryptoUsdtErcCount: "sum",
        depositCryptoUsdtErcTokens: "sum",
        depositCryptoUsdtErcCurrency: "sum",
        depositCryptoUsdtTrcCount: "sum",
        depositCryptoUsdtTrcTokens: "sum",
        depositCryptoUsdtTrcCurrency: "sum",
        depositSkinCount: "sum",
        depositSkinTokens: "sum",
        depositSkinSkinifyCount: "sum",
        depositSkinSkinifyTokens: "sum",
        depositSkinSkinsBackCount: "sum",
        depositSkinSkinsBackTokens: "sum",
        depositSkinSkinDeckCount: "sum",
        depositSkinSkinDeckTokens: "sum",
        depositSwappedCount: "sum",
        depositSwappedTokens: "sum",
        depositUserCount: "sum",
        depositUserTokens: "sum",
        depositSponsoredCount: "sum",
        depositSponsoredTokens: "sum",
        depositStaffCount: "sum",
        depositStaffTokens: "sum",
        f2pWithdrawTokens: "sum",
        churnedWithdrawTokens: "sum",
        withdrawCryptoCount: "sum",
        withdrawCryptoTokens: "sum",
        withdrawCryptoBtcCount: "sum",
        withdrawCryptoBtcTokens: "sum",
        withdrawCryptoBtcCurrency: "sum",
        withdrawCryptoEthCount: "sum",
        withdrawCryptoEthTokens: "sum",
        withdrawCryptoEthCurrency: "sum",
        withdrawCryptoLtcCount: "sum",
        withdrawCryptoLtcTokens: "sum",
        withdrawCryptoLtcCurrency: "sum",
        withdrawCryptoUsdcCount: "sum",
        withdrawCryptoUsdcTokens: "sum",
        withdrawCryptoUsdcCurrency: "sum",
        withdrawCryptoUsdtErcCount: "sum",
        withdrawCryptoUsdtErcTokens: "sum",
        withdrawCryptoUsdtErcCurrency: "sum",
        withdrawCryptoUsdtTrcCount: "sum",
        withdrawCryptoUsdtTrcTokens: "sum",
        withdrawCryptoUsdtTrcCurrency: "sum",
        withdrawSkinCount: "sum",
        withdrawSkinTokens: "sum",
        withdrawSkinSkinifyCount: "sum",
        withdrawSkinSkinifyTokens: "sum",
        withdrawSkinSkinsBackCount: "sum",
        withdrawSkinSkinsBackTokens: "sum",
        withdrawSkinSkinDeckCount: "sum",
        withdrawSkinSkinDeckTokens: "sum",
        withdrawUserCount: "sum",
        withdrawUserTokens: "sum",
        withdrawSponsoredCount: "sum",
        withdrawSponsoredTokens: "sum",
        withdrawStaffCount: "sum",
        withdrawStaffTokens: "sum",
        duelBetCount: "sum",
        duelWagerTokens: "sum",
        duelWinTokens: "sum",
        duelEv: "sum",
        caseBattleBetCount: "sum",
        caseBattleWagerTokens: "sum",
        caseBattleWinTokens: "sum",
        caseBattlesEv: "sum",
        crashBetCount: "sum",
        crashWagerTokens: "sum",
        crashWinTokens: "sum",
        crashEv: "sum",
        diceBetCount: "sum",
        diceWagerTokens: "sum",
        diceWinTokens: "sum",
        diceEv: "sum",
        limboBetCount: "sum",
        limboWagerTokens: "sum",
        limboWinTokens: "sum",
        limboEv: "sum",
        minesBetCount: "sum",
        minesWagerTokens: "sum",
        minesWinTokens: "sum",
        minesEv: "sum",
        //blackjack ===
        blackjackBetCount: "sum",
        blackjackInsuranceBetCount: "sum",
        blackjackLuckyLadiesBetCount: "sum",
        blackjackBlackjack15xBetCount: "sum",
        blackjackPerfectPairsBetCount: "sum",
        blackjack213BetCount: "sum",
        blackjackWagerTokens: "sum",
        blackjackInsuranceWagerTokens: "sum",
        blackjackLuckyLadiesWagerTokens: "sum",
        blackjackBlackjack15xWagerTokens: "sum",
        blackjackPerfectPairsWagerTokens: "sum",
        blackjack213WagerTokens: "sum",
        blackjackWinTokens: "sum",
        blackjackInsuranceWinTokens: "sum",
        blackjackLuckyLadiesWinTokens: "sum",
        blackjackBlackjack15xWinTokens: "sum",
        blackjackPerfectPairsWinTokens: "sum",
        blackjack213WinTokens: "sum",
        blackjackEv: "sum",
        blackjackInsuranceEv: "sum",
        blackjackLuckyLadiesEv: "sum",
        blackjackBlackjack15xEv: "sum",
        blackjackPerfectPairsEv: "sum",
        blackjack213Ev: "sum",
        // === blackjack
        doubleBetCount: "sum",
        doubleWagerTokens: "sum",
        doubleWinTokens: "sum",
        doubleEv: "sum",
        caseBetCount: "sum",
        caseWagerTokens: "sum",
        caseWinTokens: "sum",
        casesEv: "sum",
        affiliateCommissionTokens: "sum",
        affiliateClaimTokens: "sum",
        affiliateReloadTokens: "sum",
        rainTaxTokens: "sum",
        rainTipTokens: "sum",
        rainStaffTipTokens: "sum",
        rainClaimTokens: "sum",
        boostDailyCount: "sum",
        boostDailyTokens: "sum",
        boostWeeklyCount: "sum",
        boostWeeklyTokens: "sum",
        boostMonthlyCount: "sum",
        boostMonthlyTokens: "sum",
        gemStoreEv: "sum",
        gemStorePayout: "sum",
        levelCaseEv: "sum",
        levelCasePayout: "sum",
        raceClaimTokens: "sum",
        raffleClaimTokens: "sum",
        adventCount: "sum",
        adventTokens: "sum",
        holidayCaseEv: "sum",
        holidayCasePayout: "sum",
        promotionCardCount: "sum",
        promotionCardTokens: "sum",
        promotionCodeCount: "sum",
        promotionCodeTokens: "sum",
        tipStaffTokens: "sum",
        adminCreditFillTokens: "sum",
        adminCreditRewardsTokens: "sum",
        adminCreditPaymentTokens: "sum",
        adminCreditRefundTokens: "sum",
        vaultDepositCount: "sum",
        vaultDepositTokens: "sum",
        vaultWithdrawCount: "sum",
        vaultWithdrawTokens: "sum",

        // Hub Eight
        hubEightBetCount: "sum",
        hubEightWagerTokens: "sum",
        hubEightWinTokens: "sum",
        hugEightEv: "sum",
      }),
    },
    {
      $project: { _id: 0 },
    },
  ];

  return pipeline;
}

function generateGroup(record: Record<keyof TransactionReport, "sum" | "max">) {
  const group: Record<string, any> = {
    _id: null,
  };

  for (const [key, value] of Object.entries(record)) {
    if (value === "sum") {
      group[key] = { $sum: `$${key}` };
    } else if (value === "max") {
      group[key] = { $max: `$${key}` };
    }
  }

  return group;
}
