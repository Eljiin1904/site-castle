import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Sockets } from "#app/services/sockets";
import { Site } from "#app/services/site";
import { feedManager } from "./helpers/feedManager";
import { SiteBetDocument } from "@core/types/site/SiteBetDocument";

export default Sockets.createListener({
  action: "event",
  key: "bet-feed-join",
  secure: false,
  callback: async (io, socket, scope) => {
    const manager = feedManager();

    let documents;
    if (scope === "all" || scope === "highroller" || scope === "lucky") {
      socket.join(`bet-feed_${scope}`);
      documents = manager.log[scope];
    } else {
      if (!socket.data.isAuthenticated) {
        throw new HandledError("Invalid scope.");
      }

      socket.join(`bet-feed_${scope}-${socket.data.userId}`);

      // Groups Site Bets by Game for the Specified User
      const bets = await manager.getSiteBets(socket.data.userId);

      const results: Record<string, SiteBetDocument[]> = {};
      for (const name of manager.options) {
        results[manager.sanitizeGameName(name)] = [];
      }
      if (bets) {
        for (let bet of bets) {
          results[bet._id] = bet.documents;
        }
      }
      // Retreive all Site Bets for specific user in order
      results["all"] = documents = await Database.collection("site-bets")
        .find(
          { "user.id": socket.data.userId },
          {
            sort: { timestamp: -1 },
            limit: Site.betLogSize,
          },
        )
        .toArray();

      documents = results;
    }

    socket.emit("bet-feed-init", documents);
  },
});
