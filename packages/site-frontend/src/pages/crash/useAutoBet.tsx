import { useInterval } from "usehooks-ts";
import { Intimal } from "@core/services/intimal";
import { usePost } from "@client/hooks/system/usePost";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { useSoundPlayer } from "@client/hooks/sounds/useSoundPlayer";
import { LoginModal } from "#app/modals/login/LoginModal";
import { UserEmailConfirmModal } from "#app/modals/user/UserEmailConfirmModal";
import { Gtm } from "#app/services/gtm";
import { useBet2fa } from "#app/hooks/security/useBet2fa";
import { useBetConfirmation } from "#app/hooks/security/useBetConfirmation";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { VerificationModal } from "#app/modals/verification/VerificationModal";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Crash } from "#app/services/crash";

let startBetAmount = 0;
let infiniteGames = false;

export function useAutoBet() {
  
  const round = useAppSelector((x) => x.crash.round);
  const userId  = useAppSelector((x) => x.user._id);
  const roundTicket = useAppSelector((x) => x.crash.tickets.find((x) => x.user.id === userId));
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const emailConfirmed = useAppSelector((x) => x.user.emailConfirmed);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const betAmount = useAppSelector((x) => x.crash.betAmount);
  const targetMultiplier = useAppSelector((x) => x.crash.targetMultiplier);
  const gameCount = useAppSelector((x) => x.crash.gameCount);
  const profitLimit = useAppSelector((x) => x.crash.profitLimit);
  const lossLimit = useAppSelector((x) => x.crash.lossLimit);
  const winAction = useAppSelector((x) => x.crash.winAction);
  const winIncreaseBy = useAppSelector((x) => x.crash.winIncreaseBy);
  const lossAction = useAppSelector((x) => x.crash.lossAction);
  const lossIncreaseBy = useAppSelector((x) => x.crash.lossIncreaseBy);
  const autoPlaying = useAppSelector((x) => x.crash.autoPlaying);
  const autoPnl = useAppSelector((x) => x.crash.autoPnl);
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  //Processing is being used for AutoBet, process profit and loss at the end only once
  const processing = useAppSelector((x) => x.crash.processing);
  const bet2fa = useBet2fa();
  const confirmBet = useBetConfirmation();
  const playSound = useSoundPlayer("crash");
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const handleBet = usePost(async (isMounted) => {      
    
    if (!autoPlaying) {
      return;
    }
    if (betAmount === undefined) {
      return;
    }
  
    if(round.status === "completed" && processing) {
      
      dispatch(Crash.setProcessing(false));
      // Next game logic      
      if(!roundTicket) {

        return;
      }
      let newBalance = tokenBalance;
      let newPnl = autoPnl;
  
      let wonAmount = roundTicket.wonAmount ?? roundTicket.betAmount;
      if (roundTicket.won) {
        newBalance += wonAmount - betAmount;
        newPnl += wonAmount - betAmount;
        playSound("success");
      } 
      else {
        newBalance -= betAmount;
        newPnl -= betAmount;
      }
  
      const remainingGames = gameCount ? gameCount - 1 : 0;
  
      const shouldContinue = () => {
        if (betAmount > newBalance) {
          return false;
        }
        if (!infiniteGames && !remainingGames) {
          return false;
        }
        if (profitLimit && newPnl >= profitLimit) {
          return false;
        }
        if (lossLimit && newPnl <= -lossLimit) {
          return false;
        }
  
        return true;
      };
  
      if (!infiniteGames) {
        dispatch(Crash.setGameCount(remainingGames));
      }
  
      dispatch(Crash.setAutoPnl(newPnl));
  
      if (!shouldContinue()) {
        dispatch(Crash.setAutoPlaying(false));
        Toasts.info("games\\crash:autoPlayStopped");
      } else {
        if (roundTicket.won) {
          if (winAction === "reset") {
            dispatch(Crash.setBetAmount(startBetAmount));
          } else if (winIncreaseBy) {
            dispatch(
              Crash.setBetAmount(
                Intimal.round(betAmount * (1 + winIncreaseBy / 100)),
              ),
            );
          }
        } else {
          if (lossAction === "reset") {
            dispatch(Crash.setBetAmount(startBetAmount));
          } else if (lossIncreaseBy) {
            dispatch(
              Crash.setBetAmount(
                Intimal.round(betAmount * (1 + lossIncreaseBy / 100)),
              ),
            );
          }
        }
      }
      return;
    }
    
    if(round.status !== "waiting")
      return;
    
    if(processing)
      return;
    
    if (betAmount > tokenBalance) {
      return false;
    }
    
    if(roundTicket)
      return;

    
   
    try {
      dispatch(Crash.setProcessing(true));
      const betToken = await bet2fa();
      Crash.postTicket({
        betAmount,
        targetMultiplier,
        betToken,
        roundId: round._id
      });

    } catch (err) {
      dispatch(Crash.setAutoPlaying(false));
      Toasts.info("games\\crash:autoPlayStopped");
      throw err;
    }

    if (!isMounted()) {
      return;
    }

    Gtm.trackBet({
      game: "crash",
      tokenAmount: betAmount,
    });
    
  });

  const startAuto = usePost(async () => {
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
    if(!targetMultiplier || targetMultiplier <= 1) {
      throw new Error("validations:errors.games.crash.invalidMultiplier");
    }

    await confirmBet({
      betAmount,
      onConfirmProps: () => ({
        heading: t("games\\crash:confirmBet.title"),
        message:  t("games\\crash:confirmBet.message", {value : {amount: Intimal.toLocaleString(betAmount)}})
      }),
    });

    startBetAmount = betAmount;
    infiniteGames = !gameCount;

    dispatch(Crash.setAutoPlaying(true));
    dispatch(Crash.setAutoPnl(0));

    handleBet();
  });

  const handleAutoStop = usePost(
      
    async (isMounted) => {
      if (isMounted() && round.status === "completed" && processing) {
        dispatch(Crash.setProcessing(false));
      }        
  });

  useInterval(handleBet, autoPlaying ? 500 : null);
  useInterval(handleAutoStop, !autoPlaying ? 500 : null);

  return startAuto;
}
