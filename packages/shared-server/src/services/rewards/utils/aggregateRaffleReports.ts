import { RaffleDocument } from "@core/types/rewards/RaffleDocument";
import { RaffleReport } from "@core/types/rewards/RaffleReport";
import { Database } from "#server/services/database";

export async function aggregateRaffleReports({
  raffle,
}: {
  raffle: RaffleDocument;
}): Promise<RaffleReport[]> {
  const pipeline = createPipeline({ raffle });
  const collection = Database.collection("raffle-tickets");
  const cursor = collection.aggregate<RaffleReport>(pipeline);

  const results = await cursor.toArray();

  return results;
}

function createPipeline({ raffle }: { raffle: RaffleDocument }) {
  const pipeline = [
    {
      $match: {
        raffleId: raffle._id,
      },
    },
    {
      $group: {
        _id: "$userId",
        userId: {
          $first: "$userId",
        },
        ticketCount: {
          $sum: 1,
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
        ticketCount: -1,
      },
    },
  ];

  return pipeline;
}
