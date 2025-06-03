import { Sockets } from "#app/services/sockets";
import { multiplierStream } from "./helpers/multiplierStream";
import { roundStream } from "./helpers/roundStream";
import { ticketStream } from "./helpers/ticketStream";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { CrashRoundDocument } from "@core/types/crash/CrashRoundDocument";

const logger = getServerLogger({});

export default Sockets.createListener({
  action: "event",
  key: "crash-join",
  secure: false,
  callback: async (io, socket) => {
    logger.info("creating crash listener");
    socket.join("crash");
    socket.join(`crash_${socket.data.userId}`);
    
    try {
      logger.info("attaching to database round and ticket streams");
      await roundStream.waitForInit();
      await ticketStream.waitForInit();
      await multiplierStream.waitForInit();
      logger.info("database round and ticket streams attached");
    } catch (err) {
      logger.error("error attaching to Crash round and ticket mongo streams: " + err);
    }

    const activeRound = roundStream.log[0];
    // const userId = socket.data.userId;
    const activeMultiplier =  multiplierStream.log[0];
    
    socket.emit("crash-init", {
      round: {
        ...activeRound,
      },
      history: roundStream.log.slice(1).map((x) => {
        logger.debug("crash round completed");
        const round = x as CrashRoundDocument & { status: "completed" };
        return {multiplier: round.multiplier, won: round.won ?? false};
      }),
      tickets: ticketStream.log.filter((x) => x.roundId === activeRound._id),
      elapsedTime: activeRound.status === "simulating" || activeRound.status === "completed" ? Date.now() - activeMultiplier.timestamp.getTime() : 0,
    });
  },
});
