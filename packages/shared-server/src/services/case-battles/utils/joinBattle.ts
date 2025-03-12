import { CaseBattleDocument } from "@core/types/case-battles/CaseBattleDocument";
import { UserDocument } from "@core/types/users/UserDocument";
import { UserLocation } from "@core/types/users/UserLocation";
import { Database } from "#server/services/database";
import { Transactions } from "#server/services/transactions";
import { Users } from "#server/services/users";
import { HandledError } from "#server/services/errors";

export async function joinBattle({
  user,
  location,
  battle,
  seat,
}: {
  user: UserDocument;
  location: UserLocation;
  battle: CaseBattleDocument;
  seat: number;
}) {
  const updated = await Database.collection("case-battles").findOneAndUpdate(
    {
      _id: battle._id,
      [`players.${seat}`]: { $type: 10 },
    },
    {
      $set: {
        [`players.${seat}`]: Users.getBasicUser(user),
      },
    },
    {
      projection: { entryCost: 1, players: 1 },
      returnDocument: "after",
    },
  );

  if (!updated) {
    throw new HandledError("Battle seat is already taken.");
  }

  await Transactions.createBet({
    user,
    kind: "case-battle-join",
    betAmount: battle.entryCost,
    location,
    gameId: battle._id,
  });

  if (updated.players.every((x) => x !== null)) {
    await Database.collection("case-battles").updateOne(
      { _id: battle._id },
      { $set: { ready: true } },
    );
  }
}
