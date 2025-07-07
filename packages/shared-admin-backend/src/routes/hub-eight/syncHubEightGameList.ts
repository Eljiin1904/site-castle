import { Http } from "#app/services/http";
import config from "#app/config";
import axios from "axios";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { determineSiteCategory } from "./utils/determineSiteCategory";

import { RedisService } from "@server/services/redis/RedisService";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import { Security } from "@server/services/security";
import {
  ExternalGameCategory,
  HubEightGameInformation,
} from "@core/types/hub-eight/GameInformation";
import chunk from "lodash-es/chunk.js";

const logger = getServerLogger({});

const LOCK_KEY = "import:games:lock";
const PROGRESS_KEY = "import:games:progress";
const BATCH_SIZE = 500;

export default Http.createApiRoute({
  type: "post",
  path: "/games/sync",
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
      // 3. Check if already Syncing Game List
      // If already syncing, return response informing its already syncing
      // If not, retrieve data to start syncing
      let isLocked = false;

      try {
        if (RedisService.connected) {
          isLocked = Boolean(await RedisService.getString(LOCK_KEY));
          if (isLocked) {
            res.status(409).json({ message: "Sync already in progress" });
            return;
          }
        }
      } catch (redisErr) {
        logger.error(`Redis unavailable, unable to sync: ${redisErr}`);
        res.status(500).json({ message: "Unable to process sync at this time" });
        return;
      }

      // 4. Make call to Hub88 to retreive Games List
      const result = await axios.post(`${hubEightApiURL}/operator/generic/v2/game/list`, payload, {
        headers: {
          "X-Hub88-Signature": hubEightSignature,
          "Content-Type": "application/json",
        },
      });

      const games = result.data as HubEightGameInformation[];

      // 5. Set lock with expiration and break data into chunks to begin saving
      await RedisService.setString(LOCK_KEY, "true", 600);
      logger.info(`Retreived Game List Size: ${result.data.length}`);

      const chunks = chunk(games, BATCH_SIZE);

      await RedisService.setString(
        PROGRESS_KEY,
        JSON.stringify({ current: 0, total: chunks.length }),
      );

      // 6. Chunk the data into section and save
      for (let i = 0; i < chunks.length; i++) {
        const operations = chunks[i].map((game) => {
          const categoryLower = game.category.toLowerCase();
          const live_game = categoryLower.includes("live") && categoryLower !== "live game shows";
          const site_category = determineSiteCategory(game.category) as ExternalGameCategory;

          return {
            updateOne: {
              filter: { game_code: game.game_code },
              update: {
                $set: {
                  url_thumb: game.url_thumb,
                  url_background: game.url_background,
                  product: game.product,
                  platforms: game.platforms,
                  name: game.name,
                  game_code: game.game_code,
                  supplier_identifier: game.supplier_identifier,
                  freebet_support: game.freebet_support,
                  demo_game_support: game.demo_game_support,
                  category: game.category,
                  blocked_countries: game.blocked_countries,
                  release_date: game.release_date,
                  volatility: game.volatility,
                  rtp: game.rtp,
                  paylines: game.paylines,
                  hit_ratio: game.hit_ratio,
                  certifications: game.certifications,
                  languages: game.languages,
                  theme: game.theme,
                  technology: game.technology,
                  features: game.features,
                  bonus_buy: game.features.includes("Bonus Buy"),
                  tags: [categoryLower, ...game.features.map((f) => f.toLowerCase())],
                  site_category,
                  live_game,
                },
                $setOnInsert: {
                  enabled: false,
                  featured: false,
                  _id: Ids.object(),
                },
              },
              upsert: true,
            },
          };
        });

        try {
          await Database.collection("hub-eight-games").bulkWrite(operations, { ordered: false });
          logger.info(`Processed chunk ${i + 1} of ${chunks.length}`);
        } catch (e) {
          logger.error(`Chunk ${i + 1} failed: ${e}`);
        }

        // Keep updating progress back to redis.
        await RedisService.setString(
          PROGRESS_KEY,
          JSON.stringify({ current: i + 1, total: chunks.length }),
          600,
        );
      }
      // 7. Return when done
      res.status(200).json({ message: "Games synced successfully" });
    } catch (err: any) {
      logger.error(`Issue Processing Request: ${err}`);
      res.status(500).json({ error: "Unable to process request at this time" });
    } finally {
      // Remove Progress, Lock when completed or if it fails
      await RedisService.deleteKey(LOCK_KEY);
      // await RedisService.deleteKey(PROGRESS_KEY);
    }
  },
});
