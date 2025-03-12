import { subDays } from "date-fns";
import { UserDocument } from "@core/types/users/UserDocument";
import { Users } from "#server/services/users";

export async function getTipUsage({ user }: { user: UserDocument }) {
  if (!user.meta.tipLimit) {
    return 0;
  }

  const maxDate = new Date();
  const minDate = subDays(maxDate, 1);

  const report = await Users.aggregateReport({
    userId: user._id,
    minDate,
    maxDate,
  });

  return report.tipSentAmount;
}
