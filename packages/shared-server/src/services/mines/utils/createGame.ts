import { UserDocument } from "@core/types/users/UserDocument";
import { UserLocation } from "@core/types/users/UserLocation";
import { MinesGameDocument } from "@core/types/mines/MinesGameDocument";
import { Mines } from "@core/services/mines";
import { MinesMode } from "@core/types/mines/MinesMode";
import { Ids } from "#server/services/ids";
import { Random } from "#server/services/random";
import { Users } from "#server/services/users";
import { Database } from "#server/services/database";
import { Transactions } from "#server/services/transactions";

export async function createGame({
  user,
  location,
  mode,
  betAmount,
  gridSize,
  mineCount,
}: {
  user: UserDocument;
  location: UserLocation;
  mode: MinesMode;
  betAmount: number;
  gridSize: number;
  mineCount: number;
}): Promise<MinesGameDocument> {
  const tileCount = Mines.getTileCount(gridSize);

  const gameId = await Ids.incremental({
    key: "minesGameId",
    baseValue: 1000000,
    batchSize: 100,
  });

  const { serverSeed, clientSeed, nonce } = await Random.nextUserNonce(user._id);

  const tileIndexes = [...Array(tileCount)].map((x, i) => i);
  const mines = [];

  for (let n = 0; n < mineCount; n++) {
    const rollIndex = Random.getRoll({
      serverSeed,
      clientSeed,
      nonce: `${nonce}-${n}`,
      minValue: 0,
      maxValue: tileIndexes.length,
    });

    const tileIndex = tileIndexes[rollIndex];

    tileIndexes.splice(rollIndex, 1);

    mines.push(tileIndex);
  }

  const game: MinesGameDocument = {
    _id: gameId,
    timestamp: new Date(),
    user: Users.getBasicUser(user),
    mode,
    betAmount,
    gridSize,
    mineCount,
    mines,
    reveals: [],
    revealCount: 0,
    serverSeed,
    serverSeedHashed: Random.hashServerSeed(serverSeed),
    clientSeed,
    nonce,
  };

  await Database.collection("mines-games").insertOne(game);

  if (betAmount > 0) {
    await Transactions.createBet({
      user,
      kind: "mines-bet",
      betAmount,
      location,
      gameId,
      gridSize,
      mineCount,
    });
  }

  return game;
}
