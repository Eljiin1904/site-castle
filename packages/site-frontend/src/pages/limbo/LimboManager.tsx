import { useUnmount } from "usehooks-ts";
import { useSoundPreloader } from "@client/hooks/sounds/useSoundPreloader";
import { Limbo } from "#app/services/limbo";
import { usePresence } from "#app/hooks/sockets/usePresence";
import { useSocketListener } from "#app/hooks/sockets/useSocketListener";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const LimboManager = () => {
  const userId = useAppSelector((x) => x.user._id);
  const dispatch = useAppDispatch();

  useUnmount(() => {
    dispatch(Limbo.resetPlayer());
  });

  useSoundPreloader("click", "success");

  usePresence({
    joinKey: "limbo-join",
    leaveKey: "limbo-leave",
    roomKey: userId,
  });

  useSocketListener("limbo-init", (init) => {
    dispatch(Limbo.initPlayer(init));
  });

  useSocketListener("limbo-insert", (roll) => {
    dispatch(Limbo.updateFeed(roll));
  });

  return null;
};
