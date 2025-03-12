import { Site } from "@server/services/site";
import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "connection",
  callback: async (io, socket) => {
    const settings = await Site.settings.cache();

    socket.emit("site-settings-init", settings);

    const meta = await Site.meta.cache();

    socket.emit("site-meta-init", meta);
  },
});
