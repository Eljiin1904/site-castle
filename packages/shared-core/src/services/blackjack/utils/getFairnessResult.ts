import type {
  BlackjackGameDocument,
  DbCardHolderData,
} from "#core/types/blackjack/BlackjackGameDocument";
import { CardData, Suit } from "#core/types/blackjack/CardData";
import { DbHandData } from "../../../types/blackjack/BlackjackGameDocument";

export function getFairnessResult(game: BlackjackGameDocument, serverSeed: string) {
  const { seeds } = game;
  // const { serverSeed: _, ...seeds } = game.seeds;

  const dealerCards = getHolderAbbrev(game.dealer);
  const playerCards = game.players.map(getHolderAbbrev).join(" || ");

  return {
    gameId: game._id,
    timestamp: game.timestamp,
    ...seeds,
    serverSeed: serverSeed !== seeds.serverSeed ? seeds.serverSeed : undefined,
    playerCards,
    dealerCards,
    totalPayout: game.players[0].totalPayout,
  };
}

function getHolderAbbrev(holder: DbCardHolderData) {
  return holder.hands
    .map((hand: DbHandData) => {
      return hand.cards.map(getAbbrev).join(",");
    })
    .join("|");
}

function getAbbrev(card: CardData) {
  return `${card.value}${getSuitAbbrev(card.suit)}`;
}

function getSuitAbbrev(suit: Suit) {
  switch (suit) {
    case "hearts":
      return "H";
    case "diamonds":
      return "D";
    case "clubs":
      return "C";
    case "spades":
      return "S";
  }
}
