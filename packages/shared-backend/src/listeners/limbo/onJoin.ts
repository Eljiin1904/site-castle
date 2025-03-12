import { Database } from "@server/services/database";
import { Sockets } from "#app/services/sockets";
import { feedManager } from "./helpers/feedManager";

export default Sockets.createListener({
  action: "event",
  key: "limbo-join",
  secure: false,
  callback: async (io, socket, userId) => {
    socket.join("limbo");

    await feedManager.waitForInit();

    const history = await Database.collection("limbo-tickets")
      .find(
        { "user.id": userId },
        {
          projection: {
            _id: 1,
            targetValue: 1,
            rollValue: 1,
            rollMultiplier: 1,
          },
          sort: { timestamp: -1 },
          limit: 5,
        },
      )
      .toArray();

    socket.emit("limbo-init", {
      history,
      feed: feedManager.log.map((x) => ({
        _id: x._id,
        user: x.user,
        betAmount: x.betAmount,
        targetValue: x.targetValue,
        multiplier: x.multiplier,
        rollValue: x.rollValue,
        rollMultiplier: x.rollMultiplier,
        won: x.won,
        wonAmount: x.wonAmount,
      })),
    });
  },
});
