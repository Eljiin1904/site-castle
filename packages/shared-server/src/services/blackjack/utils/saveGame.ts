import { BlackjackGameDocument } from "@core/types/blackjack/BlackjackGameDocument";
import { Database } from "#server/services/database";

export async function saveGame({
  game,
  // session,
}: {
  game: BlackjackGameDocument;
  // session?: ClientSession;
}) {
  await Database.collection("blackjack-games").updateOne(
    {
      _id: game._id,
    },
    {
      // should I target specific fields ?
      // prefer to skip maintenance on that
      $set: { ...game },
    },
    // { session },
  );
}
