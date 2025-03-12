import { LimboTicketDocument } from "@core/types/limbo/LimboTicketDocument";
import { UserDocument } from "@core/types/users/UserDocument";
import { UserLocation } from "@core/types/users/UserLocation";
import { Users } from "@core/services/users";
import { Limbo } from "@core/services/limbo";
import { Numbers } from "@core/services/numbers";
import { Transactions } from "#server/services/transactions";
import { Ids } from "#server/services/ids";
import { Database } from "#server/services/database";
import { Random } from "#server/services/random";

export async function createTicket({
  user,
  location,
  targetValue,
  betAmount,
}: {
  user: UserDocument;
  location: UserLocation;
  targetValue: number;
  betAmount: number;
}) {
  const ticketId = await Ids.incremental({
    key: "limboTicketId",
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
    maxValue: Limbo.maxValue,
  });

  const multiplier = Numbers.round(Limbo.getMultiplier({ targetValue }), 2);
  const won = Limbo.isWin({ targetValue, rollValue });
  const wonAmount = won ? Math.round(betAmount * multiplier) : 0;

  const ticket: LimboTicketDocument = {
    _id: ticketId,
    timestamp: new Date(),
    user: Users.getBasicUser(user),
    betAmount,
    targetValue,
    multiplier,
    clientSeed,
    serverSeed,
    serverSeedHashed: Random.hashServerSeed(serverSeed),
    nonce,
    rollValue,
    rollMultiplier: Numbers.floor(
      Limbo.getMultiplier({ targetValue: rollValue }),
      2,
    ),
    won,
    wonAmount,
  };

  await Database.collection("limbo-tickets").insertOne(ticket);

  if (betAmount > 0) {
    await Transactions.createBet({
      user,
      kind: "limbo-bet",
      betAmount,
      location,
      gameId: ticketId,
    });
  }

  return ticket;
}
