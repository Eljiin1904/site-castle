import { Filter, Sort } from "mongodb";
import { Validation } from "@core/services/validation";
import { GiftBatchDocument } from "@core/types/economy/GiftBatchDocument";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { Strings } from "@core/services/strings";

export default Http.createApiRoute({
  type: "post",
  path: "/get-gift-batches",
  body: Validation.object({
    searchText: Validation.string(),
    sortIndex: Validation.index("Sort Index", 2),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { searchText, sortIndex, limit, page } = req.body;

    const filter: Filter<GiftBatchDocument> = {};
    let sort: Sort = {};

    if (searchText) {
      filter._id = { $regex: Strings.toSlug(searchText) };
    }

    if (sortIndex === 0) {
      sort = { createDate: -1 };
    } else if (sortIndex === 1) {
      sort = { lastUseDate: -1 };
    } else if (sortIndex === 2) {
      sort = { _id: 1 };
    }

    const batches = await Database.collection("gift-batches")
      .find(filter, {
        sort: { ...sort, _id: 1 },
        skip: (page - 1) * limit,
        limit,
      })
      .toArray();

    res.json({ batches });
  },
});
