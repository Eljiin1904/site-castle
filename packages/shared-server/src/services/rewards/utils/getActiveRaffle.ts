import { RaffleDocument } from "@core/types/rewards/RaffleDocument";
import { Database } from "#server/services/database";

export async function getActiveRaffle(
  projection?: Partial<Record<keyof RaffleDocument, 0 | 1>>,
) {
  let raffle = await Database.collection("raffles").findOne(
    {
      $or: [
        {
          status: { $in: ["starting", "pending", "drawing"] },
        },
        {
          endDate: { $gte: new Date() },
          startDate: { $lte: new Date() },
        },
      ],
    },
    {
      projection,
    },
  );

  if (!raffle) {
    raffle = await Database.collection("raffles").findOne(
      {
        endDate: { $lte: new Date() },
      },
      {
        sort: { endDate: -1 },
        projection,
      },
    );
  }

  return raffle;
}
