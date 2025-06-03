import { Database } from "#server/services/database";

export async function findPendingGame({ userId }: { userId: string }) {
  return await Database.collection("blackjack-games").findOne({
    completed: false,
    players: {
      $elemMatch: {
        userId,
      },
    },
  });
}
