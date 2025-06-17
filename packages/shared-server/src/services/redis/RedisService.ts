// RedisService.ts
import { createClient, RedisClientType } from "redis";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";

const logger = getServerLogger({});
export class RedisService {
  private client: RedisClientType;
  private isConnected = false;

  constructor(redisUrl: string = "redis://localhost:6379") {
    this.client = createClient({ url: redisUrl });

    this.client.on("connect", (err) => {
      logger.info("Redis Client Connected");
    });
    this.client.on("error", (err) => {
      logger.error(`Redis Client Error  ${err}`);
    });
  }

  private async connect(): Promise<void> {
    if (!this.isConnected) {
      await this.client.connect();
      this.isConnected = true;
    }
  }

  // Ability to retrive Raw Client
  public async getClient(): Promise<RedisClientType> {
    await this.connect();
    return this.client;
  }

  // STRING / OBJECT
  public async setString(key: string, value: string, ttlSeconds?: number): Promise<void> {
    await this.connect();
    ttlSeconds
      ? await this.client.setEx(key, ttlSeconds, value)
      : await this.client.set(key, value);
  }

  public async getString(key: string): Promise<string | null> {
    await this.connect();
    return await this.client.get(key);
  }

  public async setObject<T>(key: string, obj: T, ttlSeconds?: number): Promise<void> {
    const json = JSON.stringify(obj);
    await this.setString(key, json, ttlSeconds);
  }

  public async getObject<T>(key: string): Promise<T | null> {
    const json = await this.getString(key);
    return json ? (JSON.parse(json) as T) : null;
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
    await this.connect();
    await this.client.del(key);
  }

  public async disconnect(): Promise<void> {
    if (this.isConnected) {
      await this.client.disconnect();
      this.isConnected = false;
    }
  }
}
