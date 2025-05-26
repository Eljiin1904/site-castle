export function getMultiplierForTime(timer: number): number {

  return Math.floor(1.0024 * Math.pow(1.0718, timer / 1000)* 100) / 100;
};
