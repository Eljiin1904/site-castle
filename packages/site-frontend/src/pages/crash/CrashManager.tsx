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
/**
 * CrashManager component is responsible for managing the crash game state and events.
 * It listens to various socket events and dispatches corresponding actions to update the Redux store.
 * Additionally, it handles player initialization and cleanup upon unmounting.
 *
 * Socket Events:
 * - `crash-init`: Initializes the crash game with a series of crash events and player data.
 * - `crash-round-insert`: Inserts a new round into the game state.
 * - `crash-round-update`: Updates the current round in the game state.
 * - `crash-bet-insert`: Inserts multiple bets into the game state.
 * - `crash-bet-update`: Updates a single bet in the game state.
 * - `crash-active-round`: Updates the multiplier for the active round.
 *
 * Lifecycle:
 * - On unmount, resets the player state to ensure cleanup.
 *
 * Dependencies:
 * - `useAppDispatch`: Dispatches actions to the Redux store.
 * - `usePresence`: Manages presence events for joining and leaving the crash game.
 * - `useSocketListener`: Listens to socket events and triggers corresponding callbacks.
 * - `useUnmount`: Executes cleanup logic when the component is unmounted.
 *
 * Returns:
 * - `null`: This component does not render any UI.
 */
export const CrashManager = () => {
  const dispatch = useAppDispatch();

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
