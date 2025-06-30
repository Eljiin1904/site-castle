// RedisService.ts
import { createClient, RedisClientType } from "redis";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import config from "#server/config";

const logger = getServerLogger({});

export class RedisService {
  private static _client: RedisClientType;
  private static isConnected = false;

  // Ability to retrive Raw Client
  static get client() {
    if (!this.isConnected || !this.client) {
      throw new Error("Redis not initialized.");
    }
    return this._client;
  }

  static get connected() {
    return this.isConnected;
  }

  static async initialize() {
    if (this.isConnected) {
      logger.warn("Redis already initialized. Skipping reinitialization.");
      return;
    }

    const { redisHost, redisPort } = config;
    logger.info(`Attempting to connect with the following url redis://${redisUrl}`);
    try {
      this._client = createClient({
        url: `redis://${redisUrl}`,
        socket: {
          reconnectStrategy: (retries) => {
            if (retries > 3) {
              logger.error("Redis reconnect failed after 3 attempts. Giving up.");
              return new Error("Retry attempts exhausted");
            }

            const delay = Math.min(retries * 100, 1000); // exponential backoff
            logger.warn(`Redis reconnect attempt ${retries}, retrying in ${delay}ms...`);
            return delay;
          },
        },
      });

      this._client.on("connect", () => {
        this.isConnected = true;
        logger.info("Redis Client Connected");
      });

      this._client.on("error", (err: any) => {
        logger.info(`Attempting to connect with the following url redis://${redisUrl}`);
        this.logRedisError("Redis Client Error", err);
      });

      await this._client.connect();
    } catch (err: any) {
      this.isConnected = false;
      logger.info(`Attempting to connect with the following url redis://${redisUrl}`);
      this.logRedisError("Initial Redis connection failed", err);
      logger.warn("Continuing without Redis. Some features may be unavailable.");
    }
  }
  // private async connect(): Promise<void> {
  //   if (!this.isConnected) {
  //     try {
  //       await this.client.connect();
  //       this.isConnected = true;
  //     } catch (error) {
  //       this.logRedisError("Redis connection failed", error);
  //       throw error; // Re-throw so caller can decide to fallback or fail
  //     }
  //   }
  // }

  // STRING / OBJECT
  static async setString(key: string, value: string, ttlSeconds?: number) {
    try {
      ttlSeconds ? this._client.setEx(key, ttlSeconds, value) : this._client.set(key, value);
    } catch (error) {
      this.logRedisError(`Failed to set string for key "${key}"`, error);
    }
  }

  static async getString(key: string) {
    try {
      const result = this._client.get(key);
      return result ?? null; // Ensures no undefined is returned
    } catch (error) {
      this.logRedisError(`Failed to get string for key "${key}"`, error);
      return null;
    }
  }

  static async setObject<T>(key: string, obj: T, ttlSeconds?: number) {
    try {
      const json = JSON.stringify(obj);
      await this.setString(key, json, ttlSeconds);
    } catch (error) {
      this.logRedisError(`Failed to set object for key "${key}"`, error);
    }
  }

  static async getObject<T>(key: string) {
    try {
      const json = await this.getString(key);
      return json ? (JSON.parse(json) as T) : null;
    } catch (error) {
      this.logRedisError(`Failed to get Object for key "${key}"`, error);
      return null;
    }
  }

  // HASH
  static async setHash(key: string, data: Record<string, string>) {
    this._client.hSet(key, data);
  }

  static async getHash(key: string): Promise<Record<string, string>> {
    return this._client.hGetAll(key);
  }

  static async deleteHashField(key: string, field: string) {
    this._client.hDel(key, field);
  }

  // DELETE
  static async deleteKey(key: string): Promise<void> {
    try {
      this.client.del(key);
    } catch (error) {
      this.logRedisError(`Failed to delete key "${key}"`, error);
    }
  }

  // public async disconnect(): Promise<void> {
  //   if (this.isConnected) {
  //     await this.client.disconnect();
  //     this.isConnected = false;
  //   }
  // }

  private static logRedisError(message: string, error: unknown): void {
    if (error instanceof AggregateError) {
      for (const subError of error.errors) {
        logger.error(`${message}: ${subError.message}  : ${subError}`);
      }
    } else if (error instanceof Error) {
      logger.error(`${message}: ${error.message} : ${error}`);
    } else {
      logger.error(`${message}: ${String(error)}`);
    }
  }
}
