import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { UserStats } from "@core/types/users/UserStats";

export function getStatsFromTransaction(tx: TransactionDocument) {
  const { category, kind } = tx;
  const stats: Partial<UserStats> = {};

  if ("bet" in tx) {
    stats.betCount = 1;
    stats.evAmount = tx.bet.ev;
    stats.wagerAmount = tx.value;
    stats.wagerProfitLoss = -tx.value;
    switch (category) {
      case "duel": {
        stats.duelBetCount = 1;
        stats.duelWagerAmount = tx.value;
        break;
      }
      case "case-battles": {
        stats.caseBattleBetCount = 1;
        stats.caseBattleWagerAmount = tx.value;
        break;
      }
      case "crash": {
        stats.crashBetCount = 1;
        stats.crashWagerAmount = tx.value;
        break;
      }
      case "dice": {
        stats.diceBetCount = 1;
        stats.diceWagerAmount = tx.value;
        break;
      }
      case "limbo": {
        stats.limboBetCount = 1;
        stats.limboWagerAmount = tx.value;
        break;
      }
      case "blackjack": {
        switch (kind) {
          case "blackjack-bet":
            stats.blackjackBetCount = 1;
            stats.blackjackWagerAmount = tx.value;
            break;

          case "blackjack-double":
          case "blackjack-split":
            stats.blackjackWagerAmount = tx.value;
            break;

          case "blackjack-sidebet-bet":
            switch (tx.subKind) {
              case "insurance":
                stats.blackjackInsuranceBetCount = 1;
                stats.blackjackInsuranceWagerAmount = tx.value;
                break;
              case "lucky-ladies":
                stats.blackjackLuckyLadiesBetCount = 1;
                stats.blackjackLuckyLadiesWagerAmount = tx.value;
                break;
              case "blackjack-15x":
                stats.blackjackBlackjack15xBetCount = 1;
                stats.blackjackBlackjack15xWagerAmount = tx.value;
                break;
              case "perfect-pairs":
                stats.blackjackPerfectPairsBetCount = 1;
                stats.blackjackPerfectPairsWagerAmount = tx.value;
                break;
              case "21+3":
                stats.blackjack213BetCount = 1;
                stats.blackjack213WagerAmount = tx.value;
                break;
            }
            break;
        }
        break;
      }
      case "mines": {
        stats.minesBetCount = 1;
        stats.minesWagerAmount = tx.value;
        break;
      }
      case "double": {
        stats.doubleBetCount = 1;
        stats.doubleWagerAmount = tx.value;
        break;
      }
      case "cases": {
        stats.caseBetCount = 1;
        stats.caseWagerAmount = tx.value;
        break;
      }
    }
  } else if (
    [
      "duel-won",
      "crash-won",
      "case-battle-won",
      "case-item-won",
      "double-won",
      "dice-won",
      "limbo-won",
      "blackjack-won",
      "mines-won",
    ].includes(kind)
  ) {
    stats.wonAmount = tx.value;
    stats.wagerProfitLoss = tx.value - (tx.stats?.wagerAmount ?? 0);
  } else if (category === "deposits") {
    stats.profitLoss = tx.value;
    stats.depositCount = 1;
    stats.depositAmount = tx.value;
  } else if (category === "withdrawals") {
    stats.profitLoss = -tx.value;
    stats.withdrawCount = 1;
    stats.withdrawAmount = tx.value;
  } else if (category === "promotion") {
    if (kind === "promotion-card-redeem") {
      stats.rewardAmount = tx.value;
      stats.promotionAmount = tx.value;
      stats.promotionCardCount = 1;
      stats.promotionCardAmount = tx.value;
    } else if (kind === "promotion-code-redeem") {
      stats.rewardAmount = tx.value;
      stats.promotionAmount = tx.value;
      stats.promotionCodeCount = 1;
      stats.promotionCodeAmount = tx.value;
    }
  } else if (category === "tips") {
    if (kind === "tip-send") {
      stats.tipSentAmount = tx.value;
    } else if (kind === "tip-receive") {
      stats.tipReceiveAmount = tx.value;
    }
  } else if (category === "vault") {
    if (kind === "vault-deposit") {
      stats.vaultDepositAmount = tx.value;
    } else if (kind === "vault-withdraw") {
      stats.vaultWithdrawAmount = tx.value;
    }
  } else if (category === "rain") {
    if (kind === "rain-payout") {
      stats.rewardAmount = tx.value;
      stats.rainCount = 1;
      stats.rainAmount = tx.value;
    }
  } else if (category === "rewards") {
    stats.rewardAmount = tx.value;

    if (kind === "reward-advent-item") {
      stats.adventCount = 1;
      stats.adventAmount = tx.value;
    } else if (kind === "reward-claim" && tx.claimKind === "race-payout") {
      stats.raceCount = 1;
      stats.raceAmount = tx.value;
    } else if (kind === "reward-claim" && tx.claimKind === "raffle-payout") {
      stats.raffleCount = 1;
      stats.raffleAmount = tx.value;
    } else if (kind === "reward-boost" && tx.timeframe === "daily") {
      stats.boostDailyCount = 1;
      stats.boostDailyAmount = tx.value;
    } else if (kind === "reward-boost" && tx.timeframe === "weekly") {
      stats.boostWeeklyCount = 1;
      stats.boostWeeklyAmount = tx.value;
    } else if (kind === "reward-boost" && tx.timeframe === "monthly") {
      stats.boostMonthlyCount = 1;
      stats.boostMonthlyAmount = tx.value;
    } else if (kind === "reward-gem-case-item") {
      stats.gemStoreAmount = tx.value;
    } else if (kind === "reward-token-pack") {
      stats.gemStoreAmount = tx.value;
    } else if (kind === "reward-level-case-item") {
      stats.levelCaseAmount = tx.value;
    } else if (kind === "reward-holiday-case-item") {
      stats.holidayCaseAmount = tx.value;
    }
  } else if (category === "other") {
    if (kind === "admin-token-credit" && tx.adjustment === "rewards") {
      stats.rewardAmount = tx.value;
      stats.rewardCreditCount = 1;
      stats.rewardCreditAmount = tx.value;
    }
  }

  return stats;
}
