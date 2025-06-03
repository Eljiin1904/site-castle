import { ChestWithCount } from "@core/types/chests/ChestDocument";
import { CaseBattleDocument } from "@core/types/case-battles/CaseBattleDocument";
import { CaseBattleMode } from "@core/types/case-battles/CaseBattleMode";
import { CaseBattleModifier } from "@core/types/case-battles/CaseBattleModifier";
import { CaseBattleRound } from "@core/types/case-battles/CaseBattleRound";
import { UserDocument } from "@core/types/users/UserDocument";
import { UserLocation } from "@core/types/users/UserLocation";
import { CaseBattles } from "@core/services/case-battles";
import { Cases } from "#server/services/cases";
import { Database } from "#server/services/database";
import { Ids } from "#server/services/ids";
import { Users } from "#server/services/users";
import { Random } from "#server/services/random";
import { Transactions } from "#server/services/transactions";

export async function createBattle({
  user,
  location,
  mode,
  chests,
  modifiers,
  autoSort,
}: {
  user: UserDocument;
  location: UserLocation;
  mode: CaseBattleMode;
  chests: ChestWithCount[];
  modifiers: CaseBattleModifier[];
  autoSort?: boolean;
}): Promise<CaseBattleDocument> {
  const entryCost = chests.reduce((acc, x) => (acc += x.openCost * x.count), 0);

  const battleId = await Ids.incremental({
    key: "caseBattleId",
    baseValue: 1000000,
    batchSize: 100,
  });

  const rounds: CaseBattleRound[] = [];

  for (const chest of chests) {
    for (let i = 0; i < chest.count; i++) {
      rounds.push({ rolls: [] });
    }
  }

  const playerCount = CaseBattles.getPlayerCount(mode);

  const players = [Users.getBasicUser(user), ...new Array(playerCount - 1).map((x) => null)];

  const serverSeed = Ids.secret();

  const privateBattle = modifiers.includes("private");
  const friendsOnly = modifiers.includes("friends-only");

  let joinKey;
  if (privateBattle || friendsOnly) {
    joinKey = Ids.secret();
  }

  const battle: CaseBattleDocument = {
    _id: battleId,
    createDate: new Date(),
    mode,
    chests,
    entryCost,
    modifiers,
    serverSeed,
    serverSeedHash: Random.hashServerSeed(serverSeed),
    rounds,
    roundCount: rounds.length,
    roundIndex: 0,
    players,
    status: "waiting",
    statusDate: new Date(),
    joinKey,
    autoSort,
    viewers: [user._id],
  };

  await Transactions.createBet({
    user,
    kind: "case-battle-join",
    edgeRate: CaseBattles.getEdgeRate(battle),
    betAmount: entryCost,
    location,
    gameId: battleId,
  });

  await Database.collection("case-battles").insertOne(battle);

  await Cases.addToCasesOpened({ chests, user });

  return battle;
}
