import { System } from "@server/services/system";
import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "init",
  callback: async (io) => {
    const updateTime = async () => {
      io.emit("site-time", Date.now());
    };

    setInterval(System.tryCatch(updateTime), 5000);
  },
});
