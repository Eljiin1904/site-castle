import { Sockets } from "#app/services/sockets";
import { System } from "@server/services/system";
import { stream } from "./helpers/stream";
import { trimDocument } from "./helpers/trimDocument";

export default Sockets.createListener({
  action: "init",
  callback: async (io) => {
    stream.on(
      "insert",
      System.tryCatch(async (document) => {
        const broadcaster = io.sockets.in("case-battle-index");
        broadcaster.emit("case-battle-index-insert", trimDocument(document));
      }),
    );

    stream.on(
      "update",
      System.tryCatch(async (update) => {
        const broadcaster = io.sockets.in("case-battle-index");
        broadcaster.emit("case-battle-index-update", update);
      }),
    );
  },
});
