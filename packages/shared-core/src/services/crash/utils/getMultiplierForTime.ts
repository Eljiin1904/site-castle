export function getMultiplierForTime(timer: number): number {

  return 1.0024 * Math.pow(1.0718, timer / 1000);
};
