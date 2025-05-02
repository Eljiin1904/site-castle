import { UserDocument } from "@core/types/users/UserDocument";
import { UserLocation } from "@core/types/users/UserLocation";
import { Users } from "@core/services/users";
import { Transactions } from "#server/services/transactions";
import { Ids } from "#server/services/ids";
import { Database } from "#server/services/database";
import { CrashRoundDocument } from "@core/types/crash/CrashRoundDocument";
import { CrashTicketDocument } from "@core/types/crash/CrashTicketDocument";

export async function createTicket({
  user,
  location,
  round,
  betAmount,
}: {
  user: UserDocument;
  location: UserLocation;
  round: CrashRoundDocument;
  betAmount: number;
}) {
  const ticketId = await Ids.incremental({
    key: "crashTicketId",
    baseValue: 1000000,
    batchSize: 100,
  });

  const ticket: CrashTicketDocument = {
    _id: ticketId,
    timestamp: new Date(),
    roundId: round._id,
    user: Users.getBasicUser(user),
    betAmount,
  };

  await Database.collection("crash-tickets").insertOne(ticket);

  await Transactions.createBet({
    user,
    kind: "crash-bet",
    betAmount,
    location,
    roundId: round._id,
    gameId: ticketId,
  });

  return ticket;
}
