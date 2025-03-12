import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "event",
  key: "chat-leave",
  secure: false,
  callback: async (io, socket, channel) => {
    socket.leave("chat");
    socket.leave(`chat_${channel}`);
  },
});
