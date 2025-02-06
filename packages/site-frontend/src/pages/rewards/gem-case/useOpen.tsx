import { ChestSpeed } from "@core/types/chests/ChestSpeed";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Dialogs } from "@client/services/dialogs";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";
import { Rewards } from "#app/services/rewards";

export function useOpen({
  chest,
  gemCost,
}: {
  chest: ChestDocument;
  gemCost: number;
}) {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const gemBalance = useAppSelector((x) => x.user.gemBalance);

  const handleOpen = async (
    openCount: number,
    speed: ChestSpeed,
    specialEnabled: boolean,
  ) => {
    const chestId = chest._id;
    const totalCost = Math.round(gemCost * openCount);

    if (!authenticated) {
      return Dialogs.open("primary", <LoginModal />);
    }

    if (totalCost > gemBalance) {
      throw new Error("You do not have enough gems.");
    }

    const { rolls } = await Rewards.openGemCases({
      chestId,
      openCount,
      speed,
      specialEnabled,
    });

    return rolls;
  };

  return handleOpen;
}
