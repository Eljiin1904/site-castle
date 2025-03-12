import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "event",
  key: "chest-drops-leave",
  secure: false,
  callback: async (io, socket, chestId) => {
    socket.leave(`chest-drop_${chestId}`);
  },
});
