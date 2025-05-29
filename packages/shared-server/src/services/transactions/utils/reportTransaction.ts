import { Rewards } from "@core/services/rewards";
import { TransactionReport } from "@core/types/transactions/TransactionReport";
import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Dates } from "@core/services/dates";
import { Database } from "#server/services/database";

export async function reportTransaction(tx: TransactionDocument) {
  const timeframe = Dates.roundToHour(tx.timestamp);
  const id = Math.floor(timeframe.getTime() / 1000 / 60 / 60).toString();

  const { $inc, $max } = getUpdates(tx);

  await Database.collection("transaction-reports").updateOne(
    { _id: id },
    {
      $setOnInsert: { timeframe },
      $inc,
      $max,
    },
    {
      upsert: true,
    },
  );
}

type ReportRecord = Partial<Record<keyof TransactionReport, number>>;

function getUpdates(tx: TransactionDocument) {
  const $inc: ReportRecord = {};
  const $max: ReportRecord = {};

  getRevenueUpdates({ tx, $inc, $max });
  getGameUpdates({ tx, $inc, $max });
  getBonusUpdates({ tx, $inc, $max });
  getStaffUpdates({ tx, $inc, $max });

  return { $inc, $max };
}

function getRevenueUpdates({
  tx,
  $inc,
}: {
  tx: TransactionDocument;
  $inc: ReportRecord;
  $max: ReportRecord;
}) {
  if ("bet" in tx) {
    $inc.rainTaxTokens = tx.bet.rainAmount;

    if (tx.bet.commissionAmount) {
      $inc.affiliateCommissionTokens = tx.bet.commissionAmount;
    }
  }

  if (tx.category === "deposits") {
    $inc.totalDepositCount = 1;
    $inc.totalDepositAmount = tx.value;

    if (tx.user.role === "user") {
      $inc.depositUserCount = 1;
      $inc.depositUserTokens = tx.value;
    }
    if (tx.user.tags.includes("sponsored")) {
      $inc.depositSponsoredCount = 1;
      $inc.depositSponsoredTokens = tx.value;
    }
  } else if (tx.category === "withdrawals") {
    $inc.totalWithdrawCount = 1;
    $inc.totalWithdrawAmount = tx.value;

    if (tx.user.role === "user") {
      $inc.withdrawUserCount = 1;
      $inc.withdrawUserTokens = tx.value;
    }
    if (tx.user.tags.includes("sponsored")) {
      $inc.withdrawSponsoredCount = 1;
      $inc.withdrawSponsoredTokens = tx.value;
    }
    if (tx.user.f2p) {
      $inc.f2pWithdrawTokens = tx.value;
    }
    if (tx.user.churned) {
      $inc.churnedWithdrawTokens = tx.value;
    }
  }

  if (tx.kind === "deposit-gift-card") {
    if (tx.tag === "g2a") {
      $inc.depositGiftcardG2aCount = 1;
      $inc.depositGiftcardG2aTokens = tx.value;
    } else if (tx.tag === "kinguin") {
      $inc.depositGiftcardKinguinCount = 1;
      $inc.depositGiftcardKinguinTokens = tx.value;
    } else if (tx.tag === "pulse") {
      $inc.depositGiftcardPulseCount = 1;
      $inc.depositGiftcardPulseTokens = tx.value;
    }
  } else if (tx.kind === "deposit-crypto") {
    $inc.depositCryptoCount = 1;
    $inc.depositCryptoTokens = tx.value;

    if (tx.cryptoKind === "BTC") {
      $inc.depositCryptoBtcCount = 1;
      $inc.depositCryptoBtcTokens = tx.value;
      $inc.depositCryptoBtcCurrency = tx.cryptoAmount;
    } else if (tx.cryptoKind === "LTC") {
      $inc.depositCryptoLtcCount = 1;
      $inc.depositCryptoLtcTokens = tx.value;
      $inc.depositCryptoLtcCurrency = tx.cryptoAmount;
    } else if (tx.cryptoKind === "ETH") {
      $inc.depositCryptoEthCount = 1;
      $inc.depositCryptoEthTokens = tx.value;
      $inc.depositCryptoEthCurrency = tx.cryptoAmount;
    } else if (tx.cryptoKind === "TRX") {
      $inc.depositCryptoTrxCount = 1;
      $inc.depositCryptoTrxTokens = tx.value;
      $inc.depositCryptoTrxCurrency = tx.cryptoAmount;
    } else if (tx.cryptoKind === "SOL") {
      $inc.depositCryptoSolCount = 1;
      $inc.depositCryptoSolTokens = tx.value;
      $inc.depositCryptoSolCurrency = tx.cryptoAmount;
    } else if (tx.cryptoKind === "ADA") {
      $inc.depositCryptoAdaCount = 1;
      $inc.depositCryptoAdaTokens = tx.value;
      $inc.depositCryptoAdaCurrency = tx.cryptoAmount;
    } else if (tx.cryptoKind === "DOGE") {
      $inc.depositCryptoDogeCount = 1;
      $inc.depositCryptoDogeTokens = tx.value;
      $inc.depositCryptoDogeCurrency = tx.cryptoAmount;
    } else if (tx.cryptoKind === "USDC_ERC-20") {
      $inc.depositCryptoUsdcCount = 1;
      $inc.depositCryptoUsdcTokens = tx.value;
      $inc.depositCryptoUsdcCurrency = tx.cryptoAmount;
    } else if (tx.cryptoKind === "USDT_ERC-20") {
      $inc.depositCryptoUsdtErcCount = 1;
      $inc.depositCryptoUsdtErcTokens = tx.value;
      $inc.depositCryptoUsdtErcCurrency = tx.cryptoAmount;
    } else if (tx.cryptoKind === "USDT_TRC-20") {
      $inc.depositCryptoUsdtTrcCount = 1;
      $inc.depositCryptoUsdtTrcTokens = tx.value;
      $inc.depositCryptoUsdtTrcCurrency = tx.cryptoAmount;
    }
  } else if (tx.kind === "deposit-skin") {
    $inc.depositSkinCount = 1;
    $inc.depositSkinTokens = tx.value;

    if (tx.provider === "skinify") {
      $inc.depositSkinSkinifyCount = 1;
      $inc.depositSkinSkinifyTokens = tx.value;
    } else if (tx.provider === "skinsback") {
      $inc.depositSkinSkinsBackCount = 1;
      $inc.depositSkinSkinsBackTokens = tx.value;
    } else if (tx.provider === "skindeck") {
      $inc.depositSkinSkinDeckCount = 1;
      $inc.depositSkinSkinDeckTokens = tx.value;
    }
  } else if (tx.kind === "deposit-swapped") {
    $inc.depositSwappedCount = 1;
    $inc.depositSwappedTokens = tx.value;
  } else if (tx.kind === "withdraw-crypto") {
    $inc.withdrawCryptoCount = 1;
    $inc.withdrawCryptoTokens = tx.value;

    if (tx.cryptoKind === "BTC") {
      $inc.withdrawCryptoBtcCount = 1;
      $inc.withdrawCryptoBtcTokens = tx.value;
      $inc.withdrawCryptoBtcCurrency = tx.cryptoAmount;
    } else if (tx.cryptoKind === "LTC") {
      $inc.withdrawCryptoLtcCount = 1;
      $inc.withdrawCryptoLtcTokens = tx.value;
      $inc.withdrawCryptoLtcCurrency = tx.cryptoAmount;
    } else if (tx.cryptoKind === "ETH") {
      $inc.withdrawCryptoEthCount = 1;
      $inc.withdrawCryptoEthTokens = tx.value;
      $inc.withdrawCryptoEthCurrency = tx.cryptoAmount;
    } else if (tx.cryptoKind === "USDC_ERC-20") {
      $inc.withdrawCryptoUsdcCount = 1;
      $inc.withdrawCryptoUsdcTokens = tx.value;
      $inc.withdrawCryptoUsdcCurrency = tx.cryptoAmount;
    } else if (tx.cryptoKind === "USDT_ERC-20") {
      $inc.withdrawCryptoUsdtErcCount = 1;
      $inc.withdrawCryptoUsdtErcTokens = tx.value;
      $inc.withdrawCryptoUsdtErcCurrency = tx.cryptoAmount;
    } else if (tx.cryptoKind === "USDT_TRC-20") {
      $inc.withdrawCryptoUsdtTrcCount = 1;
      $inc.withdrawCryptoUsdtTrcTokens = tx.value;
      $inc.withdrawCryptoUsdtTrcCurrency = tx.cryptoAmount;
    }
  } else if (tx.kind === "withdraw-skin") {
    $inc.withdrawSkinCount = 1;
    $inc.withdrawSkinTokens = tx.value;

    if (tx.provider === "skinify") {
      $inc.withdrawSkinSkinifyCount = 1;
      $inc.withdrawSkinSkinifyTokens = tx.value;
    } else if (tx.provider === "skinsback") {
      $inc.withdrawSkinSkinsBackCount = 1;
      $inc.withdrawSkinSkinsBackTokens = tx.value;
    } else if (tx.provider === "skindeck") {
      $inc.withdrawSkinSkinDeckCount = 1;
      $inc.withdrawSkinSkinDeckTokens = tx.value;
    }
  }
}

