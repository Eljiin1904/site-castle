import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "event",
  key: "crash-leave",
  secure: false,
  callback: async (io, socket) => {
    socket.leave("crash");
  },
});
