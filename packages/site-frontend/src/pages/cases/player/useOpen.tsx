import { useEventCallback } from "usehooks-ts";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Intimal } from "@core/services/intimal";
import { ChestSpeed } from "@core/types/chests/ChestSpeed";
import { Dialogs } from "@client/services/dialogs";
import { useBet2fa } from "#app/hooks/security/useBet2fa";
import { useBetConfirmation } from "#app/hooks/security/useBetConfirmation";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";
import { UserEmailConfirmModal } from "#app/modals/user/UserEmailConfirmModal";
import { VerificationModal } from "#app/modals/verification/VerificationModal";
import { Cases } from "#app/services/cases";
import { Gtm } from "#app/services/gtm";

export function useOpen(chest: ChestDocument) {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const emailConfirmed = useAppSelector((x) => x.user.emailConfirmed);
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const confirmBet = useBetConfirmation();
  const bet2fa = useBet2fa();

  const handleOpen = useEventCallback(
    async (openCount: number, speed: ChestSpeed, specialEnabled: boolean) => {
      const chestId = chest._id;
      const betAmount = Math.round(chest.openCost * openCount);

      if (!authenticated) {
        return Dialogs.open("primary", <LoginModal />);
      }
      if (!emailConfirmed) {
        return Dialogs.open("primary", <UserEmailConfirmModal />);
      }
      if (kycTier < 1) {
        return Dialogs.open("primary", <VerificationModal />);
      }
      if (betAmount > tokenBalance) {
        throw new Error("You do not have enough tokens.");
      }

      await confirmBet({
        betAmount,
        onConfirmProps: () => ({
          heading: `Open ${chest.displayName}`,
          message: `Open ${chest.displayName} x${openCount} for ${Intimal.toLocaleString(betAmount)} tokens?`,
        }),
      });

      const betToken = await bet2fa();

      const { rolls } = await Cases.openCases({
        chestId,
        openCount,
        speed,
        specialEnabled,
        betToken,
      });

      Gtm.trackBet({
        game: "cases",
        tokenAmount: betAmount,
      });

      return rolls;
    },
  );

  return handleOpen;
}