function getGameUpdates({
  tx,
  $inc,
  $max,
}: {
  tx: TransactionDocument;
  $inc: ReportRecord;
  $max: ReportRecord;
}) {
  if (tx.user.tags.includes("cheeky")) {
    return;
  }

  if ("bet" in tx) {
    $inc.totalBetCount = 1;
    $inc.totalBetAmount = tx.value;
  }

  if (
    tx.kind === "case-item-won" ||
    tx.kind === "case-battle-won" ||
    tx.kind === "double-won" ||
    tx.kind === "dice-won" ||
    tx.kind === "limbo-won" ||
    tx.kind === "crash-won" ||
    tx.kind === "duel-won" ||
    tx.kind === "mines-won" ||
    tx.kind === "blackjack-won" ||
    tx.kind === "blackjack-sidebet-won" ||
    tx.kind === "reward-gem-case-item" ||
    tx.kind === "reward-holiday-case-item" ||
    tx.kind === "reward-level-case-item"
  ) {
    $max.biggestWin = tx.value;
  }

  if (tx.kind === "case-spin") {
    $inc.caseBetCount = 1;
    $inc.caseWagerTokens = tx.value;
    $inc.casesEv = tx.bet.ev;
  } else if (tx.kind === "case-item-won") {
    $inc.caseWinTokens = tx.value;
  } else if (tx.kind === "case-battle-join") {
    $inc.caseBattleBetCount = 1;
    $inc.caseBattleWagerTokens = tx.value;
    $inc.caseBattlesEv = tx.bet.ev;
  } else if (tx.kind === "case-battle-won") {
    $inc.caseBattleWinTokens = tx.value;
  } else if (tx.kind === "double-bet") {
    $inc.doubleBetCount = 1;
    $inc.doubleWagerTokens = tx.value;
    $inc.doubleEv = tx.bet.ev;
  } else if (tx.kind === "double-won") {
    $inc.doubleWinTokens = tx.value;
  } else if (tx.kind === "dice-bet") {
    $inc.diceBetCount = 1;
    $inc.diceWagerTokens = tx.value;
    $inc.diceEv = tx.bet.ev;
  } else if (tx.kind === "dice-won") {
    $inc.diceWinTokens = tx.value;
  } else if (tx.kind === "limbo-bet") {
    $inc.limboBetCount = 1;
    $inc.limboWagerTokens = tx.value;
    $inc.limboEv = tx.bet.ev;
  } else if (tx.kind === "limbo-won") {
    $inc.limboWinTokens = tx.value;
  }
  //New Games
  else if (tx.kind === "duel-bet") {
    $inc.duelBetCount = 1;
    $inc.duelWagerTokens = tx.value;
    $inc.duelEv = tx.bet.ev;
  } else if (tx.kind === "duel-won") {
    $inc.duelWinTokens = tx.value;
  } else if (tx.kind === "crash-bet") {
    $inc.crashBetCount = 1;
    $inc.crashWagerTokens = tx.value;
    $inc.crashEv = tx.bet.ev;
  } else if (tx.kind === "crash-won") {
    $inc.crashWinTokens = tx.value;
  } else if (tx.kind === "mines-bet") {
    $inc.minesBetCount = 1;
    $inc.minesWagerTokens = tx.value;
    $inc.minesEv = tx.bet.ev;
  } else if (tx.kind === "mines-won") {
    $inc.minesWinTokens = tx.value;
  } // === blackjack-bet
  else if (tx.kind === "blackjack-bet") {
    $inc.blackjackBetCount = 1;
    $inc.blackjackWagerTokens = tx.value;
    $inc.blackjackEv = tx.bet.ev;
  } else if (tx.kind === "blackjack-double") {
    // treating this as if the amount is being added to
    // the main bet not as new bet, so no $inc count
    $inc.blackjackWagerTokens = tx.value;
    $inc.blackjackEv = tx.bet.ev;
  } else if (tx.kind === "blackjack-split") {
    // adding to main bet amount and ev
    $inc.blackjackWagerTokens = tx.value;
    $inc.blackjackEv = tx.bet.ev;
  } else if (tx.kind === "blackjack-sidebet-bet" && tx.subKind === "insurance") {
    $inc.blackjackInsuranceBetCount = 1;
    $inc.blackjackInsuranceWagerTokens = tx.value;
    $inc.blackjackInsuranceEv = tx.bet.ev;
  } else if (tx.kind === "blackjack-sidebet-bet" && tx.subKind === "lucky-ladies") {
    $inc.blackjackLuckyLadiesBetCount = 1;
    $inc.blackjackLuckyLadiesWagerTokens = tx.value;
    $inc.blackjackLuckyLadiesEv = tx.bet.ev;
  } else if (tx.kind === "blackjack-sidebet-bet" && tx.subKind === "blackjack-15x") {
    $inc.blackjackBlackjack15xBetCount = 1;
    $inc.blackjackBlackjack15xWagerTokens = tx.value;
    $inc.blackjackBlackjack15xEv = tx.bet.ev;
  } else if (tx.kind === "blackjack-sidebet-bet" && tx.subKind === "perfect-pairs") {
    $inc.blackjackPerfectPairsBetCount = 1;
    $inc.blackjackPerfectPairsWagerTokens = tx.value;
    $inc.blackjackPerfectPairsEv = tx.bet.ev;
  } else if (tx.kind === "blackjack-sidebet-bet" && tx.subKind === "21+3") {
    $inc.blackjack213BetCount = 1;
    $inc.blackjack213WagerTokens = tx.value;
    $inc.blackjack213Ev = tx.bet.ev;

    // === blackjack win
  } else if (tx.kind === "blackjack-won") {
    $inc.blackjackWinTokens = tx.value;

    // TODO make sure old data is removed
    // $inc.blackjackWinTokens = tx.mainSubPayout;
    // $inc.blackjackDoubleWinTokens = tx.doublePayout;
    // $inc.blackjackSplitWinTokens = tx.splitPayout;
  } else if (tx.kind === "blackjack-sidebet-won" && tx.subKind === "insurance") {
    $inc.blackjackInsuranceWinTokens = tx.value;
  } else if (tx.kind === "blackjack-sidebet-won" && tx.subKind === "lucky-ladies") {
    $inc.blackjackLuckyLadiesWinTokens = tx.value;
  } else if (tx.kind === "blackjack-sidebet-won" && tx.subKind === "blackjack-15x") {
    $inc.blackjackBlackjack15xWinTokens = tx.value;
  } else if (tx.kind === "blackjack-sidebet-won" && tx.subKind === "perfect-pairs") {
    $inc.blackjackPerfectPairsWinTokens = tx.value;
  } else if (tx.kind === "blackjack-sidebet-won" && tx.subKind === "21+3") {
    $inc.blackjack213WinTokens = tx.value;
  }
}

