import { MinesGameDocument } from "@core/types/mines/MinesGameDocument";
import { UserDocument } from "@core/types/users/UserDocument";
import { Mines } from "@core/services/mines";
import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";
import { completeGame } from "./completeGame";

export async function revealTile({
  user,
  game,
  revealIndex,
}: {
  user: UserDocument;
  game: MinesGameDocument;
  revealIndex: number;
}) {
  const updatedGame = await Database.collection("mines-games").findOneAndUpdate(
    {
      _id: game._id,
      completed: { $exists: false },
    },
    {
      $push: {
        reveals: revealIndex,
      },
      $inc: {
        revealCount: 1,
      },
      $set: {
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

  if (Mines.isMined(game, revealIndex) || Mines.hasMaxReveals(game) || Mines.hasMaxProfit(game)) {
    game = await completeGame({ user, game });
  }
  return game;
}
