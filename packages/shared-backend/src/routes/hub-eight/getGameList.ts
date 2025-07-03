import { Http } from "#app/services/http";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { Validation } from "@core/services/validation";
import { externalGameCategories } from "@core/types/hub-eight/GameInformation";
import { Database } from "@server/services/database";
import { subDays } from "date-fns";

const logger = getServerLogger({});

export default Http.createApiRoute({
  type: "post",
  path: "/game/list",
  secure: true,
  body: Validation.object({
    category: Validation.string().oneOf(externalGameCategories).required(),
    products: Validation.array().of(Validation.string()).optional(),
    new_release: Validation.boolean().optional(),
    bonus_buy: Validation.boolean().optional(),
    live: Validation.boolean().optional(),
    featured: Validation.boolean().nullable().default(null),
  }),
  callback: async (req, res) => {
    const { category, products, new_release, bonus_buy, live, featured } = req.body;
    try {
      // Games release less than 60 days ago considered "new"
      const sixtyDaysAgo = subDays(new Date(), 60);

      // Build query dynamically
      const query: any = {};

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
      if (featured) {
        query.featured = featured; // Filter for featured games if true/false
      }

      const games = await Database.collection("hub-eight-games").find(query).toArray();

      res.json({ data: games });
    } catch (err: any) {
      logger.error(`Issue retreiving games: ${err}`);
      res.status(500).json({ error: "Unable to process request at this time" });
    }
  },
});
