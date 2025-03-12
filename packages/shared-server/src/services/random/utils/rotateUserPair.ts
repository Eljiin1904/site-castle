import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";
import { Ids } from "#server/services/ids";

export async function rotateUserPair({
  userId,
  newClientSeed,
}: {
  userId: string;
  newClientSeed: string;
}) {
  const pair = await Database.collection("user-seed-pairs").findOne({
    userId,
  });

  if (!pair) {
    throw new HandledError("Failed to lookup user pair.");
  }

  await Database.collection("user-seed-pairs").updateOne(
    {
      userId,
    },
    {
      $set: {
        clientSeed: newClientSeed,
        serverSeed: pair.nextServerSeed || Ids.secret(),
        nextServerSeed: Ids.secret(),
        nonce: 0,
        rotateDate: new Date(),
      },
    },
  );

  return pair;
}
