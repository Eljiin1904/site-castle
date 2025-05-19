import { UserDocument } from "#core/types/users/UserDocument";
import { Ids } from "#server/services/ids";
import { Database } from "#server/services/database";
import { Game } from "../models/Game";
import { Users } from "#server/services/users";
// breaking circular reference
import { trackBet } from "#server/services/site/utils/trackBet";

type Arg = {
  user: UserDocument;
};

export async function checkPayout(game: Game, { user }: Arg) {
  const ticket = game.getPayoutTicket();
  if (ticket) {
    await Database.collection("blackjack-tickets").insertOne({
      ...ticket,
      _id: Ids.object(), // not avail on shared
    });
  }

  // Sitebet.trackBet only fires from ticket, which is only created when there's a payout
  if (game.completed) {
    const feedAr = game.players[0].getFeedAr();
    if (!feedAr) throw new Error("No feedAr found"); // shouldn't happen with game.completed
    const lossAr = feedAr.filter((f) => f.payoutAmount === 0);

    // timeout will get lost on backend reset, integrity for this doesn't seem like a priority though
    // could also just skip the timeout

    // setTimeout(() => {
    Promise.all([
      lossAr.map((item) =>
        trackBet({
          game: "blackjack",
          user: Users.getBasicUser(user),
          betAmount: item.betAmount,
          won: false, // vague
          wonAmount: item.payoutAmount,
        }),
      ),
    ]);
    // }, game.getProcessDelay());
  }
}
