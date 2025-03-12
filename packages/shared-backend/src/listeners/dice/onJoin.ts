import { Database } from "@server/services/database";
import { Sockets } from "#app/services/sockets";
import { feedManager } from "./helpers/feedManager";

export default Sockets.createListener({
  action: "event",
  key: "dice-join",
  secure: false,
  callback: async (io, socket, userId) => {
    socket.join("dice");

    await feedManager.waitForInit();

    const history = await Database.collection("dice-tickets")
      .find(
        { "user.id": userId },
        {
          projection: {
            _id: 1,
            rollValue: 1,
            targetValue: 1,
            targetKind: 1,
          },
          sort: { timestamp: -1 },
          limit: 5,
        },
      )
      .toArray();

    socket.emit("dice-init", {
      history,
      feed: feedManager.log.map((x) => ({
        _id: x._id,
        user: x.user,
        betAmount: x.betAmount,
        targetValue: x.targetValue,
        targetKind: x.targetKind,
        multiplier: x.multiplier,
        rollValue: x.rollValue,
        won: x.won,
        wonAmount: x.wonAmount,
      })),
    });
  },
});
