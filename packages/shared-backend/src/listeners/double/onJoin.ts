import { DoubleRoundDocument } from "@core/types/double/DoubleRoundDocument";
import { Sockets } from "#app/services/sockets";
import { roundStream } from "./helpers/roundStream";
import { ticketStream } from "./helpers/ticketStream";
import { Database } from "@server/services/database";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";

const logger = getServerLogger({});

export default Sockets.createListener({
  action: "event",
  key: "double-join",
  secure: false,
  callback: async (io, socket) => {
    logger.info("creating double listener");
    socket.join("double");

    try {
      logger.info("attaching to database round and ticket streams");
      await roundStream.waitForInit();
      await ticketStream.waitForInit();
      logger.info("database round and ticket streams attached");
    } catch (err) {
      logger.error("error attaching to Double round and ticket mongo streams: " + err);
    }

    const activeRound = roundStream.log[0];
    const existing = await Database.collection("site-jackpot").findOne({
      status: { $eq: "pending" },
      game: { $eq: "double" },
    });

    socket.emit("double-init", {
      round: {
        ...activeRound,
        serverSeed: "",
      },
      history: roundStream.log.slice(1).map((x) => {
        logger.debug("double round completed");
        const round = x as DoubleRoundDocument & { status: "completed" };
        return round.roll;
      }),
      tickets: ticketStream.log.filter((x) => x.roundId === activeRound._id),
      jackpot: {
        currentPot: existing ? existing.potAmount : 0,
        currentStreak: existing ? existing.gameIds.length : 0,
      },
    });
  },
});
