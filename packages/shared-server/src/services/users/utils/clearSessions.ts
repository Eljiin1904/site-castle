import { UserDocument } from "@core/types/users/UserDocument";
import { Database } from "#server/services/database";
import { RedisService } from "#server/services/redis/RedisService";

const SESSION_PREFIX = "user-sessions:";
export async function clearSessions(user: UserDocument, excludeSessionId?: string) {
  const client = RedisService.client;
  let deletedCount = 0;

  if (RedisService.connected) {
    try {
      const keys = await client.keys(`${SESSION_PREFIX}*`);

      for (const key of keys) {
        const sessionRaw = await client.get(key);
        if (!sessionRaw) continue;

        try {
          const session = JSON.parse(sessionRaw);
          const sessionUserId = session?.passport?.user;

          const sessionId = key.replace(SESSION_PREFIX, "");

          if (sessionUserId === user._id.toString() && sessionId !== excludeSessionId) {
            await client.del(key);
            deletedCount++;
          }
        } catch (err) {
          console.warn(`Failed to parse session ${key}`, err);
        }
      }

      return { deletedCount };
    } catch (err) {
      console.error("Redis error while clearing sessions, falling back to MongoDB:", err);
    }
  }

  // Fallback to MongoDB
  const { deletedCount: mongoDeleted } = await Database.collection("user-sessions").deleteMany({
    _id: excludeSessionId ? { $ne: excludeSessionId } : { $exists: true },
    session: { $regex: user._id.toString() },
  });

  return { deletedCount: mongoDeleted };
}
