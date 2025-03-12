import { addHours, differenceInHours, endOfHour, startOfHour } from "date-fns";
import { Dates } from "@core/services/dates";
import { Numbers } from "@core/services/numbers";
import { Database } from "@server/services/database";
import { Transactions } from "@server/services/transactions";

export async function regenTxReports() {
  const startDate = new Date("2024-07-30T00:00:00");
  const endDate = new Date("2024-08-30T00:00:00");

  const hours = differenceInHours(endDate, startDate);

  for (let i = 0; i < hours; i++) {
    const timeframe = addHours(startDate, i);

    await Database.collection("transaction-reports").deleteOne({
      timeframe,
    });

    const promises = [];

    const txs = Database.collection("transactions").find(
      {
        timestamp: {
          $gte: startOfHour(timeframe),
          $lte: endOfHour(timeframe),
        },
        status: "completed",
      },
      { sort: { timestamp: 1 } },
    );

    let count = 0;

    for await (const tx of txs) {
      promises.push(Transactions.reportTransaction(tx));

      if (promises.length >= 100) {
        await Promise.all(promises);
        promises.length = 0;
      }

      count++;
    }

    await Promise.all(promises);

    console.log({
      timeframe: Dates.toFullDateString(timeframe),
      count: Numbers.toLocaleString(count, 0),
    });
  }
}
