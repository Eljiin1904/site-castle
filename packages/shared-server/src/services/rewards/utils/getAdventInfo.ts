import { subHours } from "date-fns";
import { UserDocument } from "@core/types/users/UserDocument";
import { AdventInfo } from "@core/types/rewards/AdventInfo";
import { Rewards } from "@core/services/rewards";
import { Database } from "#server/services/database";
import { Users } from "#server/services/users";
import { HandledError } from "#server/services/errors";
import { Site } from "#server/services/site";

export async function getAdventInfo({ user }: { user: UserDocument }) {
  const { holiday } = await Site.meta.cache();

  if (!holiday) {
    throw new HandledError("No active holiday.");
  }

  const report = await Users.aggregateReport({
    userId: user._id,
    minDate: subHours(Date.now(), 24),
    maxDate: new Date(),
  });

  const resetDate = holiday.adventResetDate;
  const day = Rewards.getAdventDay({ resetDate });

  const previousDayTicket = await Database.collection("advent-tickets").findOne(
    {
      userId: user._id,
      holidayId: holiday.id,
      day: day - 1,
    },
    {
      projection: { day: 1 },
    },
  );

  const info: AdventInfo = {
    previousDay: !!previousDayTicket,
    discordLinked: !!user.discordId,
    wagerAmount: report.wagerAmount,
    depositAmount: report.depositAmount,
  };

  return info;
}
