import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import {
  SiteGameDisplayDocument,
  SiteGameCatergoryOptions,
} from "@core/types/site/SiteGameDisplayDocument";

export default Http.createApiRoute({
  type: "post",
  path: "/get-games",
  secure: false,
  body: Validation.object({
    category: Validation.string()
      .oneOf(SiteGameCatergoryOptions, "Invalid Category")
      .required("Category is required."),
  }),
  callback: async (req, res) => {
    const { category } = req.body;
    const options = category == "all" ? undefined : { category };

    const gameOptions = await Database.collection("site-games")
      .find(options)
      .sort({ timestamp: -1 })
      .toArray();

    const games = [];

    for (const game of gameOptions) {
      const result: SiteGameDisplayDocument = {
        _id: game._id,
        timestamp: game.timestamp,
        name: game.name,
        description: game.description,
        featured: game.featured,
        category: game.category,
      };

      games.push(result);
    }

    res.json({ games });
  },
});
