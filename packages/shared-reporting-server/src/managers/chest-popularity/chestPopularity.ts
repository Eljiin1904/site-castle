import { minutesToMilliseconds, subDays } from "date-fns";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Database } from "@server/services/database";
import { System } from "@server/services/system";
import { Chests } from "@server/services/chests";

export default () =>
  setInterval(System.tryCatch(main), minutesToMilliseconds(5));

async function main() {
  const cursor = Database.collection("chests").find(
    {
      kind: "case",
      disabled: false,
    },
    {
      projection: { _id: 1 },
    },
  );

  for await (const chest of cursor) {
    await System.tryCatch(handleChest)(chest);
  }
}

async function handleChest(chest: ChestDocument) {
  const chestId = chest._id;
  const maxDate = new Date();
  const minDate = subDays(maxDate, 30);

  const report = await Chests.aggregateReport({ chestId, minDate, maxDate });

  const popularity = report.playerCount;

  await Database.collection("chests").updateOne(
    { _id: chest._id },
    { $set: { popularity } },
  );
}
