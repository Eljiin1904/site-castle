import { Database } from "@server/services/database";
import { Users } from "@server/services/users";

export async function regenUserReports() {
  const minDate = new Date("2024-10-31T22:00:00.000+00:00");
  const maxDate = new Date("2024-11-01T05:00:00.000+00:00");

  await Database.collection("user-reports").deleteMany({
    timeframe: { $gte: minDate, $lte: maxDate },
  });

  const txs = Database.collection("transactions").find(
    {
      status: "completed",
      timestamp: { $gte: minDate, $lte: maxDate },
    },
    { sort: { timestamp: 1 } },
  );

  const promises = [];
  let counter = 0;

  for await (const tx of txs) {
    promises.push(Users.reportTransaction(tx));

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
