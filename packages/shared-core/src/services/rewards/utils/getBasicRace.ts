import { BasicRace } from "#core/types/rewards/BasicRace";
import { RaceDocument } from "#core/types/rewards/RaceDocument";

export function getBasicRace(race: RaceDocument): BasicRace {
  return {
    id: race._id,
    kind: race.kind,
    displayName: race.displayName,
    slug: race.slug,
  };
}
