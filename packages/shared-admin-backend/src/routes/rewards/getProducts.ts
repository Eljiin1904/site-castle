import { Filter, Sort } from "mongodb";
import { Validation } from "@core/services/validation";
import { RewardProductDocument } from "@core/types/rewards/RewardProductDocument";
import { Rewards } from "@server/services/rewards";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { Strings } from "@core/services/strings";

export default Http.createApiRoute({
  type: "post",
  path: "/get-products",
  body: Validation.object({
    searchText: Validation.string(),
    kind: Validation.string().oneOf(Rewards.productKinds, "Invalid kind."),
    sortIndex: Validation.index("Sort Index", 3),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { searchText, kind, sortIndex, limit, page } = req.body;

    const filter: Filter<RewardProductDocument> = {};
    let sort: Sort = {};

    if (searchText) {
      filter.slug = { $regex: Strings.toSlug(searchText) };
    }

    if (kind) {
      filter.kind = kind;
    }

    if (sortIndex === 0) {
      sort = { createDate: -1 };
    } else if (sortIndex === 1) {
      sort = { createDate: 1 };
    } else if (sortIndex === 2) {
      sort = { gemCost: -1 };
    } else if (sortIndex === 3) {
      sort = { gemCost: 1 };
    }

    const products = await Database.collection("reward-products")
      .find(filter, {
        sort: { ...sort, _id: 1 },
        skip: (page - 1) * limit,
        limit,
      })
      .toArray();

    res.json({ products });
  },
});
