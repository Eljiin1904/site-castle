import { subDays } from "date-fns";
import { Intimal } from "@core/services/intimal";
import { Users } from "@server/services/users";

export async function isActivePlayer(userId: string) {
  const report = await Users.aggregateReport({
    userId,
    minDate: subDays(Date.now(), 7),
    maxDate: new Date(),
  });

  return report.wagerAmount >= Intimal.fromDecimal(1000);
}
