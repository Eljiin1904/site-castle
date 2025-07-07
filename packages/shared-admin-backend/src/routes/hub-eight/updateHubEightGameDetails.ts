import { Http } from "#app/services/http";
import { Validation } from "@core/services/validation";
import { updateHubEightGameSchema } from "@core/schemas/hub-eight/updateHubEightGameSchema";
import { Database } from "@server/services/database";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";

const logger = getServerLogger({});
export default Http.createApiRoute({
  type: "post",
  path: "/games/update",
  body: Validation.object({
    game_code: Validation.string().required(),
    update: updateHubEightGameSchema.required(),
  }),
  callback: async (req, res) => {
    try {
      const { game_code, update } = req.body;

      const result = await Database.collection("hub-eight-games").updateOne(
        { game_code },
        { $set: update },
      );

      if (result.matchedCount === 0) {
        res.status(404).json({ message: "Game not found" });
        return;
      }

      if (result.modifiedCount === 0) {
        res.status(200).json({ message: "No changes applied" });
        return;
      }

      res.status(200).json({ message: "Game updated successfully" });
      return;
    } catch (error) {
      logger.error(`Error updating game: ${error}`);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  },
});
