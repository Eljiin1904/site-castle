import { addDays, subDays } from "date-fns";
import { UserDocument } from "@core/types/users/UserDocument";
import { RewardBoostTimeframe } from "@core/types/rewards/RewardBoostTimeframe";
import { Database } from "#server/services/database";

export async function getBoostEvent({
  timeframe,
  user,
}: {
  timeframe: RewardBoostTimeframe;
  user?: UserDocument;
}) {
  const days = { daily: 1, weekly: 7, monthly: 30 }[timeframe];

  let eventId: string | undefined;
  let startDate: Date;
  let endDate: Date | undefined;

  if (timeframe === "daily") {
    let recentTicket;

    if (user) {
      recentTicket = await Database.collection("reward-boost-tickets").findOne({
        userId: user._id,
        timestamp: { $gt: subDays(Date.now(), 1) },
        timeframe,
      });
    }

    if (recentTicket) {
      startDate = addDays(recentTicket.timestamp, days);
    } else {
      startDate = new Date();
    }
  } else {
    const event = await Database.collection("reward-boost-events").findOne(
      {
        timeframe,
        endDate: { $gt: new Date() },
      },
      {
        sort: { startDate: 1 },
      },
    );

    if (!event) {
      startDate = addDays(Date.now(), days);
    } else {
      let claimed = false;

      if (user) {
        claimed = await Database.exists("reward-boost-tickets", {
          userId: user._id,
          eventId: event._id,
        });
      }

      if (claimed) {
        eventId = event._id;
        startDate = addDays(event.startDate, days);
      } else {
        eventId = event._id;
        startDate = event.startDate;
        endDate = event.endDate;
      }
    }
  }

  return { eventId, startDate, endDate };
}
