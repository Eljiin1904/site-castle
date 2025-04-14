export type TransactionReportDocument = TransactionReport & {
  _id: string;
  timeframe: Date;
};

export type TransactionReport = VolumeStats &
  DepositStats &
  WithdrawStats &
  EconomyStats &
  GameStats &
  AffiliateStats &
  RewardStats;

interface VolumeStats {
  biggestWin: number;
  totalDepositCount: number;
  totalDepositAmount: number;
  totalWithdrawCount: number;
  totalWithdrawAmount: number;
  totalBetCount: number;
  totalBetAmount: number;
  totalRewardAmount: number;
}

interface DepositStats {
  depositGiftcardG2aCount: number;
  depositGiftcardG2aTokens: number;
  depositGiftcardKinguinCount: number;
  depositGiftcardKinguinTokens: number;
  depositGiftcardPulseCount: number;
  depositGiftcardPulseTokens: number;

  depositCryptoCount: number;
  depositCryptoTokens: number;
  depositCryptoBtcCount: number;
  depositCryptoBtcTokens: number;
  depositCryptoBtcCurrency: number;
  depositCryptoEthCount: number;
  depositCryptoEthTokens: number;
  depositCryptoEthCurrency: number;
  depositCryptoLtcCount: number;
  depositCryptoLtcTokens: number;
  depositCryptoLtcCurrency: number;
  depositCryptoTrxCount: number;
  depositCryptoTrxTokens: number;
  depositCryptoTrxCurrency: number;
  depositCryptoSolCount: number;
  depositCryptoSolTokens: number;
  depositCryptoSolCurrency: number;
  depositCryptoAdaCount: number;
  depositCryptoAdaTokens: number;
  depositCryptoAdaCurrency: number;
  depositCryptoDogeCount: number;
  depositCryptoDogeTokens: number;
  depositCryptoDogeCurrency: number;
  depositCryptoUsdcCount: number;
  depositCryptoUsdcTokens: number;
  depositCryptoUsdcCurrency: number;
  depositCryptoUsdtErcCount: number;
  depositCryptoUsdtErcTokens: number;
  depositCryptoUsdtErcCurrency: number;
  depositCryptoUsdtTrcCount: number;
  depositCryptoUsdtTrcTokens: number;
  depositCryptoUsdtTrcCurrency: number;

  depositSkinCount: number;
  depositSkinTokens: number;
  depositSkinSkinifyCount: number;
  depositSkinSkinifyTokens: number;
  depositSkinSkinsBackCount: number;
  depositSkinSkinsBackTokens: number;
  depositSkinSkinDeckCount: number;
  depositSkinSkinDeckTokens: number;

  depositSwappedCount: number;
  depositSwappedTokens: number;

  depositUserCount: number;
  depositUserTokens: number;
  depositSponsoredCount: number;
  depositSponsoredTokens: number;
  depositStaffCount: number;
  depositStaffTokens: number;
}

interface WithdrawStats {
  f2pWithdrawTokens: number;
  churnedWithdrawTokens: number;

  withdrawCryptoCount: number;
  withdrawCryptoTokens: number;
  withdrawCryptoBtcCount: number;
  withdrawCryptoBtcTokens: number;
  withdrawCryptoBtcCurrency: number;
  withdrawCryptoEthCount: number;
  withdrawCryptoEthTokens: number;
  withdrawCryptoEthCurrency: number;
  withdrawCryptoLtcCount: number;
  withdrawCryptoLtcTokens: number;
  withdrawCryptoLtcCurrency: number;
  withdrawCryptoUsdcCount: number;
  withdrawCryptoUsdcTokens: number;
  withdrawCryptoUsdcCurrency: number;
  withdrawCryptoUsdtErcCount: number;
  withdrawCryptoUsdtErcTokens: number;
  withdrawCryptoUsdtErcCurrency: number;
  withdrawCryptoUsdtTrcCount: number;
  withdrawCryptoUsdtTrcTokens: number;
  withdrawCryptoUsdtTrcCurrency: number;

  withdrawSkinCount: number;
  withdrawSkinTokens: number;
  withdrawSkinSkinifyCount: number;
  withdrawSkinSkinifyTokens: number;
  withdrawSkinSkinsBackCount: number;
  withdrawSkinSkinsBackTokens: number;
  withdrawSkinSkinDeckCount: number;
  withdrawSkinSkinDeckTokens: number;

  withdrawUserCount: number;
  withdrawUserTokens: number;
  withdrawSponsoredCount: number;
  withdrawSponsoredTokens: number;
  withdrawStaffCount: number;
  withdrawStaffTokens: number;
}

interface EconomyStats {
  promotionCardCount: number;
  promotionCardTokens: number;
  promotionCodeCount: number;
  promotionCodeTokens: number;
  tipStaffTokens: number;
  adminCreditFillTokens: number;
  adminCreditRewardsTokens: number;
  adminCreditPaymentTokens: number;
  adminCreditRefundTokens: number;
  vaultDepositCount: number;
  vaultDepositTokens: number;
  vaultWithdrawCount: number;
  vaultWithdrawTokens: number;
}

interface GameStats {
  
  duelBetCount: number;
  duelWagerTokens: number;
  duelWinTokens: number;
  duelEv: number;

  caseBattleBetCount: number;
  caseBattleWagerTokens: number;
  caseBattleWinTokens: number;
  caseBattlesEv: number;

  crashBetCount: number;
  crashWagerTokens: number;
  crashWinTokens: number;
  crashEv: number;

  diceBetCount: number;
  diceWagerTokens: number;
  diceWinTokens: number;
  diceEv: number;
  
  limboBetCount: number;
  limboWagerTokens: number;
  limboWinTokens: number;
  limboEv: number;

  blackjackBetCount: number;
  blackjackWagerTokens: number;
  blackjackWinTokens: number;
  blackjackEv: number;

  minesBetCount: number;
  minesWagerTokens: number;
  minesWinTokens: number;
  minesEv: number;
  
  doubleBetCount: number;
  doubleWagerTokens: number;
  doubleWinTokens: number;
  doubleEv: number;

  caseBetCount: number;
  caseWagerTokens: number;
  caseWinTokens: number;
  casesEv: number;
}

interface AffiliateStats {
  affiliateCommissionTokens: number;
  affiliateClaimTokens: number;
  affiliateReloadTokens: number;
}

interface RewardStats {
  rainTaxTokens: number;
  rainTipTokens: number;
  rainStaffTipTokens: number;
  rainClaimTokens: number;
  boostDailyCount: number;
  boostDailyTokens: number;
  boostWeeklyCount: number;
  boostWeeklyTokens: number;
  boostMonthlyCount: number;
  boostMonthlyTokens: number;

  gemStoreEv: number;
  gemStorePayout: number;

  levelCaseEv: number;
  levelCasePayout: number;
  raceClaimTokens: number;

  raffleClaimTokens: number;
  adventCount: number;
  adventTokens: number;
  holidayCaseEv: number;
  holidayCasePayout: number;
}
