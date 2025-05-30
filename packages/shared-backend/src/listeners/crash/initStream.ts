import { System } from "@server/services/system";
import { Sockets } from "#app/services/sockets";
import { roundStream } from "./helpers/roundStream";
import { ticketStream } from "./helpers/ticketStream";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { Crash as CoreCrash } from "@core/services/crash";
import { multiplierStream } from "./helpers/multiplierStream";
const GAME_DELAY = CoreCrash.roundTimes.delay;
const logger = getServerLogger({});

export default Sockets.createListener({
  action: "init",
  callback: async (io) => {
    roundStream.on(
      "insert",
      System.tryCatch(async (document) => {
        logger.debug("Crash insert round stream");
        const broadcaster = io.sockets.in("crash");
        broadcaster.emit("crash-round-insert", {
          ...document,
        });
      }),
    );

    roundStream.on(
      "update",
      System.tryCatch(async (update) => {
        logger.debug("Crash update round stream");    
        const broadcaster = io.sockets.in("crash");
        const sockets = await broadcaster.fetchSockets();
        //Add Latency
        for (const socket of sockets) {
          setTimeout(() => {
            socket.emit("crash-round-update", update);
          },GAME_DELAY);
        }
      }),
    );

    ticketStream.on(
      "insert",
      System.tryCatch(async (document) => {
        logger.debug("Crash insert ticket stream");        
        const broadcaster = io.sockets.in("crash");
        if(document.roundId !== CoreCrash.nextRoundId)
          broadcaster.emit("crash-bet-insert", document);
      }),
    );

    ticketStream.on(
      "update",
      System.tryCatch(async (update, ticket) => {
        logger.debug("Crash update ticket stream");       
        const broadcaster = io.sockets.in(`crash`);
        broadcaster.emit("crash-bet-update", update);
      }),
    );

    multiplierStream.on(
      "insert",
      System.tryCatch(async (document) => {
        logger.debug("Crash insert multiplier stream");
        if (!document.multiplier) {
          return;
        }
        const broadcaster = io.sockets.in("crash");
        const multiplierTime = document.roundTime;
        // const sockets = await broadcaster.fetchSockets();
        // for (const socket of sockets) {
          
        //   let userId = socket.data.userId;
        //   // socket.emit("crash-round-update", update);
        // }
        
          // if (!userId) 
          //   userId = socket.id;
          // let waitForEmit = 0;            
          // const roundStatus = update.updatedFields.status;
          // const elapsedTime = update.updatedFields.elapsedTime as number || 0;
          // const isSmulation = elapsedTime > 0 || roundStatus === "simulating";
          // const latencyDelay = await Crash.calculateUserWaitTime(userId);
          // if(isSmulation) {

          //   waitForEmit = GAME_DELAY - latencyDelay;
          // }
          // else if(roundStatus === "completed") {
          //   waitForEmit =  GAME_DELAY - 2*latencyDelay;
          // }

          // if(waitForEmit > 0)
          //   setTimeout(() => {
          //     socket.emit("crash-round-update", update);
          //   }, waitForEmit);
          // else
        
        //Add Latency
        setTimeout(() => {
          let elapsedTime = 0;
          const intervalId = setInterval(() => {
            if (elapsedTime >= multiplierTime) {
              clearInterval(intervalId);
              broadcaster.emit("crash-active-round", {roundId: document.roundId, elapsedTime: elapsedTime, completed:true});
              return;
            }
            broadcaster.emit("crash-active-round", {roundId: document.roundId, elapsedTime: elapsedTime});
            elapsedTime += 150;
          }, 150);
        },GAME_DELAY);
      }
    ));
  },
});