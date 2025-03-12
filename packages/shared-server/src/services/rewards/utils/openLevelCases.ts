import { ChestDocument } from "@core/types/chests/ChestDocument";
import { UserDocument } from "@core/types/users/UserDocument";
import { ChestGameDocument } from "@core/types/chests/ChestGameDocument";
import { ChestSpeed } from "@core/types/chests/ChestSpeed";
import { Chests } from "#server/services/chests";
import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";
import { Rewards } from "@core/services/rewards";

export async function openLevelCases({
  chest,
  user,
  openCount,
  speed,
  specialEnabled,
}: {
  user: UserDocument;
  chest: ChestDocument;
  openCount: number;
  speed: ChestSpeed;
  specialEnabled: boolean;
}) {
  const { chestValue } = Rewards.findLevelInfo((x) => x.chestId === chest._id);
  const games: ChestGameDocument[] = [];

  for (let i = 0; i < openCount; i++) {
    const { modifiedCount } = await Database.collection("users").updateOne(
      {
        _id: user._id,
        [`chestKeys.${chest._id}`]: { $gt: 0 },
      },
      {
        $inc: {
          [`chestKeys.${chest._id}`]: -1,
          "meta.levelCaseBalance": -chestValue,
        },
      },
    );

    if (modifiedCount !== 1) {
      throw new HandledError("Not enough keys.");
    }

    const game = await Chests.createGame({
      user,
      chest,
      speed,
      specialEnabled,
    });

    games.push(game);
  }

  return games;
}
