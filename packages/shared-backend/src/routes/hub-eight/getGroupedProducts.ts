import { Http } from "#app/services/http";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { Validation } from "@core/services/validation";
import { externalGameCategories } from "@core/types/hub-eight/GameInformation";
import { Database } from "@server/services/database";

const logger = getServerLogger({});

export default Http.createApiRoute({
  type: "post",
  path: "/games/products",
  secure: true,
  body: Validation.object({
    category: Validation.string().oneOf(externalGameCategories).optional(),
  }),
  callback: async (req, res) => {
    const { category } = req.body;
    try {
      const pipeline = [
        { $match: category ? { site_category: category } : {} },
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

      res.json({ products });
    } catch (err) {
      logger.error(`Unable to retreive products: ${err}`);
      res.status(500).json({ message: "Unable to handle request at this time" });
      return;
    }
  },
});
