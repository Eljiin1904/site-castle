import { useEventCallback, useLocalStorage } from "usehooks-ts";
import { waitForConfirmation } from "@client/modals/confirm/ConfirmModal";
import { useAppSelector } from "../store/useAppSelector";

export function useBetConfirmation() {
  const [lastBetAmount, setLastBetAmount] = useLocalStorage(
    "last-bet-amount",
    0,
  );

  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const unusualBetConfirm = useAppSelector(
    (x) => x.user.settings.unusualBetConfirm,
  );
  const largeBetConfirm = useAppSelector(
    (x) => x.user.settings.largeBetConfirm,
  );

  const handler = useEventCallback(
    async ({
      betAmount,
      onConfirmProps,
    }: {
      betAmount: number;
      onConfirmProps: () => { heading: string; message: string };
    }) => {
      const over70p = betAmount / tokenBalance >= 0.7 && largeBetConfirm;
      const over10x =
        lastBetAmount && betAmount / 10 > lastBetAmount && unusualBetConfirm;

      if (over70p || over10x) {
        const confirmed = await waitForConfirmation(onConfirmProps());

        if (!confirmed) {
          throw new Error("validations:errors.games.betConfirmationRequired");
        }
      }

      setLastBetAmount(betAmount);
    },
  );

  return handler;
}
