import { System } from "@server/services/system";
import { Sockets } from "#app/services/sockets";
import { Site } from "#app/services/site";

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
