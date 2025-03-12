import { Filter, Sort } from "mongodb";
import { Validation } from "@core/services/validation";
import { RaffleDocument } from "@core/types/rewards/RaffleDocument";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-raffles",
  body: Validation.object({
    searchText: Validation.string(),
    sortIndex: Validation.index("Sort Index", 1),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { searchText, sortIndex, limit, page } = req.body;

    const filter: Filter<RaffleDocument> = {};
    let sort: Sort = {};

    if (searchText) {
      filter._id = searchText;
    }

    if (sortIndex === 0) {
      sort = { startDate: -1 };
    } else if (sortIndex === 1) {
      sort = { createDate: -1 };
    }

    const raffles = await Database.collection("raffles")
      .find(filter, {
        sort: { ...sort, _id: 1 },
        skip: (page - 1) * limit,
        limit,
      })
      .toArray();

    res.json({ raffles });
  },
});
