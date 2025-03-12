import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "event",
  key: "dice-leave",
  secure: false,
  callback: async (io, socket) => {
    socket.leave("dice");
  },
});
