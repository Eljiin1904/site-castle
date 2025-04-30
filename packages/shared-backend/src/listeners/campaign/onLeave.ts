import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "event",
  key: "campaign-leave",
  secure: false,
  callback: async (io, socket) => {
    socket.leave("campaign");
  },
});
