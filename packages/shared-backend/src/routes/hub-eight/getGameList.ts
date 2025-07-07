import { Http } from "#app/services/http";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { Validation } from "@core/services/validation";
import { externalGameCategories } from "@core/types/hub-eight/GameInformation";
import { Database } from "@server/services/database";
import { subDays } from "date-fns";
import { fetchHubEightPopularGames } from "./utils/getPopularHubEightGames";

const logger = getServerLogger({});

const buildSort = (sortIndex?: number): Record<string, 1 | -1> => {
  switch (sortIndex) {
    case 0:
      return { featured: -1, release_date: -1 };
    case 2:
      return { name: 1 };
    case 3:
      return { name: -1 };
    default:
      return {};
  }
};

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

    // const { env } = config;

    // const location = await Http.getLocation(req.ip);
    // if (!location.countryCode && env != "development")
    //   throw new HandledError("Need Valid Location to play");

    // Exclude games blocked in the user's country
    // if (location.countryCode) {
    //   query.blocked_countries = { $nin: [location.countryCode] };
    // }

    const query: any = { enabled: true };

    if (category) query.site_category = category;
    if (products?.length) query.product = { $in: products };
    if (new_release === true) query.release_date = { $gte: subDays(new Date(), 60).toISOString() };
    if (live === true) query.live = true;
    if (bonus_buy === true) query.bonus_buy = true;
    if (searchText) query.name = { $regex: searchText, $options: "i" };

    try {
      logger.info(`Querying games ordered by, ${sortIndex}, "with query" ${JSON.stringify(query)}`);

      const total = await Database.collection("hub-eight-games").countDocuments(query);
      let games;
      if (sortIndex === 1) {
        // Popular games sorted by wagered amount last 30 days
        // TODO - MAy allow for specification of day range, for now 30
        games = await fetchHubEightPopularGames(query, page, limit);
      } else {
        // Usual Sort
        const sort = buildSort(sortIndex);
        games = await Database.collection("hub-eight-games")
          .find(query, { sort: { ...sort, _id: 1 }, skip: (page - 1) * limit, limit })
          .toArray();
      }
      res.json({ games, total });
    } catch (err: any) {
      logger.error(`Issue retreiving games: ${err}`);
      res.status(500).json({ error: "Unable to process request at this time" });
    }
  },
});
