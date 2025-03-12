import { Sockets } from "#app/services/sockets";
import { feedManager } from "./helpers/feedManager";

export default Sockets.createListener({
  action: "init",
  callback: async (io) => {
    const manager = feedManager();

    manager.on("insert", (x) =>
      io.sockets.in("activity-feed").emit("activity-feed-insert", x),
    );
  },
});
