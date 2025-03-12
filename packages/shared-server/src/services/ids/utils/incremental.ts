import { Database } from "#server/services/database";

const cursors: Record<string, number> = {};

export async function incremental({
  key,
  baseValue,
  batchSize,
}: {
  key: string;
  baseValue: number;
  batchSize: number;
}) {
  if (!cursors[key] || cursors[key] % batchSize === 0) {
    const document = await Database.collection(
      "incremental-ids",
    ).findOneAndUpdate(
      { _id: key },
      { $inc: { value: batchSize } },
      {
        upsert: true,
        returnDocument: "before",
      },
    );
    cursors[key] = document ? baseValue + document.value : baseValue;
  }

  return (cursors[key]++).toString();
}
