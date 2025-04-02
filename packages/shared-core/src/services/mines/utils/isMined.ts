export function isMined(
  game: {
    mines: number[];
  },
  revealIndex: number,
) {
  return game.mines.includes(revealIndex);
}
