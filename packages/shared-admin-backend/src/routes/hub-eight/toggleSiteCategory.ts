import { Http } from "#app/services/http";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { Validation } from "@core/services/validation";
import { externalGameCategories } from "@core/types/hub-eight/GameInformation";
import { SiteSettingObject } from "@core/types/site/SiteSettingDocument";
import { Database } from "@server/services/database";
import { hubEightToggleNameMap } from "@core/services/hub-eight/constants/hubSiteCategory";

const logger = getServerLogger({});

export default Http.createApiRoute({
  type: "post",
  path: "/games/toggle",
  body: Validation.object({
    site_category: Validation.string().oneOf(externalGameCategories).required(),
  }),
  callback: async (req, res) => {
    const { site_category } = req.body;
    try {
      const categoryEnableName = hubEightToggleNameMap[site_category];

      // Fetch the current setting
      const setting = await Database.collection("site-settings").findOne({
        _id: categoryEnableName as keyof SiteSettingObject,
      });

      // Toggle the boolean value (default to true if not found, should be found though)
      const currentValue = setting?.value ?? true; // fallback to true, which will turn into false
      const toggledValue = !currentValue;

      // Update the setting toggle
      await Database.collection("site-settings").updateOne(
        { _id: categoryEnableName as keyof SiteSettingObject },
        {
          $set: {
            value: toggledValue,
            lastUpdateDate: new Date(),
          },
        },
        { upsert: true },
      );

      res.status(200).json({ success: true, newValue: toggledValue });
    } catch (err: any) {
      logger.error(`Issue retreiving games: ${err}`);
      res.status(500).json({ error: "Unable to process request at this time" });
    }
  },
});
