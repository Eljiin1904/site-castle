import { CollationOptions, Filter, Sort } from "mongodb";
import { AffiliateReloadDocument } from "@core/types/affiliates/AffiliateReloadDocument";
import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-reloads",
  body: Validation.object({
    searchText: Validation.string(),
    searchIndex: Validation.index("Search Index", 1),
    sortIndex: Validation.index("Sort Index", 3),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { searchText, searchIndex, sortIndex, limit, page } = req.body;

    const filter: Filter<AffiliateReloadDocument> = {};
    let sort: Sort = {};
    let collation: CollationOptions | undefined;

    if (searchText) {
      if (searchIndex === 0) {
        filter["user.name"] = { $regex: searchText, $options: "i" };
        collation = { locale: "en", strength: 2 };
      } else if (searchIndex === 1) {
        filter["user.id"] = { $regex: searchText, $options: "i" };
      }
    }

    if (sortIndex === 0) {
      sort = { createDate: -1 };
    } else if (sortIndex === 1) {
      sort = { createDate: 1 };
    } else if (sortIndex === 2) {
      sort = { lastClaimDate: -1 };
    }

    const reloads = await Database.collection("affiliate-reloads")
      .find(filter, {
        collation,
        sort: { ...sort, _id: 1 },
        skip: (page - 1) * limit,
        limit,
      })
      .toArray();

    res.json({ reloads });
  },
});
