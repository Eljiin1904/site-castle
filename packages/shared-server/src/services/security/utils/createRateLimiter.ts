import { RateLimiterMongo } from "rate-limiter-flexible";
import { Database } from "#server/services/database";
import config from "#server/config";
import { RateLimitError } from "../classes/RateLimitError";

export function createRateLimiter(options: {
  keyPrefix: string;
  points: number;
  durationSeconds: number;
  errorMessage: string;
}) {
  let limiter: RateLimiterMongo | undefined;

  const consume = async (key: string | undefined, points: number) => {
    if (!key) {
      return;
    }

    if (!limiter) {
      limiter = new RateLimiterMongo({
        storeClient: Database.manager.client,
        dbName: config.env,
        tableName: "rate-limiters",
        keyPrefix: options.keyPrefix,
        points: options.points,
        duration: options.durationSeconds,
      });
    }

    try {
      await limiter.consume(key, points);
    } catch (e) {
      if (e instanceof TypeError) {
        // https://github.com/animir/node-rate-limiter-flexible/issues/216
      } else {
        throw new RateLimitError(options.errorMessage);
      }
    }
  };

  return { consume };
}
