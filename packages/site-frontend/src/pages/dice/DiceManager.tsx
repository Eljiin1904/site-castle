import { useUnmount } from "usehooks-ts";
import { usePresence } from "#app/hooks/sockets/usePresence";
import { useSocketListener } from "#app/hooks/sockets/useSocketListener";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Dice } from "#app/services/dice";
import { useSoundPreloader } from "@client/hooks/sounds/useSoundPreloader";

export const DiceManager = () => {
  const userId = useAppSelector((x) => x.user._id);
  const dispatch = useAppDispatch();

  useUnmount(() => {
    dispatch(Dice.resetPlayer());
  });

  useSoundPreloader("click", "success");

  usePresence({
    joinKey: "dice-join",
    leaveKey: "dice-leave",
    roomKey: userId,
  });

  useSocketListener("dice-init", (init) => {
    dispatch(Dice.initPlayer(init));
  });

  useSocketListener("dice-insert", (roll) => {
    dispatch(Dice.updateFeed(roll));
  });

  return null;
};
