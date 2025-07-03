import { Http } from "#app/services/http";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { Validation } from "@core/services/validation";
import { externalGameCategories } from "@core/types/hub-eight/GameInformation";
import { Database } from "@server/services/database";
import { subDays } from "date-fns";
import { Sort } from "mongodb";

const logger = getServerLogger({});

export default Http.createApiRoute({
  type: "post",
  path: "/game/list",
  secure: true,
  body: Validation.object({
    category: Validation.string().oneOf(externalGameCategories).optional(),
    products: Validation.array().of(Validation.string()).optional(),
    new_release: Validation.boolean().optional(),
    bonus_buy: Validation.boolean().optional(),
    live: Validation.boolean().optional(),
    searchText: Validation.string().optional(),
    sortIndex: Validation.index("Sort Index", 3).optional(),
    page: Validation.page().default(1),
    limit: Validation.limit().default(40),
  }),
  callback: async (req, res) => {
    const { category, products, new_release, bonus_buy, live, searchText, sortIndex, page, limit } =
      req.body;
    let sort: Sort = {};

    try {
      // Games release less than 60 days ago considered "new"
      const sixtyDaysAgo = subDays(new Date(), 60);

      // Build query dynamically
      const query: any = {};

      // Retreive only enabled games
      query.enabled = true;

      if (category) {
        query.site_category = category;
      }
      if (products && products.length > 0) {
        query.product = { $in: products };
      }
      if (new_release === true) {
        query.release_date = { $lte: sixtyDaysAgo.toISOString() };
      }

      if (live === true) {
        query.live = true;
      }

      if (bonus_buy === true) {
        query.bonus_buy = true;
      }

      if (searchText) {
        query.name = { $regex: searchText, $options: "i" };
      }

      if (sortIndex === 0) {
        sort = { featured: -1 };
      } else if (sortIndex === 1) {
        sort = { popular: 1 };
      } else if (sortIndex === 2) {
        sort = { name: 1 };
      } else if (sortIndex === 3) {
        sort = { name: -1 };
      }
      const total = await Database.collection("hub-eight-games").countDocuments(query);
      const games = await Database.collection("hub-eight-games")
        .find(query, { sort: { ...sort, _id: 1 }, skip: (page - 1) * limit, limit })
        .toArray();
      res.json({ games, total });
    } catch (err: any) {
      logger.error(`Issue retreiving games: ${err}`);
      res.status(500).json({ error: "Unable to process request at this time" });
    }
  },
});
