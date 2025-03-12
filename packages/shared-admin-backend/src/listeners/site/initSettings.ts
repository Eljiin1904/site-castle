import { System } from "@server/services/system";
import { Site } from "@server/services/site";
import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "init",
  callback: async (io) => {
    Site.settings.on(
      "change",
      System.tryCatch((id, value) => {
        io.emit("site-settings-update", id, value);
      }),
    );
  },
});
