import { useAppSelector } from "#app/hooks/store/useAppSelector";

export function usePlaying() {
  const game = useAppSelector((x) => x.mines.game);

  return game && !game.completed;
}
