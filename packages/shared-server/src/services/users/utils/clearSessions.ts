// import { UserDocument } from "@core/types/users/UserDocument";
// import config from "../../../config";
// import { RedisService } from "../../redis";

// const SESSION_PREFIX = "user-sess:";
// const { redisUrl } = config;
// export async function clearSessions(user: UserDocument, excludeSessionId?: string) {
//   const redisService = new RedisService(redisUrl);
//   const client = await redisService.getClient();

//   const keys = await client.keys(`${SESSION_PREFIX}*`);
//   let deletedCount = 0;

//   for (const key of keys) {
//     const sessionRaw = await client.get(key);
//     if (!sessionRaw) continue;

//     try {
//       const session = JSON.parse(sessionRaw);
//       const sessionUserId = session?.user?.id || session?.userId;

//       const sessionId = key.replace(SESSION_PREFIX, "");

//       if (sessionUserId === user._id && sessionId !== excludeSessionId) {
//         await client.del(key);
//         deletedCount++;
//       }
//     } catch (err) {
//       console.warn(`Failed to parse session ${key}`, err);
//     }
//   }

//   return { deletedCount };
// }

import { UserDocument } from "@core/types/users/UserDocument";
import { Database } from "#server/services/database";

export async function clearSessions(user: UserDocument, excludeSessionId?: string) {
  const { deletedCount } = await Database.collection("user-sessions").deleteMany({
    _id: { $ne: excludeSessionId },
    session: { $regex: user._id },
  });

  return { deletedCount };
}
