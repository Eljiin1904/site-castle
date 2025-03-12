import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "event",
  key: "case-battle-index-leave",
  secure: false,
  callback: async (io, socket) => {
    socket.leave("case-battle-index");
  },
});
