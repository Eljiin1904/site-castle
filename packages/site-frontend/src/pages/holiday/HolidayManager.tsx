import { useUnmount } from "usehooks-ts";
import { useSocketListener } from "#app/hooks/sockets/useSocketListener";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Rewards } from "#app/services/rewards";
import { usePresence } from "#app/hooks/sockets/usePresence";

export const HolidayManager = () => {
  const dispatch = useAppDispatch();

  useUnmount(() => {
    dispatch(Rewards.resetState());
  });

  usePresence({
    joinKey: "holiday-join",
    leaveKey: "holiday-leave",
  });

  useSocketListener("holiday-init", (init) => {
    dispatch(Rewards.initState(init));
  });

  useSocketListener("holiday-race-update", (update) => {
    dispatch(Rewards.updateRace(update));
  });

  useSocketListener("holiday-raffle-update", (update) => {
    dispatch(Rewards.updateRaffle(update));
  });

  return null;
};
