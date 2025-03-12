import { CollationOptions, Filter, Sort } from "mongodb";
import { Http } from "#app/services/http";
import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { UserDocument } from "@core/types/users/UserDocument";

export default Http.createApiRoute({
  type: "post",
  path: "/get-users",
  body: Validation.object({
    searchText: Validation.string(),
    searchIndex: Validation.index("Search Index", 3),
    sortIndex: Validation.index("Sort Index", 6),
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
        filter.email = { $regex: searchText, $options: "i" };
        collation = { locale: "en", strength: 2 };
      } else if (searchIndex === 2) {
        filter._id = searchText;
      } else if (searchIndex === 3) {
        filter["meta.lastLocation.ip"] = searchText;
      }
    }

    if (sortIndex === 0) {
      sort = { "meta.activeDate": -1 };
    } else if (sortIndex === 1) {
      sort = { registerDate: -1 };
    } else if (sortIndex === 2) {
      sort = { tokenBalance: -1 };
    } else if (sortIndex === 3) {
      sort = { "stats.profitLoss": -1 };
    } else if (sortIndex === 4) {
      sort = { "stats.profitLoss": 1 };
    } else if (sortIndex === 5) {
      sort = { "stats.wagerAmount": -1 };
    } else if (sortIndex === 6) {
      sort = { xp: -1 };
    }

    const users = await Database.collection("users")
      .aggregate(
        [
          {
            $match: filter,
          },
          {
            $addFields: {
              "stats.profitLoss": { $ifNull: ["$stats.profitLoss", 0] },
            },
          },
          {
            $sort: { ...sort, _id: 1 },
          },
          {
            $skip: (page - 1) * limit,
          },
          {
            $limit: limit,
          },
        ],
        {
          collation,
        },
      )
      .toArray();

    res.json({ users });
  },
});
