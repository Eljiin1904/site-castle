import { Filter } from "mongodb";
import { Validation } from "@core/services/validation";
import { SystemLogDocument } from "@core/types/system/SystemLogDocument";
import { System } from "@server/services/system";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-system-log",
  body: Validation.object({
    kind: Validation.string().oneOf(System.logKinds, "Invalid Kind."),
    minDate: Validation.date().nullable(),
    maxDate: Validation.date().nullable(),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { kind, minDate, maxDate, limit, page } = req.body;

    const filter: Filter<SystemLogDocument> = {};

    if (kind) {
      filter.kind = kind;
    }
    if (minDate || maxDate) {
      filter.timestamp = {
        $gte: minDate || new Date(0),
        $lte: maxDate || new Date(),
      };
    }

    const log = await Database.collection("system-log")
      .find(filter, {
        sort: { timestamp: -1, _id: 1 },
        skip: (page - 1) * limit,
        limit,
      })
      .toArray();

    res.json({ log });
  },
});
