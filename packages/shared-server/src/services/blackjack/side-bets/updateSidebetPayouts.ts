import { SidebetPayout } from "@core/types/blackjack/BlackjackApiResponse";
import { Dealer } from "../models/Dealer";
import { Player } from "../models/Player";
import { get21Plus3 } from "./get21Plus3";
import { getBlackjack15x } from "./getBlackjack15x";
import { getInsurance } from "./getInsurance";
import { getLuckyLadies } from "./getLuckyLadies";
import { getPerfectPairs } from "./getPerfectPairs";

export function updateSidebetPayouts(
  currentSidebets: SidebetPayout[],
  {
    dealer,
    player,
  }: {
    dealer: Dealer;
    player: Player;
  },
) {
  // replacement process won't work with super7s because the bet upgrades over time
  const ar = [
    getInsurance({ dealer, player }),
    get21Plus3({ dealer, player }),
    getLuckyLadies({ dealer, player }),
    getPerfectPairs({ player }),
    // getSuper7s({ player }),
    getBlackjack15x({ player }),
  ].filter((x) => x !== null) as SidebetPayout[];

  ar.forEach((newPayout) => {
    const existing = currentSidebets.find((x) => x.type == newPayout.type);
    if (!existing) currentSidebets.push(newPayout);
  });

  return ar;
}
