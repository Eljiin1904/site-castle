import { RefObject, useEffect, useRef } from "react";
import { useIsMounted, useUnmount } from "usehooks-ts";
import { Utility } from "@core/services/utility";
import { AnimationManager } from "#app/services/animations";

export type UseAnimatorPlayOptions = {
  axis: "x" | "y";
  timing: "ease" | "slide";
  startValue: number;
  endValue: number;
  duration: number;
  delay?: number;
  initTime?: number;
  onPlay?: () => void;
  onUpdate?: (x: number) => void;
  onStop?: () => void;
};

export type UseAnimatorReturn = {
  ref: RefObject<HTMLDivElement>;
  set: (axis: "x" | "y", value: number) => void;
  play: (options: UseAnimatorPlayOptions) => Promise<void>;
  stop: () => void;
};

export function useAnimator(): UseAnimatorReturn {
  const ref = useRef<HTMLDivElement>(null);
  const manager = useRef<AnimationManager | null>(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (!ref.current) return;
    if (manager.current) return;

    manager.current = new AnimationManager(ref.current);
  }, []);

  useUnmount(() => {
    manager.current?.stop();
  });

  const set = (axis: "x" | "y", value: number) => {
    manager.current?.set(axis, value);
  };

  const play = async (options: UseAnimatorPlayOptions) => {
    if (options.delay) {
      await Utility.wait(options.delay);
    }

    if (isMounted()) {
      return await manager.current?.play(options);
    }
  };

  const stop = () => {
    manager.current?.stop();
  };

  return { ref, set, play, stop };
}
