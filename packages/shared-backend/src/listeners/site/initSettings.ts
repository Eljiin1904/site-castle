import { System } from "@server/services/system";
import { Sockets } from "#app/services/sockets";
import { Site } from "#app/services/site";

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
