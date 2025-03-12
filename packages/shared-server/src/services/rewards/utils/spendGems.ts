import { UserDocument } from "@core/types/users/UserDocument";
import { Database } from "#server/services/database";
import { Users } from "#server/services/users";
import { HandledError } from "#server/services/errors";

export async function spendGems({
  user,
  amount,
}: {
  user: UserDocument;
  amount: number;
}) {
  const { modifiedCount } = await Database.collection("users").updateOne(
    {
      _id: user._id,
      gemBalance: { $gte: amount },
    },
    {
      $inc: {
        gemBalance: -amount,
      },
    },
  );

  if (modifiedCount !== 1) {
    throw new HandledError("Not enough gems.");
  }

  await Users.incrementReport({
    user: Users.getBasicUser(user),
    inc: {
      gemsSpent: amount,
    },
  });
}
