import { useSoundPreloader } from "@client/hooks/sounds/useSoundPreloader";
import { usePresence } from "#app/hooks/sockets/usePresence";
import { useSocketListener } from "#app/hooks/sockets/useSocketListener";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Double } from "#app/services/double";

/**
 * DoubleManager component will subscribe to the double game events
 * and dispatch the appropriate actions to the store
 * @returns 
 */
export const DoubleManager = () => {
  const dispatch = useAppDispatch();

  useSoundPreloader("spin-land", "spin-tick");

  usePresence({
    joinKey: "double-join",
    leaveKey: "double-leave",
    roomKey: "double-general",
  });

  useSocketListener("double-init", (init) => {
    dispatch(Double.initPlayer(init));
  });

  useSocketListener("double-round-insert", (round) => {
    dispatch(Double.changeRound(round));
  });

  useSocketListener("double-round-update", (round) => {
    dispatch(Double.updateRound(round));
  });

  useSocketListener("double-bet-insert", (bet) => {
    dispatch(Double.updateBets(bet));
  });

  return null;
};
