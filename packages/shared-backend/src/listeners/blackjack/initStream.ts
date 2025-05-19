import { System } from "#server/services/system";
import { Sockets } from "#app/services/sockets";
import { feedManager } from "./helpers/feedManager";
import { maskHiddenUser } from "#server/services/blackjack/Blackjack";

export default Sockets.createListener({
  action: "init",
  callback: async (io) => {
    feedManager.on(
      "insert",
      System.tryCatch(async (document) => {
        // TODO move onto game-server blackjack.ts delay
        io.sockets.in("blackjack").emit("blackjack-insert", {
          ...document,
          user: maskHiddenUser(document.user),
          userId: null,
        });
        io.sockets.in("blackjack-admin").emit("blackjack-insert", {
          ...document,
          user: maskHiddenUser(document.user, { mask: false }),
          userId: null,
        });
      }),
    );
  },
});
