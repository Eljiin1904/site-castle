import { useInterval } from "usehooks-ts";
import { Intimal } from "@core/services/intimal";
import { usePost } from "@client/hooks/system/usePost";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { useSoundPlayer } from "@client/hooks/sounds/useSoundPlayer";
import { LoginModal } from "#app/modals/login/LoginModal";
import { UserEmailConfirmModal } from "#app/modals/user/UserEmailConfirmModal";
import { Limbo } from "#app/services/limbo";
import { Gtm } from "#app/services/gtm";
import { useBet2fa } from "#app/hooks/security/useBet2fa";
import { useBetConfirmation } from "#app/hooks/security/useBetConfirmation";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { VerificationModal } from "#app/modals/verification/VerificationModal";

let startBetAmount = 0;
let infiniteGames = false;

export function useAutoBet() {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const autoPlaying = useAppSelector((x) => x.limbo.autoPlaying);
  const autoPnl = useAppSelector((x) => x.limbo.autoPnl);
  const betAmount = useAppSelector((x) => x.limbo.betAmount);
  const emailConfirmed = useAppSelector((x) => x.user.emailConfirmed);
  const gameCount = useAppSelector((x) => x.limbo.gameCount);
  const lossAction = useAppSelector((x) => x.limbo.lossAction);
  const lossIncreaseBy = useAppSelector((x) => x.limbo.lossIncreaseBy);
  const lossLimit = useAppSelector((x) => x.limbo.lossLimit);
  const profitLimit = useAppSelector((x) => x.limbo.profitLimit);
  const targetValue = useAppSelector((x) => x.limbo.targetValue);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const winAction = useAppSelector((x) => x.limbo.winAction);
  const winIncreaseBy = useAppSelector((x) => x.limbo.winIncreaseBy);
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const bet2fa = useBet2fa();
  const confirmBet = useBetConfirmation();
  const playSound = useSoundPlayer("limbo");
  const dispatch = useAppDispatch();

  const handleBet = usePost(async (isMounted) => {
    if (!autoPlaying) {
      return;
    }
    if (betAmount === undefined) {
      return;
    }

    dispatch(Limbo.clearLastTicket());

    let ticket;

    try {
      const betToken = await bet2fa();

      const res = await Limbo.postTicket({
        betAmount,
        targetValue,
        betToken,
      });

      ticket = res.ticket;
    } catch (err) {
      dispatch(Limbo.setAutoPlaying(false));
      Toasts.info("Auto play stopped.");
      throw err;
    }

    if (!isMounted()) {
      return;
    }

    dispatch(Limbo.updateHistory(ticket));

    Gtm.trackBet({
      game: "limbo",
      tokenAmount: betAmount,
    });

    // Next game logic
    let newBalance = tokenBalance;
    let newPnl = autoPnl;

    if (ticket.won) {
      newBalance += ticket.wonAmount - betAmount;
      newPnl += ticket.wonAmount - betAmount;

      playSound("success");
    } else {
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
      dispatch(Limbo.setGameCount(remainingGames));
    }

    dispatch(Limbo.setAutoPnl(newPnl));

    if (!shouldContinue()) {
      dispatch(Limbo.setAutoPlaying(false));
      Toasts.info("Auto play stopped.");
    } else {
      if (ticket.won) {
        if (winAction === "reset") {
          dispatch(Limbo.setBetAmount(startBetAmount));
        } else if (winIncreaseBy) {
          dispatch(
            Limbo.setBetAmount(
              Intimal.round(betAmount * (1 + winIncreaseBy / 100)),
            ),
          );
        }
      } else {
        if (lossAction === "reset") {
          dispatch(Limbo.setBetAmount(startBetAmount));
        } else if (lossIncreaseBy) {
          dispatch(
            Limbo.setBetAmount(
              Intimal.round(betAmount * (1 + lossIncreaseBy / 100)),
            ),
          );
        }
      }
    }
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

    startBetAmount = betAmount;
    infiniteGames = !gameCount;

    dispatch(Limbo.setAutoPlaying(true));
    dispatch(Limbo.setAutoPnl(0));

    handleBet();
  });

  useInterval(handleBet, autoPlaying ? 1250 : null);

  return startAuto;
}
