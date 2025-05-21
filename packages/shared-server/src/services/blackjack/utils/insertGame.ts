import { BlackjackGameDocument } from "@core/types/blackjack/BlackjackGameDocument";
import { Database } from "#server/services/database";

export async function insertGame({ game }: { game: BlackjackGameDocument }) {
  const resp = await Database.collection("blackjack-games").insertOne(game);
  return { _id: resp.insertedId.toString() };
}
