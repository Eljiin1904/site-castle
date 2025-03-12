import { endOfHour, startOfHour } from "date-fns";
import { RaffleDocument } from "@core/types/rewards/RaffleDocument";
import { LootItem } from "@core/types/items/BasicItem";
import { Strings } from "@core/services/strings";
import { Database } from "#server/services/database";
import { Ids } from "#server/services/ids";
import { Random } from "#server/services/random";

export async function createRaffle({
  displayName,
  items,
  startDate,
  endDate,
}: {
  displayName: string;
  items: LootItem[];
  startDate: Date;
  endDate: Date;
}) {
  const raffleId = await Ids.incremental({
    key: "raffleId",
    baseValue: 1e6,
    batchSize: 1,
  });

  const serverSeed = Ids.secret();
  const serverSeedHash = Random.hashServerSeed(serverSeed);

  const raffle: RaffleDocument = {
    _id: raffleId,
    displayName,
    slug: Strings.toSlug(displayName),
    items,
    totalValue: items.reduce((acc, x) => (acc += x.lootValue), 0),
    ticketCount: 0,
    round: 0,
    createDate: new Date(),
    startDate: startOfHour(startDate),
    endDate: endOfHour(endDate),
    serverSeed,
    serverSeedHash,
    status: "open",
    statusDate: new Date(),
    reports: [],
    leaders: [],
    winners: [],
  };

  await Database.collection("raffles").insertOne(raffle);

  return raffle;
}
