import { UserDocument } from "@core/types/users/UserDocument";
import { UserLocation } from "@core/types/users/UserLocation";
import { Users } from "@core/services/users";
import { Ids } from "#server/services/ids";
import { Database } from "#server/services/database";
import { CrashTicketDocument } from "@core/types/crash/CrashTicketDocument";
import { Transactions } from "#server/services/transactions";
import { Crash } from "@core/services/crash";

export async function createNextRoundTicket({
  user,
  location,
  betAmount,
  targetMultiplier,
}: {
  user: UserDocument;
  location: UserLocation;
  betAmount: number;
  targetMultiplier?: number;
}): Promise<CrashTicketDocument> {
  
  const ticketId = await Ids.incremental({
    key: "crashNewTicketId",
    baseValue: 1000000,
    batchSize: 100,
  });

  const ticket: CrashTicketDocument = {
    _id: ticketId,
    timestamp: new Date(),
    roundId: Crash.nextRoundId, // Placeholder for next round ID
    user: Users.getBasicUser(user),
    betAmount,
    targetMultiplier: targetMultiplier || 1
  };

  const findTicket = await Database.collection("crash-next-tickets").findOne({
    "user.id": user._id
  });

  if(findTicket)
    return findTicket;

  await Database.collection("crash-next-tickets").insertOne(ticket);

  await Transactions.createBet({
    user,
    kind: "crash-bet",
    betAmount,
    location,
    roundId: Crash.nextRoundId,
    gameId: ticketId,
  });

  return ticket;
}
