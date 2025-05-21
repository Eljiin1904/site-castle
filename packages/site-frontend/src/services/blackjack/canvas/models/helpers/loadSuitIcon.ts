import { Suit } from "@core/types/blackjack/CardData";
import { loadImage } from "../../utils/loadImage";

// haven't figured out how to use image from remote with canvas.toDataUrl
// const path = `${config.staticURL}/games/blackjack/cards/suits`;
const path = `/images/suits`;

const suitPaths: Record<Suit, string> = {
  hearts: `${path}/hearts.svg`,
  spades: `${path}/spades.svg`,
  clubs: `${path}/clubs.svg`,
  diamonds: `${path}/diamonds.svg`,
};

export default function (suit: Suit) {
  return loadImage(suitPaths[suit]);
}
