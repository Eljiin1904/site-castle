import { Affiliates } from "@server/services/affiliates";
import { Database } from "@server/services/database";

export async function regenAffiliateReports() {
  const minDate = new Date("2024-10-18T18:00:00.000+00:00");
  const maxDate = new Date();

  await Database.collection("affiliate-reports").deleteMany({
    timeframe: { $gte: minDate, $lte: maxDate },
  });

  const txs = Database.collection("transactions").find(
    {
      status: "completed",
      timestamp: { $gte: minDate, $lte: maxDate },
      affiliate: { $ne: null },
    },
    { sort: { timestamp: 1 } },
  );

  const promises = [];
  let counter = 0;

  for await (const tx of txs) {
    promises.push(Affiliates.reportTransaction(tx));

    if (promises.length >= 250) {
      await Promise.all(promises);

      counter += promises.length;
      console.log(counter);

      promises.length = 0;
    }
  }

  await Promise.all(promises);

  counter += promises.length;
  console.log(counter);

  console.log("Reports regenerated.");
}
