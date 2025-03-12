import { subDays } from "date-fns";
import { Numbers } from "@core/services/numbers";
import { Intimal } from "@core/services/intimal";
import { aggregateReport } from "./aggregateReport";

export async function canApproveWithdraw({
  userId,
  withdrawAmount,
  limitUsd,
}: {
  userId: string;
  withdrawAmount: number;
  limitUsd: number;
}) {
  const report = await aggregateReport({
    userId,
    minDate: subDays(Date.now(), 1),
    maxDate: new Date(),
  });

  const totalAmount = withdrawAmount + report.withdrawAmount;
  const totalAmountUsd = Numbers.floor(Intimal.toDecimal(totalAmount) / 2, 2);

  return totalAmountUsd < limitUsd;
}
