import { Chests } from "@server/services/chests";
import { Database } from "@server/services/database";

export async function regenChestReports() {
  await Database.collection("chest-reports").deleteMany({});

  const drops = Database.collection("chest-drops").find(
    {},
    { sort: { timestamp: 1 } },
  );

  const promises = [];
  let counter = 0;

  for await (const drop of drops) {
    promises.push(Chests.reportDrop(drop));

    if (promises.length >= 250) {
      await Promise.all(promises);

      counter += promises.length;
      console.log(counter);

      promises.length = 0;
    }
  }

  await Promise.all(promises);

  console.log("Reports regenerated.");
}
