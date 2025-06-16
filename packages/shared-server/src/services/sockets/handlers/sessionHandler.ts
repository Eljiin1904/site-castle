import cookieParser from "cookie-parser";
import cookie from "cookie";
import { BaseSocket } from "#server/types/sockets/BaseSocket";
import { Database } from "#server/services/database";
import config from "#server/config";
import { createHandler } from "../utils/createHandler";
import { RedisService } from "../../redis";

const { redisUrl } = config;
export const sessionHandler = ({ sessionType }: { sessionType: "admin" | "user" }) => {
  return createHandler(async (socket, next) => {
    const session = await getSession({ socket, sessionType });

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

export async function getSession({
  socket,
  sessionType,
}: {
  socket: BaseSocket;
  sessionType: "admin" | "user";
}) {
  const prefix = sessionType === "admin" ? "admin-sess" : "user-sess";
  const redisService = new RedisService(redisUrl);
  const client = await redisService.getClient();

  const raw = socket.request.headers.cookie;
  if (!raw) return;

  const parsed = cookie.parse(raw);
  const signed = parsed["connect.sid"];
  if (!signed) return;

  const sid = cookieParser.signedCookie(signed, config.sessionSecret);
  if (!sid) return;

  const sessionKey = `${prefix}:${sid}`;
  const rawSession = await client.get(sessionKey);
  if (!rawSession) return;

  try {
    const sessionData = JSON.parse(rawSession);
    const userId: string | undefined = sessionData?.passport?.user;

    if (userId) {
      return { sid, userId };
    }
  } catch (err) {
    console.warn(`Failed to parse Redis session: ${sessionKey}`, err);
  }

  return;
}
