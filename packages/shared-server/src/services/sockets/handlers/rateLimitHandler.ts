import { Security } from "#server/services/security";
import { createHandler } from "../utils/createHandler";

export const rateLimitHandler = ({ keyPrefix }: { keyPrefix: string }) => {
  const rateLimiter = Security.createRateLimiter({
    keyPrefix,
    points: 60,
    durationSeconds: 15,
    errorMessage: "Too many packets.",
  });

  return createHandler(async (socket, next) => {
    (socket.conn.transport as any).socket?.on("ping", () => {
      // there is no legitimate reason for a client to initiate a ping
      // it should always be: server.ping() <=> client.pong()
      socket.disconnect(true);
    });

    socket.conn.on("packet", async (packet) => {
      try {
        await rateLimiter.consume(socket.data.ip, 1);
      } catch (err) {
        socket.disconnect(true);
        return;
      }
    });

    next();
  });
};
