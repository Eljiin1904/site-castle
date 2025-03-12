import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import * as Listeners from "#app/listeners";
import { Sockets } from "#app/services/sockets";

export function initSockets(httpServer: HttpServer) {
  const io = new SocketServer(httpServer, {
    transports: ["websocket"],
  });

  io.setMaxListeners(32);

  io.use(Sockets.ipHandler);

  io.use(
    Sockets.rateLimitHandler({
      keyPrefix: "site-socket-packets",
    }),
  );

  io.use(
    Sockets.sessionHandler({
      collection: "user-sessions",
    }),
  );

  Listeners.activityFeed(io);
  Listeners.betFeed(io);
  Listeners.caseBattleIndex(io);
  Listeners.caseBattlePlayer(io);
  Listeners.chat(io);
  Listeners.chestDrops(io);
  Listeners.dice(io);
  Listeners.double(io);
  Listeners.holiday(io);
  Listeners.limbo(io);
  Listeners.notifications(io);
  Listeners.site(io);
  Listeners.users(io);

  return io;
}
