import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "event",
  key: "mines-leave",
  secure: false,
  callback: async (io, socket) => {
    socket.leave("mines");
  },
});
