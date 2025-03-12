import { endOfHour, startOfHour } from "date-fns";
import { Strings } from "@core/services/strings";
import { RaceDocument } from "@core/types/rewards/RaceDocument";
import { RaceKind } from "@core/types/rewards/RaceKind";
import { Database } from "#server/services/database";
import { Ids } from "#server/services/ids";

export async function createRace({
  kind,
  displayName,
  payouts,
  startDate,
  endDate,
}: {
  kind: RaceKind;
  displayName: string;
  payouts: number[];
  startDate: Date;
  endDate: Date;
}) {
  const race: RaceDocument = {
    _id: Ids.short(),
    kind,
    displayName,
    slug: Strings.toSlug(displayName),
    payouts,
    totalPayout: payouts.reduce((acc, x) => (acc += x), 0),
    reports: [],
    leaders: [],
    createDate: new Date(),
    startDate: startOfHour(startDate),
    endDate: endOfHour(endDate),
  };

  await Database.collection("races").insertOne(race);

  return race;
}
