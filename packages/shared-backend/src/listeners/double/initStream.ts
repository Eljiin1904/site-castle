import { System } from "@server/services/system";
import { Sockets } from "#app/services/sockets";
import { roundStream } from "./helpers/roundStream";
import { ticketStream } from "./helpers/ticketStream";
import { jackPotStream } from "./helpers/jackPotStream";

export default Sockets.createListener({
  action: "init",
  callback: async (io) => {
    roundStream.on(
      "insert",
      System.tryCatch(async (document) => {
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
        const broadcaster = io.sockets.in("double");
        broadcaster.emit("double-round-update", update);
      }),
    );

    ticketStream.on(
      "insert",
      System.tryCatch(async (document) => {
        const broadcaster = io.sockets.in("double");
        broadcaster.emit("double-bet-insert", document);
      }),
    );

    jackPotStream.on(
      "insert",
      System.tryCatch(async (document) => {
        const broadcaster = io.sockets.in("double");
        broadcaster.emit("site-jackpot-insert", {
          currentStreak: document.gameIds.length,
          currentPot: document.potAmount,
        });
      }),
    );

    jackPotStream.on(
      "update",
      System.tryCatch(async (document) => {
        const broadcaster = io.sockets.in("double");
        broadcaster.emit("site-jackpot-update", document);
      }),
    );
  },
});
