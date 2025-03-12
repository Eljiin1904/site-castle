import { Database } from "@server/services/database";
import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "init",
  callback: async (io) => {
    function watch() {
      const changeStream = Database.collection("case-battles").watch([
        { $match: { operationType: "update" } },
      ]);

      changeStream.on("change", (e) => {
        if (e.operationType !== "update") {
          return;
        }

        const update = e.updateDescription.updatedFields;

        io.sockets
          .in(`case-battle-player_${e.documentKey._id}`)
          .emit("case-battle-player-stream", update);
      });

      changeStream.on("error", (err) => {
        console.error(err.message);
        changeStream.removeAllListeners();
        watch();
      });
    }

    watch();
  },
});
