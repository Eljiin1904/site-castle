// RedisService.ts
import { createClient, RedisClientType } from "redis";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";

const logger = getServerLogger({});
export class RedisService {
  private client: RedisClientType;
  private isConnected = false;

  constructor(redisUrl: string = "redis://localhost:6379") {
    this.client = createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 1) {
            logger.error("Redis reconnect failed after 3 attempts. Giving up.");
            return new Error("Retry attempts exhausted");
          }

          const delay = Math.min(retries * 100, 1000); // exponential backoff
          logger.warn(`Redis reconnect attempt ${retries}, retrying in ${delay}ms...`);
          return delay; // retry after delay
        },
      },
    });

    this.client.on("connect", () => {
      logger.info("Redis Client Connected");
    });

    this.client.on("error", (err) => {
      this.logRedisError("Redis Client Error", err);
    });

    this.client.connect().catch((err) => {
      this.logRedisError("Initial Redis connection failed", err);
    });
  }
  private async connect(): Promise<void> {
    if (!this.isConnected) {
      try {
        await this.client.connect();
        this.isConnected = true;
      } catch (error) {
        this.logRedisError("Redis connection failed", error);
        throw error; // Re-throw so caller can decide to fallback or fail
      }
    }
  }

  // Ability to retrive Raw Client
  public async getClient(): Promise<RedisClientType> {
    await this.connect();
    return this.client;
  }

  // STRING / OBJECT
  public async setString(key: string, value: string, ttlSeconds?: number): Promise<void> {
    try {
      await this.connect();
      ttlSeconds
        ? await this.client.setEx(key, ttlSeconds, value)
        : await this.client.set(key, value);
    } catch (error) {
      this.logRedisError(`Failed to set string for key "${key}"`, error);
    }
  }

  public async getString(key: string): Promise<string | null> {
    try {
      await this.connect();
      const result = await this.client.get(key);
      return result ?? null; // Ensures no undefined is returned
    } catch (error) {
      this.logRedisError(`Failed to get string for key "${key}"`, error);
      return null;
    }
  }

  public async setObject<T>(key: string, obj: T, ttlSeconds?: number): Promise<void> {
    try {
      const json = JSON.stringify(obj);
      await this.setString(key, json, ttlSeconds);
    } catch (error) {
      this.logRedisError(`Failed to set object for key "${key}"`, error);
    }
  }

  public async getObject<T>(key: string): Promise<T | null> {
    try {
      const json = await this.getString(key);
      return json ? (JSON.parse(json) as T) : null;
    } catch (error) {
      this.logRedisError(`Failed to get Object for key "${key}"`, error);
      return null;
    }
  }

  // HASH
  public async setHash(key: string, data: Record<string, string>): Promise<void> {
    await this.connect();
    await this.client.hSet(key, data);
  }

  public async getHash(key: string): Promise<Record<string, string>> {
    await this.connect();
    return await this.client.hGetAll(key);
  }

  public async deleteHashField(key: string, field: string): Promise<void> {
    await this.connect();
    await this.client.hDel(key, field);
  }

  // DELETE
  public async deleteKey(key: string): Promise<void> {
    try {
      await this.connect();
      await this.client.del(key);
    } catch (error) {
      this.logRedisError(`Failed to delete key "${key}"`, error);
    }
  }

  public async disconnect(): Promise<void> {
    if (this.isConnected) {
      await this.client.disconnect();
      this.isConnected = false;
    }
  }

  private logRedisError(message: string, error: unknown): void {
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
