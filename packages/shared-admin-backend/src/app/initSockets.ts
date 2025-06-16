import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import config from "#app/config";
import * as Listeners from "#app/listeners";
import { Sockets } from "#app/services/sockets";

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

  io.use(Sockets.sessionHandler({ sessionType: "admin" }));

  Listeners.site(io);

  return io;
}
