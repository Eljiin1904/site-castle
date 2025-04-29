import { Http } from "#app/services/http";
import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";

export default Http.createApiRoute({
  type: "post",
  path: "/check-campaign-id",
  restricted: true,
  secure: true,
  body: Validation.object({
    campaignId: Validation.string().matches(/^[a-z0-9]+$/i).trim(),
  }),
  callback: async (req, res) => {
    
    const {campaignId} = req.body;
    const exists = await Database.exists(
      "user-campaigns",
      { campaignId },
      { collation: { locale: "en", strength: 2 } },
    );

    const isAvailable = !exists;
    res.json({ isAvailable });
  },
});
