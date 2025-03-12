import { DiceTicketDocument } from "@core/types/dice/DiceTicketDocument";
import { DiceTargetKind } from "@core/types/dice/DiceTargetKind";
import { UserDocument } from "@core/types/users/UserDocument";
import { UserLocation } from "@core/types/users/UserLocation";
import { Users } from "@core/services/users";
import { Dice } from "@core/services/dice";
import { Transactions } from "#server/services/transactions";
import { Ids } from "#server/services/ids";
import { Database } from "#server/services/database";
import { Random } from "#server/services/random";

export async function createTicket({
  user,
  location,
  targetKind,
  targetValue,
  betAmount,
}: {
  user: UserDocument;
  location: UserLocation;
  targetKind: DiceTargetKind;
  targetValue: number;
  betAmount: number;
}) {
  const ticketId = await Ids.incremental({
    key: "diceTicketId",
    baseValue: 1000000,
    batchSize: 100,
  });

  const { serverSeed, clientSeed, nonce } = await Random.nextUserNonce(
    user._id,
  );

  const rollValue = Random.getRoll({
    serverSeed,
    clientSeed,
    nonce,
    minValue: 0,
    maxValue: Dice.maxValue + 1,
  });

  const multiplier = Dice.getMultiplier({ targetValue, targetKind });
  const won = Dice.isWin({ targetKind, targetValue, rollValue });
  const wonAmount = won ? Math.round(betAmount * multiplier) : 0;

  const ticket: DiceTicketDocument = {
    _id: ticketId,
    timestamp: new Date(),
    user: Users.getBasicUser(user),
    betAmount,
    targetValue,
    targetKind,
    multiplier,
    clientSeed,
    serverSeed,
    serverSeedHashed: Random.hashServerSeed(serverSeed),
    nonce,
    rollValue,
    won,
    wonAmount,
  };

  await Database.collection("dice-tickets").insertOne(ticket);

  if (betAmount > 0) {
    await Transactions.createBet({
      user,
      kind: "dice-bet",
      betAmount,
      location,
      gameId: ticketId,
    });
  }

  return ticket;
}
