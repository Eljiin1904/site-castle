import { Filter } from "mongodb";
import { Http } from "#app/services/http";
import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Transactions } from "@server/services/transactions";
import { TransactionDocument } from "@core/types/transactions/TransactionDocument";

export default Http.createApiRoute({
  type: "post",
  path: "/get-transactions",
  body: Validation.object({
    searchText: Validation.string(),
    category: Validation.string().oneOf(Transactions.categories, "Invalid Category."),
    kind: Validation.string().oneOf(Transactions.kinds, "Invalid Kind."),
    status: Validation.string().oneOf(Transactions.statuses, "Invalid Status."),
    minDate: Validation.date().nullable(),
    maxDate: Validation.date().nullable(),
    minValue: Validation.number(),
    maxValue: Validation.number(),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const {
      searchText,
      category,
      kind,
      status,
      minDate,
      maxDate,
      minValue,
      maxValue,
      limit,
      page,
    } = req.body;

    const filter: Filter<TransactionDocument> = {};

    if (searchText) {
      filter._id = searchText;
    } else {
      if (category) {
        filter.category = category;
      }
      if (kind) {
        filter.kind = kind;
      }
      if (status) {
        filter.status = status;
      }
      if (minDate || maxDate) {
        filter.timestamp = {
          $gte: minDate || new Date(0),
          $lte: maxDate || new Date(),
        };
      }
      if (minValue || maxValue) {
        filter.value = {
          $gte: minValue || 0,
          $lte: maxValue || Number.MAX_SAFE_INTEGER,
        };
      }
    }

    const transactions = await Database.collection("transactions")
      .find(filter, {
        sort: { timestamp: -1, _id: 1 },
        skip: (page - 1) * limit,
        limit,
        projection: { bet: 0 },
      })
      .toArray();

    res.json({ transactions });
  },
});
