import { DoubleBetKind } from "@core/types/double/DoubleBetKind";
import { DoubleTicketDocument } from "@core/types/double/DoubleTicketDocument";
import { DoubleRoundDocument } from "@core/types/double/DoubleRoundDocument";
import { UserDocument } from "@core/types/users/UserDocument";
import { UserLocation } from "@core/types/users/UserLocation";
import { Users } from "@core/services/users";
import { Transactions } from "#server/services/transactions";
import { Ids } from "#server/services/ids";
import { Database } from "#server/services/database";

export async function createTicket({
  user,
  location,
  round,
  betKind,
  betAmount,
}: {
  user: UserDocument;
  location: UserLocation;
  round: DoubleRoundDocument;
  betKind: DoubleBetKind;
  betAmount: number;
}) {
  const ticketId = await Ids.incremental({
    key: "doubleTicketId",
    baseValue: 1000000,
    batchSize: 100,
  });

  const ticket: DoubleTicketDocument = {
    _id: ticketId,
    timestamp: new Date(),
    roundId: round._id,
    user: Users.getBasicUser(user),
    betAmount,
    betKind,
  };

  await Database.collection("double-tickets").insertOne(ticket);

  await Transactions.createBet({
    user,
    kind: "double-bet",
    betAmount,
    location,
    roundId: round._id,
    gameId: ticketId,
    betKind,
  });

  return ticket;
}
