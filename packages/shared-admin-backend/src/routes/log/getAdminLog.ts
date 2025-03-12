import { Filter } from "mongodb";
import { Validation } from "@core/services/validation";
import { AdminLogDocument } from "@core/types/admin/AdminLogDocument";
import { Admin } from "@server/services/admin";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-admin-log",
  body: Validation.object({
    kind: Validation.string().oneOf(Admin.logKinds, "Invalid Kind."),
    minDate: Validation.date().nullable(),
    maxDate: Validation.date().nullable(),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { kind, minDate, maxDate, limit, page } = req.body;

    const filter: Filter<AdminLogDocument> = {};

    if (kind) {
      filter.kind = kind;
    }
    if (minDate || maxDate) {
      filter.timestamp = {
        $gte: minDate || new Date(0),
        $lte: maxDate || new Date(),
      };
    }

    const log = await Database.collection("admin-log")
      .find(filter, {
        sort: { timestamp: -1, _id: 1 },
        skip: (page - 1) * limit,
        limit,
      })
      .toArray();

    res.json({ log });
  },
});
