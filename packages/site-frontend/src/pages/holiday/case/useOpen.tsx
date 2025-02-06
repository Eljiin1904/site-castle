import { ChestSpeed } from "@core/types/chests/ChestSpeed";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Dialogs } from "@client/services/dialogs";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";
import { Rewards } from "#app/services/rewards";

export function useOpen({
  chest,
  holidayCost,
}: {
  chest: ChestDocument;
  holidayCost: number;
}) {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const holidayBalance = useAppSelector((x) => x.user.holidayBalance || 0);

  const handleOpen = async (
    openCount: number,
    speed: ChestSpeed,
    specialEnabled: boolean,
  ) => {
    const chestId = chest._id;
    const totalCost = Math.round(holidayCost * openCount);

    if (!authenticated) {
      return Dialogs.open("primary", <LoginModal />);
    }

    if (totalCost > holidayBalance) {
      throw new Error("You do not have enough holiday balance.");
    }

    const { rolls } = await Rewards.openHolidayCases({
      chestId,
      openCount,
      speed,
      specialEnabled,
    });

    return rolls;
  };

  return handleOpen;
}
