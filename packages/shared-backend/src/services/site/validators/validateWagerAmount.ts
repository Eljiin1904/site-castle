import { subDays } from "date-fns";
import { UserDocument } from "@core/types/users/UserDocument";
import { Intimal } from "@core/services/intimal";
import { HandledError } from "@server/services/errors";
import { Users } from "#app/services/users";

export async function validateWagerAmount(
  user: UserDocument,
  requiredWagerAmount: number,
  requiredWagerDays: number,
) {
  if (requiredWagerAmount && requiredWagerDays) {
    const maxDate = new Date();
    const minDate = subDays(maxDate, requiredWagerDays);
    const report = await Users.aggregateReport({
      userId: user._id,
      minDate,
      maxDate,
    });
    if (report.wagerAmount < requiredWagerAmount) {
      throw new HandledError(
        `You must wager at least ${Intimal.toLocaleString(requiredWagerAmount, 0)} tokens in the last ${requiredWagerDays} days.`,
      );
    }
  }
}
