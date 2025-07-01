import { Http } from "#app/services/http";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { Database } from "@server/services/database";
import { RedisService } from "@server/services/redis/RedisService";
// import { Http } from "@server/services/http";

const logger = getServerLogger({});
const PROGRESS_KEY = "import:games:progress";

export default Http.createApiRoute({
  type: "post",
  path: "/games/products",
  secure: true,
  callback: async (req, res) => {
    try {
      const pipeline = [
        {
          $group: {
            _id: "$product",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            product: "$_id",
            count: 1,
            _id: 0,
          },
        },
        {
          $sort: { product: 1 },
        },
      ];

      const products = await Database.collection("hub-eight-games").aggregate(pipeline).toArray();

      res.json({products});
    } catch (err) {
      logger.error(`Unable to retreive products: ${err}`);
      res.status(500).json({ message: "Unable to handle request at this time" });
      return;
    }
  },
});
