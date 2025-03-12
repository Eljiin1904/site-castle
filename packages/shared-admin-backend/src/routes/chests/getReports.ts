import { Filter, Sort } from "mongodb";
import { Validation } from "@core/services/validation";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Strings } from "@core/services/strings";
import { Chests } from "@server/services/chests";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-reports",
  body: Validation.object({
    searchText: Validation.string(),
    minDate: Validation.date().nullable(),
    maxDate: Validation.date().nullable(),
    kind: Validation.string().oneOf(Chests.kinds).required("Kind is required."),
    sortIndex: Validation.index("Sort Index", 5),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { searchText, minDate, maxDate, kind, sortIndex, limit, page } = req.body;

    const filter: Filter<ChestDocument> = {};
    let sort: Sort = {};

    filter.kind = kind;

    if (searchText) {
      filter.slug = { $regex: Strings.toSlug(searchText) };
    }

    if (sortIndex === 0) {
      sort = { popularity: -1 };
    } else if (sortIndex === 1) {
      sort = { openCost: -1 };
    } else if (sortIndex === 2) {
      sort = { openCost: 1 };
    } else if (sortIndex === 3) {
      sort = { createDate: -1 };
    } else if (sortIndex === 4) {
      sort = { createDate: 1 };
    } else if (sortIndex === 5) {
      sort = { displayName: 1 };
    }

    const chests = await Database.collection("chests")
      .find(filter, {
        sort: { ...sort, _id: 1 },
        skip: (page - 1) * limit,
        limit,
        projection: { items: 0 },
      })
      .toArray();

    const reports = await Chests.aggregateReports({
      chestIds: chests.map((x) => x._id),
      minDate: minDate || new Date(0),
      maxDate: maxDate || new Date(),
    });

    const withReport = chests.map((chest, i) => ({
      ...chest,
      ...reports[i],
    }));

    res.json({ chests: withReport });
  },
});
