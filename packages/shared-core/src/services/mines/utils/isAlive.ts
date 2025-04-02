export function isAlive({ mines, reveals }: { mines: number[]; reveals: number[] }) {
  return !reveals.some((tileIndex) => mines.includes(tileIndex));
}
