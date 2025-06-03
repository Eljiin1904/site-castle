import { Database } from "#server/services/database";

export async function findGameById({ gameId }: { gameId: string }) {
  const game = await Database.collection("blackjack-games").findOne({
    _id: gameId,
  });
  if (!game) throw new Error("Blackjack Game not found by id " + gameId);
  return game;
}
