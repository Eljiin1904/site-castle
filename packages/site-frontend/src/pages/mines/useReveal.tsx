import { usePost } from "#client/hooks/system/usePost";
import { useSoundPlayer } from "#client/hooks/sounds/useSoundPlayer";
import { Mines } from "#app/services/mines";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";

export function useReveal() {
  const dispatch = useAppDispatch();
  const playSound = useSoundPlayer("mines");

  const handleReveal = usePost(
    async (_, revealIndex: number) => {
      const { state } = await Mines.revealTile({
        revealIndex,
      });

      dispatch(Mines.setGame(state));

      dispatch(Mines.addAnimateIndex(revealIndex));

      setTimeout(() => {
        dispatch(Mines.removeAnimateIndex(revealIndex));
      }, 300);

      if (state.completed) {
        const won = Mines.isAlive(state);

        if (won) {
          playSound("mines-diffused");
        } else {
          playSound("mines-bomb");
        }

        dispatch(Mines.dropInputQueue());
      } else {
        playSound("mines-clear");
      }
    },
    (x) => dispatch(Mines.setProcessing(x)),
  );

  return handleReveal;
}
