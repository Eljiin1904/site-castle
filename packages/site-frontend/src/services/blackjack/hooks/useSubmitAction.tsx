import { Intimal } from "#core/services/intimal";
import { Validation } from "#core/services/validation";
import { usePost } from "#client/hooks/system/usePost";
import { Dialogs } from "#client/services/dialogs";
import { useBetConfirmation } from "#app/hooks/security/useBetConfirmation";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { LoginModal } from "#app/modals/login/LoginModal";
import { Gtm } from "#app/services/gtm";
import { setGame, setProcessing } from "../Blackjack";
import { BlackjackAction } from "@core/types/blackjack/BlackjackAction";
import postAction from "../api/postAction";
import { useBet2fa } from "#app/hooks/security/useBet2fa";
// import { useKycTierRequirement } from "#app/hooks/kyc/useKycTierRequirement";

export function useSubmitAction() {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const confirmBet = useBetConfirmation();
  const bet2fa = useBet2fa();
  const dispatch = useAppDispatch();
  // === blackjack specific
  const game = useAppSelector((x) => x.blackjack.game);
  const mainBet = useAppSelector((x) => x.blackjack.betting.betAmounts["main-bet"]);

  const { tierRequirementMet, kycFlow } = useKycTierRequirement({
    requiredTier: Validation.kycTiers.personalInfo,
  });

  const handleBet = usePost(
    async (
      isMounted,
      { action, buyInsurance }: { action: BlackjackAction; buyInsurance?: boolean },
    ) => {
      if (!game) throw new Error("No game available");
      const { _id: gameId, syncIndex } = game;

      if (!authenticated) {
        return Dialogs.open("primary", <LoginModal />);
      }

      // if (!tierRequirementMet) {
      //   kycFlow();
      //   return;
      // }

      const hasBet = ["split", "double"].includes(action);

      if (hasBet) {
        if (mainBet > tokenBalance)
          throw new Error("You do not have enough tokens to perform " + action);

        await confirmBet({
          betAmount: mainBet,
          onConfirmProps: () => ({
            heading: "Confirm Bet",
            message: `Bet ${Intimal.toLocaleString(mainBet)}?`,
          }),
        });
      }

      if (!isMounted()) {
        return;
      }

      const betToken = await bet2fa();

      const resp = await postAction({
        gameId,
        syncIndex,
        action,
        buyInsurance,
        betToken,
      });

      dispatch(setGame(resp));

      if (hasBet)
        Gtm.trackBet({
          game: "blackjack",
          tokenAmount: mainBet,
        });
    },
    (x) => dispatch(setProcessing(x)),
  );

  return handleBet;
}
