import { Sockets } from "#app/services/sockets";
import { getStats } from "./helpers/getStats";
import { stream } from "./helpers/stream";
import { trimDocument } from "./helpers/trimDocument";

export default Sockets.createListener({
  action: "event",
  key: "case-battle-index-join",
  secure: false,
  callback: async (io, socket, limit) => {
    socket.join("case-battle-index");

    await stream.waitForInit();

    const documents = stream.log.slice(0, limit).map((x) => trimDocument(x));

    socket.emit("case-battle-index-init", documents);

    const stats = await getStats();

    io.emit("case-battle-index-stats", stats.count, stats.value);
  },
});
