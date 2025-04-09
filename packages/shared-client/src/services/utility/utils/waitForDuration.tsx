import { WaitCancelledError } from "#client/services/errors";

export async function waitForDuration(
  duration: number,
  predicate?: () => boolean,
) {
  return await new Promise<void>((resolve, reject) => {
    const start = performance.now();

    const step = () => {
      if (predicate && predicate()) {
        reject(new WaitCancelledError());
      } else if (performance.now() - start >= duration) {
        resolve();
      } else {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  });
}
