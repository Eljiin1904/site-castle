import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";
import { Ids } from "#server/services/ids";

export async function getUserPair({ userId }: { userId: string }) {
  const pair = await Database.collection("user-seed-pairs").findOneAndUpdate(
    {
      userId,
    },
    {
      $setOnInsert: {
        _id: Ids.object(),
        userId,
        game: "global",
        serverSeed: Ids.secret(),
        nextServerSeed: Ids.secret(),
        clientSeed: Ids.short(),
        nonce: 0,
        rotateDate: new Date(),
      },
    },
    {
      upsert: true,
      returnDocument: "after",
    },
  );

  if (!pair) {
    throw new HandledError("Failed to lookup user pair.");
  }

  if (!pair.nextServerSeed) {
    pair.nextServerSeed = Ids.secret();

    await Database.collection("user-seed-pairs").updateOne(
      {
        userId,
      },
      { $set: { nextServerSeed: pair.nextServerSeed } },
    );
  }

  return pair;
}
