export async function waitForFrames(frames: number, callback?: () => void) {
  return await new Promise<void>((resolve) => {
    let cursor = 0;

    const nextFrame = () => {
      if (++cursor === frames) {
        callback && callback();
        resolve();
      } else {
        requestAnimationFrame(nextFrame);
      }
    };

    requestAnimationFrame(nextFrame);
  });
}
