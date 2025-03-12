import { System } from "@server/services/system";
import { Database } from "@server/services/database";
import { Rewards } from "@server/services/rewards";
import { Sockets } from "#app/services/sockets";

export default Sockets.createListener({
  action: "init",
  callback: async (io) => {
    const stream = Database.createStream({
      collection: "raffles",
      maxLogSize: 0,
    });

    stream.on(
      "update",
      System.tryCatch(async (update) => {
        const raffle = await Rewards.getActiveRaffle();

        if (!raffle || raffle._id !== update.documentId) {
          return;
        }

        delete update.updatedFields.reports;

        const broadcaster = io.sockets.in("holiday");

        broadcaster.emit("holiday-raffle-update", update);
      }),
    );
  },
});
