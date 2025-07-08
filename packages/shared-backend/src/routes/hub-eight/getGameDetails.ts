import { Validation } from "@core/services/validation";
import { Http } from "#app/services/http";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { Database } from "@server/services/database";

const logger = getServerLogger({});
export default Http.createApiRoute({
  type: "post",
  path: "/game/details",
  secure: false,
  body: Validation.object({
    game_code: Validation.string().required("Game code required")
  }),
  callback: async (req, res) => {
    const { game_code } = req.body;
    try {
      const game = await Database.collection("hub-eight-games").findOne({game_code});
      res.json({game});
    } catch (err: any) {
      logger.error(`Issue retreiving game: ${err}`);
      res.status(500).json({ error: "Unable to process request at this time" });
    }
  }
});