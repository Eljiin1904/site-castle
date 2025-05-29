import { BjHistoryItem, friendlyBetType, maxBet } from "#app/services/blackjack/Blackjack";
import { store } from "#app/store";
import { Toasts } from "@client/services/toasts";
import { getTotalBetAmount } from "@core/services/blackjack/utils/getTotalBetAmount";
import { Intimal } from "@core/services/intimal";

export function getWarnBetItems(bets: BjHistoryItem[] | BjHistoryItem) {
  if (!Array.isArray(bets)) bets = [bets];
  const state = store.getState();
  const betAmounts = state.blackjack.betting.betAmounts;
  const tokenBalance = state.user.tokenBalance;

  const cloneAr: BjHistoryItem[] = bets.map(({ betType, amount }) => ({
    betType,
    amount,
  }));

  cloneAr.forEach((bet) => {
    const { betType, amount } = bet;
    const curVal = betAmounts[betType];
    if (curVal + amount > maxBet) {
      // Toasts.warning("Max bet amount reached for " + friendlyBetType(betType));
      bet.amount = maxBet - curVal;
    }
  });

  const totalBets = getTotalBetAmount(betAmounts);
  const addTotal = cloneAr.reduce((acc, bet) => acc + bet.amount, 0);

  if (totalBets + addTotal > tokenBalance) {
    Toasts.warning("You don't have enough tokens");
    let amountOverTotal = totalBets + addTotal - tokenBalance;

    cloneAr.forEach((bet) => {
      const percOfTotal = bet.amount / addTotal;
      const amountToReduce = Math.ceil((percOfTotal * amountOverTotal) / 100000) * 100000;
      bet.amount -= amountToReduce;
    });
  }
  return cloneAr;
}
