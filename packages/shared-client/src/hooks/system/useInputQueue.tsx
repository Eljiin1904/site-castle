import { useRef } from "react";
import { useInterval } from "usehooks-ts";

export function useInputQueue<T>({
  queue,
  onProcess,
  onDequeue,
}: {
  queue: Readonly<T[]>;
  onProcess: (x: T) => Promise<void>;
  onDequeue: (x: T) => void;
}) {
  const processing = useRef(false);
  const interval = queue.length === 0 ? null : 0;

  const handleNext = async () => {
    if (processing.current) {
      return;
    }

    if (queue.length === 0) {
      return;
    }

    const event = queue[0];

    processing.current = true;

    await onProcess(event);

    onDequeue(event);

    processing.current = false;
  };

  useInterval(handleNext, interval);
}
