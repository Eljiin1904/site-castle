export const chipSounds = [
  "blackjackv2-chip-1",
  "blackjackv2-chip-2",
  "blackjackv2-chip-3",
  "blackjackv2-chip-4",
  "blackjackv2-chip-5",
  "blackjackv2-chip-6",
];
export const dealSounds = [
  "blackjackv2-card-move-1",
  "blackjackv2-card-move-2",
  "blackjackv2-card-move-3",
  "blackjackv2-card-move-4",
  "blackjackv2-card-move-5",
];

export function getRandomChipSound() {
  return getRandom(chipSounds);
}
export function getRandomDealSound() {
  return getRandom(dealSounds);
}

function getRandom<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}
