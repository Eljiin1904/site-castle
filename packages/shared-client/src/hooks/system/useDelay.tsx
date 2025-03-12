import { useRef } from "react";
import { useUnmount } from "usehooks-ts";

export function useDelay(func: () => void, delay: number) {
  const timeout = useRef<NodeJS.Timeout>();

  const trigger = () => {
    timeout.current = setTimeout(func, delay);
  };

  useUnmount(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  });

  return trigger;
}
