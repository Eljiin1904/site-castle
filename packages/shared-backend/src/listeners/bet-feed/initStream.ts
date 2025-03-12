import { Sockets } from "#app/services/sockets";
import { feedManager } from "./helpers/feedManager";

export default Sockets.createListener({
  action: "init",
  callback: async (io) => {
    const manager = feedManager();

    manager.on("insert", (scope, document) => {
      let broadcaster;

      if (scope === "all") {
        broadcaster = io.sockets.in(`bet-feed_${scope}`);
      } else if (scope === "highroller") {
        broadcaster = io.sockets.in(`bet-feed_${scope}`);
      } else {
        broadcaster = io.sockets.in(`bet-feed_${scope}-${document.user.id}`);
      }

      broadcaster.emit("bet-feed-insert", document);
    });
  },
});
