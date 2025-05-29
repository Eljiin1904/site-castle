import { System } from "@server/services/system";
import { Sockets } from "#app/services/sockets";
import { roundStream } from "./helpers/roundStream";
import { ticketStream } from "./helpers/ticketStream";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
const logger = getServerLogger({});
import { Crash } from "@server/services/crash";
import { Crash as CrashCore } from "@core/services/crash";
const GAME_DELAY = CrashCore.roundTimes.delay;

export default Sockets.createListener({
  action: "init",
  callback: async (io) => {
    roundStream.on(
      "insert",
      System.tryCatch(async (document) => {
      // logger.debug("Crash insert round stream");
       const broadcaster = io.sockets.in("crash");
        broadcaster.emit("crash-round-insert", {
          ...document,
          serverSeed: "",
          serverSeedHash: "",
        });
      }),
    );

    roundStream.on(
      "update",
      System.tryCatch(async (update) => {
        logger.debug("Crash update round stream");    
        const broadcaster = io.sockets.in("crash");
        const sockets = await broadcaster.fetchSockets();
        
        for (const socket of sockets) {
          let userId = socket.data.userId;
          if (!userId) 
            userId = socket.id;
          let waitForEmit = 0;            
          const roundStatus = update.updatedFields.status;
          const isSmulation = roundStatus === "simulating" ||
          (update.updatedFields.multiplier as number > 0 && !update.updatedFields.multiplierCrash);
          const latencyDelay = (await Crash.calculateUserWaitTime(userId, update.updatedFields.statusDate as Date));
          if(isSmulation) {

            waitForEmit = GAME_DELAY - latencyDelay;
          }
          else if(roundStatus === "completed") {
            waitForEmit =  GAME_DELAY - latencyDelay;
          }
          
          if(waitForEmit > 0)
            setTimeout(() => {
              socket.emit("crash-round-update", update);
            }, waitForEmit);
          else
            socket.emit("crash-round-update", update);
        }
      }),
    );

    ticketStream.on(
      "insert",
      System.tryCatch(async (document) => {
        logger.debug("Crash insert ticket stream");        
        const broadcaster = io.sockets.in("crash");
        broadcaster.emit("crash-bet-insert", document);
      }),
    );

    ticketStream.on(
      "update",
      System.tryCatch(async (update, ticket) => {
        logger.debug("Crash update ticket stream");       
        if(update.updatedFields?.autoCashedTriggerd) {

          if(!ticket) return; 
          const broadcaster = io.sockets.in(`crash`);
          const sockets = await broadcaster.fetchSockets();
          for (const socket of sockets) {
            const userId = socket.data.userId;
            if (!userId) continue;

            let waitForEmit = 0;
            waitForEmit = GAME_DELAY - (await Crash.calculateUserWaitTime(userId, update.updatedFields.cashoutTriggeredDate as Date));

            if(waitForEmit > 0)
              setTimeout(() => {
                socket.emit("crash-bet-update", update);
              }, waitForEmit);
            else
              socket.emit("crash-bet-update", update);
          }         
          return;
        }
        else {
          const broadcaster = io.sockets.in("crash");  
          broadcaster.emit("crash-bet-update", update);
        }
      }),
    );
  },
});