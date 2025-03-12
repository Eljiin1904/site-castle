import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/get-holiday-case",
  secure: false,
  body: Validation.object({
    slug: Validation.string().required("Slug is required."),
  }),
  callback: async (req, res) => {
    const { slug } = req.body;

    const { holiday } = await Site.meta.cache();

    if (!holiday) {
      throw new HandledError("No active holiday.");
    }

    const chest = await Database.collection("chests").findOne({
      kind: "holiday-case",
      slug,
    });

    if (!chest) {
      throw new HandledError("Case not found.");
    }
    if (chest.disabled) {
      throw new HandledError("Case is disabled.");
    }

    const holidayCost = holiday.chests.find((x) => x.id === chest._id)?.holidayCost;

    if (!holidayCost) {
      throw new HandledError("Invalid holiday case ID.");
    }

    res.json({ chest, holidayCost });
  },
});
