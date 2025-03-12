import { ChestGameDocument } from "@core/types/chests/ChestGameDocument";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { UserDocument } from "@core/types/users/UserDocument";
import { UserLocation } from "@core/types/users/UserLocation";
import { ChestSpeed } from "@core/types/chests/ChestSpeed";
import { Chests } from "#server/services/chests";
import { Transactions } from "#server/services/transactions";

export async function createBets({
  chest,
  user,
  openCount,
  speed,
  specialEnabled,
  location,
}: {
  chest: ChestDocument;
  user: UserDocument;
  openCount: number;
  speed: ChestSpeed;
  specialEnabled: boolean;
  location: UserLocation;
}) {
  const games: ChestGameDocument[] = [];

  for (let i = 0; i < openCount; i++) {
    const gameId = await Chests.getGameId();

    await Transactions.createBet({
      user,
      kind: "case-spin",
      betAmount: chest.openCost,
      location,
      gameId,
      chest: Chests.getBasicChest(chest),
    });

    const game = await Chests.createGame({
      gameId,
      user,
      chest,
      speed,
      specialEnabled,
    });

    games.push(game);
  }

  return games;
}
