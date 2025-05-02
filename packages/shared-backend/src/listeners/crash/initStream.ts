import { System } from "@server/services/system";
import { Sockets } from "#app/services/sockets";
import { roundStream } from "./helpers/roundStream";
import { ticketStream } from "./helpers/ticketStream";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
const logger = getServerLogger({});

export default Sockets.createListener({
  action: "init",
  callback: async (io) => {
    roundStream.on(
      "insert",
      System.tryCatch(async (document) => {
        logger.debug("Crash insert round stream");
        console.log("Crash insert round stream");
        const broadcaster = io.sockets.in("crash");
        broadcaster.emit("crash-round-insert", {
          ...document,
          serverSeed: "",
        });
      }),
    );

    roundStream.on(
      "update",
      System.tryCatch(async (update) => {
        logger.debug("Crash update round stream");
        console.log("Crash update round stream");
        const broadcaster = io.sockets.in("crash");
        broadcaster.emit("crash-round-update", update);
      }),
    );

    ticketStream.on(
      "insert",
      System.tryCatch(async (document) => {
        logger.debug("Crash insert ticket stream");
        console.log("Crash insert ticket stream");
        const broadcaster = io.sockets.in("crash");
        broadcaster.emit("crash-bet-insert", document);
      }),
    );
  },
});
