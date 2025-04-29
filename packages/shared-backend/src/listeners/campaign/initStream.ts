import { System } from "@server/services/system";
import { Sockets } from "#app/services/sockets";
import { feedManager } from "./helpers/feedManager";

export default Sockets.createListener({
  action: "init",
  callback: async (io) => {
    feedManager.on(
      "insert",
      System.tryCatch(async (document) => {
        const broadcaster = io.sockets.in("campaign");
        broadcaster.emit("campaign-insert", {
          ...document
        });
      }),
    );
  },
});
