import { Sockets } from "#app/services/sockets";
import { getManager } from "./helpers/feedManagers";

export default Sockets.createListener({
  action: "event",
  key: "chest-drops-join",
  secure: false,
  callback: async (io, socket, chestId) => {
    socket.join(`chest-drop_${chestId}`);

    const manager = getManager(io, chestId);

    await manager.waitForInit();

    socket.emit("chest-drops-stream", {
      type: "initialize",
      documents: manager.log,
    });
  },
});
