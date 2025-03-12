import { Database } from "@server/services/database";

interface BattleStats {
  count: number;
  value: number;
}

export async function getStats(): Promise<BattleStats> {
  const pipeline = [
    {
      $match: {
        status: { $ne: "completed" },
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        value: { $sum: "$entryCost" },
      },
    },
  ];

  const collection = Database.collection("case-battles");
  const cursor = collection.aggregate<BattleStats>(pipeline);
  const result = await cursor.toArray();

  return result[0] || getDefaultStats();
}

function getDefaultStats(): BattleStats {
  return { count: 0, value: 0 };
}
