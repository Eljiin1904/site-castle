import { Intimal } from "@core/services/intimal";
import { usePost } from "@client/hooks/system/usePost";
import { Dialogs } from "@client/services/dialogs";
// import { Validation } from "#core/services/validation";
import { useBet2fa } from "#app/hooks/security/useBet2fa";
import { useBetConfirmation } from "#app/hooks/security/useBetConfirmation";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { LoginModal } from "#app/modals/login/LoginModal";
import { Gtm } from "#app/services/gtm";
import postCreateGame from "../api/postCreateGame";
import { setGame, setProcessing } from "../Blackjack";
import { getTotalBetAmount } from "@core/services/blackjack/utils/getTotalBetAmount";
// import { useKycTierRequirement } from "#app/hooks/kyc/useKycTierRequirement";

export function useCreateGame() {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const confirmBet = useBetConfirmation();
  const bet2fa = useBet2fa();
  const dispatch = useAppDispatch();
  // blackjack specific
  const betAmounts = useAppSelector((x) => x.blackjack.betting.betAmounts);

  // const { tierRequirementMet, kycFlow } = useKycTierRequirement({
  //   requiredTier: Validation.kycTiers.personalInfo,
  // });

  const handleBet = usePost(
    async (isMounted) => {
      if (!authenticated) {
        return Dialogs.open("primary", <LoginModal />);
      }

      // if (!tierRequirementMet) {
      //   kycFlow();
      //   return;
      // }

      const totalBetAmount = getTotalBetAmount(betAmounts);

      if (totalBetAmount > tokenBalance) {
        throw new Error("You do not have enough tokens.");
      }

      await confirmBet({
        betAmount: totalBetAmount,
        onConfirmProps: () => ({
          heading: "Confirm Bet",
          message: `Bet ${Intimal.toLocaleString(totalBetAmount)}?`,
        }),
      });

      const betToken = await bet2fa();

      if (!isMounted()) {
        return;
      }

      const resp = await postCreateGame({ betAmounts, betToken });

      dispatch(setGame({ ...resp, delayDraw: true }));

      Gtm.trackBet({
        game: "blackjack",
        tokenAmount: totalBetAmount,
      });
    },
    (x) => dispatch(setProcessing(x)),
  );

  return handleBet;
}
