import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "event",
  key: "hot-feed-leave",
  secure: false,
  callback: async (io, socket) => {
    socket.leave(`hot-feed_all`);
  },
});
