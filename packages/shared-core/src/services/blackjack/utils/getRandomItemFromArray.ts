export function getRandomItemFromArray<T>(arr: T[], randomNum: number) {
  let randomIndex = Math.floor(randomNum * arr.length);
  if (randomIndex == arr.length) randomIndex -= 1; // 0% chance
  return arr[randomIndex];
}
