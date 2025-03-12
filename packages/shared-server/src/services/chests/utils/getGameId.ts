import { Ids } from "#server/services/ids";

export async function getGameId() {
  const gameId = await Ids.incremental({
    key: "chestGameId",
    baseValue: 1000000,
    batchSize: 100,
  });

  return gameId;
}
