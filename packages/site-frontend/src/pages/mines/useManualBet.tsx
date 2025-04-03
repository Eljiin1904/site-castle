import { Intimal } from "@core/services/intimal";
import { usePost } from "@client/hooks/system/usePost";
import { Dialogs } from "@client/services/dialogs";
import { useSoundPlayer } from "@client/hooks/sounds/useSoundPlayer";
import { useBet2fa } from "#app/hooks/security/useBet2fa";
import { useBetConfirmation } from "#app/hooks/security/useBetConfirmation";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Mines } from "#app/services/mines";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { LoginModal } from "#app/modals/login/LoginModal";
import { UserEmailConfirmModal } from "#app/modals/user/UserEmailConfirmModal";
import { VerificationTwoModal } from "#app/modals/verification/VerificationTwoModal";
import { Gtm } from "#app/services/gtm";

export function useManualBet() {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const betAmount = useAppSelector((x) => x.mines.betAmount);
  const gridSize = useAppSelector((x) => x.mines.gridSize);
  const mineCount = useAppSelector((x) => x.mines.mineCount);
  const confirmBet = useBetConfirmation();
  const bet2fa = useBet2fa();
  const playSound = useSoundPlayer("mines");
  const dispatch = useAppDispatch();

  const handleBet = usePost(
    async (isMounted) => {
      if (!authenticated) {
        return Dialogs.open("primary", <LoginModal />);
      }
      if (kycTier < 1) {
        return Dialogs.open("primary", <UserEmailConfirmModal />);
      } else if (kycTier < 2) {
        return Dialogs.open("primary", <VerificationTwoModal />);
      }
      if (betAmount === undefined) {
        throw new Error("Invalid bet amount.");
      }
      if (betAmount > tokenBalance) {
        throw new Error("You do not have enough tokens.");
      }

      await confirmBet({
        betAmount,
        onConfirmProps: () => ({
          heading: "Confirm Bet",
          message: `Bet ${Intimal.toLocaleString(betAmount)}?`,
        }),
      });

      const betToken = await bet2fa();

      playSound("mines-planted");

      const { state } = await Mines.createManualGame({
        betAmount,
        gridSize,
        mineCount,
        betToken,
      });

      if (!isMounted()) {
        return;
      }

      dispatch(Mines.setGame(state));

      Gtm.trackBet({
        game: "mines",
        tokenAmount: betAmount,
      });
    },
    (x) => dispatch(Mines.setProcessing(x)),
  );

  return handleBet;
}
