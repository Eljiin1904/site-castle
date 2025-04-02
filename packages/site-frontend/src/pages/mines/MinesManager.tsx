import { memo } from "react";
import { useUnmount } from "usehooks-ts";
import { useSoundPreloader } from "#client/hooks/sounds/useSoundPreloader";
import { useInputQueue } from "#client/hooks/system/useInputQueue";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { usePresence } from "#app/hooks/sockets/usePresence";
import { useSocketListener } from "#app/hooks/sockets/useSocketListener";
import { Mines } from "#app/services/mines";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useReveal } from "./useReveal";

export const MinesManager = memo(() => {
  const inputQueue = useAppSelector((x) => x.mines.inputQueue);
  const dispatch = useAppDispatch();

  useInputQueue({
    queue: inputQueue,
    onDequeue: (i) => dispatch(Mines.dequeueReveal(i)),
    onProcess: useReveal(),
  });

  useSoundPreloader("mines-bomb", "mines-planted", "mines-clear", "mines-diffused");

  usePresence({
    joinKey: "mines-join",
    leaveKey: "mines-leave",
  });

  useSocketListener("mines-init", (init) => {
    dispatch(Mines.initPlayer(init));
  });

  useSocketListener("mines-insert", (game) => {
    dispatch(Mines.updateFeed(game));
  });

  useUnmount(() => {
    dispatch(Mines.resetPlayer());
  });

  return null;
});
