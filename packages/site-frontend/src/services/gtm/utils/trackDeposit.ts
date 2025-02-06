import { Intimal } from "@core/services/intimal";
import { store } from "#app/store";
import { push } from "./push";

export function trackDeposit({
  transactionId,
  tokenAmount,
  ftd,
}: {
  transactionId: string;
  tokenAmount: number;
  ftd: boolean;
}) {
  const { user } = store.getState();

  push({
    event: "deposit",
    firstDeposit: ftd,
    userId: user._id,
    transactionId,
    value: Intimal.toDecimal(tokenAmount / 2),
  });
}
