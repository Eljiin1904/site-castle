import { HandledError } from "@server/services/errors";
import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "event",
  key: "bet-feed-leave",
  secure: false,
  callback: async (io, socket, scope) => {
    if (scope === "all") {
      socket.leave(`bet-feed_${scope}`);
    } else if (scope === "highroller") {
      socket.leave(`bet-feed_${scope}`);
    } else if (scope === "user") {
      if (!socket.data.isAuthenticated) {
        throw new HandledError("Invalid scope.");
      }
      socket.leave(`bet-feed_${scope}-${socket.data.userId}`);
    }
  },
});
