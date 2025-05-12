import { useUnmount } from "usehooks-ts";
import { useSoundPreloader } from "@client/hooks/sounds/useSoundPreloader";
import { usePresence } from "#app/hooks/sockets/usePresence";
import { useSocketListener } from "#app/hooks/sockets/useSocketListener";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Crash } from "#app/services/crash";

/**
 * CrashManager component will subscribe to the crash game events
 * and dispatch the appropriate actions to the store
 * @returns 
 */
export const CrashManager = () => {
  const dispatch = useAppDispatch();
  useSoundPreloader("spin-land", "spin-tick");

  usePresence({
    joinKey: "crash-join",
    leaveKey: "crash-leave"
  });

  useSocketListener("crash-init", (init) => {
    
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

  useUnmount(() => {
    dispatch(Crash.resetPlayer());
  });

  return null;
};
