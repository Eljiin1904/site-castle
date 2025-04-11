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
import { Gtm } from "#app/services/gtm";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { VerificationModal } from "#app/modals/verification/VerificationModal";

export function useManualBet() {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const emailConfirmed = useAppSelector((x) => x.user.emailConfirmed);
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const betAmount = useAppSelector((x) => x.mines.betAmount);
  const gridSize = useAppSelector((x) => x.mines.gridSize);
  const mineCount = useAppSelector((x) => x.mines.mineCount);
  const confirmBet = useBetConfirmation();
  const bet2fa = useBet2fa();
  const playSound = useSoundPlayer("mines");
  const dispatch = useAppDispatch();
  const {t} = useTranslation(["games\\mines"]);

  const handleBet = usePost(
    async (isMounted) => {

      if (!authenticated) {
        return Dialogs.open("primary", <LoginModal />);
      }
      if (!emailConfirmed) {
        return Dialogs.open("primary", <UserEmailConfirmModal />);
      }
      if (kycTier < 1) {
        return Dialogs.open("primary", <VerificationModal />);
      }
      if (betAmount === undefined) {
        throw new Error("validations:errors.games.invalidBetAmount");
      }
      if (betAmount > tokenBalance) {
        throw new Error("validations:errors.games.notEnoughTokens");
      }

      await confirmBet({
        betAmount,
        onConfirmProps: () => ({
          heading: t('confirmBet.title'),
          message:  t("confirmBet.message", {value : {amount: Intimal.toLocaleString(betAmount)}})
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
