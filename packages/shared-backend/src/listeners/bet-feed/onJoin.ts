import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Sockets } from "#app/services/sockets";
import { Site } from "#app/services/site";
import { feedManager } from "./helpers/feedManager";

export default Sockets.createListener({
  action: "event",
  key: "bet-feed-join",
  secure: false,
  callback: async (io, socket, scope) => {
    const manager = feedManager();

    let documents;

    if (scope === "all" || scope === "highroller") {
      socket.join(`bet-feed_${scope}`);
      documents = manager.log[scope];
    } else {
      if (!socket.data.isAuthenticated) {
        throw new HandledError("Invalid scope.");
      }

      socket.join(`bet-feed_${scope}-${socket.data.userId}`);

      documents = await Database.collection("site-bets")
        .find(
          { "user.id": socket.data.userId },
          {
            sort: { timestamp: -1 },
            limit: Site.betLogSize,
          },
        )
        .toArray();
    }

    socket.emit("bet-feed-init", documents);
  },
});
