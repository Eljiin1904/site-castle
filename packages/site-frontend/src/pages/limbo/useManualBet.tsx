import { Intimal } from "@core/services/intimal";
import { usePost } from "@client/hooks/system/usePost";
import { Dialogs } from "@client/services/dialogs";
import { useSoundPlayer } from "@client/hooks/sounds/useSoundPlayer";
import { useBet2fa } from "#app/hooks/security/useBet2fa";
import { useBetConfirmation } from "#app/hooks/security/useBetConfirmation";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";
import { UserEmailConfirmModal } from "#app/modals/user/UserEmailConfirmModal";
import { VerificationModal } from "#app/modals/verification/VerificationModal";
import { Gtm } from "#app/services/gtm";
import { Limbo } from "#app/services/limbo";

export function useManualBet() {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const betAmount = useAppSelector((x) => x.limbo.betAmount);
  const emailConfirmed = useAppSelector((x) => x.user.emailConfirmed);
  const targetValue = useAppSelector((x) => x.limbo.targetValue);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const confirmBet = useBetConfirmation();
  const bet2fa = useBet2fa();
  const playSound = useSoundPlayer("limbo");
  const dispatch = useAppDispatch();

  const handleBet = usePost(
    async (isMounted) => {
      playSound("click");

      dispatch(Limbo.clearLastTicket());

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
          heading: "Confirm Bet",
          message: `Bet ${Intimal.toLocaleString(betAmount)}?`,
        }),
      });

      const betToken = await bet2fa();

      const { ticket } = await Limbo.postTicket({
        betAmount,
        targetValue,
        betToken,
      });

      if (!isMounted()) {
        return;
      }

      if (ticket.won) {
        playSound("success");
      }

      dispatch(Limbo.updateHistory(ticket));

      Gtm.trackBet({
        game: "limbo",
        tokenAmount: betAmount,
      });
    },
    (x) => dispatch(Limbo.setProcessing(x)),
  );

  return handleBet;
}
