import { System } from "@server/services/system";
import { Site } from "@server/services/site";
import { Rewards } from "@server/services/rewards";

export default () => setInterval(System.tryCatch(main), 5000);

async function main() {
  const meta = await Site.meta.cache();
  const activeRaces = await Rewards.getActiveRaces({
    reports: 0,
    leaders: 0,
  });

  if(!activeRaces)
  {
    if(meta.races?.length)
      await Site.setMeta({
        key: 'races',
        value: null,
      });
  }
  else if (activeRaces.length > 0) {
    await Site.setMeta({
      key: 'races',
      value: activeRaces.map(race => {
        return {
          id: race._id,
          displayName: race.displayName,
          startDate: race.startDate,
          endDate: race.endDate,
          totalPayout: race.totalPayout,
          slug: race.slug
        }
      }),
    });
  }
}
