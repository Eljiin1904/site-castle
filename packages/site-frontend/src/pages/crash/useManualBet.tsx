import { Intimal } from "@core/services/intimal";
import { usePost } from "@client/hooks/system/usePost";
import { Dialogs } from "@client/services/dialogs";
import { useSoundPlayer } from "@client/hooks/sounds/useSoundPlayer";
import { useBet2fa } from "#app/hooks/security/useBet2fa";
import { useBetConfirmation } from "#app/hooks/security/useBetConfirmation";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { LoginModal } from "#app/modals/login/LoginModal";
import { UserEmailConfirmModal } from "#app/modals/user/UserEmailConfirmModal";
import { VerificationModal } from "#app/modals/verification/VerificationModal";
import { Gtm } from "#app/services/gtm";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Crash } from "#app/services/crash";

export function useManualBet() {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const emailConfirmed = useAppSelector((x) => x.user.emailConfirmed);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const betAmount = useAppSelector((x) => x.crash.betAmount);
  const round = useAppSelector((x) => x.crash.round);  
  const multiplierKey = useAppSelector((x) => x.crash.tickets.find((x) => x.user.id === x.user.id)?.latestCrashEventId);

  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const confirmBet = useBetConfirmation();
  const bet2fa = useBet2fa();
  const playSound = useSoundPlayer("crash");
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const handleBet = usePost(
    async (isMounted) => {
      playSound("click");

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
          heading: t("games\\crash:confirmBet.title"),
          message:  t("games\\crash:confirmBet.message", {value : {amount: Intimal.toLocaleString(betAmount)}})
        }),
      });

      const betToken = await bet2fa();

       await Crash.postTicket({
          roundId: round._id,
          betAmount,
          betToken,
        });
  
        if (!isMounted()) {
          return;
        }
  
        Gtm.trackBet({
          game: "crash",
          tokenAmount: betAmount,
        });
      },
      (x) => dispatch(Crash.setProcessing(x)),
  );

  const handleCashout = usePost(
    
    async (isMounted) => {
      playSound("click");
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
      const betToken = await bet2fa();

      if (!isMounted()) {
        return;
      }

      //Do some proof of work here

      await Crash.cashoutTicket({
        roundId: round._id,
        betAmount,
        multiplierKey,
      });
  });

  return {handleBet,handleCashout};
}