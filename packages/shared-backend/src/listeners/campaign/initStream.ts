import { System } from "@server/services/system";
import { Sockets } from "#app/services/sockets";
import { stream } from "./helpers/stream";

export default Sockets.createListener({
  action: "init",
  callback: async (io) => {
    stream.on(
      "insert",
      System.tryCatch(async (document) => {
        const broadcaster = io.sockets.in("campaign");
        broadcaster.emit("campaign-insert", {
          ...document
        });
      }),
    );  
    stream.on(
      "update",
      System.tryCatch(async (document) => {
        const broadcaster = io.sockets.in("campaign");
        broadcaster.emit("campaign-update", document);
      }),
    );
  },
});
