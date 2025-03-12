export function isWin({
  targetValue,
  rollValue,
}: {
  targetValue: number;
  rollValue: number;
}): boolean {
  return targetValue <= rollValue;
}
