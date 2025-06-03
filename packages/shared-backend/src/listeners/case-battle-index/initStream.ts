import { Sockets } from "#app/services/sockets";
import { trimDocument } from "./helpers/trimDocument";
import { System } from "@server/services/system";
import { stream } from "./helpers/stream";

export default Sockets.createListener({
  action: "init",
  callback: async (io) => {
    stream.on(
      "insert",
      System.tryCatch(async (document) => {
        if (!document) {
          return;
        }

        const audience = "case-battle-index-insert";

        let adminBroacaster = io.sockets.in("case-battle-index-admin");
        const publicBroadcaster = io.sockets.in("case-battle-index");

        const isPrivate = document.modifiers.includes("private");

        adminBroacaster.emit(audience, trimDocument(document));

        if (isPrivate) {
          for (const player of document.players) {
            if (player) {
              const userBroadcaster = io.sockets.in(`case-battle-index_user-${player.id}`);
              userBroadcaster.emit(audience, trimDocument(document));
            }
          }
        } else {
          publicBroadcaster.emit(audience, trimDocument(document));
        }
      }),
    );

    stream.on(
      "update",
      System.tryCatch(async (update, document) => {
        if (!document) {
          return;
        }

        const audience = "case-battle-index-update";

        let adminBroacaster = io.sockets.in("case-battle-index-admin");
        const publicBroadcaster = io.sockets.in("case-battle-index");

        const isPrivate = document.modifiers.includes("private");

        adminBroacaster.emit(audience, update);

        if (isPrivate) {
          for (const player of document.players) {
            if (player) {
              const userBroadcaster = io.sockets.in(`case-battle-index_user-${player.id}`);
              userBroadcaster.emit(audience, update);
            }
          }
        } else {
          publicBroadcaster.emit(audience, update);
        }
      }),
    );
  },
});
