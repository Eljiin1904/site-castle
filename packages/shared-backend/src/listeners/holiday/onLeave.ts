import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "event",
  key: "holiday-leave",
  secure: false,
  callback: async (io, socket) => {
    socket.leave("holiday");
  },
});
