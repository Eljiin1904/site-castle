import { Chat } from "@server/services/chat";
import { HandledError } from "@server/services/errors";
import { Sockets } from "#app/services/sockets";
import { managers } from "./helpers/managers";
import { rainStream } from "./helpers/rainStream";

export default Sockets.createListener({
  action: "event",
  key: "chat-join",
  secure: false,
  callback: async (io, socket, channel) => {
    if (!Chat.channels.includes(channel)) {
      throw new HandledError("Invalid channel.");
    }

    socket.join("chat");
    socket.join(`chat_${channel}`);

    const manager = managers.find((x) => x.channel === channel);

    if (manager) {
      await manager.waitForInit();

      socket.emit("chat-stream", {
        type: "initialize",
        documents: manager.log,
      });
    }

    await rainStream.waitForInit();

    socket.emit("chat-rain-stream", {
      type: "initialize",
      documents: rainStream.log,
    });
  },
});
