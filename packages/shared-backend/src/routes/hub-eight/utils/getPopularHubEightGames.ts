import { Database } from "@server/services/database";
import { subDays } from "date-fns";

export async function fetchHubEightPopularGames(query: any, page: number, limit: number) {
  // Hard coded as 30 for now
  const THIRTY_DAYS_AGO = subDays(new Date(), 30);

  const rollbackDocs = await Database.collection("transactions")
    .find({ kind: "hub-eight-rollback" }, { projection: { referenceTransactionUUID: 1 } })
    .toArray();

  const rollbackedUUIDs = rollbackDocs
    .map((r) => (r as { referenceTransactionUUID: string }).referenceTransactionUUID)
    .filter(Boolean);

  const recentDebits = await Database.collection("transactions")
    .aggregate([
      {
        $match: {
          kind: "hub-eight-debit",
          transactionUUID: { $nin: rollbackedUUIDs },
          timestamp: { $gte: THIRTY_DAYS_AGO },
        },
      },
      {
        $group: {
          _id: "$gameCode",
          totalWagered: { $sum: "$amount" },
        },
      },
      {
        $sort: { totalWagered: -1 },
      },
    ])
    .toArray();

  const popularGameCodes = recentDebits.map((d) => d._id);

  if (popularGameCodes.length === 0) {
    // fallback if no popular games
    return Database.collection("hub-eight-games")
      .find(query)
      .sort({ _id: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
  }

  return Database.collection("hub-eight-games")
    .aggregate([
      { $match: query },
      {
        $addFields: {
          popularityIndex: {
            $indexOfArray: [popularGameCodes, "$game_code"],
          },
        },
      },
      {
        $sort: { popularityIndex: 1, _id: 1 },
      },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ])
    .toArray();
}
