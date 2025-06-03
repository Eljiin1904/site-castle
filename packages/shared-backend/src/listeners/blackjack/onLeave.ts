import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "event",
  key: "blackjack-leave",
  secure: false,
  callback: async (io, socket) => {
    socket.leave("blackjack");
    socket.leave("blackjack-admin");
  },
});
