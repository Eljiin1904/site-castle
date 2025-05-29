import { WritableDraft } from "immer";
import { BjHistoryItem, BjState } from "../blackjackSlice";
import { maxBet } from "@core/services/blackjack/Blackjack";
import { getTotalBetAmount } from "#core/services/blackjack/utils/getTotalBetAmount";
import { store } from "#app/store";

export function addBetAmount(
  state: WritableDraft<BjState>,
  tokenAmount: number,
  items: BjHistoryItem | BjHistoryItem[],
  {
    addToHistory = true,
  }: {
    addToHistory?: boolean;
  } = {},
) {
  items = Array.isArray(items) ? items : [items];
  const { betAmounts } = state.betting;
  const totalBets = getTotalBetAmount(betAmounts);

  items.forEach((item) => {
    let { amount, betType } = item;
    const curVal = betAmounts[betType];
    if (curVal + amount > maxBet) {
      // alert max bet reached
      amount = maxBet - curVal;
    }
    if (totalBets + amount > tokenAmount) {
      amount = totalBets - tokenAmount;
    }
    if (amount == 0) return;

    if (curVal + amount < 0) throw new Error("Blackjack negative total");

    betAmounts[betType] += amount;
  });
  if (addToHistory) state.betting.history.push(items);
}
