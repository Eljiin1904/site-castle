import { usePost } from "@client/hooks/system/usePost";
import { useSoundPlayer } from "@client/hooks/sounds/useSoundPlayer";
import { Mines } from "#app/services/mines";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";

export function useCashout() {
  const dispatch = useAppDispatch();
  const playSound = useSoundPlayer("mines");

  const handleCashout = usePost(
    async () => {
      const { state } = await Mines.cashout();

      dispatch(Mines.setGame(state));

      playSound("mines-diffused");
    },
    (x) => dispatch(Mines.setProcessing(x)),
  );

  return handleCashout;
}
