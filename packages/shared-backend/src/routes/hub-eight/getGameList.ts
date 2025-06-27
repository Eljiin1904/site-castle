import { Http } from "#app/services/http";
import config from "@server/config";
import { Security } from "@server/services/security";
import axios from "axios";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { GameInformation } from "../../../../shared-core/src/types/hub-eight/GameInformation";
import { RedisService } from "@server/services/redis/RedisService";

// Cacheable
const logger = getServerLogger({});
const gameListKey = `games:hubb88`;
export default Http.createApiRoute({
  type: "get",
  path: "/game/list",
  secure: true,
  callback: async (req, res) => {
    // 1. Get Operator ID and KEy from env
    const { operatorId, hub88PrivateKey, hubEightApiURL } = config;
    const payload = {
      operator_id: Number(operatorId),
    };
    // 2. Generate signature with Private Key
    const hubEightSignature = Security.sign(
      hub88PrivateKey.replace(/\\n/g, "\n"),
      JSON.stringify(payload),
    );
    try {
      const savedGameList = await RedisService.getObject(gameListKey);

      // Already Saved in Cache
      if (savedGameList) {
        logger.info("Retreived Game List from Cache");
        res.json({ data: savedGameList });
        return;
      }
      // 3. Make external call to Hub8 with signed key from RSA private key
      const result = await axios.post(`${hubEightApiURL}/operator/generic/v2/game/list`, payload, {
        headers: {
          "X-Hub88-Signature": hubEightSignature,
          "Content-Type": "application/json",
        },
      });

      const games = result.data as GameInformation[];
      const sections = games.reduce<Record<string, GameInformation[]>>(
        (acc: any, game: GameInformation) => {
          const categoryKey = game.category.toLowerCase();
          if (!acc[categoryKey]) {
            acc[categoryKey] = [];
          }
          acc[categoryKey].push({
            url_thumbnail: game.url_thumb,
            url_background: game.url_background,
            game_code: game.game_code,
            name: game.name,
            release_date: game.release_date,
          });
          return acc;
        },
        {},
      );
      // Caches Game List for a Day
      await RedisService.setObject(gameListKey, sections, 86400);
      // 5. Return list data
      res.json({ data: sections });
    } catch (err: any) {
      logger.error(`Issue Processing Error: ${err}`);
      throw new Error("Unable to process request at this time");
    }
  },
});
