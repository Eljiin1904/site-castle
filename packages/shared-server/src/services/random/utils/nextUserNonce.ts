import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";
import { Ids } from "#server/services/ids";

export async function nextUserNonce(userId: string) {
  const pair = await Database.collection("user-seed-pairs").findOneAndUpdate(
    {
      userId,
    },
    {
      $inc: {
        nonce: 1,
      },
      $setOnInsert: {
        _id: Ids.object(),
        userId,
        game: "global",
        serverSeed: Ids.secret(),
        clientSeed: Ids.short(),
        rotateDate: new Date(),
      },
    },
    {
      upsert: true,
      returnDocument: "after",
    },
  );

  if (!pair) {
    throw new HandledError("Failed to increment nonce.");
  }

  return pair;
}
