import { Validation } from "@core/services/validation";
import { SiteReport } from "@core/types/site/SiteReport";
import { Users } from "@server/services/users";
import { Transactions } from "@server/services/transactions";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-report",
  body: Validation.object({
    minDate: Validation.date().required("Min date is required."),
    maxDate: Validation.date().required("Max date is required."),
  }),
  callback: async (req, res) => {
    const { minDate, maxDate } = req.body;

    const [transactions, users] = await Promise.all([
      Transactions.aggregateReport({ minDate, maxDate }),
      Users.aggregateGlobalReport({ minDate, maxDate }),
    ]);

    const report: SiteReport = { transactions, users };

    res.json({ report });
  },
});
