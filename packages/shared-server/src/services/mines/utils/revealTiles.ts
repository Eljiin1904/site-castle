import { MinesGameDocument } from "@core/types/mines/MinesGameDocument";
import { UserDocument } from "@core/types/users/UserDocument";
import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";
import { completeGame } from "./completeGame";

export async function revealTiles({
  user,
  game,
  tileIndexes,
}: {
  user: UserDocument;
  game: MinesGameDocument;
  tileIndexes: number[];
}) {
  const updatedGame = await Database.collection("mines-games").findOneAndUpdate(
    {
      _id: game._id,
      completed: { $exists: false },
    },
    {
      $set: {
        reveals: tileIndexes,
        revealCount: tileIndexes.length,
        lastRevealDate: new Date(),
      },
    },
    {
      returnDocument: "after",
    },
  );

  if (!updatedGame) {
    throw new HandledError("Game lookup failed");
  }

  game = updatedGame;

  game = await completeGame({ user, game });

  return game;
}
