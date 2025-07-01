import { Http } from "#app/services/http";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { RedisService } from "@server/services/redis/RedisService";

const logger = getServerLogger({});
const PROGRESS_KEY = "import:games:progress";

export default Http.createApiRoute({
  type: "get",
  path: "/games/sync/status",
  callback: async (req, res) => {
    try {
      logger.info("Retreiving Game Sync Status");
      if (RedisService.connected) {
        const progressRaw = await RedisService.getString(PROGRESS_KEY);
        const progress = progressRaw ? JSON.parse(progressRaw) : { current: 0, total: 0 };

        res.json({
          ...progress,
          percent: progress.total ? ((progress.current / progress.total) * 100).toFixed(2) : "0.00",
        });
        return;
      }
      logger.error("Unable to retreive sync status. Redis not connected");
      res.status(503).json({ message: "Unable to retreive status" });
      return;
    } catch (err) {
      logger.error(`Unable to retreive sync status: ${err}`);
      res.status(500).json({ message: "Unable to process sync at this time" });
      return;
    }
  },
});