function getBonusUpdates({
  tx,
  $inc,
}: {
  tx: TransactionDocument;
  $inc: ReportRecord;
  $max: ReportRecord;
}) {
  if (tx.user.tags.includes("cheeky")) {
    return;
  }

  if (tx.stats?.rewardAmount) {
    $inc.totalRewardAmount = tx.stats.rewardAmount;
  }

  if ("bet" in tx) {
    $inc.gemStoreEv = Math.round(tx.bet.gems * Rewards.gemToTokenRate);
  }

  if (tx.kind === "reward-advent-item") {
    $inc.adventCount = 1;
    $inc.adventTokens = tx.value;
  } else if (tx.kind === "reward-boost") {
    if (tx.timeframe === "daily") {
      $inc.boostDailyCount = 1;
      $inc.boostDailyTokens = tx.value;
    } else if (tx.timeframe === "weekly") {
      $inc.boostWeeklyCount = 1;
      $inc.boostWeeklyTokens = tx.value;
    } else if (tx.timeframe === "monthly") {
      $inc.boostMonthlyCount = 1;
      $inc.boostMonthlyTokens = tx.value;
    }
  } else if (tx.kind === "reward-claim") {
    if (tx.claimKind === "race-payout") {
      $inc.raceClaimTokens = tx.value;
    } else if (tx.claimKind === "raffle-payout") {
      $inc.raffleClaimTokens = tx.value;
    }
  } else if (tx.kind === "reward-token-pack") {
    $inc.gemStorePayout = tx.value;
  } else if (tx.kind === "reward-gem-case-item") {
    $inc.gemStorePayout = tx.value;
  } else if (tx.kind === "reward-level-case-item") {
    $inc.levelCaseEv = tx.chest.openCost;
    $inc.levelCasePayout = tx.value;
  } else if (tx.kind === "reward-holiday-case-item") {
    $inc.holidayCaseEv = tx.chest.openCost;
    $inc.holidayCasePayout = tx.value;
  } else if (tx.kind === "affiliate-commission-claim") {
    $inc.affiliateClaimTokens = tx.value;
  } else if (tx.kind === "affiliate-reload-claim") {
    $inc.affiliateReloadTokens = tx.value;
  } else if (tx.kind === "rain-tip") {
    $inc.rainTipTokens = tx.value;
  } else if (tx.kind === "rain-payout") {
    $inc.rainClaimTokens = tx.value;
  } else if (tx.kind === "promotion-card-redeem") {
    $inc.promotionCardCount = 1;
    $inc.promotionCardTokens = tx.value;
  } else if (tx.kind === "promotion-code-redeem") {
    $inc.promotionCodeCount = 1;
    $inc.promotionCodeTokens = tx.value;
  } else if (tx.kind === "admin-token-credit") {
    if (tx.adjustment === "fill") {
      $inc.adminCreditFillTokens = tx.value;
    } else if (tx.adjustment === "rewards") {
      $inc.adminCreditRewardsTokens = tx.value;
    } else if (tx.adjustment === "payment") {
      $inc.adminCreditPaymentTokens = tx.value;
    } else if (tx.adjustment === "refund") {
      $inc.adminCreditRefundTokens = tx.value;
    }
  } else if (tx.kind === "vault-deposit") {
    $inc.vaultDepositCount = 1;
    $inc.vaultDepositTokens = tx.value;
  } else if (tx.kind === "vault-withdraw") {
    $inc.vaultWithdrawCount = 1;
    $inc.vaultWithdrawTokens = tx.value;
  }
}

function getStaffUpdates({
  tx,
  $inc,
}: {
  tx: TransactionDocument;
  $inc: ReportRecord;
  $max: ReportRecord;
}) {
  if (!tx.user.tags.includes("cheeky")) {
    return;
  }
  if (tx.user.tags.includes("sponsored")) {
    return;
  }

  if (tx.category === "deposits") {
    $inc.depositStaffCount = 1;
    $inc.depositStaffTokens = tx.value;
  } else if (tx.category === "withdrawals") {
    $inc.withdrawStaffCount = 1;
    $inc.withdrawStaffTokens = tx.value;
  }

  if (tx.kind === "rain-tip") {
    $inc.rainStaffTipTokens = tx.value;
  } else if (tx.kind === "tip-send") {
    $inc.tipStaffTokens = tx.value;
  }
}
