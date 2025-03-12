import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "event",
  key: "activity-feed-leave",
  secure: false,
  callback: async (io, socket) => {
    socket.join("activity-feed");
  },
});
