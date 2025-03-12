import { ChestDropDocument } from "@core/types/chests/ChestDropDocument";
import { Database } from "#server/services/database";
import { Dates } from "@core/services/dates";

export async function reportDrop(drop: ChestDropDocument) {
  const timeframe = Dates.roundToHour(drop.timestamp);
  const id = Math.floor(timeframe.getTime() / 1000 / 60 / 60).toString();

  if (drop.user.bot) {
    return;
  }
  if (drop.user.tags.includes("cheeky")) {
    return;
  }

  await Database.collection("chest-reports").updateOne(
    {
      _id: `${id}_${drop.chest.id}`,
    },
    {
      $setOnInsert: {
        timeframe,
        chest: drop.chest,
      },
      $inc: {
        openCount: 1,
      },
      $addToSet: {
        players: drop.user.id,
      },
    },
    {
      upsert: true,
    },
  );
}
