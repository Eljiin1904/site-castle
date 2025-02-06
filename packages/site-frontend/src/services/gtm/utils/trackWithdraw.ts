import { Intimal } from "@core/services/intimal";
import { store } from "#app/store";
import { push } from "./push";

export function trackWithdraw({
  transactionId,
  tokenAmount,
}: {
  transactionId: string;
  tokenAmount: number;
}) {
  const { user } = store.getState();

  push({
    event: "withdrawal",
    userId: user._id,
    transactionId,
    value: Intimal.toDecimal(tokenAmount / 2),
  });
}
