import { ChestGameDocument } from "@core/types/chests/ChestGameDocument";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { UserDocument } from "@core/types/users/UserDocument";
import { Chests } from "@core/services/chests";
import { ChestSpeed } from "@core/types/chests/ChestSpeed";
import { Database } from "#server/services/database";
import { Random } from "#server/services/random";
import { Users } from "#server/services/users";
import { getGameId } from "./getGameId";
import { Site } from "#server/services/site";

export async function createGame({
  gameId,
  chest,
  user,
  speed,
  specialEnabled,
}: {
  gameId?: string;
  user: UserDocument;
  chest: ChestDocument;
  speed: ChestSpeed;
  specialEnabled: boolean;
}) {
  const { serverSeed, clientSeed, nonce } = await Random.nextUserNonce(user._id);
  const settings = await Site.settings.cache();

  const rollValue = Random.getRoll({
    serverSeed,
    clientSeed,
    nonce,
    maxValue: 1000000,
  });
  const roll = Chests.createRoll({ chest, specialEnabled, value: rollValue, settings });
  const loot = chest.items[roll.lootIndex];

  if (!gameId) {
    gameId = await getGameId();
  }

  const game: ChestGameDocument = {
    _id: gameId,
    timestamp: new Date(),
    user: Users.getBasicUser(user),
    chest: Chests.getBasicChest(chest),
    roll,
    loot,
    speed,
    clientSeed,
    serverSeed,
    serverSeedHashed: Random.hashServerSeed(serverSeed),
    nonce,
  };

  await Database.collection("chest-games").insertOne(game);

  return game;
}
