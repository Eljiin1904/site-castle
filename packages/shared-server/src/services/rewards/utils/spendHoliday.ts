import { UserDocument } from "@core/types/users/UserDocument";
import { RaffleTicketDocument } from "@core/types/rewards/RaffleTicketDocument";
import { Intimal } from "@core/services/intimal";
import { Database } from "#server/services/database";
import { Users } from "#server/services/users";
import { HandledError } from "#server/services/errors";
import { Ids } from "#server/services/ids";
import { Site } from "#server/services/site";
import { getActiveRaffle } from "./getActiveRaffle";

export async function spendHoliday({
  user,
  amount,
}: {
  user: UserDocument;
  amount: number;
}) {
  const { modifiedCount } = await Database.collection("users").updateOne(
    {
      _id: user._id,
      holidayBalance: { $gte: amount },
    },
    {
      $inc: {
        holidayBalance: -amount,
      },
    },
  );

  if (modifiedCount !== 1) {
    throw new HandledError("Not enough holiday balance.");
  }

  await Users.incrementReport({
    user: Users.getBasicUser(user),
    inc: {
      holidaySpent: amount,
    },
  });

  await handleRaffle({ user, amount });
}

async function handleRaffle({
  user,
  amount,
}: {
  user: UserDocument;
  amount: number;
}) {
  if (user.tags.includes("sponsored") || user.tags.includes("cheeky")) {
    return;
  }

  const raffle = await getActiveRaffle();

  if (!raffle) {
    return;
  }

  const { holiday } = await Site.meta.cache();

  if (!holiday) {
    throw new HandledError("No active holiday.");
  }

  const entries = Math.max(
    1,
    Intimal.toDecimal(amount * holiday.raffleRate, 0),
  );

  const inc = await Database.collection("raffles").findOneAndUpdate(
    {
      _id: raffle._id,
    },
    {
      $inc: {
        ticketCount: entries,
      },
    },
    {
      returnDocument: "after",
      projection: {
        ticketCount: 1,
      },
    },
  );

  if (!inc) {
    throw new HandledError("Invalid raffle inc.");
  }

  const tickets: RaffleTicketDocument[] = [];
  const startIndex = inc.ticketCount - entries;

  for (let i = 0; i < entries; i++) {
    const ticketIndex = startIndex + i;

    tickets.push({
      _id: Ids.object(),
      timestamp: new Date(),
      userId: user._id,
      raffleId: raffle._id,
      ticketIndex,
    });
  }

  await Database.collection("raffle-tickets").insertMany(tickets);
}
