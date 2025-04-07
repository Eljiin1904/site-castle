import { Database } from "@server/services/database";
import { Mines } from "@server/services/mines";
import { Sockets } from "#app/services/sockets";
import { feedManager } from "./helpers/feedManager";

export default Sockets.createListener({
  action: "event",
  key: "mines-join",
  secure: false,
  callback: async (io, socket) => {
    socket.join("mines");

    let game;

    if (socket.data.isAuthenticated) {
      game = await Database.collection("mines-games").findOne({
        "user.id": socket.data.userId,
        completed: { $exists: false },
      });
    }

    await feedManager.waitForInit();

    socket.emit("mines-init", {
      game: game ? Mines.getGameState(game) : undefined,
      feed: feedManager.log.slice(),
    });
  },
});
