import { CollationOptions, Filter, Sort } from "mongodb";
import { UserDocument } from "@core/types/users/UserDocument";
import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-affiliates",
  body: Validation.object({
    searchText: Validation.string(),
    searchIndex: Validation.index("Search Index", 1),
    sortIndex: Validation.index("Sort Index", 3),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { searchText, searchIndex, sortIndex, limit, page } = req.body;

    const filter: Filter<UserDocument> = {};
    let sort: Sort = {};
    let collation: CollationOptions | undefined;

    if (searchText) {
      if (searchIndex === 0) {
        filter.username = { $regex: searchText, $options: "i" };
        collation = { locale: "en", strength: 2 };
      } else if (searchIndex === 1) {
        filter._id = searchText;
      }
    }

    if (sortIndex === 0) {
      sort = { "affiliate.referralCount": -1 };
    } else if (sortIndex === 1) {
      sort = { "affiliate.commissionBalance": -1 };
    } else if (sortIndex === 2) {
      sort = { "affiliate.commissionTotal": -1 };
    } else if (sortIndex === 3) {
      sort = { "meta.activeDate": -1 };
    }

    const users = await Database.collection("users")
      .find(filter, {
        collation,
        sort: { ...sort, _id: 1 },
        skip: (page - 1) * limit,
        limit,
      })
      .toArray();

    res.json({ users });
  },
});
