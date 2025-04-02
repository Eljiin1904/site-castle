import { MinesGameDocument } from "@core/types/mines/MinesGameDocument";
import { UserDocument } from "@core/types/users/UserDocument";
import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";

export async function completeGame({
  user,
  game,
}: {
  user: UserDocument;
  game: MinesGameDocument;
}) {
  const updatedGame = await Database.collection("mines-games").findOneAndUpdate(
    {
      _id: game._id,
      completed: { $exists: false },
    },
    {
      $set: {
        completed: true,
        completeDate: new Date(),
      },
    },
    {
      returnDocument: "after",
    },
  );

  if (!updatedGame) {
    throw new HandledError("Game lookup failed.");
  }

  return updatedGame;
}
