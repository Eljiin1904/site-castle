import { get, Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import * as Listeners from "#app/listeners";
import { Sockets } from "#app/services/sockets";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";

export function initSockets(httpServer: HttpServer) {
  const logger = getServerLogger({});
  logger.info("initiating sockets");
  const io = new SocketServer(httpServer, {
    transports: ["websocket"],
  });
  logger.info("socker server initated");

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

  try {
    Listeners.activityFeed(io);
    logger.info("activity feed socket active");
    Listeners.betFeed(io);
    logger.info("bet feed socket active");
    Listeners.caseBattleIndex(io);
    logger.info("case battle index socket active");
    Listeners.caseBattlePlayer(io);
    logger.info("case battle player socket active");
    Listeners.chat(io);
    logger.info("chat socket active");
    Listeners.chestDrops(io);
    logger.info("chest drops socket active");
    Listeners.dice(io);
    logger.info("dice socket active");
    Listeners.double(io);
    logger.info("double socket active");
    Listeners.crash(io);
    logger.info("crash socket active");
    Listeners.holiday(io);
    logger.info("holiday socket active");
    Listeners.hotFeed(io);
    logger.info("hot feed socket active");
    Listeners.limbo(io);
    logger.info("limbo socket active");
    Listeners.mines(io);
    logger.info("mines socket active");
    Listeners.blackjack(io);
    logger.info("blackjack socket active");
    Listeners.notifications(io);
    logger.info("notifications socket active");
    Listeners.site(io);
    logger.info("site socket active");
    Listeners.users(io);
    logger.info("users socket active");
    Listeners.campaign(io);
    logger.info("campaign socket active");
  } catch (err) {
    logger.error("error initiating sockets: " + err);
  }

  return io;
}
