import { ChestDocument } from "@core/types/chests/ChestDocument";
import { ChestSpeed } from "@core/types/chests/ChestSpeed";
import { Dialogs } from "@client/services/dialogs";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";
import { Rewards } from "#app/services/rewards";

export function useOpen(chest: ChestDocument) {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const keys = useAppSelector((x) => x.user.chestKeys);
  const keyCount = keys[chest._id] || 0;

  const handleOpen = async (
    openCount: number,
    speed: ChestSpeed,
    specialEnabled: boolean,
  ) => {
    const chestId = chest._id;

    if (!authenticated) {
      return Dialogs.open("primary", <LoginModal />);
    }

    if (keyCount < openCount) {
      throw new Error("You do not have enough keys.");
    }

    const { rolls } = await Rewards.openLevelCases({
      chestId,
      openCount,
      speed,
      specialEnabled,
    });

    return rolls;
  };

  return handleOpen;
}
