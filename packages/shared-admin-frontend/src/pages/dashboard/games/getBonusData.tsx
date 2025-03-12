import { SiteReport } from "@core/types/site/SiteReport";

export function getBonusData(data: SiteReport) {
  const txs = data.transactions;

  const evTotal = txs.casesEv + txs.caseBattlesEv + txs.doubleEv + txs.diceEv + txs.limboEv;

  const wagerTotal =
    txs.caseWagerTokens +
    txs.caseBattleWagerTokens +
    txs.doubleWagerTokens +
    txs.diceWagerTokens +
    txs.limboWagerTokens;

  const wonTotal =
    txs.caseWinTokens +
    txs.caseBattleWinTokens +
    txs.doubleWinTokens +
    txs.diceWinTokens +
    txs.limboWinTokens;

  const nevDebits =
    txs.affiliateCommissionTokens +
    txs.affiliateReloadTokens +
    txs.boostDailyTokens +
    txs.boostWeeklyTokens +
    txs.boostMonthlyTokens +
    txs.raceClaimTokens +
    txs.raffleClaimTokens +
    txs.rainClaimTokens +
    txs.rainStaffTipTokens +
    txs.gemStoreEv +
    txs.levelCaseEv +
    txs.holidayCaseEv +
    txs.adventTokens +
    txs.promotionCardTokens +
    txs.promotionCodeTokens +
    txs.adminCreditFillTokens +
    txs.adminCreditRewardsTokens +
    txs.adminCreditPaymentTokens +
    txs.adminCreditRefundTokens +
    txs.tipStaffTokens;

  const ngrDebits =
    txs.affiliateClaimTokens +
    txs.affiliateReloadTokens +
    txs.boostDailyTokens +
    txs.boostWeeklyTokens +
    txs.boostMonthlyTokens +
    txs.raceClaimTokens +
    txs.raffleClaimTokens +
    txs.rainClaimTokens +
    txs.rainStaffTipTokens +
    txs.gemStorePayout +
    txs.levelCasePayout +
    txs.holidayCasePayout +
    txs.adventTokens +
    txs.promotionCardTokens +
    txs.promotionCodeTokens +
    txs.adminCreditFillTokens +
    txs.adminCreditRewardsTokens +
    txs.adminCreditPaymentTokens +
    txs.adminCreditRefundTokens +
    txs.tipStaffTokens;

  const nev = evTotal - nevDebits;
  const ngr = wagerTotal - wonTotal - ngrDebits;

  const rainBaseTokens =
    txs.rainClaimTokens - txs.rainTaxTokens - txs.rainTipTokens - txs.rainStaffTipTokens;

  return [
    {
      label: "Revenue",
      className: "subtotal",
      nev: evTotal,
      ngr: wagerTotal - wonTotal,
    },
    {
      label: "Cases",
      nev: txs.casesEv,
      ngr: txs.caseWagerTokens - txs.caseWinTokens,
    },
    {
      label: "Battles",
      nev: txs.caseBattlesEv,
      ngr: txs.caseBattleWagerTokens - txs.caseBattleWinTokens,
    },
    {
      label: "Double",
      nev: txs.doubleEv,
      ngr: txs.doubleWagerTokens - txs.doubleWinTokens,
    },
    {
      label: "Dice",
      nev: txs.diceEv,
      ngr: txs.diceWagerTokens - txs.diceWinTokens,
    },
    {
      label: "Limbo",
      nev: txs.limboEv,
      ngr: txs.limboWagerTokens - txs.limboWinTokens,
    },
    {
      label: "Bonuses",
      className: "subtotal",
      nev: nevDebits,
      ngr: ngrDebits,
    },
    {
      label: "Affiliate - Commission Paid",
      nev: txs.affiliateCommissionTokens,
    },
    {
      label: "Affiliate - Commission Claimed",
      ngr: txs.affiliateClaimTokens,
    },
    {
      label: "Affiliate - Reloads",
      nev: txs.affiliateReloadTokens,
      ngr: txs.affiliateReloadTokens,
    },
    {
      label: "Rain - Base",
      nev: rainBaseTokens,
      ngr: rainBaseTokens,
    },
    {
      label: "Rain - Tax",
      nev: txs.rainTaxTokens,
      ngr: txs.rainTaxTokens,
    },
    {
      label: "Rain - Staff Tips",
      nev: txs.rainStaffTipTokens,
      ngr: txs.rainStaffTipTokens,
    },
    {
      label: "Gem Store - EV",
      nev: txs.gemStoreEv,
    },
    {
      label: "Gem Store - Payout",
      ngr: txs.gemStorePayout,
    },
    {
      label: "Level Cases - EV",
      nev: txs.levelCaseEv,
    },
    {
      label: "Level Cases - Payout",
      ngr: txs.levelCasePayout,
    },
    {
      label: "Holiday Cases - EV",
      nev: txs.holidayCaseEv,
    },
    {
      label: "Holiday Cases - Payout",
      ngr: txs.holidayCasePayout,
    },
    {
      label: "Boost - Daily",
      nev: txs.boostDailyTokens,
      ngr: txs.boostDailyTokens,
    },
    {
      label: "Boost - Weekly",
      nev: txs.boostWeeklyTokens,
      ngr: txs.boostWeeklyTokens,
    },
    {
      label: "Boost - Monthly",
      nev: txs.boostMonthlyTokens,
      ngr: txs.boostMonthlyTokens,
    },
    {
      label: "Race - Claims",
      nev: txs.raceClaimTokens,
      ngr: txs.raceClaimTokens,
    },
    {
      label: "Raffle - Claims",
      nev: txs.raffleClaimTokens,
      ngr: txs.raffleClaimTokens,
    },
    {
      label: "Advent Calendars",
      nev: txs.adventTokens,
      ngr: txs.adventTokens,
    },
    {
      label: "Promotion - Cards",
      nev: txs.promotionCardTokens,
      ngr: txs.promotionCardTokens,
    },
    {
      label: "Promotion - Codes",
      nev: txs.promotionCodeTokens,
      ngr: txs.promotionCodeTokens,
    },
    {
      label: "Admin Credit - Fill",
      nev: txs.adminCreditFillTokens,
      ngr: txs.adminCreditFillTokens,
    },
    {
      label: "Admin Credit - Rewards",
      nev: txs.adminCreditRewardsTokens,
      ngr: txs.adminCreditRewardsTokens,
    },
    {
      label: "Admin Credit - Payment",
      nev: txs.adminCreditPaymentTokens,
      ngr: txs.adminCreditPaymentTokens,
    },
    {
      label: "Admin Credit - Refund",
      nev: txs.adminCreditRefundTokens,
      ngr: txs.adminCreditRefundTokens,
    },
    {
      label: "Tips - Staff to Users",
      nev: txs.tipStaffTokens,
      ngr: txs.tipStaffTokens,
    },
    {
      label: "Total",
      className: "total",
      nev,
      ngr,
    },
  ];
}
