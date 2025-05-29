import { removeIndexFromArray } from "./removeIndexFromArray";

export function popRandomItemFromArray<T>(arr: T[], randomNum: number) {
  let randomIndex = Math.floor(randomNum * arr.length);
  if (randomIndex == arr.length) randomIndex -= 1; // 0%
  return removeIndexFromArray(arr, randomIndex);
}
