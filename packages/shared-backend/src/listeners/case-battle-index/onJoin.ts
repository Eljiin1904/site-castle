import { Database } from "@server/services/database";
import { Sockets } from "#app/services/sockets";
import { stream } from "./helpers/stream";
import { trimDocument } from "./helpers/trimDocument";
import { buildBattleIndexAggregate } from "./helpers/buildBattleIndexAggregate";
import { CaseBattleDocument } from "@core/types/case-battles/CaseBattleDocument";

export default Sockets.createListener({
  action: "event",
  key: "case-battle-index-join",
  secure: false,
  callback: async (io, socket, limit) => {
    await stream.waitForInit();

    let user;
    let isAdmin = false;

    if (socket.data.isAuthenticated) {
      user = await Database.collection("users").findOne({
        _id: socket.data.userId,
      });

      if (user) {
        isAdmin = user.role === "admin" || user.role === "owner" || user.role === "developer";
      }
    }
    let aggregate;

    if (isAdmin) {
      socket.join("case-battle-index-admin");
      aggregate = buildBattleIndexAggregate({ admin: true, limit });
    } else {
      if (user) {
        aggregate = buildBattleIndexAggregate({ user, limit });
        socket.join(`case-battle-index_user-${socket.data.userId}`); // will only emit for private when the user is in the battle
        socket.join("case-battle-index"); // also join for public updates
      } else {
        aggregate = buildBattleIndexAggregate({ limit });
        socket.join("case-battle-index");
      }
    }

    const documents: CaseBattleDocument[] = (
      await Database.collection("case-battles").aggregate(aggregate).toArray()
    ).map((doc) => trimDocument(doc as CaseBattleDocument));

    socket.emit("case-battle-index-init", documents);
  },
});
