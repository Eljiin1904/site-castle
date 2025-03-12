import { RaceWagerReport } from "@core/types/rewards/RaceWagerReport";
import { Database } from "#server/services/database";

export async function aggregateRaceReports({
  sort,
  minDate,
  maxDate,
}: {
  sort: "wagerAmount" | "xpGained";
  minDate: Date;
  maxDate: Date;
}): Promise<RaceWagerReport[]> {
  const pipeline = createPipeline({ sort, minDate, maxDate });
  const collection = Database.collection("user-reports");
  const cursor = collection.aggregate<RaceWagerReport>(pipeline);

  const results = await cursor.toArray();

  return results;
}

function createPipeline({
  sort,
  minDate,
  maxDate,
}: {
  sort: "wagerAmount" | "xpGained";
  minDate: Date;
  maxDate: Date;
}) {
  const pipeline = [
    {
      $match: {
        timeframe: { $gte: minDate, $lt: maxDate },
        userTags: { $nin: ["sponsored", "cheeky"] },
      },
    },
    {
      $group: {
        _id: "$userId",
        userId: {
          $first: "$userId",
        },
        wagerAmount: {
          $sum: "$wagerAmount",
        },
        xpGained: {
          $sum: "$xpGained",
        },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        [sort]: -1,
      },
    },
  ];

  return pipeline;
}
