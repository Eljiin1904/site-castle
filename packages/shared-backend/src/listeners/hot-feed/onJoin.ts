import { Sockets } from "#app/services/sockets";
import { feedManager } from "./helpers/feedManager";

export default Sockets.createListener({
  action: "event",
  key: "hot-feed-join",
  secure: false,
  callback: async (io, socket) => {
    let documents;

    const manager = feedManager();

    socket.join(`hot-feed_all`);
    documents = manager.log["hot"];

    socket.emit("hot-feed-init", documents);
  },
});
