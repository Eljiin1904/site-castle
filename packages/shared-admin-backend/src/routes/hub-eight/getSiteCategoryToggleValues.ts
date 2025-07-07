import { Http } from "#app/services/http";
import { siteCategoryEnables } from "@core/services/hub-eight/constants/hubSiteCategory";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { Validation } from "@core/services/validation";
import { externalGameCategories } from "@core/types/hub-eight/GameInformation";
import { Database } from "@server/services/database";

const logger = getServerLogger({});

export default Http.createApiRoute({
  type: "post",
  path: "/games/list/toggle",
  body: Validation.object({
    site_category: Validation.string().oneOf(externalGameCategories).required(),
  }),
  callback: async (req, res) => {
    try {
      const toggles = await Database.collection("site-settings")
        .find({ _id: { $in: siteCategoryEnables } })
        .toArray();

      res.status(200).json({ toggles });
      return;
    } catch (error) {
      logger.error(`Error fetching toggles: ${error}`);
      res.status(500).json({ success: false, message: "Failed to fetch toggles" });
    }
  },
});
