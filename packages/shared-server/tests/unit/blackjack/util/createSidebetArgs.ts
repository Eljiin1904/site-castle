import { CardData } from "#core/types/blackjack/CardData";
import { Card } from "#server/services/blackjack/models/Card";
import { Dealer } from "#server/services/blackjack/models/Dealer";
import { Player } from "#server/services/blackjack/models/Player";

export function createSidebetArgs({
  betAmount,
  playerCards,
  dealerCards,
}: {
  betAmount: number;
  playerCards: CardData[];
  dealerCards: CardData[];
}) {
  return {
    // skippig actual binding
    player: {
      betAmounts: {
        "main-bet": betAmount,
        "perfect-pairs": betAmount,
        "lucky-ladies": betAmount,
        "blackjack-15x": betAmount,
        "21+3": betAmount,
      },
      hands: createHand(playerCards),
    } as any as Player,
    dealer: {
      hands: createHand(dealerCards),
    } as any as Dealer,
  };
}

function createHand(cards: CardData[]) {
  return [
    {
      cards: cards.map(
        (card) =>
          new Card(
            { ...card },
            {
              isGameCompleted: () => true,
            },
          ),
      ),
    },
  ];
}
