import { useEffect, useRef, useState } from "react";
import { useIsMounted } from "usehooks-ts";
import { Intimal } from "@core/services/intimal";
import { usePost } from "@client/hooks/system/usePost";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { Utility } from "@client/services/utility";
import { WaitCancelledError } from "@client/services/errors";
import { useSoundPlayer } from "@client/hooks/sounds/useSoundPlayer";
import { LoginModal } from "#app/modals/login/LoginModal";
import { UserEmailConfirmModal } from "#app/modals/user/UserEmailConfirmModal";
import { Mines } from "#app/services/mines";
import { Gtm } from "#app/services/gtm";
import { useBet2fa } from "#app/hooks/security/useBet2fa";
import { useBetConfirmation } from "#app/hooks/security/useBetConfirmation";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useTranslation } from "@core/services/internationalization/internationalization";

let startBetAmount = 0;
let infiniteGames = false;

export function useAutoBet() {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const betAmount = useAppSelector((x) => x.mines.betAmount);
  const gridSize = useAppSelector((x) => x.mines.gridSize);
  const mineCount = useAppSelector((x) => x.mines.mineCount);
  const gameCount = useAppSelector((x) => x.mines.gameCount);
  const profitLimit = useAppSelector((x) => x.mines.profitLimit);
  const lossLimit = useAppSelector((x) => x.mines.lossLimit);
  const winAction = useAppSelector((x) => x.mines.winAction);
  const winIncreaseBy = useAppSelector((x) => x.mines.winIncreaseBy);
  const lossAction = useAppSelector((x) => x.mines.lossAction);
  const lossIncreaseBy = useAppSelector((x) => x.mines.lossIncreaseBy);
  const autoIndexes = useAppSelector((x) => x.mines.autoIndexes);
  const autoPlaying = useAppSelector((x) => x.mines.autoPlaying);
  const autoPnl = useAppSelector((x) => x.mines.autoPnl);
  const {t} = useTranslation(["games\\mines"]);

  const [next, setNext] = useState(false);
  const cancelled = useRef(false);

  const isMounted = useIsMounted();
  const dispatch = useAppDispatch();
  const bet2fa = useBet2fa();
  const confirmBet = useBetConfirmation();
  const playSound = useSoundPlayer("mines");

  const shouldStop = () => {
    return !isMounted() || cancelled.current;
  };

  const stopAuto = () => {
    setNext(false);
    dispatch(Mines.setAutoPlaying(false));
    Toasts.info("games\\mines:autoPlayStopped");
  };

  const handleBet = usePost(
    async () => {
      if (betAmount === undefined) {
        return;
      }
      if (!autoIndexes) {
        return;
      }

      let game;

      // Create game

      const betToken = await bet2fa();

      const res = await Mines.createAutoGame({
        betAmount,
        gridSize,
        mineCount,
        tileIndexes: autoIndexes,
        betToken,
      });

      game = res.state;

      Gtm.trackBet({
        game: "mines",
        tokenAmount: betAmount,
      });

      if (shouldStop()) {
        return;
      }

      const won = Mines.isAlive(game);
      const multiplier = Mines.getMultiplier(game);

      // Reveal tiles

      dispatch(
        Mines.setGame({
          ...game,
          mines: [],
          reveals: [],
          revealCount: 0,
          completed: false,
        }),
      );

      for (let i = 0; i < game.revealCount; i++) {
        const revealIndex = game.reveals[i];

        if (Mines.isMined(game, revealIndex)) {
          break;
        }

        playSound("mines-clear");

        dispatch(Mines.nextAutoSequence(revealIndex));

        await Utility.waitForDuration(Mines.animationDuration);

        if (shouldStop()) {
          break;
        }
      }

      dispatch(Mines.setGame(game));

      if (won) {
        playSound("mines-diffused");
      } else {
        playSound("mines-bomb");
      }

      // Next game

      let newBalance = tokenBalance - betAmount;
      let newPnl = autoPnl - betAmount;

      if (won) {
        newBalance += betAmount * multiplier;
        newPnl += betAmount * multiplier;
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

      if (!shouldContinue()) {
        stopAuto();
        return;
      }

      if (!infiniteGames) {
        dispatch(Mines.setGameCount(remainingGames));
      }

      dispatch(Mines.setAutoPnl(newPnl));

      if (won) {
        if (winAction === "reset") {
          dispatch(Mines.setBetAmount(startBetAmount));
        } else if (winIncreaseBy) {
          dispatch(Mines.setBetAmount(Intimal.round(betAmount * (1 + winIncreaseBy / 100))));
        }
      } else {
        if (lossAction === "reset") {
          dispatch(Mines.setBetAmount(startBetAmount));
        } else if (lossIncreaseBy) {
          dispatch(Mines.setBetAmount(Intimal.round(betAmount * (1 + lossIncreaseBy / 100))));
        }
      }

      await Utility.waitForDuration(2500, shouldStop);

      dispatch(Mines.setGame(undefined));

      await Utility.waitForDuration(500, shouldStop);

      setNext(true);
    },
    (loading) => {},
    (err) => {
      if (!(err instanceof WaitCancelledError)) {
        stopAuto();
        Toasts.error(err);
      }
    },
  );

  const startAuto = usePost(async () => {
    playSound("click");

    if (!authenticated) {
      return Dialogs.open("primary", <LoginModal />);
    }
    if (kycTier < 1) {
      return Dialogs.open("primary", <UserEmailConfirmModal />);
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

    cancelled.current = false;

    startBetAmount = betAmount;
    infiniteGames = !gameCount;

    dispatch(Mines.setAutoPlaying(true));
    dispatch(Mines.setAutoPnl(0));

    setNext(true);
  });

  useEffect(() => {
    if (next) {
      setNext(false);
      handleBet();
    }
  }, [next]);

  useEffect(() => {
    if (!autoPlaying) {
      cancelled.current = true;
    }
  }, [autoPlaying]);

  return startAuto;
}
