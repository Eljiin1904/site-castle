import config from "#app/config";
import { BlackjackClientCardData } from "@core/types/blackjack/BlackjackApiResponse";
import { CardData } from "@core/types/blackjack/CardData";
import { isWebPSupported } from "./detectWebP";

const ext = isWebPSupported ? "webp" : "jpg";
const path = `${config.staticURL}/graphics/games/blackjack/cards`;
const pathV2 = `${config.staticURL}/graphics/games/blackjack/cards/v2`;
// placeholder cards
// export const old_backImagePath = `${path}/back.${ext}`;
export const backImagePath = `${path}/back_card.png`;
export const deckImagePath = `${path}/back_card.png`;

// export const deckImagePath = `${path}/back_card.svg`;

const format: { [k in CardData["value"]]?: string } = {
  A: "ace",
  K: "king",
  Q: "queen",
  J: "jack",
};
const formatSuit: { [k in CardData["suit"]]?: string } = {
  hearts: "heart",
  spades: "spade",
  clubs: "club",
  diamonds: "diamond",
};
function formatVal(value: CardData["value"]) {
  const formatted = format[value];
  if (formatted) return formatted;
  return value;
}

export function getCardImagePath(card: BlackjackClientCardData) {
  if (card.hidden) return backImagePath;
  const { value, suit } = card;
  if (!value || !suit) throw new Error("Card data missing value or suit");
  const fixedVal = formatVal(value);
  const fixedSuit = formatSuit[suit];
  // const fileName = `${fixedVal}_of_${suit}.${ext}`;
  const fileName = `${fixedSuit}-${value}.svg`;
  // return `${path}/${fileName}`;
  return `${pathV2}/${fileName}`;
}
