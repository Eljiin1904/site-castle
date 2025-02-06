import { DoubleBetKind } from "@core/types/double/DoubleBetKind";
import { Intimal } from "@core/services/intimal";
import { usePost } from "@client/hooks/system/usePost";
import { Dialogs } from "@client/services/dialogs";
import { useBet2fa } from "#app/hooks/security/useBet2fa";
import { useBetConfirmation } from "#app/hooks/security/useBetConfirmation";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Double } from "#app/services/double";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { LoginModal } from "#app/modals/login/LoginModal";
import { UserEmailConfirmModal } from "#app/modals/user/UserEmailConfirmModal";
import { VerificationModal } from "#app/modals/verification/VerificationModal";
import { Gtm } from "#app/services/gtm";

export function usePostTicket() {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const emailConfirmed = useAppSelector((x) => x.user.emailConfirmed);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const round = useAppSelector((x) => x.double.round);
  const betAmount = useAppSelector((x) => x.double.betAmount);
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const confirmBet = useBetConfirmation();
  const bet2fa = useBet2fa();
  const dispatch = useAppDispatch();

  const handlePostTicket = usePost(
    async (isMounted, betKind: DoubleBetKind) => {
      if (!authenticated) {
        return Dialogs.open("primary", <LoginModal />);
      }
      if (!emailConfirmed) {
        return Dialogs.open("primary", <UserEmailConfirmModal />);
      }
      if (kycTier < 1) {
        return Dialogs.open("primary", <VerificationModal />);
      }
      if (!betAmount) {
        throw new Error("Invalid bet amount.");
      }
      if (betAmount > tokenBalance) {
        throw new Error("You do not have enough tokens.");
      }

      const maxBet = Double.getMaxBetAmount(betKind);

      if (betAmount > maxBet) {
        throw new Error(
          `The max bet amount is ${Intimal.toLocaleString(maxBet)}.`,
        );
      }

      await confirmBet({
        betAmount,
        onConfirmProps: () => ({
          heading: "Confirm Bet",
          message: `Bet ${Intimal.toLocaleString(betAmount)} on ${Double.getLabelFromBetKind(betKind)}?`,
        }),
      });

      const betToken = await bet2fa();

      await Double.postTicket({
        roundId: round._id,
        betKind,
        betAmount,
        betToken,
      });

      if (!isMounted()) {
        return;
      }

      Gtm.trackBet({
        game: "double",
        tokenAmount: betAmount,
      });
    },
    (x) => dispatch(Double.setProcessing(x)),
  );

  return handlePostTicket;
}
