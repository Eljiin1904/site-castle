export function getTimeForMultiplier(multiplier: number): number {

  return Math.log(multiplier/1.0024)/Math.log(1.0718)*1000;
}
