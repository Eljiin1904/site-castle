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
    if (!this.isConnected || !this._client) {
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

    const { redisUrl } = config;

    try {
      this._client = createClient({
        url: redisUrl,
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
        logger.info("Initialized Redis.");
      });

      this._client.on("error", (err: any) => {
        this.logRedisError("Redis Client Error", err);
      });

      await this._client.connect();
    } catch (err: any) {
      this.isConnected = false;

      this.logRedisError("Initial Redis connection failed", err);
      logger.warn("Continuing without Redis. Some features may be unavailable.");
    }
  }

  static async setString(key: string, value: string, ttlSeconds?: number) {
    try {
      if (ttlSeconds) {
        await this._client.setEx(key, ttlSeconds, value);
      } else {
        await this._client.set(key, value);
      }
    } catch (error) {
      this.logRedisError(`Failed to set string for key "${key}"`, error);
    }
  }

  static async getString(key: string) {
    try {
      const result = await this._client.get(key);
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
    try {
      await this._client.hSet(key, data);
    } catch (error) {
      this.logRedisError(`Failed to set hash for key "${key}"`, error);
    }
  }

  static async getHash(key: string): Promise<Record<string, string>> {
    try {
      const result = await this._client.hGetAll(key);
      return result;
    } catch (error) {
      this.logRedisError(`Failed to get Hash with key "${key}"`, error);
      return {};
    }
  }

  static async deleteHashField(key: string, field: string) {
    try {
      await this._client.hDel(key, field);
    } catch (error) {
      this.logRedisError(`Failed to delete Hash with key "${key}"`, error);
      return {};
    }
  }

  // DELETE
  static async deleteKey(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      this.logRedisError(`Failed to delete key "${key}"`, error);
    }
  }

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

  public static async disconnect(): Promise<void> {
    if (this.isConnected && this._client) {
      await this._client.disconnect();
      this.isConnected = false;
      logger.info("Redis Client Disconnected");
    }
  }
}
