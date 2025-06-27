import { Filter, Sort } from "mongodb";
import { Validation } from "@core/services/validation";
import { RaceDocument } from "@core/types/rewards/RaceDocument";
import { Strings } from "@core/services/strings";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-races",
  body: Validation.object({
    searchText: Validation.string(),
    searchIndex: Validation.index("Search Index", 1),
    sortIndex: Validation.index("Sort Index", 2),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  supportAccess: true,
  callback: async (req, res) => {
    const { searchText, searchIndex, sortIndex, limit, page } = req.body;

    const filter: Filter<RaceDocument> = {};
    let sort: Sort = {};

    if (searchText) {
      if (searchIndex === 0) {
        filter.slug = { $regex: Strings.toSlug(searchText) };
      } else if (searchIndex === 1) {
        filter._id = searchText;
      }
    }

    if (sortIndex === 0) {
      sort = { startDate: -1 };
    } else if (sortIndex === 1) {
      sort = { createDate: -1 };
    } else if (sortIndex === 2) {
      sort = { slug: 1 };
    }

    const races = await Database.collection("races")
      .find(filter, {
        sort: { ...sort, _id: 1 },
        projection: { leaders: 0, reports: 0 },
        skip: (page - 1) * limit,
        limit,
      })
      .toArray();

    res.json({ races });
  },
});
