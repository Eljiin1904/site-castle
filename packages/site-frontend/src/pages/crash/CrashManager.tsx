import { useUnmount } from "usehooks-ts";
import { usePresence } from "#app/hooks/sockets/usePresence";
import { useSocketListener } from "#app/hooks/sockets/useSocketListener";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Crash } from "#app/services/crash";
import { addCrashEvent, resetCrashEvents } from "#app/services/crash/Crash";

/**
 * CrashManager component will subscribe to the crash game events
 * and dispatch the appropriate actions to the redux slice
 * @returns 
 */
export const CrashManager = () => {
  const dispatch = useAppDispatch();
  //useSoundPreloader("spin-land", "spin-tick");

  usePresence({
    joinKey: "crash-join",
    leaveKey: "crash-leave"
  });

  useSocketListener("crash-init", (init) => {
    
    dispatch(resetCrashEvents());
    let prevEvent = Crash.createCrashEvent({startAtLine: true, color: "bright-green"});
    dispatch(addCrashEvent(prevEvent));
    for(let i = 0; i < 7; i++) {
      const newChartLine = Crash.createCrashEvent({startAtLine: false},  prevEvent);
      dispatch(addCrashEvent(newChartLine));
      prevEvent = newChartLine;
    }
    prevEvent = Crash.createCrashEvent({startAtLine: true, color: "double-red", position:0}, prevEvent);
    dispatch(addCrashEvent(prevEvent));
    dispatch(Crash.initPlayer(init));
  });
  
  useSocketListener("crash-round-insert", (round) => {
    dispatch(Crash.changeRound(round));
  });

  useSocketListener("crash-round-update", (round) => {
    dispatch(Crash.updateRound(round));
  });

  useSocketListener("crash-bet-insert", (bets) => {
    dispatch(Crash.updateBets(bets));
  });

  useSocketListener("crash-bet-update", (bet) => {
    dispatch(Crash.updateBet(bet));
  });

  useSocketListener("crash-bet-update", (bet) => {
    dispatch(Crash.updateBet(bet));
  });

  useSocketListener("crash-active-round", (round) => {
    dispatch(Crash.updateMultiplier(round));
  });

  useUnmount(() => {
    dispatch(Crash.resetPlayer());
  });

  return null;
};
