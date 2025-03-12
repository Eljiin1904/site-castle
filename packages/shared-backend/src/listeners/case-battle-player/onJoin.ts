import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "event",
  key: "case-battle-player-join",
  secure: false,
  callback: async (io, socket, battleId) => {
    socket.join(`case-battle-player_${battleId}`);

    const battle = await Database.collection("case-battles").findOne({
      _id: battleId,
    });

    if (!battle) {
      throw new HandledError("Invalid battle id.");
    }

    if (battle.status !== "completed") {
      battle.serverSeed = "";
    }

    socket.emit("case-battle-player-init", battle);
  },
});
