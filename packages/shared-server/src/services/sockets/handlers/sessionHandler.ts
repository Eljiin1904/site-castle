import cookieParser from "cookie-parser";
import cookie from "cookie";
import { BaseSocket } from "#server/types/sockets/BaseSocket";
import { Database } from "#server/services/database";
import config from "#server/config";
import { createHandler } from "../utils/createHandler";
import { RedisService } from "#server/services/redis/RedisService";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";

const logger = getServerLogger({});
export const sessionHandler = ({
  collection,
}: {
  collection: "admin-sessions" | "user-sessions";
}) => {
  return createHandler(async (socket, next) => {
    const session = await getSession({ socket, collection });

    if (session) {
      socket.data.isAuthenticated = true;
      socket.data.userId = session.userId;

      socket.join(`session-${session.sid}`);
      socket.join(`user-${session.userId}`);
    } else {
      socket.data.isAuthenticated = false;
    }

    next();
  });
};

async function getSession({
  socket,
  collection,
}: {
  socket: BaseSocket;
  collection: "admin-sessions" | "user-sessions";
}) {
  const raw = socket.request.headers.cookie;

  if (!raw) {
    return;
  }

  const parsed = cookie.parse(raw);
  const signed = parsed["connect.sid"];

  if (!signed) {
    return;
  }

  const sid = cookieParser.signedCookie(signed, config.sessionSecret);
  if (!sid) return;

  // Check if Redis is connected first
  if (RedisService.connected) {
    try {
      const redisKey = `${collection === "user-sessions" ? "user-sessions:" : "admin-sessions:"}${sid}`;
      const redisSession = await RedisService.getString(redisKey);

      if (redisSession) {
        const data = JSON.parse(redisSession);
        const userId: string | undefined = data?.passport?.user;

        if (userId) {
          return { sid, userId };
        }
      }
    } catch (err) {
      logger.error("Redis lookup failed, falling back to MongoDB");
    }
  }

  // Fallback to MongoDB
  try {
    const document = await Database.collection(collection).findOne({ _id: sid });

    if (!document) return;

    const data = JSON.parse(document.session);
    const userId: string | undefined = data?.passport?.user;

    if (userId) {
      return { sid, userId };
    }
  } catch (err) {
    logger.error(`MongoDB session fetch failed: ${err}`);
  }
}
