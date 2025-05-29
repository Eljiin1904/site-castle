import { Player } from "../models/Player";
import { getPlayerCards } from "./util/getPlayerCards";

export function getSuper7s({ player }: { player: Player }) {
  const amount = 0; // player.betAmounts["super-7s"];
  const result = (title: string, multiplier: number) => {
    throw new Error("Disabled");
    // getResult({
    //   type: "super7s",
    //   title,
    //   multiplier,
    //   amount,
    // });
  };

  const cards = getPlayerCards(player).slice(0, 3);

  let arrayOf7s = [];
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].value === 7) {
      arrayOf7s.push(cards[i]);
    } else break;
  }
  const suited = arrayOf7s.every((card, i, arr) => {
    if (i === 0) return true;
    return card.suit === arr[i - 1].suit;
  });

  const len = arrayOf7s.length;
  const has3 = len === 3;
  const has2 = len === 2;
  const has1 = len === 1;

  if (has3 && suited) return result("Three Sevens Suited", 5000);
  else if (has3) return result("Three Sevens", 500);
  else if (has2 && suited) return result("Two Sevens Suited", 100);
  else if (has2) return result("Two Sevens", 50);
  else if (has1) return result("One Seven", 3);

  return null;
}
