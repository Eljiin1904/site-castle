import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "event",
  key: "double-leave",
  secure: false,
  callback: async (io, socket) => {
    socket.leave("double");
  },
});
