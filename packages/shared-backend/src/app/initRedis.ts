import config from "@server/config";
import redis from "redis";

const { redisUrl } = config;

const redisClient = redis
  .createClient({
    url: redisUrl,
  })
  .on("connect", () => {
    console.log("Redis Connected");
  });

redisClient.on("error", (err) => console.error("Redis Client Error", err));

async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

// -------------------- STRING / OBJECT --------------------

export async function setString(key: string, value: string, ttlSeconds?: number): Promise<void> {
  await connectRedis();
  ttlSeconds ? await redisClient.setEx(key, ttlSeconds, value) : await redisClient.set(key, value);
}

export async function setObject<T>(key: string, obj: T, ttlSeconds?: number): Promise<void> {
  const value = JSON.stringify(obj);
  await setString(key, value, ttlSeconds);
}

export async function getString(key: string): Promise<string | null> {
  await connectRedis();
  return await redisClient.get(key);
}

export async function getObject<T>(key: string): Promise<T | null> {
  const data = await getString(key);
  return data ? (JSON.parse(data) as T) : null;
}

// -------------------- HASH --------------------

export async function setHash(key: string, data: Record<string, string>): Promise<void> {
  await connectRedis();
  await redisClient.hSet(key, data);
}

export async function getHash(key: string): Promise<Record<string, string>> {
  await connectRedis();
  return await redisClient.hGetAll(key);
}

export async function deleteHashField(key: string, field: string): Promise<void> {
  await connectRedis();
  await redisClient.hDel(key, field);
}

// -------------------- DELETE / DISCONNECT --------------------

export async function deleteKey(key: string): Promise<void> {
  await connectRedis();
  await redisClient.del(key);
}

export async function disconnectRedis(): Promise<void> {
  if (redisClient.isOpen) {
    await redisClient.disconnect();
  }
}
