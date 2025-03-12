import { System } from "@server/services/system";
import { Site } from "@server/services/site";
import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "init",
  callback: async (io) => {
    Site.meta.on(
      "change",
      System.tryCatch((id, value) => {
        io.emit("site-meta-update", id, value);
      }),
    );
  },
});
