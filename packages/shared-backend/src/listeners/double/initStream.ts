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
        logger.debug("Double insert round stream");
        const broadcaster = io.sockets.in("double");
        broadcaster.emit("double-round-insert", {
          ...document,
          serverSeed: "",
        });
      }),
    );

    roundStream.on(
      "update",
      System.tryCatch(async (update) => {
        logger.debug("Double update round stream");
        const broadcaster = io.sockets.in("double");
        broadcaster.emit("double-round-update", update);
      }),
    );

    ticketStream.on(
      "insert",
      System.tryCatch(async (document) => {
        logger.debug("Double insert ticket stream");
        const broadcaster = io.sockets.in("double");
        broadcaster.emit("double-bet-insert", document);
      }),
    );
  },
});
