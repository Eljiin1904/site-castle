export function getTimeProgress(startTime: number, endTime: number) {
  const duration = endTime - startTime;
  const now = Date.now();
  let progress = (now - startTime) / duration;

  // could throw here instead of clamping?
  // ticks might overshoot the date though
  if (progress < 0) progress = 0;
  if (progress > 1) progress = 1;

  return progress;
}
