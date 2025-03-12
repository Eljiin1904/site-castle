import { System } from "@server/services/system";
import { Site } from "@server/services/site";
import { Rewards } from "@server/services/rewards";

export default () => setInterval(System.tryCatch(main), 5000);

async function main() {
  const meta = await Site.meta.cache();
  const race = await Rewards.getActiveRace({
    reports: 0,
    leaders: 0,
  });

  if (race) {
    if (race._id !== meta.race?.id) {
      await Site.setMeta({
        key: "race",
        value: {
          id: race._id,
          displayName: race.displayName,
          startDate: race.startDate,
          endDate: race.endDate,
          totalPayout: race.totalPayout,
        },
      });
    }
  } else {
    if (meta.race) {
      await Site.setMeta({
        key: "race",
        value: null,
      });
    }
  }
}
