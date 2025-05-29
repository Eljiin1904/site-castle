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
import { useInterval } from "usehooks-ts";

export function useManualBet() {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const emailConfirmed = useAppSelector((x) => x.user.emailConfirmed);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);  
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const confirmBet = useBetConfirmation();
  const bet2fa = useBet2fa();
  const playSound = useSoundPlayer("crash");
  const dispatch = useAppDispatch();
  const userId  = useAppSelector((x) => x.user._id);
  const roundTicket = useAppSelector((x) => x.crash.tickets.find((x) => x.user.id === userId));
  const targetMultiplier = useAppSelector((x) => x.crash.targetMultiplier);
  const betNextRound = useAppSelector((x) => x.crash.betNextRound);
  const betAmount = useAppSelector((x) => x.crash.betAmount);
  const round = useAppSelector((x) => x.crash.round);
  
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

      if(round.status === "completed" || round.status === "simulating") {
        dispatch(Crash.setBetNextRound(true));
        return;
      }

      await confirmBet({
        betAmount,
        onConfirmProps: () => ({
          heading: t("games\\crash:confirmBet.title"),
          message:  t("games\\crash:confirmBet.message", {value : {amount: Intimal.toLocaleString(betAmount)}})
        }),
      });

      const betToken = await bet2fa();

      Crash.postTicket({
        roundId: round._id,
        betAmount,
        betToken,
        targetMultiplier,
      });

      if (!isMounted()) {
        return;
      }
  
      Gtm.trackBet({
        game: "crash",
        tokenAmount: betAmount,
      });
  });

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

      if (!isMounted()) {
        return;
      }

      //Do some proof of work here

      await Crash.cashoutTicket({
        roundId: round._id,
        betAmount,
      });
  });

  const handleNextBet = usePost(
      
    async (isMounted) => {
      if (isMounted() && (round.status === "waiting" || round.status === "pending") && betNextRound) {
        handleBet();
        dispatch(Crash.setBetNextRound(false));
      }      
  });

  const allowTicketCashout = () => {

    if(!authenticated || !round || !roundTicket) return false;
    if(round.status !== "simulating") return false;
    if(roundTicket.cashoutTriggered || roundTicket.processed) return false;
    return true;
  }; 
  
  const allowCashout = allowTicketCashout();

  useInterval(handleNextBet, betNextRound ? 500 : null);
 
  return {handleBet,handleCashout, allowCashout};
}