import { Sockets } from "#app/services/sockets";
import { feedManager } from "./helpers/feedManager";

export default Sockets.createListener({
  action: "init",
  callback: async (io) => {
    const manager = feedManager();

    manager.on("update", (documents) => {
      const broadcaster = io.sockets.in(`hot-feed_all`);
      broadcaster.emit("hot-feed-update", documents);
    });
  },
});
