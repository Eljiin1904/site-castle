import { Sockets } from "#app/services/sockets";
import { feedManager } from "./helpers/feedManager";

export default Sockets.createListener({
  action: "event",
  key: "activity-feed-join",
  secure: false,
  callback: async (io, socket) => {
    socket.join("activity-feed");

    const manager = feedManager();

    await manager.waitForInit();

    socket.emit("activity-feed-init", manager.log);
  },
});
