import { BasicUser } from "@core/types/users/BasicUser";
import { SiteBetDocument } from "@core/types/site/SiteBetDocument";
import { SiteGame } from "@core/types/site/SiteGame";
import { Ids } from "#server/services/ids";
import { Database } from "#server/services/database";

export async function trackBet(options: {
  user: BasicUser;
  game: SiteGame;
  betAmount: number;
  won: boolean;
  wonAmount: number;
}) {
  const bet: SiteBetDocument = {
    _id: Ids.object(),
    timestamp: new Date(),
    ...options,
    multiplier: options.wonAmount / options.betAmount,
  };

  await Database.collection("site-bets").insertOne(bet);

  return bet;
}
