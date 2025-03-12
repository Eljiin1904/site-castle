import { System } from "@server/services/system";
import { Sockets } from "#app/services/sockets";
import { getStats } from "./helpers/getStats";

export default Sockets.createListener({
  action: "init",
  callback: async (io) => {
    const updateStats = async () => {
      const stats = await getStats();
      io.emit("case-battle-index-stats", stats.count, stats.value);
    };
    setInterval(System.tryCatch(updateStats), 1000);
  },
});
