import { addHours, differenceInHours, endOfHour, startOfHour } from "date-fns";
import { Validation } from "@core/services/validation";
import { Dates } from "@core/services/dates";
import { Numbers } from "@core/services/numbers";
import { Database } from "@server/services/database";
import { Transactions } from "@server/services/transactions";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/regen-transaction-reports",
  body: Validation.object({
    startDate: Validation.date(),
    endDate: Validation.date(),
  }),
  callback: async (req, res) => {
    res.json({});

    const startDate = new Date("2024-07-30T00:00:00.000+00:00");
    const endDate = new Date("2024-12-12T20:00:00.000+00:00");

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

      console.log(
        `<< TX_REGEN_STEP >> Timeframe: ${Dates.toFullDateString(timeframe)} | Count: ${Numbers.toLocaleString(count, 0)}`,
      );
    }
  },
});
