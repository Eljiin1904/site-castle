import { BlackjackHandStatus } from "#core/types/blackjack/BlackjackHandStatus";

export function getHandPayout({
  handStatus,
  dealerStatus,
  betAmount,
  isDouble,
  isSplit,
}: {
  handStatus: BlackjackHandStatus;
  dealerStatus: BlackjackHandStatus;
  betAmount: number;
  isDouble: boolean;
  isSplit: boolean;
}) {
  const { blackjack, busted, score } = handStatus;

  // double doubles the bet, so has to pay out 4x
  const doubleMult = isDouble ? 2 : 1;

  if (busted)
    return {
      title: "Bust",
      result: "lose",
      amount: 0,
    };

  if (dealerStatus.blackjack && blackjack)
    return {
      title: "Blackjack Tie",
      result: "tie",
      amount: betAmount,
    };

  if (dealerStatus.blackjack)
    return {
      title: "Dealer Blackjack",
      result: "lose",
      amount: 0,
    };

  if (blackjack && !isSplit)
    return {
      title: "Blackjack",
      result: "win",
      amount: betAmount + betAmount * 1.5,
    };

  // split blackjack
  if (blackjack) {
    return {
      title: "Win",
      result: "win",
      amount: betAmount * 2,
    };
  }

  if (dealerStatus.busted)
    return {
      title: "Dealer Bust",
      result: "win",
      amount: betAmount * 2 * doubleMult,
    };

  if (dealerStatus.score > score)
    return {
      title: "Dealer Wins",
      result: "lose",
      amount: 0,
    };

  if (dealerStatus.score === score)
    return {
      title: "Tie",
      result: "tie",
      amount: betAmount * doubleMult,
    };

  // if (dealerStatus.score < score)
  return {
    title: "You Win",
    result: "win",
    amount: betAmount * 2 * doubleMult,
  };
}
