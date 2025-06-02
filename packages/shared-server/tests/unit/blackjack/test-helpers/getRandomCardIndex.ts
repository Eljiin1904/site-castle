export function getRandomCardIndex(arg: any) {
  const num = Math.floor(Math.random() * 52);
  if (num > 51) throw new Error("Invalid card index: " + num);
  return num;
}
