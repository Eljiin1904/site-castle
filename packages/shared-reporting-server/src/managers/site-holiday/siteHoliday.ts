import { System } from "@server/services/system";
import { Site } from "@server/services/site";
import { Rewards } from "@server/services/rewards";

export default () => setInterval(System.tryCatch(main), 5000);

async function main() {
  const meta = await Site.meta.cache();
  const holiday = await Rewards.getActiveHoliday();

  if (holiday) {
    if (holiday._id !== meta.holiday?.id) {
      await Site.setMeta({
        key: "holiday",
        value: {
          id: holiday._id,
          displayName: holiday.displayName,
          startDate: holiday.startDate,
          endDate: holiday.endDate,
          chests: holiday.chests,
          currencyRate: holiday.currencyRate,
          raffleRate: holiday.raffleRate,
          boostRate: holiday.boostRate,
          adventResetDate: holiday.adventResetDate,
          adventBonusDays: holiday.adventBonusDays,
        },
      });
    }
  } else {
    if (meta.holiday) {
      await Site.setMeta({
        key: "holiday",
        value: null,
      });
    }
  }
}
