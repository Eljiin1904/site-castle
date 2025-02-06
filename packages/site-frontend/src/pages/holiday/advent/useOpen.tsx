import { Intimal } from "@core/services/intimal";
import { Dialogs } from "@client/services/dialogs";
import { usePost } from "@client/hooks/system/usePost";
import { Toasts } from "@client/services/toasts";
import { useSoundPlayer } from "@client/hooks/sounds/useSoundPlayer";
import { useSoundPreloader } from "@client/hooks/sounds/useSoundPreloader";
import { Rewards } from "#app/services/rewards";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";

export function useOpen() {
  const playSound = useSoundPlayer("holiday");
  const dispatch = useAppDispatch();

  useSoundPreloader("success");

  const handleOpen = usePost(
    async (_, day: number) => {
      const { ticket } = await Rewards.openAdvent({ day });

      dispatch(Rewards.addAdventTicket(ticket));

      Toasts.success(
        `You received ${Intimal.toLocaleString(ticket.item.lootValue)} tokens from today's advent.`,
      );

      playSound("success");

      Dialogs.close("primary");
    },
    (x) => dispatch(Rewards.setProcessing(x)),
  );

  return handleOpen;
}
