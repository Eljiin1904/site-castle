import { Database } from "#server/services/database";

interface RainReport {
  taxAmount: number;
  tipAmount: number;
}

export async function aggregateRainReport({
  minDate,
  maxDate,
}: {
  minDate: Date;
  maxDate: Date;
}): Promise<RainReport> {
  const pipeline = getPipeline({ minDate, maxDate });
  const collection = Database.collection("transactions");
  const cursor = collection.aggregate<RainReport>(pipeline);
  const result = await cursor.toArray();

  if (result.length === 0) {
    return getDefaultReport();
  } else {
    return result[0];
  }
}

function getDefaultReport(): RainReport {
  return {
    taxAmount: 0,
    tipAmount: 0,
  };
}

function getPipeline({ minDate, maxDate }: { minDate: Date; maxDate: Date }) {
  const pipeline = [
    {
      $match: {
        timestamp: { $gt: minDate, $lt: maxDate },
        status: "completed",
      },
    },
    {
      $group: {
        _id: null,
        taxAmount: {
          $sum: "$bet.rainAmount",
        },
        tipAmount: {
          $sum: {
            $cond: {
              if: { $eq: ["$kind", "rain-tip"] },
              then: "$value",
              else: 0,
            },
          },
        },
      },
    },
    {
      $project: { _id: 0 },
    },
  ];

  return pipeline;
}
