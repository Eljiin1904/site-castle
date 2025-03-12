import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";

export async function editUserPair({
  userId,
  clientSeed,
}: {
  userId: string;
  clientSeed: string;
}) {
  const pair = await Database.collection("user-seed-pairs").findOneAndUpdate(
    {
      userId,
    },
    {
      $set: {
        clientSeed,
      },
    },
    {
      returnDocument: "after",
    },
  );

  if (!pair) {
    throw new HandledError("Failed to lookup user pair.");
  }

  return pair;
}
