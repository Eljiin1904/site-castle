import { System } from "@server/services/system";
import { Sockets } from "#app/services/sockets";
import { managers } from "./helpers/managers";
import { rainStream } from "./helpers/rainStream";

export default Sockets.createListener({
  action: "init",
  callback: async (io) => {
    for (const manager of managers) {
      manager.on(
        "insert",
        System.tryCatch(async (document) => {
          io.sockets.in(`chat_${manager.channel}`).emit("chat-stream", {
            type: "insert",
            document,
          });
        }),
      );
      manager.on(
        "update",
        System.tryCatch(async (update, document) => {
          io.sockets.in(`chat_${manager.channel}`).emit("chat-stream", {
            type: "update",
            update,
          });
        }),
      );
    }

    rainStream.on(
      "insert",
      System.tryCatch(async (document) => {
        io.sockets.in("chat").emit("chat-rain-stream", {
          type: "insert",
          document,
        });
      }),
    );

    rainStream.on(
      "update",
      System.tryCatch(async (update, document) => {
        io.sockets.in("chat").emit("chat-rain-stream", {
          type: "update",
          update,
        });
      }),
    );
  },
});
