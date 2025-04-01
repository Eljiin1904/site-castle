import { useInterval } from "usehooks-ts";
import { Intimal } from "@core/services/intimal";
import { usePost } from "@client/hooks/system/usePost";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { useSoundPlayer } from "@client/hooks/sounds/useSoundPlayer";
import { LoginModal } from "#app/modals/login/LoginModal";
import { UserEmailConfirmModal } from "#app/modals/user/UserEmailConfirmModal";
import { Dice } from "#app/services/dice";
import { Gtm } from "#app/services/gtm";
import { useBet2fa } from "#app/hooks/security/useBet2fa";
import { useBetConfirmation } from "#app/hooks/security/useBetConfirmation";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { VerificationModal } from "#app/modals/verification/VerificationModal";
import { useTranslation } from "@core/services/internationalization/internationalization";

let startBetAmount = 0;
let infiniteGames = false;

export function useAutoBet() {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const emailConfirmed = useAppSelector((x) => x.user.emailConfirmed);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const betAmount = useAppSelector((x) => x.dice.betAmount);
  const targetValue = useAppSelector((x) => x.dice.targetValue);
  const targetKind = useAppSelector((x) => x.dice.targetKind);
  const gameCount = useAppSelector((x) => x.dice.gameCount);
  const profitLimit = useAppSelector((x) => x.dice.profitLimit);
  const lossLimit = useAppSelector((x) => x.dice.lossLimit);
  const winAction = useAppSelector((x) => x.dice.winAction);
  const winIncreaseBy = useAppSelector((x) => x.dice.winIncreaseBy);
  const lossAction = useAppSelector((x) => x.dice.lossAction);
  const lossIncreaseBy = useAppSelector((x) => x.dice.lossIncreaseBy);
  const autoPlaying = useAppSelector((x) => x.dice.autoPlaying);
  const autoPnl = useAppSelector((x) => x.dice.autoPnl);
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const bet2fa = useBet2fa();
  const confirmBet = useBetConfirmation();
  const playSound = useSoundPlayer("dice");
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const handleBet = usePost(async (isMounted) => {
    if (!autoPlaying) {
      return;
    }
    if (betAmount === undefined) {
      return;
    }

    let ticket;

    try {
      const betToken = await bet2fa();

      const res = await Dice.postTicket({
        betAmount,
        targetValue,
        targetKind,
        betToken,
      });

      ticket = res.ticket;
    } catch (err) {
      dispatch(Dice.setAutoPlaying(false));
      Toasts.info("games\\dice:autoPlayStopped");
      throw err;
    }

    if (!isMounted()) {
      return;
    }

    dispatch(Dice.updateHistory(ticket));

    Gtm.trackBet({
      game: "dice",
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
      dispatch(Dice.setGameCount(remainingGames));
    }

    dispatch(Dice.setAutoPnl(newPnl));

    if (!shouldContinue()) {
      dispatch(Dice.setAutoPlaying(false));
      Toasts.info("games\\dice:autoPlayStopped");
    } else {
      if (ticket.won) {
        if (winAction === "reset") {
          dispatch(Dice.setBetAmount(startBetAmount));
        } else if (winIncreaseBy) {
          dispatch(
            Dice.setBetAmount(
              Intimal.round(betAmount * (1 + winIncreaseBy / 100)),
            ),
          );
        }
      } else {
        if (lossAction === "reset") {
          dispatch(Dice.setBetAmount(startBetAmount));
        } else if (lossIncreaseBy) {
          dispatch(
            Dice.setBetAmount(
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
      throw new Error("validations:errors.games.invalidBetAmount");
    }
    if (betAmount > tokenBalance) {
      throw new Error("validations:errors.games.notEnoughTokens");
    }

    await confirmBet({
      betAmount,
      onConfirmProps: () => ({
        heading: t("games\\dice:confirmBet.title"),
        message:  t("games\\dice:confirmBet.message", {value : {amount: Intimal.toLocaleString(betAmount)}})
      }),
    });

    startBetAmount = betAmount;
    infiniteGames = !gameCount;

    dispatch(Dice.setAutoPlaying(true));
    dispatch(Dice.setAutoPnl(0));

    handleBet();
  });

  useInterval(handleBet, autoPlaying ? 750 : null);

  return startAuto;
}
