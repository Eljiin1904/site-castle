import { ChestReport } from "@core/types/chests/ChestReport";
import { Chests } from "@core/services/chests";
import { Database } from "#server/services/database";

export async function aggregateReport({
  chestId,
  minDate,
  maxDate,
}: {
  chestId: string;
  minDate: Date;
  maxDate: Date;
}): Promise<ChestReport> {
  const pipeline = createPipeline({ chestId, minDate, maxDate });
  const collection = Database.collection("chest-reports");
  const cursor = collection.aggregate<ChestReport>(pipeline);
  const result = await cursor.toArray();

  if (result.length === 0) {
    return getDefaultReport(chestId);
  } else {
    return result[0];
  }
}

function createPipeline({
  chestId,
  minDate,
  maxDate,
}: {
  chestId: string;
  minDate: Date;
  maxDate: Date;
}) {
  const pipeline = [
    {
      $match: {
        "chest.id": chestId,
        timeframe: { $gte: minDate, $lt: maxDate },
      },
    },
    {
      $group: {
        _id: "$chest.id",
        chest: {
          $first: "$chest",
        },
        openCount: {
          $sum: "$openCount",
        },
        players: {
          $addToSet: "$players",
        },
      },
    },
    {
      $addFields: {
        players: {
          $reduce: {
            input: "$players",
            initialValue: [],
            in: { $setUnion: ["$$value", "$$this"] },
          },
        },
      },
    },
    {
      $addFields: {
        playerCount: { $size: "$players" },
        ev: { $multiply: ["$chest.openCost", "$openCount", Chests.edgeRate] },
      },
    },
    {
      $addFields: {
        evpp: { $divide: ["$ev", "$playerCount"] },
      },
    },
    {
      $project: {
        chest: 0,
        players: 0,
      },
    },
  ];

  return pipeline;
}

function getDefaultReport(chestId: string): ChestReport {
  return {
    _id: chestId,
    openCount: 0,
    playerCount: 0,
    ev: 0,
    evpp: 0,
  };
}
