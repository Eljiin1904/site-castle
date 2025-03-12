import { subDays } from "date-fns";
import { Intimal } from "@core/services/intimal";
import { Users } from "@server/services/users";

export async function wagerReport() {
  const maxDate = new Date();
  const minDate = subDays(maxDate, 7);

  const report = await Users.aggregateReport({
    userId: "MI3E0Q6BCIJX30H85B",
    minDate,
    maxDate,
  });

  console.log(Intimal.toDecimal(report.wagerAmount));
}
