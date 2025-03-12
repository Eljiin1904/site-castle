import { System } from "@server/services/system";
import { Database } from "@server/services/database";
import { Sockets } from "#app/services/sockets";
import { stream } from "./helpers/stream";

export default Sockets.createListener({
  action: "init",
  callback: async (io) => {
    stream.on(
      "insert",
      System.tryCatch(async (document) => {
        io.sockets
          .in(`user-${document.userId}`)
          .emit("notifications-insert", document);
      }),
    );

    stream.on(
      "update",
      System.tryCatch(async (update) => {
        const notification = await Database.collection("notifications").findOne(
          { _id: update.documentId },
          { projection: { userId: 1 } },
        );

        if (!notification) {
          return;
        }

        io.sockets
          .in(`user-${notification.userId}`)
          .emit("notifications-update", update);
      }),
    );

    stream.on(
      "delete",
      System.tryCatch(async (documentId) => {
        const notification = await Database.collection("notifications").findOne(
          { _id: documentId },
          { projection: { userId: 1 } },
        );

        if (!notification) {
          return;
        }

        io.sockets
          .in(`user-${notification.userId}`)
          .emit("notifications-delete", documentId);
      }),
    );
  },
});
