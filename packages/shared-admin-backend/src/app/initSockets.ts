import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import config from "#app/config";
import * as Listeners from "#app/listeners";
import { Sockets } from "#app/services/sockets";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";

const logger = getServerLogger({});
export function initSockets(httpServer: HttpServer) {
  const { adminURL } = config;

  const io = new SocketServer(httpServer, {
    cors: {
      origin: adminURL,
      credentials: true,
    },
    transports: ["websocket"],
  });

  io.setMaxListeners(32);

  io.use(Sockets.ipHandler);

  io.use(
    Sockets.rateLimitHandler({
      keyPrefix: "admin-socket-packets",
    }),
  );

  io.use(
    Sockets.sessionHandler({
      collection: "admin-sessions",
    }),
  );
  // TODO Make Fallback if can not connect to redis
  // io.use(Sockets.sessionHandler({ sessionType: "admin" }));

  // Listeners.site(io);

  // Global connection handler
  io.on("connection", (socket) => {
    logger.info(`Socket connected`);

    // Handle unexpected errors in socket lifecycle
    socket.on("error", (err) => {
      logger.error(`Socket error from ${socket.id}: ${err} `);
    });

    socket.on("disconnect", (reason) => {
      logger.warn(`Socket ${socket.id} disconnected. Reason: ${reason}`);
    });

    try {
      // Register other socket listeners
      Listeners.site(io);
    } catch (err) {
      console.error(`Error during socket initialization:`, err);
      socket.disconnect(true); // force disconnect on fatal error
    }
  });

  return io;
}
