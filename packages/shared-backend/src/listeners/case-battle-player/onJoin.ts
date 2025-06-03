import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "event",
  key: "case-battle-player-join",
  secure: false,
  callback: async (io, socket, battleId) => {
    const userId = socket.data.userId as string | undefined;

    socket.join(`case-battle-player_${battleId}`);

    const battle = await Database.collection("case-battles").findOne({
      _id: battleId,
    });

    if (!battle) {
      throw new HandledError("Invalid battle id.");
    }

    if (battle.status !== "completed") {
      battle.serverSeed = ""; // Hide from front-end
    }

    const socketIsBattleHost = userId === battle.players?.[0]?.id;

    if (userId && !battle.viewers.includes(userId) && !socketIsBattleHost) {
      battle.viewers.push(userId);

      await Database.collection("case-battles").updateOne(
        { _id: battleId },
        { $set: { viewers: battle.viewers } },
      );
    }

    const isPrivateOrFriendsOnly =
      battle.modifiers.includes("private") || battle.modifiers.includes("friends-only");

    if (isPrivateOrFriendsOnly && !socketIsBattleHost) {
      battle.joinKey = ""; // Hide from front-end
    }

    socket.emit("case-battle-player-init", battle);
  },
});
