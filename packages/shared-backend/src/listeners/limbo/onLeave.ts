import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "event",
  key: "limbo-leave",
  secure: false,
  callback: async (io, socket) => {
    socket.leave("limbo");
  },
});
